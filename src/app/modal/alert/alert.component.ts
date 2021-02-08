import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() config!: any;
  @Output() action = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.action.emit({
      destroy: true
    });
  }

  getClass(): any {
    return {
      'is-success': this.config.type === 'success',
      'is-danger': this.config.type === 'error'
    };
  }
}
