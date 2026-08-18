const ScoreBadge = ({ score }) => {
  let tone = '';
  let dot = '';
  let badgeText = '';

  if (score > 70) {
    tone = 'text-pass border-pass-dim bg-pass-dim';
    dot = 'bg-pass';
    badgeText = 'Strong';
  } else if (score > 49) {
    tone = 'text-flag border-flag-dim bg-flag-dim';
    dot = 'bg-flag';
    badgeText = 'Good Start';
  } else {
    tone = 'text-fail border-fail-dim bg-fail-dim';
    dot = 'bg-fail';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`score-badge border ${tone}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <p>{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
