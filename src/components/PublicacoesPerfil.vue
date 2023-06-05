<template>
    <v-row>
      <v-col
        v-for="item in lista"
        :key="item"
        class="d-flex child-flex"
        cols="4"
      >

        <v-dialog
          v-model="dialog"
          width="550"
        >
          <template v-slot:activator="{ props }">
            <v-img
              :src="'data:image/jpeg;base64,'+item.fotoPublicacao"
              :lazy-src="'data:image/jpeg;base64,'+item.fotoPublicacao"
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2"
              v-bind="props"
              @click="exibirFoto(item)"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </template>

          <v-card class="text-center">
            <v-card-text>
              <v-img :src="'data:image/jpeg;base64,'+detalhe.fotoPublicacao" width="500" height="500" cover></v-img>
            </v-card-text>

            <v-card-title class="d-flex">
              <legend>{{detalhe.legenda}}</legend>
              <v-spacer></v-spacer>
              <v-btn 
                color="error"
                size="small"
                variant="plain"
                icon="fa-solid fa-trash-can"
                @click="remove(detalhe.id); dialog = false"
              ></v-btn>
            </v-card-title>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
</template>

<script>
export default {
  props: {
    lista: Array,
    remove: Function
  },

  data() {
    return {
      dialog: false,
      detalhe: {}
    }
  },

  methods: {
    exibirFoto(item) {
       this.detalhe = item
    }
  }
}
</script>

<style>

</style>