/* template */
<template>
  <div id="login">
  	<div> <img :src="entryPicture" width="350" height="350"/> </div>
 	<div style= "padding:20px">
 		<font color="blue"> <h1> {{ greeting }} </h1></font>
 		
 		<component1></component1>

 		<font color="black"> <h3> {{ datenow }} </h3></font>
    </div>
    <div id="kakao-login-btn" v-on:click=kakaoLogin >
       <img :src="kakaotalkPicture"/>
    </div>
  </div>
</template>

/* load script section */
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>

<script>
/* declaration */
import Vue from 'vue'
import axios from 'axios'

Vue.component('component1', { template: 
	"<div> <font color='red'> <h2> Open Time </h2></font> </div>"
});

let local_cmp = {
	template: '<div> local component! </div>'
};

export default {
  name: 'login',
  props: {
  	/* type definition */
  	apiKey: {
  		type: String,
  		default() { return 'caa85b46dd147a3ad2e040c4f37189dd' }
  	},
  	greeting : {
  		type: String,
  		default() { return "같이 놀자 GNJ" }
  	},
  	datenow : {
  		type: String,
  		default() { return "1986-10-01" }
  	},
  },
  data () {
  	return { // use in property
  		entryPicture: require('../assets/login/arena.jpg'),
  		kakaotalkPicture: require('../assets/login/kr/kakao_account_login_btn_large_wide.png'),
  	}
  },
  computed: {
    year: function() {
      return (new Date()).getUTCFullYear();
    },
  },
  methods: {
    startClock () {
      var self = this
      //this.datenow = moment().format()
      setInterval(self.time, 1000)
    },
   
    kakaoLogin() {
      console.log('click kakaotalk login')
  	  Kakao.init(this.apiKey);
  	  Kakao.Auth.login({
    	success: (authObj) => this.onSuccess(authObj),
    	fail: (err) => this.onFailure(err)
      });
    },
    onSuccess(authObj) {
        console.log("onSuccess")
        Kakao.API.request({
	    url: '/v2/user/me',
	    success: function(res) {
	      //console.log(JSON.stringify(res));
	      console.log(res.id)    
	      //this.sendToServer()
	      
	      const MY_LOGIN_REQUEST = Vue.prototype.$serverIp + '/login/' + res.id
	      console.log("request" + MY_LOGIN_REQUEST)  
	      axios.get(MY_LOGIN_REQUEST).then((res) => {
	      	console.log("get data")
	      })
	    },
	    fail: function(error) {
	      console.log(JSON.stringify(error));
	    }
	  });
    },
    onFailure(err) {
      console.log("onFailure")
    },
    sendToServer() {
      console.log("sendDataToServer")

    },
  },
  created () {
  	this.startClock()
  },
  components: {}
}
</script>

/* css */
<style>
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

