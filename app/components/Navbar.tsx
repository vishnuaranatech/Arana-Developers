"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
    setOpen(false);
    alert("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* LEFT - LOGO */}
          <div className="font-light text-xl lg:text-2xl tracking-tight text-gray-900 group">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-amber-500 group-hover:w-12 transition-all duration-300" />
              <span className="group-hover:text-gray-600 transition-colors">
                Arana Developers
              </span>
            </Link>
          </div>

          {/* HAMBURGER ICON (Mobile Only) */}
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[2px] bg-gray-900 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <div className="flex gap-8 lg:gap-10 items-center">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/joint-venture">Joint Venture</NavLink>
              <NavLink href="/ecogriha">Eco Griha</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* PROFILE SECTION */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 text-sm tracking-wide text-gray-700 hover:text-amber-500 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-full border-2 border-gray-300 group-hover:border-amber-500 flex items-center justify-center transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {user && (
                  <span className="hidden lg:block font-light">
                    {user?.name?.split(" ")?.[0] || "User"}

                  </span>
                )}
              </button>

              {open && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-[1001]"
                    onClick={() => setOpen(false)}
                  />
                  
                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-3 bg-white border border-gray-200 shadow-xl min-w-[180px] z-[1002] animate-[slideDown_0.2s_ease-out]">
                    {!user ? (
                      <div className="py-2">
                        <DropdownLink href="/login" onClick={() => setOpen(false)}>
                          Login
                        </DropdownLink>
                        <DropdownLink href="/signup" onClick={() => setOpen(false)}>
                          Signup
                        </DropdownLink>
                      </div>
                    ) : (
                      <div className="py-2">
                        <button
                          onClick={() => {
                            alert(`Name: ${user.name}\nMobile: ${user.mobile}`);
                            setOpen(false);
                          }}
                          className="w-full text-left px-6 py-3 text-sm font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                          My Profile
                        </button>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={logout}
                          className="w-full text-left px-6 py-3 text-sm font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl md:hidden z-[999] animate-[slideDown_0.3s_ease-out]">
            <div className="max-w-7xl mx-auto px-6 py-8 space-y-1">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/projects" onClick={() => setMobileMenuOpen(false)}>
                Projects
              </MobileNavLink>
              <MobileNavLink href="/joint-venture" onClick={() => setMobileMenuOpen(false)}>
                Joint Venture
              </MobileNavLink>
              <MobileNavLink href="/ecogriha" onClick={() => setMobileMenuOpen(false)}>
                Eco Griha
              </MobileNavLink>
              <MobileNavLink href="/blog" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>

              <div className="border-t border-gray-200 my-4 pt-4">
                {!user ? (
                  <>
                    <MobileNavLink href="/login" onClick={() => setMobileMenuOpen(false)}>
                      Login
                    </MobileNavLink>
                    <MobileNavLink href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Signup
                    </MobileNavLink>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        alert(`Name: ${user.name}\nMobile: ${user.mobile}`);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors rounded"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors rounded"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

/* ===================== */
/* DESKTOP NAV LINK */
/* ===================== */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-sm tracking-wide text-gray-700 font-light hover:text-amber-500 transition-colors duration-300 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

/* ===================== */
/* DROPDOWN LINK */
/* ===================== */
function DropdownLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-6 py-3 text-sm font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
    >
      {children}
    </Link>
  );
}

/* ===================== */
/* MOBILE NAV LINK */
/* ===================== */
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-base font-light text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors rounded"
    >
      {children}
    </Link>
  );
}

/* ===================== */
/* ANIMATIONS */
/* ===================== */
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}



``