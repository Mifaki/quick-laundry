import { getHistory } from '@/shared/actions/historyService';
import HistoryContainer from './container/HistoryContainer';

export default async function page() {
  let data;

  try {
    data = await getHistory();
  } catch (error) {
    console.error('Failed to fetch history data:', error);
    return (
      <main>
        <p>Unable to load history. Please try again later.</p>
      </main>
    );
  }

  return (
    <>
      <main>
        <HistoryContainer data={data} />
      </main>
    </>
  );
}
