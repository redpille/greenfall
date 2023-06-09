import { Component, ElementRef, OnInit } from '@angular/core';
import { TerminalPropertiesService } from 'src/app/services/terminal-properties.service';

@Component({
  selector: 'cmd-testblock',
  templateUrl: './testblock.component.html',
  styleUrls: ['./testblock.component.scss']
})
export class TestblockComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private terminalProperties: TerminalPropertiesService) {

  }
  ngOnInit(): void {
    const el = this.elementRef.nativeElement;
    this.terminalProperties.setTypesetting(el.offsetWidth, el.offsetHeight);
  }

}
