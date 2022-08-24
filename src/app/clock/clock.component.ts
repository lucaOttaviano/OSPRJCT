import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  currentTime!: string;
  isTwelveHrFormat!: false;

  alarms: string[] = [];

  modifying: boolean = false;
  temporaryIndex: number = 0;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('alarms'))
      this.alarms = JSON.parse(localStorage.getItem('alarms')!);

    setInterval(() => {
      let newDate = new Date();
      this.currentTime = newDate.toLocaleTimeString();
    }, 1000);

    // check timer
    setInterval(() => {
      if (this.alarms[0] == this.currentTime) {
        let test: any = document.getElementById('m');
        test.play();
        setTimeout(() => {
          alert('Timer scaduto');
          test.pause();
        }, 1000);
        this.alarms.shift();
        localStorage.setItem('alarms', JSON.stringify(this.alarms));
      }
    }, 1000)
  }

  setAlarm() {
      let alarmTime = document.getElementById('alarmTime') as HTMLInputElement;

    if (!this.modifying) {
      this.alarms.push(alarmTime.value);
      localStorage.setItem('alarms', JSON.stringify(this.alarms));
      alarmTime.value = '00:00:00';
    }
    else{
      this.alarms[this.temporaryIndex] = alarmTime.value;
      localStorage.setItem('alarms', JSON.stringify(this.alarms));
      alarmTime.value = '00:00:00';
      this.modifying = false;
    }

    

  }

  deleteAlarm(i: number) {
    this.alarms.splice(i, 1);
    localStorage.setItem('alarms', JSON.stringify(this.alarms));
  }

  modifyAlarm(i: number) {
    this.modifying = true;
    let alarmTime = document.getElementById('alarmTime') as HTMLInputElement;
    alarmTime.value = this.alarms[i];
    this.temporaryIndex = i;
  }



}

// c'è da fare la modifica sveglia e l'elimina