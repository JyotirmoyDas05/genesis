import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { IS_MOCK_MODE } from '@/config/env';

const ACCESS_COOKIE = 'genesis_access_token';

export default async function Home() {
  if (IS_MOCK_MODE) {
    redirect('/home');
  }
  const jar = await cookies();
  redirect(jar.has(ACCESS_COOKIE) ? '/home' : '/login');
}
