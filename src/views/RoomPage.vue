<template>
  <v-app>
    <Header
      @onClickSlider="onClickSlider"
      :title="this.rooms.title"
      :rid="this.rooms.roomId"
      :like="this.rooms.bookmark"
    ></Header>
    <teleport to="#end-of-body" :disabled="!this.onClickedHamburger">
      <Slider
        v-if="this.onClickedHamburger"
        @sliderClosed="onClickSlider"
        :userId="this.rooms.user_id"
        :roomId="this.rooms.roomId"
      ></Slider>
    </teleport>
    <FloatingBtn :host_id="this.rooms.user_id" :roomId="this.rooms.roomId" :roomTitle="this.rooms.title" />
    <div v-if="this.rooms == null" class="h-full bg-bg">
      <NoRecord></NoRecord>
    </div>
    <div v-else class="h-full"><LayoutView v-if="this.rooms" class="h-full" :roomsInfo="this.rooms" /></div>
  </v-app>
</template>

<script>
import Header from "../components/Headers/RoomHeader.vue";
import NoRecord from "../components/Rooms/NoRecord.vue";
import Slider from "../components/SlideBar/RoomSlider.vue";
import LayoutView from "../components/Layout/layoutView.vue";
import FloatingBtn from "../components/DetailRoom/FloatingBtn.vue";

import { computed } from "vue";
import { useStore } from "vuex";
import RoomService from "../api/Room/services/room.service";

import axios from "axios";
import { useRoute } from "vue-router";
import { BASE_URL } from "../config";

const API_URL = `${BASE_URL}` + "/diaries/";

export default {
  props: ["id"],
  components: {
    Header,
    NoRecord,
    Slider,
    LayoutView,
    FloatingBtn,
  },
  data() {
    return {
      // [방 조회 api 호출] - get:diaries/:diaryIdx
      rooms: { roomId: this.id, title: "일기장 제목", date: "", user_id: 0, mood: "", bookmark: false },
      onClickedHamburger: "",
      host_id: 0,
    };
  },
  methods: {
    onClickSlider(signal) {
      this.onClickedHamburger = signal;
    },
    hostId(id) {
      this.host_id = id;
    },
  },
  async created() {
    window.scrollTo(0, 0);

    const response = await axios.get(API_URL + this.id, { withCredentials: true });
    console.log(response);

    const roomListRes = await RoomService.GetRoomList(this.id);
    const { id, title, date, user_id, mood, bookmark } = roomListRes.data;
    const result = {
      roomId: id,
      title: title,
      date: date,
      user_id: user_id,
      mood: mood,
      bookmark: bookmark,
    };
    this.rooms = { ...result };

    console.log(">>>", this.rooms);
    // console.log("rooms:", this.rooms);
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const roomList = computed(() => store.state.roomStore.RoomList);
    // [api 연결] ; 로컬에서 에러 나서 주석 처리 했습니다.
    // const uid = computed(() => store.state.userStore.id);
    const userData = computed(() => {
      return store.getters[`userStore/getUser`];
    });
    const roomIdData = computed(() => {
      return store.getters[`roomStore/getRoomId`];
    });
    store.commit("roomStore/setRoomId", route.params.id);
    console.log("adsfsadfdsa", route.params.id);
    console.log("adfsailhfdsalhflkdsahflksahfdl", roomIdData.value);

    // dummydata.forEach((element) => {
    //   store.commit("addRoomList", element);
    // });

    // const getRoomList = computed(() => store.getters.roomList);
    return { roomList, userData };
  },
};
</script>

<style></style>
