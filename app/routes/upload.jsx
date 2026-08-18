import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar';
import { prepareInstructions } from '~/constants';
import { convertPdfToImage } from '~/lib/pdf2img';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';

const AIOrb = lazy(() => import('~/components/3d/AIOrb'));

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState(null);

  const handleFileSelect = (file) => {
    setFile(file);
  };

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }) => {
    setIsProcessing(true);
    setStatusText('Uploading resume…');
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText('Error: Failed to upload file.');

    setStatusText('Converting to image…');
    const imagesFile = await convertPdfToImage(file);
    if (!imagesFile.file) return setStatusText('Error: Failed to convert PDF to image.');

    setStatusText('Uploading the image…');
    const uploadedImage = await fs.upload([imagesFile.file]);
    if (!uploadedImage) return setStatusText('Error: Failed to upload image.');

    setStatusText('Preparing data…');
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing…');
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText = typeof feedback.message.content === 'string'
      ? feedback.message.content
      : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText('Analysis complete, redirecting…');
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get('company-name');
    const jobTitle = formData.get('job-title');
    const jobDescription = formData.get('job-description');

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main>
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <div className="eyebrow">New Scan</div>
          <h1>
            Smart Feedback for your <span className="text-gradient">Dream Job</span>
          </h1>

          {isProcessing ? (
            <div className="scan-frame w-full max-w-md rounded-[16px] border border-line bg-panel p-8 flex flex-col items-center gap-4 mt-4">
              <span className="scan-line" />
              <span className="scan-corner tl" />
              <span className="scan-corner tr" />
              <span className="scan-corner bl" />
              <span className="scan-corner br" />
              <div className="w-24 h-24">
                <Suspense fallback={<div className="w-14 h-14 rounded-full border-2 border-signal/40 border-t-signal animate-spin mx-auto" />}>
                  <AIOrb />
                </Suspense>
              </div>
              <h2 className="text-text text-base">{statusText}</h2>
              <p className="readout text-xs text-muted-2 uppercase tracking-[0.12em]">Do not close this window</p>
            </div>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips.</h2>
          )}

          {!isProcessing && (
            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6 w-full max-w-xl">
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input type="text" name="company-name" placeholder="e.g. Acme Corp" id="company-name" />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="e.g. Frontend Engineer" id="job-title" />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5} name="job-description" placeholder="Paste the job description here" id="job-description" />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">Analyze Resume</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
