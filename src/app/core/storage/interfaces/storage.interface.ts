import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AsyncStorage {
  readonly storage: Storage;

  getItem<T>(key: string): Observable<T>;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export const STORAGE_KEY = 'AIRWAYS_LOCAL_STATE';

export abstract class AbstractStorage implements AsyncStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected readonly state$!: BehaviorSubject<Record<string, any>>;
  protected key = STORAGE_KEY;

  protected constructor(public readonly storage: Storage) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.state$ = new BehaviorSubject<Record<string, any>>(
      this.getLocalState()
    );
  }

  private get state() {
    return this.state$.getValue();
  }

  get length(): number {
    return Object.keys(this.state).length;
  }

  clear() {
    this.setState({});
  }

  getItem<T>(key: string): Observable<T> {
    return this.state$.pipe(map((state) => state[key] ?? null));
  }

  removeItem(key: string) {
    const state = { ...this.state };
    if (key in state) {
      delete state[key];

      this.setState(state);
    }
  }

  setItem<T>(key: string, value: T) {
    this.setState({ ...this.state$.getValue(), [key]: value });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected setState(state: Record<string, any>) {
    this.state$.next(state);
    this.setLocalState(state);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected setLocalState(state: Record<string, any>) {
    try {
      this.storage.setItem(this.key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getLocalState(): Record<string, any> {
    const state = this.storage.getItem(this.key);

    return state ? JSON.parse(state) : {};
  }
}
