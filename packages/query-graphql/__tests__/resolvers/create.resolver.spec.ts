// eslint-disable-next-line max-classes-per-file
import 'reflect-metadata';
import { ID, ObjectType } from 'type-graphql';
import * as nestGraphql from '@nestjs/graphql';
import { instance, mock, when, objectContaining } from 'ts-mockito';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { QueryService, DeepPartial } from '@nestjs-query/core';
import { IsString } from 'class-validator';
import * as decorators from '../../src/decorators';
import { AdvancedOptions, ReturnTypeFuncValue } from '../../src/external/type-graphql.types';
import { CreateManyArgsType, CreateOneArgsType, CreateResolver, Creatable } from '../../src';
import * as types from '../../src/types';

@ObjectType('CreateResolverDTO')
class TestResolverDTO {
  @decorators.FilterableField(() => ID)
  @IsString()
  id!: string;

  @decorators.FilterableField()
  stringField!: string;
}

class FakeCanActivate implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(context: ExecutionContext): boolean {
    return false;
  }
}
describe('CreateResolver', () => {
  const resolverMutationSpy = jest.spyOn(decorators, 'ResolverMutation');
  const createOneArgsTypeSpy = jest.spyOn(types, 'CreateOneArgsType');
  const createManyArgsTypeSpy = jest.spyOn(types, 'CreateManyArgsType');
  const argsSpy = jest.spyOn(nestGraphql, 'Args');

  beforeEach(() => jest.clearAllMocks());

  class TestResolver extends CreateResolver<TestResolverDTO>(TestResolverDTO) {
    constructor(service: QueryService<TestResolverDTO>) {
      super(service);
    }
  }

  function assertResolverMutationCall(
    callNo: number,
    returnType: ReturnTypeFuncValue,
    advancedOpts: AdvancedOptions,
    ...opts: decorators.ResolverMethodOptions[]
  ) {
    const [rt, ao, ...rest] = resolverMutationSpy.mock.calls[callNo]!;
    expect(rt()).toEqual(returnType);
    expect(ao).toEqual(advancedOpts);
    expect(rest).toEqual(opts);
  }

  it('should use the dtoName if provided', () => {
    const CreateOneArgs = CreateOneArgsType(TestResolverDTO);
    jest.clearAllMocks(); // reset
    CreateResolver(TestResolverDTO, { dtoName: 'Test', CreateOneArgs });

    expect(createOneArgsTypeSpy).not.toBeCalled();
    expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

    expect(resolverMutationSpy).toBeCalledTimes(2);
    assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneTest' }, {});
    assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyTests' }, {});
    expect(argsSpy).toBeCalledWith();
    expect(argsSpy).toBeCalledTimes(2);
  });

  it('should use the class name if name not found in object metadata', () => {
    class UnnamedTestResolverDTO {
      @decorators.FilterableField(() => ID)
      id!: string;
    }
    CreateResolver(UnnamedTestResolverDTO);

    expect(createOneArgsTypeSpy).toBeCalledWith(UnnamedTestResolverDTO);
    expect(createManyArgsTypeSpy).toBeCalledWith(UnnamedTestResolverDTO);

    expect(resolverMutationSpy).toBeCalledTimes(2);
    assertResolverMutationCall(0, UnnamedTestResolverDTO, { name: 'createOneUnnamedTestResolverDTO' }, {});
    assertResolverMutationCall(1, [UnnamedTestResolverDTO], { name: 'createManyUnnamedTestResolverDTOS' }, {});
    expect(argsSpy).toBeCalledWith();
    expect(argsSpy).toBeCalledTimes(2);
  });

  describe('#createOne', () => {
    it('should not create a new type if the CreateOneArgs is supplied', () => {
      const CreateOneArgs = CreateOneArgsType(TestResolverDTO);
      jest.clearAllMocks(); // reset
      CreateResolver(TestResolverDTO, { CreateOneArgs });

      expect(createOneArgsTypeSpy).not.toBeCalled();
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should provide the createOneOpts to the ResolverMethod decorator', () => {
      const createOneOpts: decorators.ResolverMethodOptions = {
        disabled: false,
        filters: [],
        guards: [FakeCanActivate],
        interceptors: [],
        pipes: [],
      };
      CreateResolver(TestResolverDTO, { createOne: createOneOpts });
      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, createOneOpts);
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should call the service createOne with the provided input', async () => {
      const mockService = mock<QueryService<TestResolverDTO>>();
      const args: CreateOneArgsType<TestResolverDTO, DeepPartial<TestResolverDTO>> = {
        input: {
          stringField: 'foo',
        },
      };
      const output: TestResolverDTO = {
        id: 'id-1',
        stringField: 'foo',
      };
      const resolver = new TestResolver(instance(mockService));
      when(mockService.createOne(objectContaining({ item: args.input }))).thenResolve(output);
      const result = await resolver.createOne(args);
      return expect(result).toEqual(output);
    });
  });

  describe('#createMany', () => {
    it('should not create a new type if the CreateManyArgs is supplied', () => {
      const CreateManyArgs = CreateManyArgsType(TestResolverDTO);
      jest.clearAllMocks(); // reset
      CreateResolver(TestResolverDTO, { CreateManyArgs });

      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).not.toBeCalled();

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should provide the createMany options to the createMany ResolverMethod decorator', () => {
      const createManyOpts: decorators.ResolverMethodOptions = {
        disabled: false,
        filters: [],
        guards: [FakeCanActivate],
        interceptors: [],
        pipes: [],
      };
      CreateResolver(TestResolverDTO, { createMany: createManyOpts });
      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, createManyOpts);
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should call the service createMany with the provided input', async () => {
      const mockService = mock<QueryService<TestResolverDTO>>();
      const args: CreateManyArgsType<TestResolverDTO, Partial<TestResolverDTO>> = {
        input: [
          {
            stringField: 'foo',
          },
        ],
      };
      const output: TestResolverDTO[] = [
        {
          id: 'id-1',
          stringField: 'foo',
        },
      ];
      const resolver = new TestResolver(instance(mockService));
      when(mockService.createMany(objectContaining({ items: args.input }))).thenResolve(output);
      const result = await resolver.createMany(args);
      return expect(result).toEqual(output);
    });
  });
});

