export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
        About LOOKREAL
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            LOOKREAL was founded with a simple mission: to make luxury accessible to everyone. We believe 
            that style shouldn't come with an astronomical price tag, and quality shouldn't be compromised 
            for affordability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our team of experts carefully selects and curates the finest replica luxury bags, ensuring 
            that every piece meets our stringent quality standards. With mirror-quality craftsmanship and 
            attention to detail, our products offer the luxury experience you deserve.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Quality Commitment</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Each bag in our collection undergoes rigorous quality control. We work with skilled artisans 
            who use premium materials and techniques to create products that are virtually indistinguishable 
            from the originals.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Premium leather and hardware</li>
            <li>Precise stitching and craftsmanship</li>
            <li>Authentic packaging and details</li>
            <li>Quality guarantee on all products</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-heading font-semibold text-primary mb-4">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Affordable Luxury</h3>
              <p className="text-gray-700">Save up to 90% compared to authentic luxury bags without compromising on style or quality.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Worldwide Shipping</h3>
              <p className="text-gray-700">Fast, secure delivery to customers around the globe with full tracking and insurance.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
              <p className="text-gray-700">Thousands of happy customers trust us for their luxury replica needs.</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Secure Shopping</h3>
              <p className="text-gray-700">Safe and secure checkout with multiple payment options for your convenience.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
