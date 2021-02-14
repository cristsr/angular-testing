import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {
  @Input() config!: any;
  @Output() action = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDecline(): void {
    this.action.emit({
      destroy: true,
      data: {
        confirm: false
      }
    });
  }

  onAccept(): void {
    this.action.emit({
      destroy: true,
      data: {
        confirm: true
      }
    });
  }
}
