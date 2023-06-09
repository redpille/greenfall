import { Component, HostBinding, Input } from '@angular/core';
import { GlyphService } from 'src/app/services/glyph.service';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';
import { CommandContext } from 'src/app/shared/models/command-context.model';

@Component({
  selector: 'cmd-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent {

  // how far the commmand has descended
  private lineNumber: number = 0;
  // the actual textual command 
  private _payload: string = '';
  // when currentTick equals tickRate, this command descend
  private _currentTick: number = 0;

  // context of this CommandComponent
  @Input()
  context!: CommandContext;


  constructor(
    private glyphService: GlyphService,
    private terminalProperties: TerminalPropertiesService
  ) {

  }

  update(): void {
    this._currentTick = ++this._currentTick % this.context.tickRate;

    if (this._currentTick == 0) {
      this.descend();
    }

    if (Math.random() > this.context.mutationRate) {
      this.mutate();
    }
  }

  descend() {
    this.lineNumber++;
    this._payload = this._payload + this.glyphService.draw();
  }

  mutate() {

  }

  get printable(): string {
    return this._payload.substring(Math.max(this.lineNumber - this.context.length, 0));
  }

  @HostBinding('style.top.px')
  get offsetY(): number {
    let y = this.terminalProperties.typesetting.height * (Math.max(this.lineNumber - this.context.length, 0));
    return y;
  }

}
