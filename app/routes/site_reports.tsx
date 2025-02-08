import { Link } from "@remix-run/react";

export default function SiteReports() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center text-red-600">Site Reports</h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Explore our latest site reports and updates.
      </p>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
