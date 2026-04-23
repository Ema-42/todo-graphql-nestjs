import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from './dto/inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const token = this.getJwtToken(user.id);
    return { user, token };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const token = this.getJwtToken(user.id);

    return { user, token };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user.isActive) {
      throw new UnauthorizedException(
        `Usuario con id ${id} no activo, contacte al administrador.`,
      );
    }
    delete user.password;
    return user;
  }

  async revalidateToken(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken(user.id);
    return { user, token };
  }
}
