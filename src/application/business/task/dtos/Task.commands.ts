import { ICommand } from "@application/interfaces/common/ICommand"

export interface CreateTaskCommand extends ICommand {
  userId: string;
  name: string;
  description: string;
  duedate: Date;
}

export interface RemoveTaskCommand extends ICommand {
  taskId: string;
}

export interface DoneTaskCommand extends ICommand {
  taskId: string;
}

export interface GetTaskCommand extends ICommand {
  userId: string;
}
