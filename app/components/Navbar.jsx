import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to="/" className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-[8px] border border-line bg-panel-2 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-signal shadow-[0_0_8px_2px_var(--color-signal-soft)]" />
        </span>
        <span className='text-lg font-semibold text-text' style={{ fontFamily: 'var(--font-display)' }}>
          CVision<span className="text-signal">AI</span>
        </span>
      </Link>

      <Link to="/upload" className='primary-button w-fit'>
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
