'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Ordering & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, and Cash on Delivery (COD) for select regions.',
      },
      {
        q: 'Is it safe to order from your website?',
        a: 'Yes, absolutely. We use industry-standard SSL encryption to protect your personal and payment information.',
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'You can modify or cancel your order within 2 hours of placing it. Please contact our customer support team immediately.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 150 countries worldwide. Shipping costs and delivery times vary by location.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order ships, you will receive a tracking number via email. You can use this to track your package in real-time.',
      },
    ],
  },
  {
    category: 'Product Quality',
    questions: [
      {
        q: 'What does "Mirror Quality" mean?',
        a: 'Mirror Quality refers to our highest tier of replica bags that are virtually indistinguishable from authentic designer bags in terms of materials, craftsmanship, and details.',
      },
      {
        q: 'Are your products authentic?',
        a: 'No, our products are high-quality replicas. We clearly state that we sell replica luxury bags at affordable prices.',
      },
      {
        q: 'Do you offer quality guarantees?',
        a: 'Yes, all our products come with a quality guarantee. If you are not satisfied with the quality, we offer returns within 14 days.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 14 days of delivery if the item is unused and in original condition. Custom orders are non-returnable.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 5-7 business days after we receive your returned item. It may take an additional 3-5 days for the refund to appear in your account.',
      },
      {
        q: 'Who pays for return shipping?',
        a: 'For defective items, we cover return shipping. For other returns, the customer is responsible for return shipping costs.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 mb-12 text-lg">
        Find answers to common questions about shopping at LOOKREAL.
      </p>

      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-2xl font-heading font-semibold text-primary mb-4">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const key = `${categoryIndex}-${questionIndex}`;
                const isOpen = openIndex === key;

                return (
                  <div
                    key={questionIndex}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4',
                          isOpen && 'transform rotate-180'
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 pt-2">
                        <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-accent/10 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
        <p className="text-gray-700 mb-4">
          Can't find the answer you're looking for? Our customer support team is here to help.
        </p>
        <a
          href="/duplicategags/contact"
          className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-600 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
