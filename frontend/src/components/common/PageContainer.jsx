// common/PageContainer.jsx
export default function PageContainer({ title, children }) {
  return (
    <div className="p-6 w-full">
      {title && (
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          {title}
        </h2>
      )}

      <div className="bg-white rounded-xl shadow p-6">
        {children}
      </div>
    </div>
  );
}
