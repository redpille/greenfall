import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { Message } from '../shared/enum/message';

@Injectable({
  providedIn: 'root'
})
export class TerminalOrchestratorService {

  // each tick in millisecond
  public static readonly TICK: number = 33;

  private _elapse$: Observable<number>;

  private _elapseSubject = new Subject<Message>();


  constructor() {
    this._elapse$ = interval(TerminalOrchestratorService.TICK);
    this.launch();
  }

  public launch(): void {
    this._elapse$.subscribe(() => {
      this._elapseSubject.next(Message.TICK);
      this._elapseSubject.next(Message.INJECT);

    });
  }

  elapse(): Observable<Message> {
    return this._elapseSubject.asObservable();
  }

}
