import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveDate(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  public removeDate(key: string) {
    localStorage.removeItem(key);
  }

  public clearDate() {
    localStorage.clear();
  }

  public isEmpty() {
    return localStorage.length === 0;
  }

}
