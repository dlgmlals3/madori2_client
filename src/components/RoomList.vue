<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <!-- <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="room of currentRoomList" :key="room._id" @click="$router.push('/room/' + room._id)">
        <div v-if="room.place === 'Cherokee'"> <img :src="arenaImage" width="350" height="350"/> </div>
        <div v-else-if="room.place === 'Crown Victoria'"> <img :src="kakaoImage" width="350" height="350"/> </div>
        <div v-else> <img :src="defaultImage" width="350" height="350"/> </div>
        ID : {{room._id}}, title : {{room.title}}, regDate: {{room.regDate}}
      </li>
    </ul> -->
      <input class="form-control mr-sm-2" v-model="keyword" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" @click="searchRoomList">Search</button>
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Main Image</th>
          <th scope="col">Title</th>
          <th scope="col">Member Id</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(room, index) in currentRoomList" :key="room.memberId" @click="$router.push('/room/' + room.memberId)">
          <th scope="row">{{ index + 1}}</th>
          <td>
            <div v-if="room.place === 'Mirage'"> <img :src="arenaImage" width="100" height="100"/> </div>
            <div v-else-if="room.place === 'Crown Victoria'"> <img :src="kakaoImage" width="100" height="100"/> </div>
            <div v-else> <img :src="defaultImage" width="100" height="100"/> </div>
          </td>
          <td>{{room.title}}</td>
          <td>{{room.memberId}}</td>
          <td>{{room.regDate}}</td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-model="page"
      :per-page="this.perPage"
      :records="this.total"
      @paginate="pageChange"
      >
    </pagination>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import NaviBar from './NaviBar'
import Pagination from 'vue-pagination-2'

Vue.component('pagination', Pagination)

export default {
  name: 'RoomList',
  data () {
    return {
      page: 1,
      total: 0,
      perPage: 10,
      keyword: '',
      roomList: [],
      currentRoomList: [],
      arenaImage: require('../assets/login/arena.jpg'),
      kakaoImage: require('../assets/login/kr/kakao_account_login_btn_large_wide.png'),
      defaultImage: require('../assets/login/logo.png')
    }
  },
  methods: {
    pageChange () {
      let i
      let idx
      this.currentRoomList = [] // initiation
      // list chagned by page number
      for (i = 0; i < this.perPage; i++) {
        idx = ((this.page - 1) * this.perPage) + i
        if (idx === this.total) {
          break
        }
        this.currentRoomList[i] = this.roomList[idx]
      }
    },
    getRoomList (requestUrl) {
      axios.get(requestUrl).then((res) => {
        const resultObj = res.data
        this.roomList = resultObj.resultItems
        this.total = resultObj.total
        this.pageChange()
      })
    },
    searchRoomList() {
      const SEARCH_REQ_URL = Vue.prototype.$serverIp + '/room/search/' + this.keyword

      axios.get(SEARCH_REQ_URL).then((res) => {
        const resultObj = res.data
        this.roomList = resultObj.resultItems
        this.total = resultObj.total
        this.pageChange()
      })
    }
  },
  mounted () {
    this.$store.state.isAppliedRoom = false
    const ROOM_LIST_REQUEST = Vue.prototype.$serverIp + '/room/'

    this.getRoomList(ROOM_LIST_REQUEST)
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
