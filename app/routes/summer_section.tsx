import { Link } from "@remix-run/react";

export default function SummerSection() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-red-600">Summer Section</h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Discover exciting summer editions, insights, and highlights.
      </p>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
