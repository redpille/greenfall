import { Component } from '@angular/core';
import { GlyphService } from 'src/app/services/glyph.service';
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
  private payload: string = '';
  // when currentTick equals tickRate, this command descend
  private currentTick: number = 0;

  private cmdContext!: CommandContext;

  constructor(
    commandContext: CommandContext,
    private glyphService: GlyphService
  ) {
    this.cmdContext = commandContext;
  }

  update(): void {
    this.currentTick = ++this.currentTick % this.cmdContext.tickRate;

    if (this.currentTick == 0) {
      this.descend();
    }

    if (Math.random() > this.cmdContext.mutationRate) {
      this.mutate();
    }
  }

  descend() {
    this.payload = this.payload + this.glyphService.draw();
  }

  mutate() {

  }
}
