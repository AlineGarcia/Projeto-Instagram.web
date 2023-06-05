<template>
  <v-app>
    <modal-criar></modal-criar>
    <router-view/>
  </v-app>
</template>

<script>
import ModalCriar from '@/components/ModalCriar.vue';
export default {
  name: 'App',

  components: {ModalCriar},

  data: () => ({
    //
  }),
}
</script>
