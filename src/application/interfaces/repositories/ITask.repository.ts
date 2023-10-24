import { TaskModel } from "@application/domain/Task.model";

export interface ITaskRepository {
  saveOrUpdate(task: TaskModel): Promise<void>;
  restore(taskId: string): Promise<TaskModel>;
}
