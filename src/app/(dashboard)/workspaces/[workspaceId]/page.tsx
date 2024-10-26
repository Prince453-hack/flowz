import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return <div>page</div>;
};

export default page;
