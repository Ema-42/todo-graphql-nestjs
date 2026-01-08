import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String, {
    description: 'A simple hello world query',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola, Emanuel!';
  }

  @Query(() => Float, {
    description: 'Devolver numero aleatorios',
    name: 'random',
  })
  randomNumber(): number {
    return Math.random() * 100;
  }
}
