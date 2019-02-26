<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <modals-container />
    <img :src="member.thumbnailImage" width="400" height="400"/>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">memberID</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{requestMemberId}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">카카오 id</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.kakaoId}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">닉네임</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.nickName}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">썸네일</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.thumbnailImage}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">연령대</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.ageRange}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">성별</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.gender}}</div>
    </div>
    <div class="row detailDiv">
      <div class="col-sm-4" style="background-color:lavender;">request status</div>
      <div class="col-sm-8" style="background-color:lavenderblush;">{{member.requestStatus}}</div>
    </div>
    <div>
      <button @click="callAcceptModal" class="btn btn-primary" > 이 친구랑 가치놀기 </button>
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
import AcceptApplyModal from './AcceptApplyModal'


export default {
  name: 'MemberDetail',
  props: {
    requestMemberId: String
  },
  data () {
    return {
      member: {
        roomId: '',
        kakaoId: '',
        nickName: '',
        profileImage: '',
        thumbnailImage: '',
        ageRange: '',
        gender: '',
        requestStatus: ''
      }
    }
  },
  methods: {
    callAcceptModal() {
      this.$modal.show(AcceptApplyModal
      /*, {
          modal: this.$modal }
      , {
          name: 'accept-container',
          width : '330px',
          height : '130px',
          draggable: true
        }*/)
      },
    acceptApplicant() {
      const APPLY_ROOM_REQ_URL = Vue.prototype.$serverIp + '/room/applyRoom/status'
      //TODO change to Kakao Session id (my Id)
      this.room.roomId = this.$store.state.roomId
      this.room.requestMemberId = this.requestMemberId
      this.room.requestStatus = '20' // apply
      

      axios.put(APPLY_ROOM_REQ_URL, this.room).then(res => {

      })
    },
    rejectApplicant() {
      console.log('rejectApplicant')
      const APPLY_ROOM_REQ_URL = Vue.prototype.$serverIp + '/room/applyRoom/status'
      console.log('APPLY_ROOM_REQ_URL : ' + APPLY_ROOM_REQ_URL)
      //TODO change to Kakao Session id (my Id)
      this.room.roomId = this.$store.state.roomId
      this.room.requestMemberId = this.requestMemberId
      this.room.requestStatus = '30' // reject
      

      axios.put(APPLY_ROOM_REQ_URL, this.room).then(res => {

      })
    }
  },
  created () {
    const ROOM_DETAIL_REQUEST = Vue.prototype.$serverIp + '/member/' + this.requestMemberId
    console.log('ROOM_DETAIL_REQUEST : ' + ROOM_DETAIL_REQUEST)
    axios.get(ROOM_DETAIL_REQUEST).then((res) => {
      this.member = res.data.resultItems
      this.member.requestStatus = '승인. 이부분 어떻게 처리할지 고민해야 함'
    })
  },
  mounted () {
    //this.callAcceptModal() 
  },
  components: {
    'NaviBar': NaviBar,
    'AcceptApplyModal': AcceptApplyModal
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
