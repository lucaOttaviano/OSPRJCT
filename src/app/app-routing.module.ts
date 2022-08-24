import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClockComponent } from './clock/clock.component';
import { DesktopComponent } from './desktop/desktop.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path: '', redirectTo: 'desktop', pathMatch: 'full'},
  {path:'desktop', component: DesktopComponent},
  {path:'bi-journal-text', component: NotesComponent},
  {path:'bi-clock', component: ClockComponent},
  {path:'bi-calculator', component: CalculatorComponent},
  {path:'bi-calendar-date', component: CalendarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
