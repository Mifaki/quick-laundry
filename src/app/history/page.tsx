import { getHistory } from '@/shared/actions/historyService';
import HistoryContainer from './container/HistoryContainer';

export default async function page() {
  const data = await getHistory();
  if (!data || !data.data) {
    console.error('Invalid response from getHistory:', data);
    throw new Error('Failed to fetch history');
  }

  return (
    <>
      <main>
        <HistoryContainer data={data.data} />
      </main>
    </>
  );
}
