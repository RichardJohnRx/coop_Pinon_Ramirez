<template>
  <div class="ui raised grid container segment" id="main">
    <sui-modal v-model="open">
      <sui-modal-header>Informations du Membre</sui-modal-header>
      <sui-modal-content image>
        <sui-image wrapped size="medium" :src="avatar"/>
        <sui-modal-description>
          <sui-header><strong>Nom complet</strong> : {{membre.fullname}}</sui-header>
          <p><strong>Id</strong> : {{membre.id}}</p>
          <p><strong>Email</strong> : {{membre.email}}</p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="toggle">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-menu-menu class="one wide column" id="label" >
      <a is="sui-label" image @click="toggle">
        <img :src="avatar" />
      </a>
    </sui-menu-menu>
    <sui-menu-menu class="thirteen wide column">
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
      membre: null,
      avatar: '',
      access: false,
      modify: false,
      open: false
    }
  },
  mounted() {
    if(this.message.member_id === this.$store.state.membre.id){
      this.access = true;
    }
    this.chargerMembre();
  },
  methods:{
    chargerMembre(){
      this.$store.state.membres.map((membre) => {
        if(membre.id === this.message.member_id) {
          this.membre = membre;
          this.avatar = 'https://eu.ui-avatars.com/api/?name='+this.membre.fullname+'&background=random';;
        }
      });
    },
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
    },
    toggle(){
      this.open = !this.open;
    }
  }

}
</script>

<style lang="scss">

  #modMessage{
    width: 112.5px;
  }

  #label{
    width: 100px;
  }

</style>