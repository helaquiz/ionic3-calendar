import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";
// <div>{{displayMonthText}} {{displayYear}}</div>
@Component({
    selector: 'ion-calendar',
    template: `
    <ion-grid>
        <ion-row justify-content-center>
            <ion-col col-auto (click)="back()">
                <ion-icon ios="ios-arrow-back" md="md-arrow-back"></ion-icon>
            </ion-col>
            <ion-col col-auto>
                <div>{{displayMonthText}} {{displayYearText}}</div>
            </ion-col>
            <ion-col col-auto (click)="forward()">
                <ion-icon ios="ios-arrow-forward" md="md-arrow-forward"></ion-icon>
            </ion-col>
        </ion-row>

        <ion-row>
            <ion-col class="center calendar-header-col" *ngFor="let head of weekHead">{{head}}</ion-col>
        </ion-row>

        <ion-row class="calendar-row" *ngFor="let week of weekArray;let i = index">
            <ion-col class="center calendar-col" (click)="daySelect(day,i,j)" 
            *ngFor="let day of week;let j = index" 
            [ngClass]="[day.isThisMonth?'this-month':'not-this-month',day.isToday?'today':'',day.isSelect?'select':'',day.isLessToday?'disabled-date':'']">
                {{day.date}}
            </ion-col>
        </ion-row>

    </ion-grid>
`
})

export class Calendar {

    @Output() onDaySelect = new EventEmitter<dateObj>();

    @Input() lang: string = 'TH';

    @Input() isDisableLessToday: boolean = false;

    currentYear: number;

    currentMonth: number;

    currentDate: number;

    currentDay: number;

    displayYear: number;

    displayMonth: number;
    displayMonthText: string;

    dateArray: Array<dateObj> = []; // 本月展示的所有天的数组

    weekArray = [];// 保存日历每行的数组

    lastSelect: number = 0; // 记录上次点击的位置

    // weekHead: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    weekHead: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekHeadTH = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

    fmonthArrayEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    smonthArrayEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    smonthArrayTH = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    fmonthArrayTH = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    displayYearText: number;
    lastMonthSelect: number;
    lastYearSelect: number;

    constructor() {
        this.currentYear = moment().year();
        this.currentMonth = moment().month();
        this.currentDate = moment().date();
        this.currentDay = moment().day();
    }

    ngOnInit() {
        this.today();
    }

    // 跳转至今天
    today() {
        this.displayYear = this.currentYear;
        this.displayMonth = this.currentMonth;
        this.createMonth(this.currentYear, this.currentMonth);

        // 将今天标记为选择状态
        let todayIndex = _.findIndex(this.dateArray, {
            year: this.currentYear,
            month: this.currentMonth,
            date: this.currentDate,
            isThisMonth: true,
        })
        this.lastSelect = todayIndex;
        this.dateArray[todayIndex].isSelect = true;
        this.dateArray[todayIndex].shortMonth = this.getShortMonth();
        this.onDaySelect.emit(this.dateArray[todayIndex]);
    }

