<template>
    <!-- <div class="container">
        <div class="input-group col-md-3">
             <span class = "input-group-addon">
                  이 친구랑 가치 노시겠습니까?
            </span> 
        </div>
        <input class="btn btn-default col-md-3" @click="acceptRequest" type="button" value="승인하기">
        <input class="btn btn-default col-md-3" @click="rejectRequest" type="button" value="거절하기">
        <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소하기">
    </div>  -->
    <div class="example-modal-content">
        이 친구랑 같이 노시겠습니까?<br/>
        <input class="btn btn-default col-md-3" @click="acceptRequest" type="button" value="승인하기">
        <input class="btn btn-default col-md-3" @click="rejectRequest" type="button" value="거절하기">
        <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소하기">
    </div>
</template>
<script>
//import Vue from 'vue'


/*Vue.component('accept-modal', {
  // 옵션
})*/

export default {
  data:function() {
      return {
          requestStatus:''
      }
  },
  props : [
      'accept_table'
  ],
  methods : {
      acceptRequest() {
          alert('승인함')
          this.$emit('close')
      },
      rejectRequest() {
          alert('거절함')
          this.$emit('close')
      },
      createdCall() {
          console.log('createdCall')
      }
  },
  mounted() {
      this.createdCall()
  }
}
</script>
