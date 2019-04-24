<template>
  <div class="naviBar">
    <!-- <nav class="navbar navbar-expand-sm fixed-top navbar-light bg-light">
       <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
        <ul class="navbar-nav mr-auto">
          <li>
            <router-link to="/myRoom">방만들기 및 방 수정하기</router-link>
          </li>
          <li>
            <router-link to="/room">방목록 보기</router-link>
          </li>
           <li>
            <router-link :to="'/applyRoom/' + naviMemberId">내가 신청한 방보기 setMember 정보로</router-link>
          </li>
          <li>
            <input type="text" class="form-control" v-model="naviMemberId">
          </li>
          <li>
            <button type="button" class="btn btn-primary" @click="setMemberId">Set MemberId</button>
          </li>
          <li>
            현재 memberId : {{memberIdText}}
          </li>
          <li>
            <router-link :to="'/applyRoom/' + storedMemberId">내가 신청한 방보기 내 member 정보로</router-link>
          </li> 
          <li>
            <router-link :to="'/chatRoom/' + storedMemberId">채팅방</router-link>
          </li>
        </ul>
      </div> 
    </nav> -->
    <nav class="navbar navbar-dark bg-dark">
      <div class="btn-group">
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Menu List
  </button>
  <div class="dropdown-menu">
    <li>
      <router-link to="/myRoom">방만들기 및 방 수정하기</router-link>
    </li>
    <li>
      <router-link to="/room">방목록 보기</router-link>
    </li>
      <li>
      <router-link :to="'/applyRoom/' + naviMemberId">내가 신청한 방보기 setMember 정보로</router-link>
    </li>
    <li>
      <input type="text" class="form-control" v-model="naviMemberId">
    </li>
    <li>
      <button type="button" class="btn btn-primary" @click="setMemberId">Set MemberId</button>
    </li>
    <li>
      현재 memberId : {{memberIdText}}
    </li>
    <li>
      현재 roomId : {{memberIdText}}
    </li>
    <li>
      <router-link :to="'/applyRoom/' + storedMemberId">내가 신청한 방보기 내 member 정보로</router-link>
    </li>
    <li>
      <router-link :to="'/chatRoomList/'">채팅방</router-link>
    </li>
  </div>
</div>
<div class="btn-group">
  <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Setting
  </button>
  <div class="dropdown-menu">
      <router-link class="dropdown-item" :to="'/'">Login</router-link>
      <a class="dropdown-item" @click="logout" href="#">Logout</a>
  </div>
</div>
    </nav>
  </div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.component('navi-bar', {
  // 옵션
})

export default {
  name: 'NaviBar',
  data () {
    return {
        keyword: '',
        naviMemberId: '', // for test
        memberIdText: '',  // get memberId text for test
        storedMemberId: '',
        roomId: '',
      }
    },
  created() {
    this.storedMemberId = this.$store.state.memberId
    this.roomId = this.$store.state.roomId
    this.getMemberId()
  },
  methods: {
    setMemberId () {
      this.$store.state.memberId = this.naviMemberId
    },
    getMemberId () {
      this.memberIdText = this.$store.state.memberId
    },
    logout () {
      const router = this.$router
  	  /*Kakao.Auth.logout(
        function(data) { 
            alert('로그아웃 되었습니다.')
            Kakao.Auth.cleanup()
            router.push('/')
         }
      )*/
      Kakao.API.request({
          url: '/v1/user/logout',
          success: function(res) {
            alert("로그아웃 성공 ")
            router.push('/')
          },
          fail: function(error) {
            alert('로그아웃 실패 : ' + JSON.stringify(error))
          }
	      });
    }
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
