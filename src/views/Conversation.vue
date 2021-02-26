<template>
  <div>
    <Header/>
    <sui-menu class="ui grid centered menu">
      <sui-menu-menu class="column" id="btnReturn">
        <sui-button animated color="teal" @click="retourner">
          <sui-button-content visible>Retourner</sui-button-content>
          <sui-button-content hidden>
            <sui-icon name="reply" />
          </sui-button-content>
        </sui-button>
      </sui-menu-menu>
      <sui-menu-menu class="six wide centered column dataConversation" v-if="modify">
        <form @submit.prevent="modifierConversation" class="ui bottom aligned form">
          <div class="fields">
            <div class="field">
              <label>Label</label>
              <input v-model="label" type="text">
            </div>
            <div class="field">
              <label>Topic</label>
              <input v-model="topic" type="text">
            </div>
            <div class="item">
              <label>  </label>
              <button class="ui icon inverted green button">
                <i class="save link icon"></i>
              </button>
            </div>
          </div>
        </form>
      </sui-menu-menu>
      <sui-menu-menu class="six wide centered column dataConversation" v-else>
        <h1><strong>{{conversation.label}}</strong>   :   {{conversation.topic}}</h1>
      </sui-menu-menu>
      <sui-menu-menu class="column" id="btns">
        <button class="ui icon icon inverted orange padded button" @click="setModify" v-if="modify" >
          <i class="times link icon"></i>
        </button>
        <button class="ui icon inverted blue button" @click="setModify" v-else>
          <i class="pencil alternate link icon"></i>
        </button>
        <button class="ui icon inverted red button" @click="effacerConversation" v-if="!modify">
          <i class="trash link icon"></i>
        </button>
      </sui-menu-menu>
    </sui-menu>
    <sui-menu class="ui grid menu" id="messages">
      <template v-for="message in messages">
        <Message :message="message"/>
      </template>
    </sui-menu>
    <sui-menu class="ui grid centered menu" id="formMessage">
      <sui-form @submit.prevent="ajouterMessage" class="sixteen wide column">
        <sui-form-field>
          <input type="text" placeholder="message" required v-model="message">
        </sui-form-field>
      </sui-form>
    </sui-menu>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Message from '@/components/Message.vue'

export default {
  components: {
    Header,
    Message
  },
  name: "Conversation",
  data() {
    return {
      conversation: null,
      label: '',
      topic: '',
      modify: false,
      message: '',
      messages: []
    };
  },
  mounted() {
    this.chargerConversation();
    this.$bus.$on('charger-conversation',this.chargerConversation);
  },
  methods : {
    chargerConversation(){
      api.get('channels/'+this.$route.params.id).then(response => {
        this.conversation = response.data;
        this.label = this.conversation.label;
        this.topic = this.conversation.topic;
        this.chargerMessages();
      });
    },
    retourner(){
      this.$router.push('/conversations');
    },
    effacerConversation(){
      api.delete('channels/'+this.conversation.id).then(response => {
        alert('Conversation effacée correctement');
        this.$bus.$emit('charger-conversations');
        this.retourner();
      }).catch(error => {
        alert('Error : ' + error);
      });
    },
    modifierConversation(){
      api.put('channels/'+this.conversation.id, {
        label: this.label,
        topic: this.topic
      }).then(response => {
        alert('Conversation modifié correctement');
        this.setModify();
        this.chargerConversation();
        this.$bus.$emit('charger-conversations');
      }).catch(error => {
        alert('Error : '+error);
      })
    },
    setModify(){
      this.modify = !this.modify;
    },
    chargerMessages(){
      api.get('channels/'+this.conversation.id+'/posts').then(response => {
        this.messages = response.data.reverse();
        console.log(this.messages);
      }).catch(error => {
        alert("Error : " + error);
      })
    },
    ajouterMessage(){
      api.post('channels/'+this.conversation.id+'/posts',{
        member_id: this.$store.state.membre.id,
        message: this.message
      }).then(response => {
        this.message = '';
        this.chargerMessages();
      }).catch(error => {
        alert("Error : " + error);
      })
    }
  },
}
</script>

<style lang="scss">

  #btnReturn {
    width: 137px;
  }
  .dataConversation {
    align-items: center;
    justify-content: center;
  }
  #btns {
    width: 122px;
  }
  #messages{
    max-height: calc(100vh - 250px);
    border: none;
    box-shadow: none;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #formMessage{
    position: fixed;
    bottom: 0;
    width: 100%;
  }

</style>