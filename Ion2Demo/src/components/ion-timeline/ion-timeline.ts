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

  text: string;

  constructor() {
    console.log('Hello IonTimelineComponent Component');
    this.text = 'Hello World';
  }

}
