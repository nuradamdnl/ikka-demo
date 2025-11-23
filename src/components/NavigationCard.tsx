import { useNavigate } from "react-router-dom";

type NavigationCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  route: string;
};

function NavigationCard({ icon, title, subtitle, route }: NavigationCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white shadow-md">
            {icon}
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default NavigationCard;
