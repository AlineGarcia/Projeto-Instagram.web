<template>
  <menu-vertical :showPesquisa="(rail) => showPesquisa = rail"/>
  <!-- <button-pesquisa v-if="showPesquisa"/> -->
  <v-main style="height: 250px">
    <router-view/>
  </v-main>
</template>

<script>
// import ButtonPesquisa from '@/components/ButtonPesquisa.vue';
import { defineComponent } from 'vue';
import MenuVertical from '../components/commons/MenuVertical.vue'
export default defineComponent({

  components: {
    MenuVertical,
    // ButtonPesquisa,
  },

  data() {
    return {
      showPesquisa: false
    }
  }
});
</script>
