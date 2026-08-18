import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import "./app.css";
import { usePuterStore } from "./lib/puter";
import { useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
export const links = () => [{
  rel: "icon",
  href: "/favicon.ico",
  sizes: "any"
}, {
  rel: "icon",
  href: "/favicon.png",
  type: "image/png"
}, {
  rel: "apple-touch-icon",
  href: "/apple-touch-icon.png"
}, {
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}];
export function Layout({
  children
}) {
  const {
    init
  } = usePuterStore();
  useEffect(() => {
    init();
  }, [init]);
  return <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>;
}
export default function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
export function ErrorBoundary({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  return <main className="pt-16 p-4 container mx-auto min-h-screen">
      <div className="eyebrow mb-2">System Error</div>
      <h1>{message}</h1>
      <p className="text-muted mt-2">{details}</p>
      {stack && <pre className="w-full p-4 mt-4 overflow-x-auto panel readout text-xs text-fail">
          <code>{stack}</code>
        </pre>}
    </main>;
}
