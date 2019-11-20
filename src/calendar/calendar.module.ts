import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Calendar } from './calendar';
@NgModule({
  declarations: [
    Calendar,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    Calendar
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CalendarModule { }