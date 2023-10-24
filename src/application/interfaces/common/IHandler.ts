import { ICommand } from "./ICommand";

export interface IHandler<Tin extends ICommand, Tout> {
  execute(command: Tin): Promise<Tout>;
}
