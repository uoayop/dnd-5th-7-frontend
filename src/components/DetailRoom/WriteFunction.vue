<template>
  <div class="flex flex-col h-100 font-regular text-14 bg-white funcpicker">
    <div
      class="flex justify-center items-center py-1.4 px-28 h-50 w-140 hoverPicker"
      v-for="(func, index) in functions"
      v-bind:key="index"
    >
      <div @click="goWithParam('contents', func.want)">{{ func.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  // 민규님 여기에요!!!!!!!!!@!@!@
  props: ["rId", "rTitle"],
  data() {
    return {
      Selected: ",",
      functions: [
        { text: "글 기록하기", want: "text", roomId: this.rId, roomTitle: this.rTitle },
        { text: "사진 기록하기", want: "picture" },
      ],
    };
  },
  methods: {
    goWithParam(page, param) {
      this.$router.push({ name: page, params: { want: param, roomId: this.rId, roomTitle: this.rTitle } });
    },
  },
};
</script>

<style>
.funcpicker {
  background-color: white;
}

.hoverPicker:hover {
  background-color: #eaeaea;
}
</style>
