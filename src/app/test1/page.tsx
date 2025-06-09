'use server';

import { fetchMockTest, resetMockTest } from '@/modules/api';
import Test1 from './_test1';

export default async function Page() {
  const mockPromises = await Promise.all([
    new Promise((resolve) => setTimeout(resolve, 1000)),
    new Promise((resolve) => setTimeout(resolve, 1000)),
    new Promise((resolve) => setTimeout(resolve, 1000)),
    await fetchMockTest(),
  ]);
  console.log('', mockPromises[3]?.data?.length);
  return <Test1 mockPromises={mockPromises[3].data} />;
}
