<template>
  <div class="hello">
    <navi-bar></navi-bar>
    <strong>{{room.title}}</strong>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import NaviBar from './NaviBar'

export default {
  name: 'RoomDetail',
  props: ['_id'],
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
        myRoomRequesterList: []
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
          this.room.maxMemberNum = room.maxMemberNum
          this.room.region = room.region
          this.room.ageMin = room.ageMin
          this.room.ageMax = room.ageMax
          this.room.gender = room.gender
          this.room.price = room.price
          this.room.openUrl = room.openUrl
          this.room.intro = room.intro
        } else {
          console.log('resultObj.statusCode != 200')
        }
      })
    }
  },
  created () {
    const ROOM_DETAIL_REQUEST = Vue.prototype.$serverIp + '/room/' + this.id
    console.log('url : ' + ROOM_DETAIL_REQUEST)
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
</style>
