import { getEventById } from "@/app/lib/firestore";

export default async function EventDetailPage({ params }: any) {
  const event = await getEventById(params.eventId);

  if (!event) {
    return <p className="p-4">žiadna udalosť</p>;
  }

  const date =
    event.date instanceof Date
      ? event.date
      : new Date(event.date.seconds * 1000);

  return (
    <main className=" min-h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">{event.title}</h1>
      <p className="text-gray-700 mb-2">{date.toLocaleDateString()}</p>
      <p className="text-gray-700 mb-4">{event.description}</p>
    </main>
  );
}
