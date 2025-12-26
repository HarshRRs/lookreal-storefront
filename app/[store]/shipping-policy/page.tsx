export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
        Shipping Policy
      </h1>
      
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Processing Time</h2>
          <p className="text-gray-700">
            Orders are processed within 1-2 business days. You will receive an email confirmation once your order has been shipped with tracking information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Shipping Methods & Times</h2>
          <div className="bg-secondary p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Standard Shipping (5-7 Business Days) - $9.99</h3>
              <p className="text-gray-700 text-sm">Most economical option for regular deliveries.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Express Shipping (2-3 Business Days) - $19.99</h3>
              <p className="text-gray-700 text-sm">Faster delivery for urgent orders.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Overnight Shipping (1 Business Day) - $29.99</h3>
              <p className="text-gray-700 text-sm">Next business day delivery for select locations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">International Shipping</h2>
          <p className="text-gray-700 mb-4">
            We ship to over 150 countries worldwide. International shipping times vary by destination (typically 7-21 business days). 
            Customs fees and import duties may apply and are the responsibility of the customer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Order Tracking</h2>
          <p className="text-gray-700">
            Once your order ships, you'll receive a tracking number via email. Track your package in real-time using the carrier's website.
          </p>
        </section>
      </div>
    </div>
  );
}
