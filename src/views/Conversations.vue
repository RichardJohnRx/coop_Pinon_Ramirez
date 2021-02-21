<template>
  <div>
    <Header/>
    <div class="ui grid menu" id="addContainer">
      <sui-menu-menu id="addForm">
        <form @submit.prevent="ajouterConversation" class="ui form" v-if="add">
          <div class="fields">
            <div class="field">
              <label>Label</label>
              <input v-model="label" type="text" required>
            </div>
            <div class="field">
              <label>Topic</label>
              <input v-model="topic" type="text" required>
            </div>
            <div class="item" id="btn">
              <label>  </label>
              <button class="ui icon inverted green button">
                <i class="save link icon"></i>
              </button>
            </div>
          </div>
        </form>
      </sui-menu-menu>
      <sui-menu-menu position="right">
        <button class="ui icon icon inverted orange padded button" @click="setAdd" v-if="add">
          <i class="times link icon"></i>
        </button>
        <button class="ui icon icon inverted green padded button" @click="setAdd" v-else>
          <i class="circular inverted olive add icon"></i>
        </button>
      </sui-menu-menu>
    </div>
    <div class="a-container">
      <template v-for="conversation in $store.state.conversations">
        <Conversation :conversation="conversation"/>
      </template>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Conversation from '@/components/Conversation.vue'

export default {
  data() {
    return {
      label: "",
      topic: "",
      add: false
    };
  },
  components: {
    Header,
    Conversation
  },
  mounted(){
    this.chargerConversations();
    this.$bus.$on('charger-conversations',this.chargerConversations);
  },
  methods: {
    chargerConversations(){
      api.get('channels').then(response => {
        this.$store.commit('setConversations',response.data);
        console.log(response.data);
      });
    },
    ajouterConversation(){
      api.post('channels',{
        label: this.label,
        topic: this.topic
      }).then(response => {
          alert('Conversation ajouté avec succès');
          this.setAdd();
          this.effacerDonnees();
          this.chargerConversations();
      }).catch(error => {
        alert("Error : " + error);
      })
    },
    setAdd(){
      this.add = !this.add;
    },
    effacerDonnees(){
      this.topic = "";
      this.label = "";
    }
  },
};
</script>
<style>
  /*.a-container{
    margin: 40px 0 0 0;

  }*/
  #addContainer{
    border: none;
    box-shadow: none;
  }

  #addForm{
    margin-left: 13em;
  }

  #btn::before{
    content: none;
  }

</style>