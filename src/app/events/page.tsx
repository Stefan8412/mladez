import { getEvents } from "@/app/lib/firestore";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">
        Všetky udalosti
      </h1>
      <ul className="space-y-4">
        {events.map((event: any) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-purple-800">
              {event.title}
            </h2>
            <p className="text-gray-600">
              {new Date(event.date.seconds * 1000).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-gray-700">{event.website}</p>
            <Link
              href={`/events/${event.id}`}
              className="animate-pulse focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white"
            >
              Zobraziť
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
