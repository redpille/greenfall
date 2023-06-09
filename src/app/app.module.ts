import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TerminalComponent } from './components/terminal/terminal.component';
import { TerminalBufferComponent } from './components/terminal-buffer/terminal-buffer.component';
import { CommandComponent } from './components/command/command.component';
import { TestblockComponent } from './components/testblock/testblock.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TerminalBufferComponent,
    CommandComponent,
    TestblockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
