import {Directive, ElementRef, HostListener, forwardRef, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PreUnderscoreControlValueAccessor),
  multi: true
};

@Directive({
  selector: '[preUnderscore]',
  providers: [DATE_VALUE_ACCESSOR]
})
export class PreUnderscoreControlValueAccessor implements ControlValueAccessor {

  constructor(private renderer: Renderer2, private element: ElementRef) {

  }

  /**
   *
   * write model value to view, angular calls this
   */
  writeValue(modelValue: any) {
    console.log('writeValue to view', modelValue);
    let viewValue = this.toViewFormat(modelValue);
    this.element.nativeElement.value = viewValue;
    //this.renderer.setProperty(this.element, 'value', value);
  }

  @HostListener('input',['$event']) onInput($event) {
    console.log('on input', $event);
    let viewValue = this.element.nativeElement.value;
    let modelValue = this.parse(viewValue);
    this.propagateChange (modelValue);
  }

  public propagateChange  = (_) => {
  };
  public onTouched = () => {
  };

  registerOnChange(fn): void {
    this.propagateChange  = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  private parse(viewValue:string):string{
    // convert here
    // remove _
    let modelValue = viewValue.replace('_','')
    return modelValue;
  }

  private toViewFormat(modelValue:string):string{
    // convert here
    return '_'+modelValue;
  }

}
