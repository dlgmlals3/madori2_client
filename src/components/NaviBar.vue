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
            <router-link to="/apply">내가 신청한 방보기</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'

Vue.component('navi-bar', {
  // 옵션
})

export default {
  name: 'NaviBar',
  data () {
    return {
        keyword: ''
      }
    },
  created() {

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
