<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <img v-if="room.place === '11'" :src="room.arenaImage" width="400" height="400"/>
    <img v-else-if="room.place === 'Crown Victoria'" :src="room.kakaoImage" width="100" height="100"/>
    <img v-else :src="room.defaultImage" width="100" height="100"/>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">memberId</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{memberId}}</div>
    </div>
    <div>
      <button @click="acceptApplicant" class="btn btn-primary" > 이 친구랑 가치놀기 </button>
      <button @click="rejectApplicant" class="btn btn-primary" > 솔직히 너랑 놀기 싫어 </button>
      <button @click="$router.go(-1)" class="btn btn-primary"  > 뒤로 가기 </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import NaviBar from './NaviBar'
import LoginVue from './Login.vue'

export default {
  name: 'RoomDetail',
  props: {
    memberId: String
  },
  data () {
    return {
      room: {
        title: '',
        maxMemberNum: '4',
        joinedMemberCount: 1,
        date: '',
        price: '',
        ageMax: '',
        ageMin: '',
        gender: '',
        region: '',
        openUrl: '',
        intro: '',
        registDate: '',
        myRoomRequesterList: [],
        requestMemberId: '',
        arenaImage: require('../assets/login/arena.jpg'),
        kakaoImage: require('../assets/login/kr/kakao_account_login_btn_large_wide.png'),
        defaultImage: require('../assets/login/logo.png')
      }
    }
  },
  methods: {
    acceptApplicant() {
      const APPLY_ROOM_REQ_URL = Vue.prototype.$serverIp + '/room/applyRoom/'
      //TODO change to Kakao Session id (my Id)
      this.room.requestMemberId = 'minwoohi'

      axios.post(APPLY_ROOM_REQ_URL, this.room).then(res => {

      })
    },
    rejectApplicant() {
      const APPLY_ROOM_REQ_URL = Vue.prototype.$serverIp + '/room/applyRoom/'
      //TODO change to Kakao Session id (my Id)
      this.room.requestMemberId = 'minwoohi'

      axios.post(APPLY_ROOM_REQ_URL, this.room).then(res => {

      })
    }
  },
  created () {
    const ROOM_DETAIL_REQUEST = Vue.prototype.$serverIp + '/member/' + this.memberId
    /*axios.get(ROOM_DETAIL_REQUEST).then((res) => {
      this.room.myRoomRequesterList = res.data.resultItems
    })*/
  },
  components: {
    'NaviBar': NaviBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.detailDiv {
  margin-bottom: 0.5px;
}
</style>
