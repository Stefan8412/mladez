import { getOrganizationById } from "@/app/lib/firestore";
import { notFound } from "next/navigation";

interface Organization {
  id: string;
  name: string;
  description: string;
  website: string;
}

interface Params {
  params: {
    orgId: string;
  };
}

export default async function OrganizationDetailPage({ params }: Params) {
  const org = await getOrganizationById(params.orgId);

  if (!org) {
    notFound(); // this shows the 404 page
  }

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
        Navšív web
      </a>
    </main>
  );
}
