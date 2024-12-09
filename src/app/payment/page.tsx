import { getAllAvailableSession } from '@/shared/actions/sessionService';
import PaymentContainer from './container/PaymentContainer';

export const dynamic = 'force-dynamic';

export default async function page() {
  const sessionData = await getAllAvailableSession();

  if (!sessionData.success || !sessionData.data) {
    throw new Error(sessionData.message);
  }

  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <PaymentContainer data={sessionData.data} />
      </main>
    </>
  );
}
