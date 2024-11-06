import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface Props {
  workspaceId: string;
}

export const useGetTasks = ({ workspaceId }: Props) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to get tasks");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};