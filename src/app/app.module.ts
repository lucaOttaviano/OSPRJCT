import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopComponent } from './desktop/desktop.component';
import { NotesComponent } from './notes/notes.component';
import { ClockComponent } from './clock/clock.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    NotesComponent,
    ClockComponent,
    CalculatorComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
