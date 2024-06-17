import { UserRole } from '@/users/interface/user';

/**
 * То, что записываем в токен
 */
export interface AuthDataJwtPayload {
  id: number;
  role: UserRole;
  login: string;
}
