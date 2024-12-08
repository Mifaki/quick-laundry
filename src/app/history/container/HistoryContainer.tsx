import { Separator } from '@/shared/container/ui/separator';
import HistoryCard from './card/HistoryCard';

const HistoryContainer = () => {
  return (
    <div className="flex flex-col gap-8 px-14 py-8">
      <div>
        <h1 className="text-3xl font-bold">Riwayat Pemesanan</h1>
      </div>
      <HistoryCard
        nomor_mesin={2}
        nama_pemesan="John Doe"
        tanggal_pemesanan="2023-08-15"
        waktu_pemesanan="10:00"
      />
    </div>
  );
};

export default HistoryContainer;
