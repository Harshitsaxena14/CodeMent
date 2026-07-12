import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavClick = (e, targetId) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we are not on home, let react-router route back to home page with hash
      navigate(`/#${targetId}`);
    }
  };

  const isPublicPage = ["/", "/login", "/register"].includes(location.pathname);
  if (!isPublicPage) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 ${
        isScrolled
          ? "bg-zinc-950/70 backdrop-blur-md border-b border-zinc-800/80 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg className="w-6 h-6 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          </svg>
          <span className="font-sans font-bold text-xl tracking-tight text-zinc-50 group-hover:text-accent-cyan transition-colors">
            CodeMent
          </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link to="/roadmap" className="hover:text-zinc-50 transition-colors">
            Roadmap
          </Link>
          <Link to="/ai" className="hover:text-zinc-50 transition-colors">
            AI Mentor
          </Link>
          <a
            href="#extension"
            onClick={(e) => handleNavClick(e, "extension")}
            className="hover:text-zinc-50 transition-colors"
          >
            Extension
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "features")}
            className="hover:text-zinc-50 transition-colors"
          >
            Features
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-zinc-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-zinc-450 hover:text-zinc-50 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/insights"
                className="text-sm font-medium text-zinc-450 hover:text-zinc-50 transition-colors"
              >
                Insights
              </Link>
              <Link
                to="/revision"
                className="text-sm font-medium text-zinc-450 hover:text-zinc-50 transition-colors"
              >
                Revision
              </Link>
              <Link
                to="/mission"
                className="text-sm font-medium text-zinc-450 hover:text-zinc-50 transition-colors"
              >
                Mission
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-zinc-450 hover:text-zinc-50 transition-colors cursor-pointer"
              >
                Logout
              </button>
              <Link
                to="/ai"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-50 text-zinc-950 font-sans font-semibold text-sm hover:bg-zinc-200 active:scale-98 transition-all"
              >
                AI Mentor
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-zinc-50 text-zinc-950 font-sans font-semibold text-sm hover:bg-zinc-200 active:scale-98 transition-all"
              >
                Start Learning <span className="text-zinc-600 font-normal">→</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-50 focus:outline-none"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-zinc-950/95 border-b border-zinc-800/90 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 text-base font-medium animate-fade-in">
          <Link to="/roadmap" className="text-zinc-400 hover:text-zinc-50 transition-colors">
            Roadmap
          </Link>
          <Link to="/ai" className="text-zinc-400 hover:text-zinc-50 transition-colors">
            AI Mentor
          </Link>
          <a
            href="#extension"
            onClick={(e) => handleNavClick(e, "extension")}
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            Extension
          </a>
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, "features")}
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            Features
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            GitHub
          </a>
          <hr className="border-zinc-800" />
          <div className="flex flex-col gap-4">
            {token ? (
              <>
                <Link to="/dashboard" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Dashboard
                </Link>
                <Link to="/insights" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Insights
                </Link>
                <Link to="/revision" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Revision
                </Link>
                <Link to="/mission" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Mission
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-zinc-400 hover:text-zinc-50 transition-colors cursor-pointer"
                >
                  Logout
                </button>
                <Link
                  to="/ai"
                  className="w-full text-center px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-950 font-semibold"
                >
                  AI Mentor
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-zinc-400 hover:text-zinc-50 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center px-4 py-2.5 rounded-lg bg-zinc-50 text-zinc-950 font-semibold"
                >
                  Start Learning →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;