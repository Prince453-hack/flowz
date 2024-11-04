import { getCurrent } from "@/features/auth/queries";
import { UpdateProjectForm } from "@/features/projects/components/update-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface Props {
  params: {
    projectId: string;
  };
}

const ProjectIdSettings = async ({ params: { projectId } }: Props) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId });

  return (
    <div className="w-full lg:max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectIdSettings;
