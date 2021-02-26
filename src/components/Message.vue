<template>
  <div class="ui raised grid container segment" id="main">
    <sui-menu-menu class="fourteen wide column">
      <sui-input placeholder="Message" v-model="messageText" v-if="modify"/>
      <strong v-else>{{message.message}}</strong>
    </sui-menu-menu>
    <sui-menu-menu class="two wide column" id="modMessage" v-if="access">
      <div v-if="modify">
        <sui-button icon color="green" @click="modifierMessage">
          <sui-icon name="save" />
        </sui-button>
        <sui-button icon color="red" @click="setModify">
          <sui-icon name="close icon" />
        </sui-button>
      </div>
      <div v-else>
        <sui-button icon color="blue" @click="setModify">
          <sui-icon name="pencil" />
        </sui-button>
        <sui-button icon color="red" @click="effacerMessage">
          <sui-icon name="trash" />
        </sui-button>
      </div>
    </sui-menu-menu>
  </div>
</template>

<script>
export default {
  name: "Message",
  props : ['message'],
  data(){
    return{
      messageText: this.message.message,
      access: false,
      modify: false
    }
  },
  mounted() {
    if(this.message.member_id === this.$store.state.membre.id){
      this.access = true;
    }
  },
  methods:{
    modifierMessage(){
      api.put('channels/'+ this.message.channel_id +'/posts/'+this.message.id,{
        message: this.messageText
      }).then(response => {
        alert('Message modifié correctement');
        this.$bus.$emit('charger-conversation');
        this.setModify();
      }).catch(error =>{
        alert('Error : '+error);
      })
    },
    effacerMessage(){
      if(this.access){
        api.delete('channels/'+ this.message.channel_id +'/posts/'+this.message.id).then(response => {
          alert('Message effacé correctement');
          this.$bus.$emit('charger-conversation');
        }).catch(error =>{
          alert('Error : '+error);
        })
      }
    },
    setModify(){
      this.modify = !this.modify;
    }
  }

}
</script>

<style lang="scss">

  #modMessage{
    width: 112.5px;
  }

</style>