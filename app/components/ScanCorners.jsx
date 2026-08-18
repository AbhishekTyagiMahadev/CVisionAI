// Four registration-mark brackets, like a scanner bed or camera viewfinder.
// Drop inside any `relative` container to frame it. Pair with the
// `.scan-line` class (rendered separately) for an active-scan sweep.
const ScanCorners = () => (
  <>
    <span className="scan-corner tl" aria-hidden="true" />
    <span className="scan-corner tr" aria-hidden="true" />
    <span className="scan-corner bl" aria-hidden="true" />
    <span className="scan-corner br" aria-hidden="true" />
  </>
);

export default ScanCorners;
