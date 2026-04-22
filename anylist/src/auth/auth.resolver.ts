import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Query } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(@Args("signupInput") signupInput: SignupInput):Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

/*   @Mutation(() => String, { name: 'login' })
  async login(@Args('email') email: string, @Args('password') password: string):Promise<string> {
    return this.authService.login(email, password);
  }

  @Query(() => String, { name: 'revalidate' })
  async revalidateToken(@Args('token') token: string):Promise<string> {
    return this.authService.revalidateToken(token);
  } */
}
