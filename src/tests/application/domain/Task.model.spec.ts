import {
  ETaskStatus,
  taskModelFactory,
} from "@application/domain/Task.model";
import {
  CreateTaskInputFactory,
  RestoreTaskInputFactory,
} from "@tests/fakeFactories/application/domain/Task.model.factory";

describe('Tests for the TaskModel domain', () => {
  it('Given an invalid input for pending function, then some exceptions must be thrown.', () => {
    expect(() => taskModelFactory().pending(
      null
    )).toThrowError('The userId attribute must be informed.');
    expect(() => taskModelFactory().pending(CreateTaskInputFactory.generate({
      override: {
        userId: '',
        name: '',
        description: '',
        dueDate: null,
      }
    }))).toThrowError('The userId attribute must be informed.');
    expect(() => taskModelFactory().pending(CreateTaskInputFactory.generate({
      override: {
        name: '',
        description: '',
        dueDate: null,
      }
    }))).toThrowError('The name attribute must be informed.');
    expect(() => taskModelFactory().pending(CreateTaskInputFactory.generate({
      override: {
        description: '',
        dueDate: null,
      }
    }))).toThrowError('The description attribute must be informed.');
    expect(() => taskModelFactory().pending(CreateTaskInputFactory.generate({
      override: {
        dueDate: null,
      }
    }))).toThrowError('The dueDate attribute must be informed.');
  });

  it('Given an invalid input for restore function, then some exceptions must be thrown.', () => {
    expect(() => taskModelFactory().restore(
      null
    )).toThrowError('The id attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        id: '',
        userId: '',
        name: '',
        description: '',
        dueDate: null,
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The id attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        userId: '',
        name: '',
        description: '',
        dueDate: null,
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The userId attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        name: '',
        description: '',
        dueDate: null,
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The name attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        description: '',
        dueDate: null,
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The description attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        dueDate: null,
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The dueDate attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        createdAt: null,
        status: null,
      }
    }))).toThrowError('The createdAt attribute must be informed.');
    expect(() => taskModelFactory().restore(RestoreTaskInputFactory.generate({
      override: {
        status: null,
      }
    }))).toThrowError('The status attribute must be informed.');
  });

  it('Given a valid input for pending function, then a Task Model must be returned.', () => {
    const input = CreateTaskInputFactory.generate();
    const result = taskModelFactory().pending(input);

    expect(result.id()).toBeDefined();
    expect(result.userId()).toEqual(input.userId);
    expect(result.name()).toEqual(input.name);
    expect(result.description()).toEqual(input.description);
    expect(result.dueDate()).toEqual(input.dueDate);
    expect(result.createdAt()).toBeDefined();
    expect(result.status()).toEqual(ETaskStatus.Pending);
    expect(result.remove).toBeDefined();
    expect(result.done).toBeDefined();
  });

  it('Given a valid input for restore function, then a Task Model must be returned.', () => {
    const input = RestoreTaskInputFactory.generate();
    const result = taskModelFactory().restore(input);

    expect(result.id()).toEqual(input.id);
    expect(result.userId()).toEqual(input.userId);
    expect(result.name()).toEqual(input.name);
    expect(result.description()).toEqual(input.description);
    expect(result.dueDate()).toEqual(input.dueDate);
    expect(result.createdAt()).toEqual(input.createdAt);
    expect(result.status()).toEqual(input.status);
    expect(result.remove).toBeDefined();
    expect(result.done).toBeDefined();
  });

  it('Given a pending TaskModel, then when done function is called a new TaskModel must be returned has done status.', () => {
    const input = CreateTaskInputFactory.generate();
    const taskModelPending = taskModelFactory().pending(input);
    const taskModelDone = taskModelPending.done();

    expect(taskModelPending.id()).toEqual(taskModelDone.id());
    expect(taskModelPending.userId()).toEqual(taskModelDone.userId());
    expect(taskModelPending.name()).toEqual(taskModelDone.name());
    expect(taskModelPending.description()).toEqual(taskModelDone.description());
    expect(taskModelPending.dueDate()).toEqual(taskModelDone.dueDate());
    expect(taskModelPending.createdAt()).toEqual(taskModelDone.createdAt());
    expect(taskModelPending.status()).toEqual(ETaskStatus.Pending);
    expect(taskModelDone.status()).toEqual(ETaskStatus.Done);
  });

  it('Given a pending TaskModel, then when remove function is called a new TaskModel must be returned has done status.', () => {
    const input = CreateTaskInputFactory.generate();
    const taskModelPending = taskModelFactory().pending(input);
    const taskModelDone = taskModelPending.remove();

    expect(taskModelPending.id()).toEqual(taskModelDone.id());
    expect(taskModelPending.userId()).toEqual(taskModelDone.userId());
    expect(taskModelPending.name()).toEqual(taskModelDone.name());
    expect(taskModelPending.description()).toEqual(taskModelDone.description());
    expect(taskModelPending.dueDate()).toEqual(taskModelDone.dueDate());
    expect(taskModelPending.createdAt()).toEqual(taskModelDone.createdAt());
    expect(taskModelPending.status()).toEqual(ETaskStatus.Pending);
    expect(taskModelDone.status()).toEqual(ETaskStatus.Removed);
  });

  it('Given a done TaskModel, then when done function or remove function are called an exception must be thrown.', () => {
    const input = RestoreTaskInputFactory.generate({
      override: {
        status: ETaskStatus.Done,
      },
    });
    const taskModelPending = taskModelFactory().restore(input);

    expect(() => taskModelPending.done()).toThrowError('The task just be done when his status is pending.');
    expect(() => taskModelPending.remove()).toThrowError('The task just be removed when his status is pending.');
  });

  it('Given a removed TaskModel, then when done function or remove function are called an exception must be thrown.', () => {
    const input = RestoreTaskInputFactory.generate({
      override: {
        status: ETaskStatus.Removed,
      },
    });
    const taskModelRemoved = taskModelFactory().restore(input);

    expect(() => taskModelRemoved.done()).toThrowError('The task just be done when his status is pending.');
    expect(() => taskModelRemoved.remove()).toThrowError('The task just be removed when his status is pending.');
  });
});