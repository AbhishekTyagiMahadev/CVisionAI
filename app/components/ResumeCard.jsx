import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from '~/lib/puter';
import ScanCorners from './ScanCorners';

const MotionLink = motion.create(Link);

const ResumeCard = ({ resume, index = 0 }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [resume.imagePath]);

  return (
    <MotionLink
      to={`/resume/${resume.id}`}
      className='resume-card'
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className='resume-card-header'>
        <div className='flex flex-col gap-1.5 min-w-0'>
          {resume.companyName && (
            <h2 className='text-text font-semibold truncate' style={{ fontFamily: 'var(--font-display)' }}>
              {resume.companyName}
            </h2>
          )}

          {resume.jobTitle && <h3 className='text-sm text-muted truncate'>{resume.jobTitle}</h3>}

          {!resume.companyName && !resume.jobTitle && (
            <h2 className="text-text font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Resume</h2>
          )}
        </div>

        <div className='flex-shrink-0'>
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className='scan-frame flex-1 rounded-[12px] overflow-hidden border border-line bg-panel-2'>
          <ScanCorners />
          <img
            src={resumeUrl}
            alt="resume"
            className='w-full h-full object-cover object-top'
          />
        </div>
      )}
    </MotionLink>
  );
};

export default ResumeCard;
