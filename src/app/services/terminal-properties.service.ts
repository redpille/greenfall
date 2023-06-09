import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalPropertiesService {

  private _typesetting = { width: 16, height: 16 };

  constructor() { }

  setTypesetting(w: number, h: number): void {
    this._typesetting = { width: Math.ceil(w), height: Math.ceil(h) };
  }

  get typesetting() {
    return Object.freeze(this._typesetting);
  }

}
