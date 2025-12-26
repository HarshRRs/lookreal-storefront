'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { FOOTER_LINKS, SITE_NAME } from '@/lib/utils/constants';
import { Button, Input } from '@/components/ui';
import { validateEmail } from '@/lib/utils';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // TODO: Integrate with newsletter API
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-gray-300 text-sm mb-4">
              Premium quality replica luxury bags. Experience affordable luxury with mirror-quality craftsmanship.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{FOOTER_LINKS.shop.title}</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.shop.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{FOOTER_LINKS.information.title}</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.information.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{FOOTER_LINKS.policies.title}</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.policies.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-heading font-semibold text-xl mb-2">Join the LOOKREAL Circle</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get exclusive offers, early access to new arrivals, and style tips.
            </p>
            {subscribed ? (
              <p className="text-accent font-medium">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  className="flex-1 bg-white text-gray-900"
                />
                <Button type="submit" variant="primary">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm mr-2">Follow Us:</span>
            {FOOTER_LINKS.social.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
                aria-label={link.label}
              >
                {link.icon === 'instagram' && <Instagram className="w-5 h-5" />}
                {link.icon === 'facebook' && <Facebook className="w-5 h-5" />}
                {link.icon === 'pinterest' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
