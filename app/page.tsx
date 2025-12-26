import { redirect } from 'next/navigation';
import { STORE_SLUG } from '@/lib/utils/constants';

export default function RootPage() {
  redirect(`/${STORE_SLUG}`);
}