    createMonth(year: number, month: number) {
        this.dateArray = [];// 清除上个月的数据
        this.weekArray = [];// 清除数据
        let firstDay;//当前选择月份的 1 号星期几,决定了上个月取出几天出来。星期日不用显示上个月，星期一显示上个月一天，星期二显示上个月两天
        let preMonthDays;// 上个月的天数
        let monthDays;// 当月的天数
        let weekDays: Array<dateObj> = [];

        firstDay = moment({ year: year, month: month, date: 1 }).day();
        // 上个月天数
        // Number of days in the previous month
        if (month === 0) {
            preMonthDays = moment({ year: year - 1, month: 11 }).daysInMonth();
        } else {
            preMonthDays = moment({ year: year, month: month - 1 }).daysInMonth();
        }
        // 本月天数
        // The number of days in the month
        monthDays = moment({ year: year, month: month }).daysInMonth();

        // 将上个月的最后几天添加入数组
        // Add the last few days of the last month to the array
        if (firstDay !== 7) {
            // 星期日不用显示上个月
            // Don't show last month on Sunday
            let lastMonthStart = preMonthDays - firstDay + 1;
            // 从上个月几号开始
            // Starting from the last month
            for (let i = 0; i < firstDay; i++) {
                if (month === 0) {
                    this.dateArray.push({
                        year: year,
                        month: 11,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                } else {
                    this.dateArray.push({
                        year: year,
                        month: month - 1,
                        date: lastMonthStart + i,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                }

            }
        }

        const dpMonthCondition = Number(this.displayMonth + 1) < 10 ? "0" + (this.displayMonth + 1) :this.displayMonth + 1;
        const crMonthCondition = Number(this.currentMonth + 1) < 10 ? "0" + (this.currentMonth + 1) :this.currentMonth + 1;
        const isLessMonth = new Date(`${this.displayYear}-${dpMonthCondition}`) < new Date(`${this.currentYear}-${crMonthCondition}`);
        const isGreaterMonth = new Date(`${this.displayYear}-${dpMonthCondition}`) > new Date(`${this.currentYear}-${crMonthCondition}`);
        // 将本月天数添加到数组中
        // Add the number of days of the month to the array
        for (let i = 0; i < monthDays; i++) {
            let dateObj = {
                year: year,
                month: month,
                date: i + 1,
                isThisMonth: true,
                isToday: false,
                isSelect: false,
                isLessToday: (isLessMonth ? true : isGreaterMonth ? false : (i + 1 < this.currentDate) ? true : false) && this.isDisableLessToday
            }
            this.dateArray.push(dateObj)
        }

        if (this.currentYear === year && this.currentMonth === month) {
            let todayIndex = _.findIndex(this.dateArray, {
                year: this.currentYear,
                month: this.currentMonth,
                date: this.currentDate,
                isThisMonth: true
            })
            this.dateArray[todayIndex].isToday = true;
        }

        // 将下个月天数添加到数组中，有些月份显示 6 周，有些月份显示 5 周
        if (this.dateArray.length % 7 !== 0) {
            let nextMonthAdd = 7 - this.dateArray.length % 7
            for (let i = 0; i < nextMonthAdd; i++) {
                if (month === 11) {
                    this.dateArray.push({
                        year: year,
                        month: 0,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                } else {
                    this.dateArray.push({
                        year: year,
                        month: month + 1,
                        date: i + 1,
                        isThisMonth: false,
                        isToday: false,
                        isSelect: false,
                    })
                }

            }
        }

        // 至此所有日期数据都被添加入 dateArray 数组中
        // At this point all date data is added to the dateArray array
        // 将日期数据按照每 7 天插入新的数组中
        // Insert date data into a new array every 7 days
        for (let i = 0; i < this.dateArray.length / 7; i++) {
            for (let j = 0; j < 7; j++) {
                weekDays.push(this.dateArray[i * 7 + j]);
            }
            this.weekArray.push(weekDays);
            weekDays = [];
        }

        // this.dateArray[this.lastSelect].isSelect = true;
        this.displayMonthText = this.pickMonth();
        this.displayYearText = this.pickYear();
        if (this.lastMonthSelect == month && this.lastYearSelect == year) {
            this.dateArray[this.lastSelect].isSelect = true;
        }
    }

    back() {
        // 处理跨年的问题
        if (this.displayMonth === 0) {
            this.displayYear--;
            this.displayMonth = 11;
        } else {
            this.displayMonth--;
        }
        this.createMonth(this.displayYear, this.displayMonth);
    }

    forward() {
        // 处理跨年的问题
        if (this.displayMonth === 11) {
            this.displayYear++;
            this.displayMonth = 0;
        } else {
            this.displayMonth++;
        }
        this.createMonth(this.displayYear, this.displayMonth);
    }

    // 选择某日期，点击事件
    // Select a date, click on the event
    daySelect(day, i, j) {
        // 首先将上次点击的状态清除
        // First clear the status of the last click
        this.dateArray[this.lastSelect].isSelect = false;
        // 保存本次点击的项
        // Save this clicked item
        this.lastSelect = i * 7 + j;
        this.lastMonthSelect = day.month;
        this.lastYearSelect = day.year;
        this.dateArray[i * 7 + j].isSelect = true;
        this.dateArray[i * 7 + j].shortMonth = this.getShortMonth();
        this.onDaySelect.emit(day);
    }

    private pickYear(): number {
        return this.checkTHLang() ? this.displayYear + 543 : this.displayYear;
    }

    private pickMonth(): string {
        this.pickWeekHead();
        return this.checkTHLang() ? this.fmonthArrayTH[this.displayMonth] : this.fmonthArrayEn[this.displayMonth];
    }

    private checkTHLang() {
        return this.lang.toLowerCase() == 'th';
    }

    private pickWeekHead() {
        if (this.checkTHLang()) { this.weekHead = this.weekHeadTH; }
    }

    private getShortMonth() {
        return this.checkTHLang() ? this.smonthArrayTH[this.displayMonth] : this.smonthArrayEn[this.displayMonth];
    }

}

// 日历的每个格子
interface dateObj {
    year: number,
    month: number,
    date: number,//几号
    isThisMonth: boolean,//是否为当前选择的月份
    isToday?: boolean,
    isSelect?: boolean,
    shortMonth?: string,
    isLessToday?: boolean
}