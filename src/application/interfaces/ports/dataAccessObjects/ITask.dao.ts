export type TaskEntity = {
  id: string,
  userId: string,
  name: string,
  description: string,
  duedate: Date,
  createdAt: Date,
  status: String,
}

export interface ITaskDAO {
  getById(taskId: string): Promise<TaskEntity>;
  filter(where: (task: TaskEntity) => boolean): Promise<Array<TaskEntity>>;
  create(task: TaskEntity): Promise<void>;
  update(task: TaskEntity): Promise<void>;
}