import QRCode from '@/shared/container/qr-code/QRCode';
import { Button } from '@/shared/container/ui/button';
import { Separator } from '@/shared/container/ui/separator';
import type { IDetailOrder } from '@/shared/models/detailorderInterface';

interface IDetailModal {
  detail: IDetailOrder | null;
  onClose: () => void;
}

const DetailModal = (props: IDetailModal) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="grid h-[60%] w-[80%] grid-cols-3 gap-4 rounded-3xl bg-white p-8">
        <div className="col-span-2 space-y-4">
          <h1 className="text-3xl font-semibold">Detail Laundry</h1>
          <Separator className="my-2 h-[2px]" />
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p>Order ID</p>
              <p>Harga Total</p>
              <p>Jenis Layanan</p>
              <p>Waktu Mulai</p>
              <p>Waktu Selesai</p>
              <p>Tanggal Pencucian</p>
              <p>Nomor Mesin</p>
              <p>Nama Mesin</p>
            </div>
            <div className="col-span-2 space-y-1">
              <p>: {props.detail?.orderId}</p>
              <p>: {props.detail?.price}</p>
              <p>: Cuci Lengkap - Mesin dan Pengering</p>
              <p>: {props.detail?.sessionStart}</p>
              <p>: {props.detail?.sessionEnd}</p>
              <p>: {props.detail?.sessionDate}</p>
              <p>: {props.detail?.machineId}</p>
              <p>: {props.detail?.machineName}</p>
            </div>
            <Button onClick={props.onClose}>Close</Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <QRCode link={props.detail?.orderId ?? ''} />
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
