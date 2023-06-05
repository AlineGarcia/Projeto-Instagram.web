<template>
  <menu-vertical/>
  <v-main style="height: 250px">
    <router-view/>
  </v-main>
</template>

<script>
import { defineComponent } from 'vue';
import MenuVertical from '../components/commons/MenuVertical.vue'
export default defineComponent({

  components: {
    MenuVertical,
  },
});
</script>
