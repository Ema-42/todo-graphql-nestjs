import { TodoService } from './todo.service';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    description: 'Devolver todos los todo',
    name: 'todos',
  })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, {
    description: 'Devolver un todo por su ID',
    name: 'todoById',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo | null {
    return this.todoService.findOne(id);
  }
  createTodo() {
    return null;
  }
  updatedTodo() {
    return null;
  }
  deleteTodo() {
    return false;
  }
}
