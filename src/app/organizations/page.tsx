"use client";
import { useEffect, useState } from "react";
import { getOrganizations } from "@/app/lib/firestore";
import Link from "next/link";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrganizations().then(setOrgs);
  }, []);

  const filteredOrgs = orgs.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6">Organizácie</h1>

      <input
        type="text"
        placeholder="Search organizations..."
        className="mb-4 p-2 border rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrgs.map((org: any) => (
          <div key={org.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{org.name}</h2>
            <p className="text-gray-700 mb-2">{org.description}</p>
            <Link
              href={`/organizations/${org.id}`}
              className="text-blue-600 underline"
            >
              Zobraziť
            </Link>
          </div>
        ))}
        {filteredOrgs.length === 0 && (
          <p className="col-span-2 text-gray-500">No organizations found.</p>
        )}
      </div>
    </main>
  );
}
