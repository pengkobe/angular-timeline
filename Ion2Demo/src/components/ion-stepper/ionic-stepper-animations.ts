/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// https://github.com/angular/material2/blob/master/src/lib/stepper/stepper-animations.ts

import {
  state,
  style,
  transition,
  trigger,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const IonicStepperAnimations: {
  readonly verticalStepTransition: AnimationTriggerMetadata;
} = {
  verticalStepTransition: trigger('verticalStepTransition', [
    state('previous', style({ height: '0px', visibility: 'hidden' })),
    state('next', style({ height: '0px', visibility: 'hidden' })),
    state('current', style({ height: '*', visibility: 'visible' })),
    transition(
      '* <=> current',
      animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
    ),
  ]),
};
