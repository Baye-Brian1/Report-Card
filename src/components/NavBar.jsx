import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = ({ currentSection, onSectionChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavLink = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Feature", section: "features" },
    { name: "How It Works", section: "how-it-works" },
    { name: "CTA", section: "cta" },
  ];

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      if (onSectionChange) onSectionChange(section);
    }
    setMobileOpen(false);
  };
  return (
    <nav className="fixed top-0 right-0 left-0 backdrop-blur-xl z-50 border-b border-[rgba(37,99,235,0.05)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            onClick={() => scrollToSection("hero")}
            className="cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-6 h-6 text-[#2563eb]" />
            <p className="text-[#0F172A] text-xl font-bold">
              Report<span className="text-[#2563EB]">Card</span>
            </p>
          </div>
          <div className="hidden md:flex items-center font-semibold space-x-6">
            {NavLink.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.section)}
                className={`text-sm cursor-pointer transition ${
                  currentSection === link.section
                    ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                    : "text-[#0F172A] hover:text-[#1D4ED8]"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <Link
              to="/login"
              className="bg-[#2563EB] text-white font-semibold px-8 py-2 rounded-[4px] hover:bg-[#1D4ED8] transition  transform scale-105"
            >
              Login
            </Link>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#2563EB] focus:outline-none"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-2">
            {NavLink.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.section)}
                className="block cursor-pointer w-full text-left py-3 text-black hover:text-[#1D4ED8] transition"
              >
                {link.name}
              </button>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-[#2563EB] text-white font-semibold px-8 py-2 rounded-[4px] hover:bg-[#1D4ED8] transition  transform scale-105"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
