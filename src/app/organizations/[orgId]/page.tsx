import { getOrganizationById } from "@/app/lib/firestore";

export default async function OrganizationDetailPage({ params }: any) {
  const org = await getOrganizationById(params.orgId);

  if (!org) return <p className="p-4">Organization not found</p>;

  return (
    <main className=" min-h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-purple-800">{org.name}</h1>
      <p className="text-gray-700 mb-4">{org.description}</p>
      <a
        href={org.website}
        target="_blank"
        rel="noopener noreferrer"
        className="animate-pulse focus:animate-none hover:animate-none inline-flex text-md font-medium bg-indigo-900 mt-3 px-4 py-2 rounded-lg tracking-wide text-white"
      >
        web
      </a>
    </main>
  );
}
