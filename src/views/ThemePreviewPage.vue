<template>
  <v-app>
    <Header :theme="this.theme"></Header>
    <div class="h-screen bg-bg">
      <div class="flex flex-row justify-between">
        <div
          class="text-14 py-18 px-78 border-b-2 border-gray100"
          @click="themeSelected('hip')"
          :class="{ 'selected-theme': this.theme == 'hip' }"
        >
          HIP
        </div>
        <div
          class="text-14 py-18 px-62 border-b-2 border-gray100"
          @click="themeSelected('simple')"
          :class="{ 'selected-theme': this.theme == 'simple' }"
        >
          SIMPLE
        </div>
      </div>

      <div class="flex">
        <div v-if="this.theme == 'hip'" class="pt-28 px-20">
          <img src="../assets/preview_hip.png" />
        </div>
        <div v-if="this.theme == 'simple'" class="pt-28 px-20">
          <img src="../assets/preview_simple.png" />
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import Header from "../components/Headers/ThemePreviewHeader.vue";

export default {
  components: { Header },
  data() {
    return {
      theme: "hip",
    };
  },
  methods: {
    themeSelected(theme) {
      this.theme = theme;
    },
  },
};
</script>

<style>
.selected-theme {
  border-bottom: 2px solid #6c6c6c !important;
}
</style>
