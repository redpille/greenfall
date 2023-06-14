import { HostListener, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalPropertiesService {

  private _typesetting = { width: 16, height: 16 };
  private _windowSize: { width: number; height: number } = { width: 0, height: 0 };
  // each tick in millisecond
  public static readonly TICK: number = 33;


  constructor(private rendererFactory2: RendererFactory2) {
    this.getWindowSize();
    const renderer = this.rendererFactory2.createRenderer(null, null);

    this.createWindowResizeObservable(renderer);
  }

  private getWindowSize() {
    this._windowSize.width = window.innerWidth;
    this._windowSize.height = window.innerHeight;
  }

  private createWindowResizeObservable(renderer: Renderer2) {
    renderer.listen('window', 'resize', (evt) => {
      this.getWindowSize();
    });
  }

  setTypesetting(w: number, h: number): void {
    this._typesetting = { width: Math.ceil(w), height: Math.ceil(h) };
  }

  get typesetting() {
    return Object.freeze(this._typesetting);
  }

  get windowSize() {
    return Object.freeze(this._windowSize);
  }

  get columns(): number {
    return Math.ceil(this._windowSize.width / this._typesetting.width);
  }

  get rows(): number {
    return Math.ceil(this._windowSize.height / this._typesetting.height);
  }

}
