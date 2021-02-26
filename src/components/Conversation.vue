<template>
  <div class="ui raised container segment" id="main">
    <a @click="redirect"><p><strong>{{conversation.label}}</strong> : {{conversation.topic}}</p></a>
  </div>
</template>

<script>
export default {
  name: "Conversation",
  props : ['conversation'],
  methods : {
    redirect(){
      this.$router.push('/conversations/'+this.conversation.id)
    }
  },
}
</script>

<style lang="scss">
  .ui.icon.inverted.blue.button{
    margin-right : 15px;
  }

  #main:hover{
    background-color: #f1faff;
    a{
      color: deepskyblue;
    }
  }
</style>