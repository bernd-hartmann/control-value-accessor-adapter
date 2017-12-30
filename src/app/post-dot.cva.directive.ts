import {Directive, ElementRef, HostListener, forwardRef, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const POST_DOT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PostDotControlValueAccessor),
  multi: true
};

@Directive({
  selector: '[postDot]',
  providers: [POST_DOT_CONTROL_VALUE_ACCESSOR]
})
export class PostDotControlValueAccessor implements ControlValueAccessor {

  constructor(private renderer: Renderer2, private element: ElementRef) {

  }

  /**
   *
   * write model value to view, angular calls this
   */
  writeValue(modelValue: any) {
    console.log('writeValue to view post dot', modelValue);
    let viewValue = this.toViewFormat(modelValue);
    this.element.nativeElement.value = viewValue;
  }

  @HostListener('input',['$event']) onInput($event) {
    console.log('on input post dot', $event);
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
    // remove dot
    let modelValue = viewValue.replace('.','');
    return modelValue;
  }

  private toViewFormat(modelValue:string):string{
    // convert here
    return modelValue+'.';
  }

}
