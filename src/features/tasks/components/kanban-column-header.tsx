import { Button } from "@/components/ui/button";
import { snakeCaseToTitleCase } from "@/lib/utils";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleDotDashed,
  CircleDotIcon,
  CircleIcon,
  PlusIcon,
} from "lucide-react";
import React from "react";
import { TaskStatus } from "../types";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface Props {
  board: TaskStatus;
  taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-pink-400" />
  ),
  [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
  [TaskStatus.IN_PROGRESS]: (
    <CircleDotDashed className="size-[18px] text-yellow-400" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <CircleDotIcon className="size-[18px] text-blue-400" />
  ),
  [TaskStatus.DONE]: (
    <CircleCheckIcon className="size-[18px] text-emerald-400" />
  ),
};

const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  const icon = statusIconMap[board];
  const { open } = useCreateTaskModal();

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-sm text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button variant="ghost" onClick={open} size="icon" className="size-5">
        <PlusIcon className="siz4 text-neutral-500" />
      </Button>
    </div>
  );
};

export default KanbanColumnHeader;
