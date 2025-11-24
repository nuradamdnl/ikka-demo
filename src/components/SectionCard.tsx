type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-4 pb-3 border-b border-gray-200">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default SectionCard;
