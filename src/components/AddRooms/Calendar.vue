<template>
  <main class="">
    <section class="flex flex-col justify-center items-center rounded h-full">
      <div class="flex flex-row justify-between items-center w-320 text-16 h-12 px-5">
        <div class="header-arrow cursor-pointer" @click="controlMonth('prev')">&lt;</div>
        <div class="flex flex-row items-center justify-center cursor-pointer" @click="datepicker()">
          {{ year }}.{{ monthToString }}
          <div v-show="isPickerClicked" class="w-0">
            <DatePicker
              class="datepicker relative bg-white -left-88 top-36"
              id="scrollView"
              :SelectedYear="this.year"
              :SelectedMonth="this.month"
              @setEmitDate="setEmitDate"
            />
          </div>
          <div class="flex items-center w-0.9 h-10 ml-0.7"><img src="../../assets/combobox.png" /></div>
        </div>
        <div
          v-if="this.month != new Date().getMonth() + 1"
          class="header-arrow cursor-pointer"
          @click="controlMonth('next')"
        >
          &gt;
        </div>
        <div v-else class="header-arrow text-gray100">&gt;</div>
      </div>
      <table class="w-320 h-218 text-13">
        <thead class="flex w-320 h-8 justify-around items-center">
          <th v-for="day in days" :key="day">{{ day }}</th>
        </thead>
        <tbody>
          <tr v-for="(date, idx) in dates" :key="idx" class="flex w-320 h-3.6 justify-around items-center">
            <td
              v-for="(day, index) in date"
              :key="index"
              class="w-8 h-8 flex flex-col justify-center items-center hover-date"
              :class="{
                'today-date': day === currentDate && isCurrentDate,
                'prev-dates': isPrevDates(day, idx),
                'selected-date': isSelectedDates(day, idx),
              }"
            >
              <div class="dateOnly w-full flex items-center justify-center" @click="dayClicked(day)">
                {{ day }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import DatePicker from "../Calendars/datepicker.vue";

export default {
  components: { DatePicker },
  data() {
    return {
      days: ["일", "월", "화", "수", "목", "금", "토"],
      months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
      dates: [],
      INGdates: [10],
      LIKEdates: [13, 16],
      currentYear: 0,
      currentMonth: 0,
      currentDate: new Date().getDate(),
      year: 0,
      month: 0,
      prevDate: [],
      previewDate: [],
      SelectedDate: 0,
      isPickerClicked: false,
    };
  },
  computed: {
    monthToString: function () {
      return this.months[this.month - 1];
    },
    isCurrentDate: function () {
      let status = false;
      if (this.currentYear === 0 && this.currentMonth === 0) {
        status = true;
      } else {
        status = this.currentYear === new Date().getFullYear() && this.currentMonth === new Date().getMonth() + 1;
      }
      return status;
    },
  },
  created() {
    this.init();
  },
  methods: {
    goto(page) {
      this.$router.push(page);
    },
    init(param) {
      if (param) {
        this.year = param[0];
        this.month = param[1];
        this.calendarDate();
      } else {
        const date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.calendarDate();
      }
    },
    setEmitDate(param) {
      this.init(param);
    },
    calendarDate() {
      const [monthFirstDay, monthLastDate, prevMonthLastDate] = this.getFirstDayLastDate(this.year, this.month);
      this.dates = this.getDaysOfMonth(monthFirstDay, monthLastDate, prevMonthLastDate);
    },
    getFirstDayLastDate(year, month) {
      const firstDay = new Date(year, month - 1, 1).getDay();
      const lastDate = new Date(year, month, 0).getDate();
      let lastMonth = month - 1;
      if (month === 1) {
        lastMonth = 12;
        year -= 1;
      }
      const prevLastDate = new Date(year, lastMonth, 0).getDate();
      return [firstDay, lastDate, prevLastDate];
    },
    getDaysOfMonth(monthFirstDay, monthLastDate, prevMonthLastDate) {
      let day = 1;
      let prevDay = prevMonthLastDate - monthFirstDay + 1;
      let dates = [];
      let daysOfWeek = [];
      while (day <= monthLastDate) {
        if (day === 1) {
          this.getPrevDates(monthFirstDay, daysOfWeek, prevDay);
          this.padDates(daysOfWeek);
        }
        if (daysOfWeek.length === 7) {
          dates.push(daysOfWeek);
          day = daysOfWeek[daysOfWeek.length - 1];
          daysOfWeek = [];
        } else if (daysOfWeek.length < 7 && daysOfWeek.indexOf(monthLastDate) > -1) {
          this.padDates(daysOfWeek);
          dates.push(daysOfWeek);
          break;
        }
        day++;
        if (daysOfWeek.length <= 7) {
          daysOfWeek.push(day);
        }
      }
      return dates;
    },
    getPrevDates(monthFirstDay, daysOfWeek, prevDay) {
      for (let j = 0; j < monthFirstDay; j++) {
        daysOfWeek.push(prevDay);
        this.prevDate.push(prevDay);
        prevDay += 1;
      }
    },
    padDates(daysOfWeek) {
      const len = daysOfWeek.length;
      const leftDays = 7 - len;
      if (len >= 0 && len < 7) {
        for (let i = 1; i <= leftDays; i++) {
          daysOfWeek.push(i);
          if (this.previewDate.length < leftDays) this.previewDate.push(i);
        }
      }
    },
    controlMonth(p) {
      if (p === "prev") {
        this.currentMonth = this.month - 1;
        this.currentYear = this.year;
        if (this.month === 1) {
          this.currentMonth = 12;
          this.currentYear = this.year -= 1;
        }
      } else {
        this.currentMonth = this.month + 1;
        this.currentYear = this.year;
        if (this.month === 12) {
          this.currentMonth = 1;
          this.currentYear = this.year += 1;
        }
      }
      const param = [this.currentYear, this.currentMonth];
      this.init(param);
    },
    controlYear(p) {
      if (p === "prev") {
        this.currentYear = this.year - 1;
      } else {
        this.currentYear = this.year + 1;
      }
      const param = [this.currentYear, this.month];
      this.init(param);
    },
    datepicker() {
      this.isPickerClicked = !this.isPickerClicked;
      var container = document.getElementById("scrollView");
      container.scrollTop = container.scrollHeight;
    },
    skipBy(p) {
      this.currentYear = new Date().getFullYear();
      if (p === "today") {
        this.currentMonth = new Date().getMonth() + 1;
      } else {
        this.currentMonth = p + 1;
      }
      const param = [this.currentYear, this.currentMonth];
      this.init(param);
    },
    isPrevDates(day, idx) {
      return (this.prevDate.indexOf(day) > -1 && idx < 1) || (this.previewDate.indexOf(day) > -1 && idx > 1);
    },
    isSelectedDates(day) {
      return this.SelectedDate === day;
    },
    dayClicked(day) {
      this.SelectedDate = day;
      const dates = {
        year: this.year,
        month: this.month,
        day: day,
      };
      this.$emit("dayClicked", dates);
      console.log(this.year + "년" + this.month + "월" + day + "일");
    },
  },
};
</script>

<style>
td.prev-dates {
  color: #d2d2d2;
}
/* .hover-date:hover {
  font-size: 20px;
} */

/* .today-date {
  background-image: url("data:image/svg+xml,%3Csvg width='44' height='36' viewBox='0 0 44 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.75 27.1667L15.4 29H33V13.1111L31.35 10.6667L28.6 7H11V24.1111L13.75 27.1667Z' fill='%23FFD74A'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
} */

.dateOnly {
  height: 20px;
}
.selected-date {
  color: #2d2d2d;
  background-image: url("data:image/svg+xml,%3Csvg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.75 20.1667L4.4 22H22V6.11111L20.35 3.66667L17.6 0H0V17.1111L2.75 20.1667Z' fill='%23EAEAEA'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
