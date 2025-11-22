// layouts/AuthLayout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        {children}
      </div>
    </div>
  );
}
