'use client';

import { Button } from '@/shared/container/ui/button';
import { Separator } from '@/shared/container/ui/separator';

interface IHistoryCard {
  nomor_mesin: number;
  tanggal_pemesanan: string;
  waktu_pemesanan: string;
  onClick: () => void;
}

const HistoryCard = ({
  nomor_mesin,
  tanggal_pemesanan,
  waktu_pemesanan,
  onClick,
}: IHistoryCard) => {
  return (
    <div className="rounded-xl border p-4">
      <h1 className="text-xl font-semibold">Mesin Cuci {nomor_mesin}</h1>
      <Separator className="my-2 h-[2px]" />
      <div className="grid grid-cols-4">
        <div className="space-y-1">
          <p>Tanggal Pemesanan</p>
          <p>Waktu Pemesanan</p>
          <p>Waktu Proses Pencucian</p>
        </div>
        <div className="col-span-2 space-y-1">
          <p>: {tanggal_pemesanan}</p>
          <p>: {waktu_pemesanan}</p>
          <p>: 1 Jam</p>
        </div>
        <div className="flex items-end justify-end">
          <Button onClick={onClick}>Detail Pemesanan</Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
