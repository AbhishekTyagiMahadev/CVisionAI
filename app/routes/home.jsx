import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";

const FloatingDocument = lazy(() => import("~/components/3d/FloatingDocument"));

export function meta({}) {
  return [
    { title: "CVision AI" },
    { name: "description", content: "Smart Feedback for your Dream Job!" },
  ];
}

export default function Home() {
  const { auth, kv, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/', { replace: true });
    }
  }, [auth.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = await kv.list('resume:*', true);
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value));
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <div className="eyebrow">Application Log</div>
          <h1>
            Track Your <span className="text-gradient">Application</span> & Resume Ratings
          </h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <div className="scan-frame w-[220px] h-[140px] rounded-[14px] border border-line bg-panel flex items-center justify-center">
              <span className="scan-line" />
              <span className="readout text-xs text-muted-2 uppercase tracking-[0.14em]">Loading records…</span>
            </div>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume, index) => (
              <ResumeCard key={resume.id} resume={resume} index={index} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-2 gap-2">
            <div className="w-[240px] h-[240px] max-sm:w-[180px] max-sm:h-[180px]">
              <Suspense fallback={<div className="w-full h-full" />}>
                <FloatingDocument />
              </Suspense>
            </div>
            <Link to="/upload" className="primary-button w-fit px-8">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
