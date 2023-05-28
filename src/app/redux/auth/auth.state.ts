import { UserAuthData } from 'src/app/modules/user/services/user-auth.service';

export const USER_AUTH_FEATURE_NAME = 'user-auth';

export interface UserAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string | null;
  isAuth: boolean;
  authData: UserAuthData | null;
}
