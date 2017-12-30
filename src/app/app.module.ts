import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {PreUnderscoreControlValueAccessor} from './pre-underscore.cva.directive';
import {PostDotControlValueAccessor} from './post-dot.cva.directive';
import {ControlValueAccessorAdapter} from './control-value-accessor-adapter.directive';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    PreUnderscoreControlValueAccessor,
    PostDotControlValueAccessor,
    ControlValueAccessorAdapter
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
