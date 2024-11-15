import { Task, TaskStatus } from "../types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = { [key in TaskStatus]: Task[] };

interface Props {
  data: Task[];
  onChange: (
    task: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

import React, { useCallback, useEffect, useState } from "react";
import KanbanColumnHeader from "./kanban-column-header";
import KanbanCard from "./kanban-card";

const DataKanban = ({ data, onChange }: Props) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destinationStatus = destination.droppableId as TaskStatus;

      let UpdatePayload: {
        $id: string;
        status: TaskStatus;
        position: number;
      }[] = [];

      setTasks((prevTask) => {
        const newTasks = { ...prevTask };
        const sourceColumn = [...newTasks[sourceStatus]];
        const [movedTask] = sourceColumn.splice(source.index, 1);

        if (!movedTask) {
          console.error("Task not found");
          return prevTask;
        }

        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask;

        newTasks[sourceStatus] = sourceColumn;

        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destinationStatus] = destinationColumn;

        UpdatePayload = [];

        UpdatePayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              UpdatePayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPosition,
              });
            }
          }
        });

        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                UpdatePayload.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange(UpdatePayload);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
              key={board}
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    className="min-h-[200px] py-1.5"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className=""
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default DataKanban;
