import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerminalComponent } from './components/terminal/terminal.component';
import { TerminalBufferComponent } from './components/terminal-buffer/terminal-buffer.component';
import { CommandComponent } from './components/command/command.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TerminalBufferComponent,
    CommandComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
