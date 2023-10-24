import { TaskModel } from "@application/domain/Task.model";
import { TaskDTO } from "../dtos/Task.dtos";

export const toTaskDTO = (taskModel: TaskModel): TaskDTO => {
  const taskDTO: TaskDTO = {
    id: taskModel.id(),
    name: taskModel.name(),
    description: taskModel.description(),
    duedate: taskModel.dueDate().toISOString(),
    createdAt: taskModel.createdAt().toISOString(),
    status: taskModel.status(),
  };

  return taskDTO;
}