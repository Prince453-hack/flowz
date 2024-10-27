import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface Props {
  params: {
    workspaceId: string;
  };
}

const page = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaceInfo = await getWorkspaceInfo({ workspaceId });

  return <div>{JSON.stringify(workspaceInfo)}</div>;
};

export default page;
