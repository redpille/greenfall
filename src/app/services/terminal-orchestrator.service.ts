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
  }

  public async launch(): Promise<void> {

    // wait 3 second for the first single command
    await this.delay(3000);

    this._elapseSubject.next(Message.INJECT);
    var opening = this._elapse$.subscribe(() => {
      this._elapseSubject.next(Message.TICK);
    });

    // wait 1.5 second for the rest of the command
    await this.delay(1500);
    opening.unsubscribe();

    this._elapse$.subscribe(() => {
      this._elapseSubject.next(Message.TICK);
      this._elapseSubject.next(Message.INJECT);

    });
  }

  elapse(): Observable<Message> {
    return this._elapseSubject.asObservable();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
