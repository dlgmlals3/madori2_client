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
	"<div> <font color='red'> <h2>  GNJ </h2></font> </div>"
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
  		default() { return "GNJ" }
  	},
  	datenow : {
  		type: String,
  		default() { return "1986-10-01" }
  	},
  },
  data () {
  	return { // use in property
  		entryPicture: require('../assets/login/logo.png'),
      kakaotalkPicture: require('../assets/login/kr/kakao_account_login_btn_large_wide.png'),
      member: {
        id: '', 
        nickName: '',
        profileImage: '',
        thunbnailImage: '',
        ageRange: '',
        gender: ''
      }
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
      fail: (err) => this.onFailure(err),
      });
    },
    onSuccess(authObj) {
        const router = this.$router
        const member = this.member
        console.log("onSuccess, authObj : " + JSON.stringify(authObj))
        //console.log('token : ' + token)


        Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            console.log('SUCCESS : ' + JSON.stringify(res))
            
            let memberProperties = res.properties
            let memberKakaoAccount = res.kakao_account
            //console.log('memberInfo id : ' + this.member.id)
            console.log('res id : ' + res.id)
            //this.member.id = res.id
            member.id = res.id
            member.nickName = memberProperties.nickname
            member.profileImage = memberProperties.profile_image
            member.thumbnailImage = memberProperties.thumbnail_image
            member.ageRange = memberKakaoAccount.age_range
            member.gender = memberKakaoAccount.gender

            console.log('member id : ' + member.id)
            console.log('member nickName : ' + member.nickName)
            console.log('member thumbnailImage : ' + member.thumbnailImage)
            console.log('member ageRange : ' + member.ageRange)
            console.log('member gender : ' + member.gender)

            //router.push('/myRoom/')
          },
          fail: function(error) {
            console.log('FAIL : ' + JSON.stringify(error))
          }
	      });

        


        //this.$router.push('/myRoom/')
        /*Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            console.log('SUCCESS : ' + JSON.stringify(res))
            router.push('/myRoom/')
          },
          fail: function(error) {
            console.log('FAIL : ' + JSON.stringify(error))
          }
	  });*/
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

