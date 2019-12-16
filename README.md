# ionic3-calendar-th 
## Fork from https://github.com/laker007/ionic3-calendar

![image](https://github.com/helaquiz/ionic3-calendar/blob/master/index.jpg?raw=true)"

## Using

- npm install ionic3-calendar-th --save (in ionic project folder)
  
- Add `CalendarModule` module in app.module.ts

``` javascript
import { CalendarModule } from 'ionic3-calendar-th';

  @NgModule({
    ...
  imports: [
    ...
    CalendarModule,
    ...
  ]
    ...
  })
```

- Push component to anywhere you want to display it

  `<ion-calendar #calendar></ion-calendar>`

- Send "lang" for disaplay TH

  `<ion-calendar #calendar lang="TH"></ion-calendar>`
  
- Send "lang" for disaplay EN 

  `<ion-calendar #calendar lang="EN"></ion-calendar>`

- Disable Less Today Click 

  `<ion-calendar #calendar [isDisableLessToday]="true | false"></ion-calendar>`

- Go Today

  `<button ion-button clear (click)="calendar.today()">Today</button>`

- Click The Day And Get The Day

  `<ion-calendar #calendar (onDaySelect)="onDaySelect($event)"></ion-calendar>`

- In The End

  Restart Ionic Serve

## Update

- (1.0.4) 16th December 2019

  Fix bug "Disable Less Today" on iOS

- (1.0.3) 27th November 2019

  Remove console.log()

- (1.0.2) 27th November 2019

  Update Disable "Less Today" Click

- 20th November 2019

  Update README FILE.

  Fork for TH-EN Support

- 31st July 2017

  Update README FILE

- 29th July 2017:

  Fix Bug:
  The Right Way To Get The Day: 

  `<ion-calendar #calendar (onDaySelect)="onDaySelect($event)"></ion-calendar>`

  Sorry for my mistake.

- 28th July 2017:   Thanks For Smartisan Designer-[Here is the link](https://dribbble.com/smartisan_design)
