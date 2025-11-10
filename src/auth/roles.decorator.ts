
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/user.types';

export const ROLES_KEY ='roles'
export function Roles(...roles: Role[]) {
   return SetMetadata(ROLES_KEY, roles)
}
