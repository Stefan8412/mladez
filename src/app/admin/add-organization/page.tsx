"use client";
import { useState } from "react";
import { addOrganization } from "@/app/lib/firestore";
import { useRouter } from "next/navigation";
import AdminRouteGuard from "@/app/components/AdminRouteGuard";

export default function AddOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOrganization({ name, description, website });
    router.push("/organizations");
  };

  return (
    <AdminRouteGuard>
      <main className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Organization</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Organization Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Organization
          </button>
        </form>
      </main>
    </AdminRouteGuard>
  );
}
