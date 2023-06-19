import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { Message } from '../shared/enum/message';
import { Intent } from '../shared/interfaces/intent';
import { CommandContext } from '../shared/models/command-context.model';
import { TerminalPropertiesService } from './terminal-properties.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TerminalOrchestratorService {

  private _elapse$: Observable<number>;
  private _blink$: Observable<number>;

  private _elapseSubject = new Subject<Intent>();

  title = TerminalPropertiesService.TITLE_FULL_BLOCK;

  constructor(private titleService: Title) {
    this._elapse$ = interval(TerminalPropertiesService.TICK);
    this._blink$ = interval(TerminalPropertiesService.BLINK);

  }

  public async launch(): Promise<void> {

    // wait 3 second for the first single command
    await this.delay(3000);

    this._elapseSubject.next({
      type: Message.INJECT,
      data: new CommandContext(1, 24, 2, 0)
    });
    var opening = this._elapse$.subscribe(() => {
      this._elapseSubject.next({ type: Message.TICK });
    });

    // wait 1 second for the rest of the command
    await this.delay(1000);
    opening.unsubscribe();

    this._elapse$.subscribe(() => {
      this._elapseSubject.next({ type: Message.TICK });
      this._elapseSubject.next({ type: Message.INJECT });
      this._elapseSubject.next({ type: Message.INJECT_SERIAL });

    });

    this._blink$.subscribe(() => {
      this.title = (this.title === TerminalPropertiesService.TITLE_BLANK) ? TerminalPropertiesService.TITLE_FULL_BLOCK : TerminalPropertiesService.TITLE_BLANK;
      this.titleService.setTitle(this.title);
    });
  }

  elapse(): Observable<Intent> {
    return this._elapseSubject.asObservable();
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
