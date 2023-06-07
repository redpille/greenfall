import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'cmd-terminal-buffer',
  templateUrl: './terminal-buffer.component.html',
  styleUrls: ['./terminal-buffer.component.scss']
})
export class TerminalBufferComponent {

  @ViewChildren(CommandComponent)
  private _commands!: QueryList<CommandComponent>;

  update(): void {
    this._commands.forEach((cmd, index) => {
      cmd.update();
    });
  }

}
