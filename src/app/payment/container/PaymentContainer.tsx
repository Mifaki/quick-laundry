import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/shared/container/ui/scroll-area';
import { Separator } from '@/shared/container/ui/separator';
import PaymentForm from '../payment-form/PaymentForm';

const PaymentContainer = () => {
  return (
    <div className="relative grid min-h-screen w-full grid-cols-3 gap-10 px-14 py-8">
      <div className="col-span-2 h-full w-full">
        <h1 className="text-3xl font-bold">Pemesanan Laundry</h1>
        <div className="mt-4">
          <PaymentForm />
        </div>
      </div>
      <aside className="sticky top-10 h-fit w-full rounded-md px-4 py-6 shadow-sm">
        <h2 className="mb-4 mt-10 text-xl font-semibold">Ringkasan Pemesanan</h2>
        {/* Welcoming Image */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4">
            <Image
              src={'/image/order-summary-1.png'}
              alt={'Order Summary 1'}
              className="aspect-square object-cover"
              width={180}
              height={180}
              draggable={false}
            />
            <Image
              src={'/image/order-summary-2.png'}
              alt={'Order Summary 2'}
              className="aspect-square object-cover"
              width={180}
              height={180}
              draggable={false}
            />
            <Image
              src={'/image/order-summary-3.png'}
              alt={'Order Summary 3'}
              className="aspect-square object-cover"
              width={180}
              height={180}
              draggable={false}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Order Details */}
        <h3 className="mb-1 mt-6 text-2xl font-semibold">Mesin Laundry 1</h3>
        <p className="text-sm text-gray-400">6 Desember 2024 | 16:00 - 18:00</p>

        <div className="mt-10 flex items-center justify-between">
          <p className="text-gray-400">Biaya Pemesanan</p>
          <p>Rp. 20.000,00</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-gray-400">Biaya Layanan</p>
          <p>Rp. 3.000,00</p>
        </div>

        <Separator className="my-6" />

        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold">Total</p>
          <p>Rp. 23.000,00</p>
        </div>
      </aside>
    </div>
  );
};

export default PaymentContainer;
