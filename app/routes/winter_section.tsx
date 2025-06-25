import { Link } from "@remix-run/react";

export default function WinterSection() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center text-blue-600">Winter Section</h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Explore the latest winter editions, events ,stories.
      </p>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
