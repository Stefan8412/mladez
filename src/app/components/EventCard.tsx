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
      <h3 className="text-xl font-semibold text-purple-800">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">
        {new Date(date).toLocaleDateString()}
      </p>
      <p className="text-gray-800">{description}</p>
      <Link href={`/events/${id}`}>
        <span className="animate-pulse focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white">
          Zobraziť
        </span>
      </Link>
    </div>
  );
}
