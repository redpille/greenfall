import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { TerminalOrchestratorService } from 'src/app/services/terminal-orchestrator.service';
import { TerminalBufferComponent } from '../terminal-buffer/terminal-buffer.component';
import { Subscription } from 'rxjs';
import { CommandContext } from 'src/app/shared/models/command-context.model';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';
import { Message } from 'src/app/shared/enum/message';

@Component({
  selector: 'cmd-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {

  @ViewChildren(TerminalBufferComponent)
  private _buffers!: QueryList<TerminalBufferComponent>;

  private _elapseSubscription!: Subscription;


  constructor(
    private terminalOrchestrator: TerminalOrchestratorService,
    private terminalProperties: TerminalPropertiesService,
    private cd: ChangeDetectorRef
  ) {

  }

  ngAfterViewInit(): void {
    this._elapseSubscription = this.terminalOrchestrator.elapse().subscribe((intent) => {
      if (intent.type === Message.TICK) {
        this._buffers.forEach((buff, index) => {
          buff.update();
        });
      } else if (intent.type === Message.INJECT) {
        this.injectCommand(intent.data);
      }
    });

    this.terminalOrchestrator.launch();
    this.cd.detectChanges();
  }

  // inject a command to a terminal buffer
  injectCommand(context?: CommandContext): void {
    context = context ?? CommandContext.generate();

    var index = Math.floor(Math.random() * this._buffers.length);

    this._buffers.get(index)!.receiveCommand(context);
  }

  get bufferSize(): number {
    return this.terminalProperties.columns;
  }
}
