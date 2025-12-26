'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_NAME, STORE_SLUG } from '@/lib/utils/constants';
import { useCart } from '@/lib/context/CartContext';
import { MiniCart } from './MiniCart';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${STORE_SLUG}`} className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Shop Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-accent transition-colors font-medium">
                {NAV_LINKS.shop.label}
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                  {NAV_LINKS.shop.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Collections Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-accent transition-colors font-medium">
                {NAV_LINKS.collections.label}
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                  {NAV_LINKS.collections.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Static Links */}
            <Link
              href={NAV_LINKS.about.href}
              className="text-gray-700 hover:text-accent transition-colors font-medium"
            >
              {NAV_LINKS.about.label}
            </Link>
            <Link
              href={NAV_LINKS.contact.href}
              className="text-gray-700 hover:text-accent transition-colors font-medium"
            >
              {NAV_LINKS.contact.label}
            </Link>
          </nav>

          {/* Utility Navigation */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Link
              href={`/${STORE_SLUG}/search`}
              className="p-2 text-gray-700 hover:text-accent transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <button
              className="p-2 text-gray-700 hover:text-accent transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsMiniCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-accent transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mini Cart Sidebar */}
        <MiniCart
          isOpen={isMiniCartOpen}
          onClose={() => setIsMiniCartOpen(false)}
          storeSlug={STORE_SLUG}
        />

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              {/* Shop Section */}
              <div>
                <p className="font-semibold text-gray-900 mb-2">{NAV_LINKS.shop.label}</p>
                {NAV_LINKS.shop.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 pl-4 text-gray-700 hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Collections Section */}
              <div>
                <p className="font-semibold text-gray-900 mb-2">{NAV_LINKS.collections.label}</p>
                {NAV_LINKS.collections.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 pl-4 text-gray-700 hover:text-accent transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Static Links */}
              <Link
                href={NAV_LINKS.about.href}
                className="py-2 text-gray-900 font-semibold hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {NAV_LINKS.about.label}
              </Link>
              <Link
                href={NAV_LINKS.contact.href}
                className="py-2 text-gray-900 font-semibold hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {NAV_LINKS.contact.label}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
