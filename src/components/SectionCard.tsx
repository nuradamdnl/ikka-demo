type SectionCardProps = {
  title: string;
  children: React.ReactNode;
  fullHeight?: boolean;
};

function SectionCard({ title, children, fullHeight = false }: SectionCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-6 ${fullHeight ? 'flex flex-col h-screen' : ''}`}>
      <h2 className={`text-xl font-semibold text-blue-900 mb-4 pb-3 border-b border-gray-200 ${fullHeight ? 'flex-shrink-0' : ''}`}>
        {title}
      </h2>
      <div className={fullHeight ? 'flex-grow overflow-hidden' : ''}>{children}</div>
    </div>
  );
}

export default SectionCard;
