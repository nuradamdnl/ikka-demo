type PageTitleProps = {
  children: React.ReactNode;
};

function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold text-white text-center">{children}</h1>
    </div>
  );
}

export default PageTitle;
