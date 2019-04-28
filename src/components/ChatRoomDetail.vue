<template>
  <div>
	<navi-bar></navi-bar>
    <h1>채팅방</h1>
    <!-- <ul>
      <li v-for="(msg, index) in messages" :key="index">{{msg.msg}}</li>
    </ul> -->
    <tr v-for="(msg, index) in messages" :key="index">
      <td>{{msg.msg}}</td>
    </tr>
    <div>
      <input type="text" @keyup.enter="sendMessage()" v-model="chatBox">
    </div>
    <button type="button" class="btn btn-primary" @click="saveChatting()">전송</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
import NaviBar from './NaviBar'

export default {
  name: 'ChatRoom',
  props: {
    roomId: String
  },
  data() {
    return {
      messages: [],
      chatBox: ''
    }
  },
  computed: {

  },
  mounted() {
    const socket = this.$socket
    const component = this
    let roomId = this.roomId
    /*this.$socket.on('CONNECT', function(data) { 
      console.log('CONNECT on... type : ' + data.type)
      console.log('this.roomId : ' + roomId)

      if (data.type === 'connected') { 
        socket.emit('CONNECT'
            , { 
                type : 'join',
                name : roomId,
                room : '100'
              }
        )
      }
    })*/
    this.$socket.on('BROADCAST_MESSAGE', (data) => {
        //this.messages = data
        console.log('on BROADCAST_MESSAGE : ' + JSON.stringify(data))
        component.writeMessage('broadcast', data.name, data.message)
    })
    this.$socket.on('SYSTEM', function(data) {
      console.log('on SYSTEM : ' + JSON.stringify(data))
      component.writeMessage('system', 'system', data.message)
    })
    /*this.$socket.on('message', function(data) {
      console.log('on BROADCAST_MESSAGE : ' + JSON.stringify(this.messages))
      component.writeMessage('other', data.name, data.message)
    })*/
  },
  created() {
    const socket = this.$socket
    const component = this
    let roomId = this.roomId
    this.$socket.on('CONNECT', function(data) { 
      console.log('CONNECT on... type : ' + data.type)
      console.log('this.roomId : ' + roomId)

      if (data.type === 'connected') { 
        socket.emit('CONNECT'
            , { 
                type : 'join',
                name : roomId,
                room : '100'//테스트용 고정
              }
        )
      }
    })
  },
  methods: {
    sendMessage() {
      const socket = this.$socket
      let msg = this.chatBox
      let roomId = this.roomId
      console.log('emit SEND_MESSAGE, this.chatBox : ' + JSON.stringify(this.chatBox))
      socket.emit('SEND_MESSAGE', {
          name : roomId,
          message : msg,
          room : '100'//테스트용 고정
        })
      this.chatBox = ''
      this.writeMessage('me', '나', msg)
    },
    writeMessage(type, name, message) {
      console.log('this.chatBox : ' + this.chatBox)
      

      let printName = ''
      if (type === 'system') {
        // do nothing
      } else {
        printName = name + ' : '
      }
      
      this.messages.push({
        msg : printName + message
      })
      console.log('this.messages : ' + JSON.stringify(this.messages))
    },
    saveChatting() {
      let arr
      this.$localStorage.set('messages', JSON.stringify(this.messages))
      arr = this.$localStorage.get('messages')
      console.log('this.arr : ' + JSON.stringify(arr))
			this.sendMessage()
    }
  },
	components: {
		'NaviBar' : NaviBar
	}
}
</script>

<style>
.msg-form {
  bottom: -28px;
  position: absolute;
  left: 0;
  right: 0;
}
.msg-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  overflow-x: scroll;
}
</style>
