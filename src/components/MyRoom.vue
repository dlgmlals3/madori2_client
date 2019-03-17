<template>
  <div class="main">
    <navi-bar></navi-bar>
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="title">제목</label>
          <input type="text" class="form-control" :disabled='isDisabled' v-model="myRoom.title" placeholder="제목 텍스트">
        </div>
        <div class="form-group col-md-6">
          <label for="maxMemberNum">인원</label>
          <input type="number" class="form-control" :disabled='isDisabled' v-model="myRoom.maxMemberNum" placeholder="인원 숫자">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ageMin">최소 나이</label>
          <input type="number" class="form-control" :disabled='isDisabled' v-model="myRoom.ageMin" placeholder="최소 나이">
        </div>
        <div class="form-group col-md-6">
          <label for="ageMax">최대 나이</label>
          <input type="number" class="form-control" :disabled='isDisabled' v-model="myRoom.ageMax" placeholder="최대 나이">
        </div>
      </div>
      <div class="form-group col-md-6">
        <label for="date">시간</label>
        <datetime type="datetime" :disabled='isDisabled' v-model="myRoom.regDate" use12-hour></datetime>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="price">가격</label>
          <input type="number" class="form-control" :disabled='isDisabled' v-model="myRoom.price" placeholder="가격">
        </div>
        <div class="form-group col-md-6">
          <label for="gender">성별</label>
          <select v-model="myRoom.gender" :disabled='isDisabled' class="form-control">
            <option value="0" selected>전체</option>
            <option value="10">남성</option>
            <option value="20">여성</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="region">지역</label>
          <select v-model="myRoom.region" :disabled='isDisabled' class="form-control">
            <option value="0" selected>전체</option>
            <option value="10">강남</option>
            <option value="20">이태원</option>
            <option value="30">홍대</option>
            <option value="40">건대</option>
            <option value="50">대학로</option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="openUrl">오픈채팅 URL</label>
          <input type="text" class="form-control" :disabled='isDisabled' v-model="myRoom.openUrl" placeholder="오픈채팅 텍스트">
        </div>
      </div>
      <div class="form-group">
        <label for="intro">소개</label>
        <textarea class="form-control" v-model="myRoom.intro" :disabled='isDisabled' aria-label="With textarea">소개를 입력하세요...</textarea>
      </div>
      <ul class="list-group list-group-flush" v-if="myRoom.myRoomRequesterList.length > 0">
        <li class="list-group-item" v-for="requester of myRoom.myRoomRequesterList" :key="requester.memberId._id"
          @click="getRequestMemberInfo(requester.memberId._id, requester.requestStatus)">
          카카오아이디 : {{requester.memberId.kakaoId}}, 닉네임 : {{requester.memberId.nickName}} 신청상태 : {{requester.requestStatus}}
        </li>
      </ul>
          <button type="button" class="btn btn-primary" @click="createMyRoom">방 만들기</button>
          <button type="button" class="btn btn-primary"  @click="editMyRoom" >방 수정하기 editMyRoom</button>
          <button type="button" class="btn btn-primary" @click="deleteMyRoom" >방 삭제하기</button>
          <!-- <button type="button" class="btn btn-primary" @click="$router.push('/room/')"> 방 목록 보기 </button> -->
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Datetime from 'vue-datetime'
import NaviBar from './NaviBar'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

