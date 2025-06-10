"use client";
import { useState } from "react";
import { addEvent } from "@/app/lib/firestore";
import { useRouter } from "next/navigation";
import AdminRouteGuard from "@/app/components/AdminRouteGuard";

export default function AddEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEvent({
      title,
      description,
      website,
      date: new Date(date).toISOString(),
    });
    router.push("/events");
  };

  return (
    <AdminRouteGuard>
      <main className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Názov"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="opis"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="webstránka"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="animate-pulse focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white"
          >
            Add Event
          </button>
        </form>
      </main>
    </AdminRouteGuard>
  );
}
