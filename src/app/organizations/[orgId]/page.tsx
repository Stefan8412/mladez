import { getOrganizationById } from "@/app/lib/firestore";

export default async function OrganizationDetailPage({ params }: any) {
  const org = await getOrganizationById(params.orgId);

  if (!org) return <p className="p-4">Organization not found</p>;

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{org.name}</h1>
      <p className="text-gray-700 mb-4">{org.description}</p>
      <a
        href={org.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Visit Website
      </a>
    </main>
  );
}
