import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommandComponent } from '../command/command.component';
import { CommandContext } from 'src/app/shared/models/command-context.model';

@Component({
  selector: 'cmd-terminal-buffer',
  templateUrl: './terminal-buffer.component.html',
  styleUrls: ['./terminal-buffer.component.scss']
})
export class TerminalBufferComponent {

  private _commands: ComponentRef<CommandComponent>[] = [];

  @ViewChild('commandContainer', { read: ViewContainerRef })
  private _commandContainer!: ViewContainerRef;

  receiveCommand(cmdContext: CommandContext): void {

    const componentRef: ComponentRef<CommandComponent> = this._commandContainer.createComponent(CommandComponent);
    componentRef.instance.context = cmdContext;
    this._commands.push(componentRef);
  }

  update(): void {

    for (var i = 0; i < this._commands.length; i++) {
      let cmdRef = this._commands[i];
      cmdRef.instance.update();

      // if command is out of screen
      if (cmdRef.instance.isObsolete) {
        // remove from reference
        this._commands.splice(this._commands.indexOf(cmdRef), 1);
        // delete from view
        cmdRef.destroy();
      }

    }
  }

}
