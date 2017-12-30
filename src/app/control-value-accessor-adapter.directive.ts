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
  providers: [CONTROL_VALUE_ACCESSOR_ADAPTER]
})
export class ControlValueAccessorAdapter implements ControlValueAccessor {

  constructor(private renderer: Renderer2, private element: ElementRef) {

  }

  private preUnderscore: PreUnderscoreControlValueAccessor = new PreUnderscoreControlValueAccessor(this.renderer, this.element);
  private postDot: PostDotControlValueAccessor = new PostDotControlValueAccessor(this.renderer, this.element);

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

    // TODO: parse from view to model for CVA2

    /**
     * CVA2
     */
    this.postDot.writeValue(viewValueAfterCVA1);
  }

  @HostListener('input', ['$event']) onInput($event) {
    console.log('on input adapter', $event);
    let viewValue = this.element.nativeElement.value;
    let modelValue = viewValue;
    this.propagateChange(modelValue);
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
