import { Component, Input } from '@angular/core';
import { IonicStepStatus } from './ionic-step';

@Component({
  selector: 'ion-step-header',
  template: `ionic-step-header.html`,
  host: {
    '[class.ionic-step-header-status-error]': 'isError',
  },
})
export class IonicStepHeaderComponent {
  @Input() label: string;
  @Input() description: string;
  @Input() icon = 'number';
  @Input() errorIcon = 'close';
  @Input() index: number;
  @Input() active = false;
  @Input() status: IonicStepStatus = '';

  get isError(): boolean {
    return this.status === 'error';
  }
}
