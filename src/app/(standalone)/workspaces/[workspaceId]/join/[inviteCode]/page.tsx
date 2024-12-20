import { getCurrent } from "@/features/auth/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
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

  if (!workspaceInfo) redirect("/");

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValue={workspaceInfo} />
    </div>
  );
};

export default page;
