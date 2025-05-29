import { getEvents, Event } from "@/app/lib/firestore";

export default async function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  const events: Event[] = await getEvents();
  const event = events.find((e) => e.id === params.eventId);

  if (!event) return <p className="p-4">Event not found</p>;

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-2">
        {new Date(event.date.seconds * 1000).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">{event.description}</p>
    </main>
  );
}
