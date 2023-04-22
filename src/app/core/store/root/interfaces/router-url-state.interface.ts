import { Params } from '@angular/router';

export interface RouterUrlState {
  url: string;
  params: Params;
  queryParams: Params;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
}
