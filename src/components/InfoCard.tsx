import Button from "./Button";

type InfoCardProps = {
  image: string; // image URL or import
  title: string;
  subtitle: string;
  onButtonClick?: () => void;
  buttonText?: string;
};

function InfoCard({ image, title, subtitle, onButtonClick, buttonText = "Lihat" }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56 bg-white flex items-center justify-center p-8">
        <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
        <Button 
          variant="primary" 
          size="sm" 
          fullWidth 
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default InfoCard;
