import { USER_Role } from './user.const';

export type TUser = {
  name: string;
  email: string;
  role: keyof typeof USER_Role;
  password: string;
  phone: string;
  address: string;
};
