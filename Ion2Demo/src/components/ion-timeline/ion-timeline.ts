import { Component } from '@angular/core';

/**
 * Generated class for the IonTimelineComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ion-timeline',
  templateUrl: 'ion-timeline.html'
})
export class IonTimelineComponent {
  steps = [
    {index:1, name:'工单'},
    {index:2, name:'派单'},
    {index:1, name:'接单'},
    {index:1, name:'到场'},
    {index:1, name:'签到'},
    {index:1, name:'处理'},
    {index:1, name:'评价'},
  ];
  text: string;

  constructor() {
    console.log('Hello IonTimelineComponent Component');
    this.text = 'Hello World';
  }

}
