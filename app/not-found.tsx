import Link from 'next/link';
import { Button } from '@/components/ui';
import { STORE_SLUG } from '@/lib/utils/constants';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary">
            <Link href={`/${STORE_SLUG}`}>Go Home</Link>
          </Button>
          <Button variant="outline">
            <Link href={`/${STORE_SLUG}/products`}>Shop Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
