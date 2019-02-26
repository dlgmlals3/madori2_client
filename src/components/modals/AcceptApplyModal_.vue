<template>
    <div class="container">
        <div class="input-group col-md-3">
            <span class = "input-group-addon">
                이 친구랑 가치 노시겠습니까?
            </span>
            <input type="text" v-model="requestStatus" class="form-control col-md-2">
        </div>
        <div class="row col-md-6"> 
            <input class="btn btn-default col-md-3" @click="acceptRequest" type="button" value="이 친구랑 가치놀기 (승인하기)">
            <input class="btn btn-default col-md-3" @click="rejectRequest" type="button" value="이 친구랑 가치놀기 싫어 (거절하기)">
            <input class="btn btn-default col-md-3" @click="$emit('close')" type="button" value="취소하기">
        </div>
    </div>
</template>
<script>
Vue.component('modals-container', {
  // 옵션
})

export default {
  data:function(){
      return {
          requestStatus:'',
      }
  },props : [
      'accept_table',
  ],methods : {
      acceptRequest(){
          console.log('requestStatus 20으로 api 호출')
          this.$emit('close')
      },
      rejectRequest(){
          console.log('requestStatus 30으로 api 호출')
          this.$emit('close')
      }
  }
}
</script>