export default {
  name: 'MyRoom',
  data () {
    return {
      isExist: false,
      isEditable: false,
      total: '0',
      myRoom: {
        memberId: '',
        title: '',
        maxMemberNum: '',
        regDate: '',
        price: '',
        ageMax: '',
        ageMin: '',
        gender: '',
        region: '',
        openUrl: '',
        intro: '',
        myRoomRequesterList: []
      }
    }
  },
  computed:{
    isDisabled: function() {
    	return this.isEditable
    }
  },
  watch:{
  },
  mounted () {
      let memberId = this.$store.state.memberId
      this.getMyRoomInfo(memberId)
      this.getRequesterList(memberId)
  },
  updated() {
    
  },
  methods: {
    getMyRoomInfo (memberId) {
      this.myRoom.memberId = memberId
      this.$store.state.memberId = memberId
      const MY_ROOM_INFO_REQUEST = Vue.prototype.$serverIp + '/room/' + memberId
      this.isExist = this.$store.state.isExist
      this.isEditable = this.$store.state.isEditable
      
      axios.get(MY_ROOM_INFO_REQUEST).then((res) => {
        const total = res.data.total
        const resultObj = res.data.resultItems
        const statusCode = res.data.statusCode
        const statusMsg = res.data.statusMsg

        if (total > 0 && statusCode === '200' && resultObj !== undefined) {
          console.log('is total > 0 && statusCode === 200 && resultObj !== undefined ')
          //this.$store.state.isEditable = true
          //this.$store.state.isExist = true
          this.total = res.data.total
          this.myRoom.statusCode = res.data.statusCode
          this.myRoom.title = resultObj.title
          this.myRoom.regDate = resultObj.regDate
          this.myRoom.maxMemberNum = resultObj.maxMemberNum
          this.myRoom.region = resultObj.region
          this.myRoom.ageMin = resultObj.ageMin
          this.myRoom.ageMax = resultObj.ageMax
          this.myRoom.gender = resultObj.gender
          this.myRoom.price = resultObj.price
          this.myRoom.openUrl = resultObj.openUrl
          this.myRoom.intro = resultObj.intro
        } // if
      })
    },
    getRequesterList (memberId) {
      const MY_ROOM_REQUESTER_LIST = Vue.prototype.$serverIp + '/requestMemberInfo/' + memberId
    
      axios.get(MY_ROOM_REQUESTER_LIST).then((res) => {
        this.myRoom.myRoomRequesterList = res.data.resultItems
      })
    },
    enableEditMyRoom () {
      this.isEditable = true
      const memberId = this.$store.state.memberId
      
      const GET_MY_ROOM_INFO_URI = Vue.prototype.$serverIp + '/room/' + memberId

      axios.get(GET_MY_ROOM_INFO_URI).then((res) => {
        this.total = res.data.total
        if (this.total > 0) {
          this.$store.state.isExist = true
          this.isExist = true

          this.$store.state.isEditable = true
          this.isEditable = true
        } else {
          this.$store.state.isExist = false
          this.isExist = false
        }
      })
    },
    createMyRoom() {
      const component = this

      const Swal = require('sweetalert2')
      const swalWithBootstrapButtons = Swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '방 만들기',
        text: '방을 만드시겠습니까?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: '응 방을 만들래!',
        cancelButtonText: '아니, 다시 생각해봐야겠어!',
        reverseButtons: false
      }).then((result) => {
        if (result.value) { //call accept request API
          const CREATE_MY_ROOM_URI = Vue.prototype.$serverIp + '/room/'
          this.myRoom.memberId = this.$store.state.memberId

          axios.post(CREATE_MY_ROOM_URI).then((res) => {
            if (res.data.statusCode === '200') {
              swalWithBootstrapButtons.fire({
                position: 'center',
                type: 'success',
                title: '방 만들기가 완료되었습니다!',
                showConfirmButton: false,
                timer: 1500
              })
            } else {
              swalWithBootstrapButtons.fire({
                position: 'center',
                type: 'success',
                title: '방 만들기가 실패했습니다! 서버 에러라 관리자 확인이 필요합니다 ㅠ.ㅠ',
                showConfirmButton: false,
                timer: 1500
              })
              component.$router.go(0)
            }
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) { // call reject request API
           swalWithBootstrapButtons.fire({
              position: 'center',
              type: 'error',
              title: '방 만들기를 취소했습니다!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    },
    editMyRoom() {
      const memberId = this.$store.state.memberId
      const URI = Vue.prototype.$serverIp + '/room/' + memberId

      axios.put(URI, this.myRoom).then((res) => {
        this.total = res.data.total
      })
    },
    deleteMyRoom() {
      const component = this
      const memberId = this.$store.state.memberId
      
      const Swal = require('sweetalert2')
      const swalWithBootstrapButtons = Swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '내가 만든 방 삭제하기',
        text: '방을 삭제하시겠습니까?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '응 삭제할래!',
        cancelButtonText: '아니, 다시 생각해봐야겠어!',
        reverseButtons: false
      }).then((result) => {
        if (result.value) { //call accept request API
          const memberId = this.$store.state.memberId
      
          const DELETE_MY_ROOM_URI = Vue.prototype.$serverIp + '/room/' + memberId

          axios.delete(DELETE_MY_ROOM_URI).then((res) => {
            swalWithBootstrapButtons.fire(
                  '방 삭제 완료!',
                  '방이 삭제되었습니다 =)',
                  'success'
                )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) { // call reject request API
           swalWithBootstrapButtons.fire(
                  '방 삭제 취소!',
                  '방 삭제 취소되었습니다!',
                  'error'
                )
          }
        })
    },
    refreshPage () {
      this.$router.go(0)
    },
    getRequestMemberInfo (memberId, requestStatus) {
      /*console.log('getRequestMemberInfo...')
      console.log('memberId... : ' + memberId)
      console.log('requestStatus... : ' + requestStatus)
      console.log('before this.$store.state.requestStatus... : ' + this.$store.state.requestStatus)
      console.log('before this.$store.state.isMyRoomRequestMember... : ' + this.$store.state.isMyRoomRequestMember)
      console.log('after this.$store.state.requestStatus... : ' + this.$store.state.requestStatus)
      console.log('after this.$store.state.isMyRoomRequestMember... : ' + this.$store.state.isMyRoomRequestMember)*/

      this.$store.state.requestStatus = requestStatus
      this.$store.state.isMyRoomRequestMember = true
      this.$router.push('/member/' + memberId)
    }
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
</style>
