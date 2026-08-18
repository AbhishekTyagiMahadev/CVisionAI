import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "CVision AI | Auth" },
  { name: "description", content: "Log into your CVision AI account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const next = searchParams.get("next") || "/";
  const didLoginRef = useRef(false);

  useEffect(() => {
    if (!isLoading && auth.isAuthenticated && didLoginRef.current) {
      navigate(next, { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, next, navigate]);

  const handleLogin = async () => {
    didLoginRef.current = true;
    await auth.signIn();
  };

  const handleLogout = async () => {
    didLoginRef.current = false;
    await auth.signOut();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="scan-frame w-full max-w-sm panel-raised p-8">
        <span className="scan-corner tl" /><span className="scan-corner tr" />
        <span className="scan-corner bl" /><span className="scan-corner br" />

        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <div className="eyebrow mb-1">Access Terminal</div>
          <h1 className="text-3xl">Welcome</h1>
          <p className="text-muted text-sm mt-1">Log in to continue your job search</p>
        </div>

        {isLoading ? (
          <button className="primary-button animate-pulse" disabled>
            Signing you in…
          </button>
        ) : auth.isAuthenticated ? (
          <button className="primary-button" onClick={handleLogout}>Log Out</button>
        ) : (
          <button className="primary-button" onClick={handleLogin}>Log In</button>
        )}
      </div>
    </main>
  );
};

export default Auth;
