import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TerminalOrchestratorService } from 'src/app/services/terminal-orchestrator.service';
import { TerminalBufferComponent } from '../terminal-buffer/terminal-buffer.component';
import { Subscription } from 'rxjs';
import { CommandContext } from 'src/app/shared/models/command-context.model';
import { CommandComponent } from '../command/command.component';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';

@Component({
  selector: 'cmd-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, AfterViewInit {

  @ViewChildren(TerminalBufferComponent)
  private _buffers!: QueryList<TerminalBufferComponent>;

  private _screenWidth: number = 0;

  private _elapseSubscription!: Subscription;


  constructor(
    private terminalOrchestrator: TerminalOrchestratorService,
    private terminalProperties: TerminalPropertiesService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this._elapseSubscription = this.terminalOrchestrator.elapse().subscribe((message) => {
      this._buffers.forEach((buff, index) => {
        buff.update();
      });
      this.injectCommand();

    });
  }

  ngAfterViewInit(): void {
    this.updateScreenWidth();
    // trigger change detector to avoid ExpressionChangedAfterItHasBeenCheckedError
    this.cd.detectChanges();
  }

  // inject a command to a terminal buffer
  injectCommand(): void {
    var index = Math.floor(Math.random() * this._buffers.length);
    var cmd: CommandContext = CommandContext.generate();
    this._buffers.get(index)!.receiveCommand(cmd);
  }

  @HostListener('window:resize', ['$event'])
  updateScreenWidth() {
    this._screenWidth = window.innerWidth;
  }

  get bufferSize(): number {
    return Math.ceil(this._screenWidth / this.terminalProperties.typesetting.width);
  }
}
