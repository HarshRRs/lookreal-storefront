export default function ReturnRefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
        Return & Refund Policy
      </h1>
      
      <div className="prose prose-lg max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Return Eligibility</h2>
          <p className="text-gray-700 mb-3">
            We accept returns within 14 days of delivery if:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Item is unused and in original condition</li>
            <li>Original packaging and tags are intact</li>
            <li>You have proof of purchase</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Custom orders and sale items are non-returnable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Return Process</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Contact customer support to initiate a return</li>
            <li>Receive return authorization and shipping instructions</li>
            <li>Pack item securely in original packaging</li>
            <li>Ship to the provided address with tracking</li>
            <li>Refund processed within 5-7 business days of receiving return</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Refund Method</h2>
          <p className="text-gray-700">
            Refunds will be issued to the original payment method. Please allow 3-5 business days for the refund to appear in your account after processing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Exchange Policy</h2>
          <p className="text-gray-700">
            We currently do not offer direct exchanges. Please return the item for a refund and place a new order for the desired product.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Defective Items</h2>
          <p className="text-gray-700">
            If you receive a defective item, contact us within 48 hours of delivery. We'll arrange for a replacement or full refund, including return shipping costs.
          </p>
        </section>
      </div>
    </div>
  );
}
