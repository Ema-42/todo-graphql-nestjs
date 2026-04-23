import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enum/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(
        'No se ha encontrado un usuario autenticado en el contexto de la petición.',
      );
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      if (roles.includes(role)) return user;
    }

    throw new ForbiddenException(
      `El usuario no tiene los permisos necesarios. Se requiere alguno de estos roles: [${roles}]`,
    );

  },
);
