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
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.regDate}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">장소</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.region}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">가격</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.price}} 원</div>
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
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.ageMin}} 세</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">최대 나이</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.ageMin}} 세</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">최대인원</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.maxMemberNum}} 명</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">등록일자</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{room.registDate}}</div>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="requester of room.myRoomRequesterList" :key="requester.memberId">
          {{requester.memberId}}
        </li>
      </ul>
    <div v-if="room.roomId === room.requestMemberId">
      <button class="btn btn-primary" > 방 수정하기 </button>
      <button class="btn btn-primary" > 목록으로 돌아가기 </button>
    </div>
    <div v-else>
      <button class="btn btn-primary" v-if="room.maxMemberNum > room.joinedMemberCount" @click="applyRoom" > 가치 놀자고 연락하고 싶어 </button>
      <button @click="$router.push('/room/')" class="btn btn-primary" v-if="room.maxMemberNum > room.joinedMemberCount" > 목록으로 돌아가기 </button>
      <button @click="$router.push('/room/')" class="btn btn-primary" v-else  > 신청이 완료된 핫한 방입니다.목록으로 돌아가기 </button>
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
    getRoomDetail (requestUrl) {
      axios.get(requestUrl).then((res) => {
        const resultObj = res.data

        if (resultObj.statusCode === '200') {
          const room = resultObj.resultItem
          this.room.memberId = room.memberId
          this.room.title = room.title
          this.room.date = room.date
          this.room.place = room.place
          this.room.maxMemberNum = room.maxMemberNum
          this.room.region = room.region
          this.room.regDate = room.regDate
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
    },
    applyRoom() {
      const APPLY_ROOM_REQ_URL = Vue.prototype.$serverIp + '/room/applyRoom/'
      //TODO change to Kakao Session id (my Id)
      this.room.requestMemberId = 'minwoohi'

      axios.post(APPLY_ROOM_REQ_URL, this.room).then(res => {

      })
    }
  },
  created () {
    const ROOM_DETAIL_REQUEST = Vue.prototype.$serverIp + '/room/' + this.memberId
    this.getRoomDetail(ROOM_DETAIL_REQUEST)
    const REQUESTED_ROOM_LIST = Vue.prototype.$serverIp + '/room/applyRoom/' + this.memberId
    axios.get(REQUESTED_ROOM_LIST).then((res) => {
      this.room.myRoomRequesterList = res.data.resultItems
    })
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
