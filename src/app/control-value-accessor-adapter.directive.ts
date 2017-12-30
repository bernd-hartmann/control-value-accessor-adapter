import {Directive, ElementRef, HostListener, forwardRef, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PreUnderscoreControlValueAccessor} from './pre-underscore.cva.directive';
import {PostDotControlValueAccessor} from './post-dot.cva.directive';

export const CONTROL_VALUE_ACCESSOR_ADAPTER: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ControlValueAccessorAdapter),
  multi: true
};

@Directive({
  selector: '[controlValueAccessorAdapter]',
  providers: [CONTROL_VALUE_ACCESSOR_ADAPTER,PreUnderscoreControlValueAccessor, PostDotControlValueAccessor]
})
export class ControlValueAccessorAdapter implements ControlValueAccessor {

  constructor(private renderer: Renderer2, private element: ElementRef, private preUnderscore: PreUnderscoreControlValueAccessor, private postDot: PostDotControlValueAccessor) {
    this.postDot.registerOnChange((modelFromCVA2: number) => {
      this.currentModelOfCVA2 = modelFromCVA2;
    });
    this.preUnderscore.registerOnChange((modelFromCVA1: string) => {
      this.currentModelOfCVA1 = modelFromCVA1;
    });
  }
  private currentModelOfCVA2 = null;
  private currentModelOfCVA1 = null;

  /**
   *
   * write model value to view, angular calls this
   */
  writeValue(modelValue: any) {
    /**
     * CVA1
     */
    this.preUnderscore.writeValue(modelValue);

    let viewValueAfterCVA1 = this.element.nativeElement.value;

  }

  @HostListener('input', ['$event.target.value']) onInput(viewValue) {
    /**
     * CVA 2
     */
    console.log('on input adapter', viewValue);

    // create expected viewValue for CVA2
    //viewValue = viewValue.replace('_', '');
    this.preUnderscore.onInput(viewValue);// call this to get modelValue of cva1
    // TODO: you may have to format modelValue to an expected viewValue, but that shouldnt be a problem

    this.postDot.onInput(this.currentModelOfCVA1);// triggers modelChangeFromCVA2
    // propagate cva2model to angular
    this.propagateChange(this.currentModelOfCVA2);
  }

  public propagateChange = (_) => {
  };
  public onTouched = () => {
  };

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

}
