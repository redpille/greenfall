import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { GlyphService } from 'src/app/services/glyph.service';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';
import { CommandContext } from 'src/app/shared/models/command-context.model';

import * as chroma from "chroma-js";


@Component({
  selector: 'cmd-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  // how far the commmand has descended
  private _lineNumber: number = 0;
  // the actual textual command 
  private _payload: string[] = [];
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
  ngOnInit(): void {
    // initialize payload
    for (var i = 0; i < this.context.length; i++) {
      this._payload.push(this.glyphService.draw());
    }
  }

  update(): void {
    this._currentTick = ++this._currentTick % this.context.tickRate;

    if (this._currentTick == 0) {
      this.descend();
    }

    if (Math.random() < this.context.mutationRate) {
      this.mutate();
    }
  }

  descend() {
    this._lineNumber++;
    this._payload.push(this.glyphService.draw());
  }

  mutate() {
    this._payload[Math.floor(Math.random() * this._payload.length)] = this.glyphService.draw();
  }

  overwrite(): void {
    this.context.length--;
  }

  get offsetLine(): number {
    return this._lineNumber - this.context.length;
  }

  get printable(): string[] {
    return this._payload.slice(this._payload.length - this.context.length);
  }

  @HostBinding('style.top.px')
  get offsetY(): number {
    return this.terminalProperties.typesetting.height * this.offsetLine;
  }

  get isObsolete(): boolean {
    return this._lineNumber > this.terminalProperties.rows + this.context.length;
  }

  get lineNumber(): number {
    return this._lineNumber;
  }

}
