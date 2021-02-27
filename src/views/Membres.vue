<template>
  <div>
    <Header/>
    <sui-modal v-model="infoMembre">
      <sui-modal-header>Informations du membre</sui-modal-header>
      <sui-modal-content image>
        <sui-image
            wrapped
            size="medium"
            src="static/images/avatar/large/rachel.png"
        />
        <sui-modal-description>
          <sui-header>Default Profile Image</sui-header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button @click.native="setInfoMembre">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <div id="listConversations">
      <template v-for="membre in $store.state.membres">
        <Membre :membre="membre"/>
      </template>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Membre from '@/components/Membre.vue'

export default {
  data() {
    return {
      infoMembre: false
    };
  },
  components: {
    Header,
    Membre
  },
  mounted(){
    this.chargerMembres();
    this.$bus.$on('charger-membres',this.chargerMembres);
  },
  methods: {
    chargerMembres(){
      api.get('members').then(response => {
        this.$store.commit('setMembres',response.data);
      });
    },
    setInfoMembre(){
      this.infoMembre = !this.infoMembre;
      this.effacerDonnees();
    },
  },
};
</script>
<style>
  #listConversations{
    margin-top: 30px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }

</style>