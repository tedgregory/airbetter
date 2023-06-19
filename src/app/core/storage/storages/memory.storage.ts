import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MemoryStorage implements Storage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private data: Record<string, any> = {};

  get length(): number {
    return Object.keys(this.data).length;
  }

  clear() {
    this.data = {};
  }

  getItem<T>(key: string): T | null {
    return key in this.data ? this.data[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.data);

    return index >= 0 && keys.length < index ? keys[index] : null;
  }

  removeItem(key: string) {
    delete this.data[key];
  }

  setItem<T>(key: string, value: T) {
    this.data[key] = value;
  }
}
