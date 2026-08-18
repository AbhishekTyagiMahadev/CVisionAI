import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import ATS from '~/components/ATS';
import Details from '~/components/Details';
import Summary from '~/components/Summary';
import ScanCorners from '~/components/ScanCorners';
import { usePuterStore } from '~/lib/puter';

export const meta = () => [
  { title: 'CVision AI | Review' },
  { name: 'description', content: 'Detailed overview of your resume' },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`, { replace: true });
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      setResumeUrl(URL.createObjectURL(pdfBlob));

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      setImageUrl(URL.createObjectURL(imageBlob));

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to='/' className='back-button'>
          <img src="/icons/back.svg" alt="back" className='w-2.5 h-2.5 opacity-70' />
          <span>Back to Home</span>
        </Link>
        <span className="readout text-xs text-muted-2 uppercase tracking-[0.12em]">Scan ID // {id?.slice(0, 8)}</span>
      </nav>

      <div className='flex flex-row w-full max-lg:flex-col-reverse'>
        <section className="feedback-section bg-ink-soft h-screen sticky top-0 items-center justify-center border-r border-line max-lg:border-r-0 max-lg:border-b">
          {imageUrl && resumeUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className='scan-frame max-sm:m-0 h-[90%] max-wxl:h-fit w-fit mx-auto rounded-[14px] overflow-hidden border border-line'
            >
              <ScanCorners />
              <a href={resumeUrl} target='_blank' rel='noreferrer noopener'>
                <img src={imageUrl} alt="resume" className='w-full h-full object-contain' title='resume' />
              </a>
            </motion.div>
          )}
        </section>

        <section className="feedback-section">
          <div className="eyebrow mb-1">Analysis Report</div>
          <h2 className="text-3xl !text-text font-bold" style={{ fontFamily: 'var(--font-display)' }}>Resume Review</h2>
          {feedback ? (
            <motion.div
              className="flex flex-col gap-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            >
              {[<Summary key="summary" feedback={feedback} />, <ATS key="ats" score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />, <Details key="details" feedback={feedback} />].map((el) => (
                <motion.div
                  key={el.key}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="scan-frame w-full rounded-[14px] border border-line bg-panel p-10 flex flex-col items-center gap-3">
              <span className="scan-line" />
              <span className="scan-corner tl" /><span className="scan-corner tr" />
              <span className="scan-corner bl" /><span className="scan-corner br" />
              <span className="readout text-xs text-muted-2 uppercase tracking-[0.14em]">Reading document…</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
