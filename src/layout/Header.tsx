import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, MEGA_MENU_ITEMS, COMPANY_INFO } from "@/constants";
import { ROUTE_PATHS } from "@/routes/index";
import { Button } from "@/components/ui/button";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(
    null
  );
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = () => {
      setActiveMegaMenu(null);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMegaMenuEnter = (title: string) => {
    setActiveMegaMenu(title);
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  const isActiveLink = (href: string) => {
    if (href === ROUTE_PATHS.HOME) {
      return location.pathname === ROUTE_PATHS.HOME;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-subtle backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            to={ROUTE_PATHS.HOME}
            className="flex items-center flex-shrink-0"
          >
            <span className="font-space text-2xl font-bold bg-gradient-to-r from-midnight-900 to-mint-600 bg-clip-text text-transparent">
              {COMPANY_INFO.name}
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const hasMegaMenu = MEGA_MENU_ITEMS.some(
                  (menu) => menu.title === item.label
                );
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() =>
                      hasMegaMenu && handleMegaMenuEnter(item.label)
                    }
                    onMouseLeave={handleMegaMenuLeave}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                        isActiveLink(item.href)
                          ? "text-mint-600 bg-mint-50"
                          : "text-midnight-800 hover:text-mint-600"
                      }`}
                    >
                      {item.label}
                      {hasMegaMenu && <ChevronDown size={16} />}
                    </Link>
                    {/* Mega Menu */}
                    <AnimatePresence>
                      {hasMegaMenu && activeMegaMenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 bg-white border border-midnight-100 rounded-lg shadow-xl z-50"
                          style={{
                            width: "600px",
                            maxWidth: "90vw",
                          }}
                        >
                          <div className="grid grid-cols-2 gap-4 p-4 justify-items-center">
                            {MEGA_MENU_ITEMS.find(
                              (menu) => menu.title === item.label
                            )?.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="group p-3 rounded-lg hover:bg-midnight-50 transition-colors text-center w-full"
                                onClick={() => setActiveMegaMenu(null)}
                              >
                                <h3 className="font-semibold text-midnight-900 group-hover:text-mint-600 transition-colors text-sm">
                                  {subItem.label}
                                </h3>
                                <p className="text-xs text-midnight-600 mt-1">
                                  {subItem.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <Button variant="ghost" asChild size="sm">
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/auth/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-midnight-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-midnight-100"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  const hasMegaMenu = MEGA_MENU_ITEMS.some(
                    (menu) => menu.title === item.label
                  );
                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.href}
                          className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors ${
                            isActiveLink(item.href)
                              ? "text-mint-600 bg-mint-50"
                              : "text-midnight-800 hover:text-mint-600"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        {hasMegaMenu && (
                          <button
                            onClick={() =>
                              setMobileSubmenuOpen(
                                mobileSubmenuOpen === item.label
                                  ? null
                                  : item.label
                              )
                            }
                            className="p-2 text-midnight-600 hover:text-mint-600 transition-colors"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform ${
                                mobileSubmenuOpen === item.label
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {hasMegaMenu && mobileSubmenuOpen === item.label && (
                        <div className="mt-2 ml-4 space-y-2">
                          {MEGA_MENU_ITEMS.find(
                            (menu) => menu.title === item.label
                          )?.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className="block py-2 px-3 text-sm text-midnight-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" asChild className="w-full">
                    <Link to="/auth/login">Login</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth/register">Get Started</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
