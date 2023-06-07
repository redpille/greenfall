import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TerminalOrchestratorService } from 'src/app/services/terminal-orchestrator.service';
import { TerminalBufferComponent } from '../terminal-buffer/terminal-buffer.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cmd-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit {

  @ViewChild('testblock', { static: true })
  private _testblock!: ElementRef;

  @ViewChildren(TerminalBufferComponent)
  private _buffers!: QueryList<TerminalBufferComponent>;

  private _screenWidth: number = 0;
  private _elapseSubscription!: Subscription;


  constructor(
    private terminalOrchestrator: TerminalOrchestratorService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this._elapseSubscription = this.terminalOrchestrator.elapse().subscribe((message) => {
      this._buffers.forEach((buff, index) => {
        buff.update();
      });
    });
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
