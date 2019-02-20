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
        kakaoId: '', 
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
  	  Kakao.init(this.apiKey);
  	  Kakao.Auth.login({
    	success: (authObj) => this.onSuccess(authObj),
      fail: (err) => this.onFailure(err),
      });
    },
    onSuccess(authObj) {
        const router = this.$router
        const member = this.member
        const component = this

        Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            console.log('SUCCESS : ' + JSON.stringify(res))
            const URI = Vue.prototype.$serverIp + '/member/'
            
            let memberProperties = res.properties
            let memberKakaoAccount = res.kakao_account

            member.kakaoId = res.id
            member.nickName = memberProperties.nickname
            member.profileImage = memberProperties.profile_image
            member.thumbnailImage = memberProperties.thumbnail_image
            member.ageRange = memberKakaoAccount.age_range
            member.gender = memberKakaoAccount.gender

            component.removeNullMemberInfo(member)

            /*
            component.$store.state.member.nickName = member.nickName
            component.$store.state.member.thumbnailImage = member.thumbnailImage
            component.$store.state.member.ageRange = member.ageRange
            component.$store.state.member.gender = member.gender
            */
            // set member info
            component.$store.commit('setMemberInfo', member)

            axios.post(URI, member).then((res) => {
              console.log('res : ' + JSON.stringify(res))
              component.$store.state.roomId = res.data.roomId
              component.$store.state.memberId = res.data.memberId


              console.log('res.roomId : ' + res.data.roomId)
              console.log('res.memberId : ' + res.data.memberId)
              console.log('member nickName : ' + member.nickName)
              console.log('member ageRange : ' + member.ageRange)
              console.log('component.$store.state.roomId  : ' + component.$store.state.roomId)
              console.log('component.$store.state.memberId  : ' + component.$store.state.memberId)

              router.push('/myRoom/')
            })

            
          },
          fail: function(error) {
            console.log('FAIL : ' + JSON.stringify(error))
          }
	      });

    },
    removeNullMemberInfo(member){
      if(member.nickName === null ){
        member.nickName = ''
      }
      if(member.profileImage === null ){
        member.profileImage = ''
      }
      if(member.thumbnailImage === null ){
        member.thumbnailImage = ''
      }
      if(member.ageRange === null ){
        member.ageRange = ''
      }
      if(member.gender === null ){
        member.gender = ''
      }

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
