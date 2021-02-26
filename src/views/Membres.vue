<template>
  <div>
    <Header/>
    <sui-modal v-model="infoMembre">
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
        <sui-button @click.native="setInfoMembre">
          Close
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
    <sui-button icon="plus circle" size="large" color="green" content="Ajouter" id="addbtn" @click="setInfoMembre"></sui-button>
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
    Header
  },
  mounted(){
    this.chargerMembres();
    this.$bus.$on('charger-membres',this.chargerMembres);
  },
  methods: {
    chargerMembres(){
      api.get('membres').then(response => {
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

#addbtn{
  position: fixed;
  right: 20px;
  top: 100px
}

</style>