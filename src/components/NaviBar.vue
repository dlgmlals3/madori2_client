<template>
  <div class="naviBar">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li>
            <router-link to="/myRoom">방만들기 및 방 수정하기</router-link>
          </li>
          <li>
            <router-link to="/room">방목록 보기</router-link>
          </li>
          <li>
            <router-link :to="'/applyRoom/' + naviMemberId">내가 신청한 방보기</router-link>
          </li>
          <li>
            <input type="text" class="form-control" v-model="naviMemberId">
          </li>
          <li>
            <button type="button" class="btn btn-primary" @click="setMemberId">Set MemberId</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<script>
import Vue from 'vue'

Vue.component('navi-bar', {
  // 옵션
})

export default {
  name: 'NaviBar',
  data () {
    return {
        keyword: '',
        naviMemberId: ''
      }
    },
  created() {
    const component = this

    Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            console.log('SUCCESS : ' + JSON.stringify(res))
            //component.$store.state.memberId = res.id
            //console.log('this.$store.state.memberId : ' + component.$store.state.memberId)
            console.log('res.id : ' + res.id)
          },
          fail: function(error) {
            console.log('FAIL : ' + JSON.stringify(error))
          }
      });
    //this.naviMemberId = this.$store.state.memberId
  },
  methods: {
    setMemberId () {
      this.$store.state.memberId = this.naviMemberId
      console.log('this naviMemberId : ' + this.naviMemberId)
      console.log('store memberId : ' + this.$store.state.memberId)
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
