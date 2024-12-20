import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor() { }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isLocalStorageAvailable) {
      localStorage.clear();
    }
  }
}
