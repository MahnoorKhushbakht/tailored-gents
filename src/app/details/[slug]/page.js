import { getUserFromSession } from "@/lib/auth";
import DetailsData from "@/components/DetailsData";

export default async function DetailsPage({ params }) {
  const user = await getUserFromSession(); // ✅ allowed here
  return <DetailsData params={params} user={user} />;
}
