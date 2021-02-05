<template>
  <div>
    <Header/>
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
      }).catch(error => {
        alert("Error : " + error);
      })
    }
  },
};
</script>
<style>
  /*.a-container{
    margin: 40px 0 0 0;

  }*/
</style>