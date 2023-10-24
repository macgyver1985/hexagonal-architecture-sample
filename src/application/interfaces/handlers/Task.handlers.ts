import { CreateTaskCommand, RemoveTaskCommand } from "@application/business/task/dtos/Task.commands";
import { IHandler } from "../common/IHandler";
import { TaskDTO } from "@application/business/task/dtos/Task.dtos";

export interface ICreateTaskHandler extends IHandler<CreateTaskCommand, TaskDTO> { }

export interface IRemoveTaskHandler extends IHandler<RemoveTaskCommand, void> { }
