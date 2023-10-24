import '@crossCutting/system/Object.extends';
import {
  CreateTaskInput,
  ETaskStatus,
  RestoreTaskInput,
} from '@application/domain/Task.model';
import { faker } from '@faker-js/faker';

export const CreateTaskInputFactory = {
  generate: (input?: {
    override?: RecursivePartial<CreateTaskInput>
  }): CreateTaskInput => {
    const defaultFake: CreateTaskInput = {
      userId: faker.string.uuid(),
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future(),
    }

    if (input?.override) {
      return Object.overridePropertiesOf(input.override, defaultFake);
    }

    return defaultFake;
  }
}

export const RestoreTaskInputFactory = {
  generate: (input?: {
    override?: RecursivePartial<RestoreTaskInput>
  }): RestoreTaskInput => {
    const defaultFake: RestoreTaskInput = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      name: faker.lorem.words(2),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future(),
      createdAt: faker.date.past(),
      status: faker.helpers.arrayElement([ETaskStatus.Pending, ETaskStatus.Done, ETaskStatus.Removed]),
    }

    if (input?.override) {
      return Object.overridePropertiesOf(input.override, defaultFake);
    }

    return defaultFake;
  }
}
