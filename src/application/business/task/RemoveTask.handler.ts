import { ITaskRepository } from "@application/interfaces/repositories/ITask.repository";
import { IRemoveTaskHandler } from "@application/interfaces/handlers/Task.handlers";

export const removeTaskHandler = (
  taskRepositoty: ITaskRepository,
): IRemoveTaskHandler => {
  return {
    execute: async (command): Promise<void> => {
      const taskModel = await taskRepositoty.restore(command.taskId);
      const taskModelRemoved = taskModel.remove();

      taskRepositoty.saveOrUpdate(taskModelRemoved);
    },
  }
}
