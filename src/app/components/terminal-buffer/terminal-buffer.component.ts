import { Component, ComponentRef, ViewChild, ViewContainerRef, destroyPlatform } from '@angular/core';
import { CommandComponent } from '../command/command.component';
import { CommandContext } from 'src/app/shared/models/command-context.model';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';

@Component({
  selector: 'cmd-terminal-buffer',
  templateUrl: './terminal-buffer.component.html',
  styleUrls: ['./terminal-buffer.component.scss']
})
export class TerminalBufferComponent {

  private _commands: ComponentRef<CommandComponent>[] = [];

  @ViewChild('commandContainer', { read: ViewContainerRef })
  private _commandContainer!: ViewContainerRef;

  constructor(private terminalProperties: TerminalPropertiesService) {

  }

  receiveCommand(cmdContext: CommandContext): void {
    // do not receive new command if currently is printing one
    if (this.isReceiving) {
      return;
    }
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
        this.destroy(cmdRef);
      }

    }

    this.detecteCollision();
  }

  destroy(cmdRef: ComponentRef<CommandComponent>) {
    // remove from reference
    this._commands.splice(this._commands.indexOf(cmdRef), 1);
    // delete from view
    cmdRef.destroy();
  }

  detecteCollision() {
    for (let p = 0; p < this._commands.length - 1; p++) {
      let q = p + 1;

      const rectP = this._commands[p].location.nativeElement.getBoundingClientRect();
      const rectQ = this._commands[q].location.nativeElement.getBoundingClientRect();

      let collision: boolean = false;
      // partially overlap
      if (rectQ.bottom > rectP.top + this.terminalProperties.typesetting.height
        && rectQ.bottom < rectP.bottom) {
        collision = true;
      }
      // completely cover 
      else if (rectQ.top < rectP.top && rectQ.bottom > rectP.bottom) {
        collision = true;
      }

      if (collision) {
        let overwritten = this._commands[p];
        let overwrittenCommand = overwritten.instance;
        overwrittenCommand.overwrite();
        if (overwrittenCommand.context.length <= 0) {
          this.destroy(overwritten);
        }
      }
    }

  }


  get isReceiving(): boolean {

    let cmpRef = this._commands.slice(-1)[0];
    if (cmpRef) {
      return cmpRef.instance.lineNumber < cmpRef.instance.context.length;
    } else {
      return false;
    }

  }


}


