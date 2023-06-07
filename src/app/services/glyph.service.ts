import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlyphService {

  private static readonly CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%^&*()-=_+,.<>;:'\"?\\|{}[]~ ";


  constructor() { }

  // randomly return a character from CHARSET
  draw(): string {
    return GlyphService.CHARSET[Math.floor(Math.random() * GlyphService.CHARSET.length)];
  }
}