describe('Creatable', () => {
  const resolverMutationSpy = jest.spyOn(decorators, 'ResolverMutation');
  const createOneArgsTypeSpy = jest.spyOn(types, 'CreateOneArgsType');
  const createManyArgsTypeSpy = jest.spyOn(types, 'CreateManyArgsType');
  const argsSpy = jest.spyOn(nestGraphql, 'Args');

  beforeEach(() => jest.clearAllMocks());

  class BaseResolver {
    constructor(readonly service: QueryService<TestResolverDTO>) {}
  }

  function assertResolverMutationCall(
    callNo: number,
    returnType: ReturnTypeFuncValue,
    advancedOpts: AdvancedOptions,
    ...opts: decorators.ResolverMethodOptions[]
  ) {
    const [rt, ao, ...rest] = resolverMutationSpy.mock.calls[callNo]!;
    expect(rt()).toEqual(returnType);
    expect(ao).toEqual(advancedOpts);
    expect(rest).toEqual(opts);
  }

  it('should use the dtoName if provided', () => {
    const CreateOneArgs = CreateOneArgsType(TestResolverDTO);
    jest.clearAllMocks(); // reset
    Creatable(TestResolverDTO, { dtoName: 'Test', CreateOneArgs })(BaseResolver);

    expect(createOneArgsTypeSpy).not.toBeCalled();
    expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

    expect(resolverMutationSpy).toBeCalledTimes(2);
    assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneTest' }, {});
    assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyTests' }, {});
    expect(argsSpy).toBeCalledWith();
    expect(argsSpy).toBeCalledTimes(2);
  });

  it('should use the class name if name not found in object metadata', () => {
    class UnnamedTestResolverDTO {
      @decorators.FilterableField(() => ID)
      id!: string;
    }
    Creatable(UnnamedTestResolverDTO)(BaseResolver);

    expect(createOneArgsTypeSpy).toBeCalledWith(UnnamedTestResolverDTO);
    expect(createManyArgsTypeSpy).toBeCalledWith(UnnamedTestResolverDTO);

    expect(resolverMutationSpy).toBeCalledTimes(2);
    assertResolverMutationCall(0, UnnamedTestResolverDTO, { name: 'createOneUnnamedTestResolverDTO' }, {});
    assertResolverMutationCall(1, [UnnamedTestResolverDTO], { name: 'createManyUnnamedTestResolverDTOS' }, {});
    expect(argsSpy).toBeCalledWith();
    expect(argsSpy).toBeCalledTimes(2);
  });

  describe('#createOne', () => {
    it('should not create a new type if the CreateOneArgs is supplied', () => {
      const CreateOneArgs = CreateOneArgsType(TestResolverDTO);
      jest.clearAllMocks(); // reset
      Creatable(TestResolverDTO, { CreateOneArgs })(BaseResolver);

      expect(createOneArgsTypeSpy).not.toBeCalled();
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should provide the createOneOpts to the ResolverMethod decorator', () => {
      const createOneOpts: decorators.ResolverMethodOptions = {
        disabled: false,
        filters: [],
        guards: [FakeCanActivate],
        interceptors: [],
        pipes: [],
      };
      Creatable(TestResolverDTO, { createOne: createOneOpts })(BaseResolver);
      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, createOneOpts);
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should call the service createOne with the provided input', async () => {
      const mockService = mock<QueryService<TestResolverDTO>>();
      const args: CreateOneArgsType<TestResolverDTO, DeepPartial<TestResolverDTO>> = {
        input: {
          stringField: 'foo',
        },
      };
      const output: TestResolverDTO = {
        id: 'id-1',
        stringField: 'foo',
      };
      const resolver = new (Creatable(TestResolverDTO)(BaseResolver))(instance(mockService));
      when(mockService.createOne(objectContaining({ item: args.input }))).thenResolve(output);
      const result = await resolver.createOne(args);
      return expect(result).toEqual(output);
    });
  });

  describe('#createMany', () => {
    it('should not create a new type if the CreateManyArgs is supplied', () => {
      const CreateManyArgs = CreateManyArgsType(TestResolverDTO);
      jest.clearAllMocks(); // reset
      Creatable(TestResolverDTO, { CreateManyArgs })(BaseResolver);

      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).not.toBeCalled();

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, {});
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should provide the createMany options to the createMany ResolverMethod decorator', () => {
      const createManyOpts: decorators.ResolverMethodOptions = {
        disabled: false,
        filters: [],
        guards: [FakeCanActivate],
        interceptors: [],
        pipes: [],
      };
      Creatable(TestResolverDTO, { createMany: createManyOpts })(BaseResolver);
      expect(createOneArgsTypeSpy).toBeCalledWith(TestResolverDTO);
      expect(createManyArgsTypeSpy).toBeCalledWith(TestResolverDTO);

      expect(resolverMutationSpy).toBeCalledTimes(2);
      assertResolverMutationCall(0, TestResolverDTO, { name: 'createOneCreateResolverDTO' }, {});
      assertResolverMutationCall(1, [TestResolverDTO], { name: 'createManyCreateResolverDTOS' }, createManyOpts);
      expect(argsSpy).toBeCalledWith();
      expect(argsSpy).toBeCalledTimes(2);
    });

    it('should call the service createMany with the provided input', async () => {
      const mockService = mock<QueryService<TestResolverDTO>>();
      const args: CreateManyArgsType<TestResolverDTO, Partial<TestResolverDTO>> = {
        input: [
          {
            stringField: 'foo',
          },
        ],
      };
      const output: TestResolverDTO[] = [
        {
          id: 'id-1',
          stringField: 'foo',
        },
      ];
      const resolver = new (Creatable(TestResolverDTO)(BaseResolver))(instance(mockService));
      when(mockService.createMany(objectContaining({ items: args.input }))).thenResolve(output);
      const result = await resolver.createMany(args);
      return expect(result).toEqual(output);
    });
  });
});