"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import TaskBreadCrumbs from "@/features/tasks/components/task-bread-crumbs";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";
import React from "react";

const TaskIdClient = () => {
  const taskId = useTaskId();
  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) return <PageLoader />;

  if (!data) return <PageError message="Task Not Found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={data.project} task={data} />
    </div>
  );
};

export default TaskIdClient;
