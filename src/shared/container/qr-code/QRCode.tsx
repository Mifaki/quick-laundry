const QRCode = ({ link }: { link: string }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`}
        alt="QR Code"
        className="w-52"
      />
    </div>
  );
};

export default QRCode;
