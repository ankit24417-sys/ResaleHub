'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Building2,
  Lock,
  PlusCircle,
  Briefcase,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'BUYERS', href: '/buyers' },
  { label: 'SELLERS', href: '/sellers' },
  { label: 'FRANCHISORS', href: '/franchisors' },
  { label: 'CONSULTANTS', href: '/consultants' },
  { label: 'RESOURCES', href: '/resources' },
  { label: 'CONTACT', href: '/contact' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Authority Badge */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center text-emerald-400 border border-slate-800 shadow-md group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10 transition-all">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-slate-950 uppercase leading-none group-hover:text-emerald-600 transition-colors">
                RESALE<span className="text-emerald-500">HUB</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-1">
                Franchise M&A Brokerage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs font-extrabold uppercase tracking-widest transition-all duration-200 relative py-2 ${
                    active
                      ? 'text-emerald-600'
                      : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Pill / Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-full border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-white transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[120px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-emerald-600">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-black uppercase text-slate-900 tracking-wider">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 uppercase tracking-widest border border-emerald-200">
                        {user.role} Account
                      </span>
                    </div>

                    <div className="py-1">
                      {user.role === 'seller' && (
                        <>
                          <Link
                            href="/seller/offers"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                          >
                            <Briefcase className="w-4 h-4 text-emerald-500" />
                            Review Purchase Offers (LOIs)
                          </Link>
                          <Link
                            href="/seller/create"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                          >
                            <PlusCircle className="w-4 h-4 text-emerald-500" />
                            Seller Listing Studio
                          </Link>
                        </>
                      )}
                      {user.role === 'franchisor' && (
                        <Link
                          href="/franchisor/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          Franchisor Transfer Queue
                        </Link>
                      )}
                      <Link
                        href="/"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                      >
                        <Building2 className="w-4 h-4 text-slate-400" />
                        Browse Franchise Resales
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  LOGIN / CREATE ACCOUNT
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            {!isAuthenticated && (
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest bg-emerald-500 text-white"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest ${
                  isActive(item.href)
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="px-3 py-2 bg-slate-50 rounded-xl">
                  <p className="text-xs font-black text-slate-900 uppercase">{user.name}</p>
                  <p className="text-[11px] text-slate-500">{user.email}</p>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                    Role: {user.role}
                  </span>
                </div>
                {user.role === 'seller' && (
                  <div className="space-y-2">
                    <Link
                      href="/seller/offers"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider"
                    >
                      Review Purchase Offers (LOIs)
                    </Link>
                    <Link
                      href="/seller/create"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center w-full py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider"
                    >
                      + Create Blind Resale Listing
                    </Link>
                  </div>
                )}
                {user.role === 'franchisor' && (
                  <Link
                    href="/franchisor/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider"
                  >
                    Franchisor Transfer Queue
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2 text-xs font-extrabold text-rose-600 uppercase tracking-wider"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 rounded-xl bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-md"
              >
                Login / Create Account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

