import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TerminalOrchestratorService } from 'src/app/services/terminal-orchestrator.service';

@Component({
  selector: 'cmd-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {

  @ViewChild('testblock', { static: true })
  private _testblock!: ElementRef;
  private _screenWidth: number = 0;

  constructor(
    private terminalOrchestrator: TerminalOrchestratorService,
    private cd: ChangeDetectorRef
  ) {

  }
  ngAfterViewInit(): void {
    this.updateScreenWidth();
    // trigger change detector to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  updateScreenWidth() {
    this._screenWidth = window.innerWidth;
  }

  get bufferSize(): number {
    return Math.ceil(this._screenWidth / this._testblock.nativeElement.getBoundingClientRect().width);
  }
}
