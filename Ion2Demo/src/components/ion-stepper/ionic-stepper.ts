import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { IonicStepComponent } from './ionic-step';
import { IonicStepperAnimations } from './ionic-stepper-animations';

export type StepContentPositionState = 'next' | 'previous' | 'current';

@Component({
  selector: 'ion-stepper',
  template: `ionic-stepper.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ionic-stepper',
  },
  animations: [
    IonicStepperAnimations.verticalStepTransition,
  ],
})
export class IonicStepperComponent implements OnInit {
  disabled: boolean;
  _selectedIndex = 0;
  @ContentChildren(IonicStepComponent) _steps: QueryList<IonicStepComponent>;

  @Input() mode: 'vertical';

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    this._selectedIndex = index;
    this.selectIndexChange.emit(this._selectedIndex);
  }

  @Output()
  selectIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _hostRef: ElementRef,
    private render: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.render.addClass(
      this._hostRef.nativeElement,
      `ionic-stepper-${this.mode}`
    );
  }

  nextStep(): void {
    this.selectedIndex = Math.min(
      this.selectedIndex + 1,
      this._steps.length - 1
    );
    this._changeDetectorRef.markForCheck();
  }

  previousStep(): void {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    this._changeDetectorRef.markForCheck();
  }

  setStep(index: number): boolean {
    const len = this._steps.length;
    if (index < len - 1 && index >= 0) {
      this.selectedIndex = index;
      this._changeDetectorRef.markForCheck();
      return true;
    } else {
      return false;
    }
  }

  getAnimationDirection(index: number): StepContentPositionState {
    const position = index - this.selectedIndex;
    if (position < 0) {
      return 'previous';
    } else if (position > 0) {
      return 'next';
    }
    return 'current';
  }
}
