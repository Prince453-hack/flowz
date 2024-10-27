import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettings = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId });

  if (!initialValues) redirect(`/workspace/${workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettings;
