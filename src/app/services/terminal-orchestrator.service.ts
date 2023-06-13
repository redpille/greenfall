import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalOrchestratorService {

  // each tick in millisecond
  public static readonly TICK: number = 33;

  private _elapse$: Observable<number>;

  private _elapseSubject = new Subject<string>();


  constructor() {
    this._elapse$ = interval(TerminalOrchestratorService.TICK);
    this.launch();
  }

  public launch(): void {
    this._elapse$.subscribe(() => {
      console.log('tick');
      this._elapseSubject.next('');
    });
  }

  elapse(): Observable<string> {
    return this._elapseSubject.asObservable();
  }

}
