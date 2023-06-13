import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TerminalOrchestratorService } from 'src/app/services/terminal-orchestrator.service';
import { TerminalBufferComponent } from '../terminal-buffer/terminal-buffer.component';
import { Subscription } from 'rxjs';
import { CommandContext } from 'src/app/shared/models/command-context.model';
import { CommandComponent } from '../command/command.component';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';
import { Message } from 'src/app/shared/enum/message';

@Component({
  selector: 'cmd-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  @ViewChildren(TerminalBufferComponent)
  private _buffers!: QueryList<TerminalBufferComponent>;

  private _elapseSubscription!: Subscription;


  constructor(
    private terminalOrchestrator: TerminalOrchestratorService,
    private terminalProperties: TerminalPropertiesService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this._elapseSubscription = this.terminalOrchestrator.elapse().subscribe((message) => {
      if (message === Message.TICK) {
        this._buffers.forEach((buff, index) => {
          buff.update();
        });
      } else if (message === Message.INJECT) {
        this.injectCommand();
      }
    });
  }

  // inject a command to a terminal buffer
  injectCommand(): void {
    var index = Math.floor(Math.random() * this._buffers.length);
    var cmd: CommandContext = CommandContext.generate();
    this._buffers.get(index)!.receiveCommand(cmd);
  }

  get bufferSize(): number {
    return this.terminalProperties.columns;
  }
}
