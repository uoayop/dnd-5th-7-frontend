<template>
  <div class="border-2 border-gray100 px-20 py-20 mt-20 bg-white">
    <div class="flex flex-row justify-between items-center">
      <div class="font-bold text-gray500 text-18">기록장의 정보를 입력해주세요.</div>
    </div>
    <div class="pt-22 flex flex-col justify-center items-center">
      <div class="flex flex-col">
        <div class="w-280 flex flex-col items-center justify-center">
          <Inputs class="w-280 mb-28" @setName="setName" />
          <SelectDate @dateClicked="dateClicked" :nyear="this.year" :nmonth="this.month" :nday="this.day" />
          <div v-show="isModalClicked">
            <Modal
              :myear="this.year"
              :mmonth="this.month"
              :mday="this.day"
              @dayClicked="modalToggle"
              @closeModal="modalToggle"
              @dayConfirmed="dayConfirm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Inputs from "./Inputs.vue";
import SelectDate from "./SelectDate.vue";
import Modal from "./CalendarModal.vue";

export default {
  components: { Inputs, SelectDate, Modal },
  setup() {},
  data() {
    return {
      name: "",
      data: "",
      year: "",
      month: "",
      day: "",
      isModalClicked: false,
    };
  },
  methods: {
    setName(InputName) {
      this.name = InputName;
    },
    modalToggle() {
      this.isModalClicked = !this.isModalClicked;
    },
    dayConfirm(dates) {
      this.year = dates.year;
      this.month = this.dateLength(dates.month);
      this.day = this.dateLength(dates.day);
      this.date = this.year + "-" + this.month + "-" + this.day;
      console.log(this.date);
    },
    dateClicked() {
      this.isModalClicked = !this.isModalClicked;
    },
    dateLength(m) {
      if (("" + m).length < 2) {
        return "0" + m;
      }
      return m;
    },
  },
  created() {
    this.year = new Date().getFullYear();
    this.month = this.dateLength(new Date().getMonth() + 1);
    this.day = this.dateLength(new Date().getDate());
    this.date = this.year + "-" + this.month + "-" + this.day;
    this.$emit("dateChanged", this.date);
  },
  watch: {
    day: function () {
      console.log(this.date);
      this.$emit("dateChanged", this.date);
    },
    name: function () {
      this.$emit("nameChanged", this.name);
    },
  },
};
</script>
