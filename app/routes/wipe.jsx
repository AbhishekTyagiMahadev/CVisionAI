import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isWiping, setIsWiping] = useState(false);

  const loadFiles = async () => {
    const files = await fs.readDir("./");
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    setIsWiping(true);
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    await loadFiles();
    setIsWiping(false);
  };

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center text-muted readout text-sm">Loading your workspace…</div>;
  }

  if (error) {
    return <div className="min-h-screen grid place-items-center text-fail">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <div className="eyebrow mb-2">System</div>
          <h1>Application Data</h1>
          <p className="mt-2 text-sm text-muted">
            Signed in as <span className="readout text-text">{auth.user?.username}</span>
          </p>
        </div>

        <div className="panel-raised">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-lg text-text font-medium" style={{ fontFamily: 'var(--font-display)' }}>Stored Files</h2>
            <p className="text-sm text-muted mt-0.5">These files are currently stored in your app space</p>
          </div>

          <div className="max-h-[260px] overflow-y-auto px-6 py-4">
            {files.length === 0 ? (
              <p className="text-sm text-muted-2">No files found. Your workspace is clean.</p>
            ) : (
              <ul className="space-y-2.5">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="flex items-center justify-between rounded-[8px] border border-line bg-panel-2 px-4 py-3 transition hover:border-line-soft"
                  >
                    <span className="truncate text-sm text-text">{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-[14px] border border-fail-dim bg-fail-dim px-6 py-6">
          <h3 className="text-lg font-semibold text-fail" style={{ fontFamily: 'var(--font-display)' }}>Danger Zone</h3>
          <p className="mt-1 text-sm text-muted">This action permanently deletes all app data. This cannot be undone.</p>

          <button
            onClick={handleDelete}
            disabled={isWiping || files.length === 0}
            className="mt-5 inline-flex items-center justify-center rounded-[10px] bg-fail px-6 py-3 text-sm font-medium text-ink readout uppercase tracking-[0.06em] transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isWiping ? "Wiping Data…" : "Wipe App Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WipeApp;
