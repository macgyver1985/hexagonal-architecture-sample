import { randomUUID } from "crypto";

export interface CreateTaskInput {
  userId: string;
  name: string;
  description: string;
  dueDate: Date;
}

export interface RestoreTaskInput extends CreateTaskInput {
  id: string;
  createdAt: Date;
  status: ETaskStatus;
}

export enum ETaskStatus {
  Pending = 'P',
  Done = 'D',
  Removed = 'R',
}

export type TaskModel = {
  id: () => string,
  userId: () => string,
  name: () => string,
  description: () => string,
  dueDate: () => Date,
  createdAt: () => Date,
  status: () => ETaskStatus,
  remove: () => TaskModel,
  done: () => TaskModel,
}

const taskModelConstructor = (
  input: RestoreTaskInput
): TaskModel => {
  if (!input?.id) {
    throw new Error('The id attribute must be informed.');
  }

  if (!input?.userId) {
    throw new Error('The userId attribute must be informed.');
  }

  if (!input?.name) {
    throw new Error('The name attribute must be informed.');
  }

  if (!input?.description) {
    throw new Error('The description attribute must be informed.');
  }

  if (!input?.dueDate) {
    throw new Error('The dueDate attribute must be informed.');
  }

  if (!input?.createdAt) {
    throw new Error('The createdAt attribute must be informed.');
  }

  if (!input?.status) {
    throw new Error('The status attribute must be informed.');
  }

  const taskModel: TaskModel = {
    id: () => (input.id),
    userId: () => (input.userId),
    name: () => (input.name),
    description: () => (input.description),
    dueDate: () => (input.dueDate),
    createdAt: () => (input.createdAt),
    status: () => (input.status),
    remove: () => {
      if (taskModel.status() !== ETaskStatus.Pending) {
        throw new Error('The task just be removed when his status is pending.');
      }

      return taskModelConstructor({
        id: taskModel.id(),
        userId: taskModel.userId(),
        name: taskModel.name(),
        description: taskModel.description(),
        dueDate: taskModel.dueDate(),
        createdAt: taskModel.createdAt(),
        status: ETaskStatus.Removed,
      });
    },
    done: () => {
      if (taskModel.status() !== ETaskStatus.Pending) {
        throw new Error('The task just be done when his status is pending.');
      }

      return taskModelConstructor({
        id: taskModel.id(),
        userId: taskModel.userId(),
        name: taskModel.name(),
        description: taskModel.description(),
        dueDate: taskModel.dueDate(),
        createdAt: taskModel.createdAt(),
        status: ETaskStatus.Done,
      });
    }
  }

  return taskModel;
};

export const taskModelFactory = () => {
  return {
    pending: (input: CreateTaskInput): TaskModel => (taskModelConstructor({
      id: randomUUID(),
      userId: input?.userId,
      name: input?.name,
      description: input?.description,
      dueDate: input?.dueDate,
      createdAt: new Date(),
      status: ETaskStatus.Pending,
    })),
    restore: (input: RestoreTaskInput): TaskModel => (taskModelConstructor({
      id: input?.id,
      userId: input?.userId,
      name: input?.name,
      description: input?.description,
      dueDate: input?.dueDate,
      createdAt: input?.createdAt,
      status: input?.status,
    })),
  }
}
