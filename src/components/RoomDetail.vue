<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <img v-if="room.place === '11'" :src="room.arenaImage" width="400" height="400"/>
    <img v-else-if="room.place === 'Crown Victoria'" :src="room.kakaoImage" width="100" height="100"/>
    <img v-else :src="room.defaultImage" width="100" height="100"/>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">방제</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.title}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">날짜</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.date}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">장소</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.place}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">가격</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.price}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">openUrl</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.openUrl}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">소개</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.intro}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">최소 나이</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.ageMin}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">최대 나이</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.ageMin}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">최대인원</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.maxMemberNum}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">등록일자</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.registDate}}</div>
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
    _id: String
  },
  data () {
    return {
      room: {
        title: '',
        maxMemberNum: '',
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
        arenaImage: require('../assets/login/arena.jpg'),
        kakaoImage: require('../assets/login/kr/kakao_account_login_btn_large_wide.png'),
        defaultImage: require('../assets/login/logo.png')
      }
    }
  },
  methods: {
    getRoomDetail (requestUrl) {
      axios.get(requestUrl).then((res) => {
        const resultObj = res.data

        if (resultObj.statusCode === '200') {
          const room = resultObj.result
          this.room.title = room.title
          this.room.date = room.date
          this.room.place = room.place
          this.room.maxMemberNum = room.maxMemberNum
          this.room.region = room.region
          this.room.ageMin = room.ageMin
          this.room.ageMax = room.ageMax
          this.room.gender = room.gender
          this.room.price = room.price
          this.room.openUrl = room.openUrl
          this.room.intro = room.intro
          this.room.registDate = room.registDate
        } else {
          console.log('resultObj.statusCode != 200')
        }
      })
    }
  },
  created () {
    const ROOM_DETAIL_REQUEST = Vue.prototype.$serverIp + '/room/' + this._id
    const REQUESTED_ROOM_LIST = Vue.prototype.$serverIp + '/member/requester-room' + this._id
    this.getRoomDetail(ROOM_DETAIL_REQUEST)
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
