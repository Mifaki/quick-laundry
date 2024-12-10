'use client';

import { useState } from 'react';
import { getHistory } from '@/shared/actions/historyService';
import { IDetailOrder } from '@/shared/models/detailorderInterface';
import { formatDate } from '@/shared/usecase/formatDate';
import HistoryCard from './card/HistoryCard';
import DetailModal from './detail-modal/DetailModal';

const HistoryContainer = ({ data }: { data: IDetailOrder[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<IDetailOrder | null>(null);

  const modalHandler = (isOpen: boolean, detail?: IDetailOrder | null) => {
    setIsOpen(isOpen);
    setSelectedData(isOpen ? detail || null : null);
  };

  try {
    return (
      <div className="flex flex-col gap-8 px-14 py-8">
        <div>
          <h1 className="text-3xl font-bold">Riwayat Pemesanan</h1>
        </div>
        <div className="flex flex-col gap-4">
          {data && data.length > 0 ? (
            data.map((item: any, index: number) => {
              const date = formatDate(item.sessionDate);
              return (
                <div key={index}>
                  <HistoryCard
                    nomor_mesin={item.machineId}
                    tanggal_pemesanan={date}
                    waktu_pemesanan={item.sessionStart}
                    onClick={() => modalHandler(true, item)}
                  />
                </div>
              );
            })
          ) : (
            <p>Tidak ada riwayat pemesanan.</p>
          )}
        </div>
        {isOpen && (
          <DetailModal
            detail={selectedData}
            onClose={() => modalHandler(false)}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching history:', error);
    return (
      <div className="flex flex-col gap-8 px-14 py-8">
        <div>
          <h1 className="text-3xl font-bold">Riwayat Pemesanan</h1>
        </div>
        <p>Gagal memuat riwayat pemesanan. Silakan coba lagi nanti.</p>
      </div>
    );
  }
};

export default HistoryContainer;
