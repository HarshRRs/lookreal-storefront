export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
        Privacy Policy
      </h1>
      <p className="text-gray-600 mb-8">Last updated: December 26, 2025</p>
      
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Information We Collect</h2>
          <p className="text-gray-700 mb-3">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Name, email address, and shipping address</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Order history and preferences</li>
            <li>Communications with our customer service team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your questions and provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-3">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Contact Us</h2>
          <p className="text-gray-700">
            For questions about this Privacy Policy or to exercise your rights, contact us at privacy@lookreal.com
          </p>
        </section>
      </div>
    </div>
  );
}
