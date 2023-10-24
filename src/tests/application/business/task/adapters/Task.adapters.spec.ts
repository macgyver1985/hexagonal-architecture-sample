import { toTaskDTO } from "@application/business/task/adapters/Task.adapters";
import { TaskDTO } from "@application/business/task/dtos/Task.dtos";
import { taskModelFactory } from "@application/domain/Task.model";
import { RestoreTaskInputFactory } from "@tests/fakeFactories/application/domain/Task.model.factory";

describe('Tests for Task adapter functions.', () => {
  describe('toTaskDTO', () => {
    it('Given a TaskModel instance, then a TaskDTO must be returned, where its attibute values must be the same as TaskModel.', () => {
      const input = RestoreTaskInputFactory.generate();
      const taskModel = taskModelFactory().restore(input);
      const expectedTaskDTO: TaskDTO = {
        id: input.id,
        name: input.name,
        description: input.description,
        duedate: input.dueDate.toISOString(),
        createdAt: input.createdAt.toISOString(),
        status: input.status,
      }

      expect(toTaskDTO(taskModel)).toMatchObject(expectedTaskDTO);
    });
  });
});