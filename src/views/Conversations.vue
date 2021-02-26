<template>
  <div>
    <Header/>
    <sui-modal v-model="add">
      <sui-modal-header>Créer une nouvelle conversation</sui-modal-header>
      <sui-modal-content>
        <sui-form>
          <sui-form-fields fields="two">
            <sui-form-field>
              <label>Label</label>
              <input type="text" placeholder="Label" required v-model="label"/>
            </sui-form-field>
            <sui-form-field>
              <label>Topic</label>
              <input type="text" placeholder="Topic" required v-model="topic"/>
            </sui-form-field>
          </sui-form-fields>
        </sui-form>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button negative @click.native="setAdd">
          Cancel
        </sui-button>
        <sui-button positive @click.native="ajouterConversation">
          Ajouter
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-button icon="plus circle" size="large" color="green" content="Ajouter" id="addbtn" @click="setAdd"></sui-button>
    <div id="listConversations">
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
      });
    },
    ajouterConversation(){
      api.post('channels',{
        label: this.label,
        topic: this.topic
      }).then(response => {
          alert('Conversation ajouté avec succès');
          this.setAdd();
          this.chargerConversations();
      }).catch(error => {
        alert("Error : " + error);
      })
    },
    setAdd(){
      this.add = !this.add;
      this.effacerDonnees();
    },
    effacerDonnees(){
      this.topic = "";
      this.label = "";
    }
  },
};
</script>
<style>
  #listConversations{
    margin-top: 30px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }

  #addbtn{
    position: fixed;
    right: 20px;
    top: 100px
  }

</style>