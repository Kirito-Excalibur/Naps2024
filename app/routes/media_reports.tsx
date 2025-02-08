import { Link } from "@remix-run/react";

export default function MediaReports() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center text-red-600">Media Reports</h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Stay updated with all the latest media coverage and reports.
      </p>

      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
