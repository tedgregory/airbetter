import { Gender } from '../common/common.models';

export interface UserState {
  email: string;
  name: {
    first: string;
    last: string;
  };
  gender: Gender | null;
  phone: {
    code: string;
    number: string;
  };
  country: string | null;
}
