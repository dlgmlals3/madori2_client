<template>
  <div id="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ roomId }}</h1>
    <h1>{{ title }}</h1>
    <h1>{{ ageMin }}</h1>
    <h1>{{ ageMax }}</h1>
    <h1>{{ gender }}</h1>
    <h1>{{ price }}</h1>
    <h1>{{ openUrl }}</h1>
    <h1>{{ intro }}</h1>
    <button type="button" class="btn btn-warning" v-on:click="kakaoLogin()">카카오톡 로그인</button><br/>
    <router-link to="/main">Main</router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    kakaoLogin () {
      const URI = 'http://218.38.52.30:3301/room/minwoohi'

      axios.get(URI).then((res) => {
        const resultObj = res.data.result

        this.roomId = resultObj.roomId
        this.title = resultObj.title
        this.ageMin = resultObj.ageMin
        this.ageMax = resultObj.ageMax
        this.gender = resultObj.gender
        this.price = resultObj.price
        this.openUrl = resultObj.openUrl
        this.intro = resultObj.intro
      })
    }
  },
  data () {
    return {
      msg: 'Kakao Login Page...',
      name: 'HelloWorld',
      roomId: '',
      title: '',
      ageMin: '',
      ageMax: '',
      gender: '',
      price: '',
      openUrl: '',
      intro: ''
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
