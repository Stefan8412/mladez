import Link from "next/link";

type EventCardProps = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export default function EventCard({
  id,
  title,
  date,
  description,
}: EventCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {new Date(date).toLocaleDateString()}
      </p>
      <p className="text-gray-800">{description}</p>
      <Link href={`/events/${id}`}>
        <span className="text-blue-600 underline text-sm mt-2 inline-block">
          Zobraziť
        </span>
      </Link>
    </div>
  );
}
