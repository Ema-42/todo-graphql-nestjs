import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
    @Query(() => String)
    helloWorld(): string {
        return 'Hola, Emanuel!';
    }
}
