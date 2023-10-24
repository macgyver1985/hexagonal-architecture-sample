import {
  ETaskStatus,
  TaskModel,
  taskModelFactory,
} from "@application/domain/Task.model"
import { ITaskRepository } from "@application/interfaces/repositories/ITask.repository";
import { ITaskDAO } from "@application/interfaces/ports/dataAccessObjects/ITask.dao"

export const taskRepositoty = (
  taskDAO: ITaskDAO,
): ITaskRepository => {
  return {
    saveOrUpdate: async (task: TaskModel): Promise<void> => {
      await taskDAO.create({
        id: task.id(),
        name: task.name(),
        description: task.description(),
        duedate: task.dueDate(),
        createdAt: task.createdAt(),
        status: task.status(),
        userId: task.userId(),
      });
    },
    restore: async (taskId: string): Promise<TaskModel> => {
      const taskEntity = await taskDAO.getById(taskId);

      return taskModelFactory().restore({
        id: taskEntity.id,
        name: taskEntity.name,
        description: taskEntity.description,
        dueDate: taskEntity.duedate,
        createdAt: taskEntity.createdAt,
        status: taskEntity.status as ETaskStatus,
        userId: taskEntity.userId,
      });
    },
  }
}
