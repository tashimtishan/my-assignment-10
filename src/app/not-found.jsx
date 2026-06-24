import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-(--primary) mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-muted mb-8">The page you are looking for does not exist.</p>
      <Link href="/" className="px-8 py-3 bg-(--primary) hover:bg-(--primary-dark) text-white font-semibold rounded-xl transition-colors">
        Go Home
      </Link>
    </div>
  );
}