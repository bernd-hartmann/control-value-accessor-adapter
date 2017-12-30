import {Directive, ElementRef, HostListener, forwardRef, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

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

  /**
   *
   * write model value to view, angular calls this
   */
  writeValue(modelValue: any) {
    console.log('writeValue to view adapter', modelValue);
    let viewValue = this.toViewFormat(modelValue);
    this.element.nativeElement.value = viewValue;
  }

  @HostListener('input', ['$event']) onInput($event) {
    console.log('on input adapter', $event);
    let viewValue = this.element.nativeElement.value;
    let modelValue = this.parse(viewValue);
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

  private parse(viewValue: string): string {
    return viewValue;
  }

  private toViewFormat(modelValue: string): string {
    // convert here
    return modelValue;
  }

}
