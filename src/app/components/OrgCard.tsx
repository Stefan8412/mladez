import Link from "next/link";

type OrganizationCardProps = {
  id: string;
  name: string;
  description: string;
  website: string;
};

export default function OrganizationCard({
  id,
  name,
  description,
  website,
}: OrganizationCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        webstránka
      </a>
      <div className="mt-2">
        <Link href={`/organizations/${id}`}>
          <span className="text-blue-500 underline text-sm">Zobraziť</span>
        </Link>
      </div>
    </div>
  );
}
