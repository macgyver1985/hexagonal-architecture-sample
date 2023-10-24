import { ITaskRepository } from "@application/interfaces/repositories/ITask.repository";
import { taskModelFactory } from "@application/domain/Task.model";
import { toTaskDTO } from "./adapters/Task.adapters";
import { TaskDTO } from "./dtos/Task.dtos";
import { ICreateTaskHandler } from "@application/interfaces/handlers/Task.handlers";

export const createTaskHandler = (
  taskRepositoty: ITaskRepository,
): ICreateTaskHandler => {
  return {
    execute: async (command): Promise<TaskDTO> => {
      const taskModel = taskModelFactory().pending({
        userId: command.userId,
        name: command.name,
        description: command.description,
        dueDate: command.duedate,
      });

      taskRepositoty.saveOrUpdate(taskModel);

      return toTaskDTO(taskModel);
    },
  }
}
