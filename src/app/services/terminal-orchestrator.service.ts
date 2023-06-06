import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalOrchestratorService {

  // each tick in millisecond
  public static readonly TICK: number = 100;

  private elapse$: Observable<number>;

  constructor() {
    this.elapse$ = interval(TerminalOrchestratorService.TICK);
    this.launch();
  }

  public launch(): void {
    this.elapse$.subscribe(() => {
      console.log('tick');
    });
  }

}
