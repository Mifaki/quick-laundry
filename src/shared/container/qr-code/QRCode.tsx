import Image from "next/image";

const QRCode = ({ link }: { link: string }) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`}
        alt="QR Code"
        width={225}
        height={225}
      />
    </div>
  );
};

export default QRCode;
