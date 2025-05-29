import { getEventById, Event } from "@/app/lib/firestore";

type PageProps = {
  params: { eventId: string };
};

export default async function EventDetailPage({ params }: PageProps) {
  const event: Event | null = await getEventById(params.eventId);

  if (!event) return <p className="p-4">Event not found</p>;

  const eventDate =
    event.date instanceof Date
      ? event.date
      : new Date(event.date.seconds * 1000);

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-700 mb-2">{eventDate.toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4">{event.description}</p>
    </main>
  );
}
