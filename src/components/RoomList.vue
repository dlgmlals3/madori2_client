<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="room of currentRoomList" :key="room.memberId" @click="$router.push('/room/' + room.memberId)">
        ID : {{room.memberId}}, title : {{room.title}}, regDate: {{room.regDate}}
      </li>
    </ul>
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
      roomList: [],
      currentRoomList: []
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
        this.roomList = resultObj.resultList
        this.total = resultObj.total
        this.pageChange()
      })
    }
  },
  created () {
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
