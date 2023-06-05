<template>
    <v-dialog v-model="$store.state.showCriar" width="350">
      <v-card 
        class="ma-auto pa-3" 
        width="550"
        max-height="590"
        min-height="350"
      >

        <div class="d-flex">
          <v-btn v-if="image != null" @click="voltar()" variant="plain" class="my-auto pr-16 mr-5"><i class="fa-solid fa-arrow-left"></i></v-btn>
          <strong class="mx-auto mt-1">Criar nova publicação</strong>
          <v-btn v-if="image != null && publicacao == null" @click="publicar()" class="my-auto text-capitalize" variant="plain" density="compact" color="primary">Avançar</v-btn>
          <v-btn v-if="publicacao != null" color="secondary" class="text-capitalize" variant="plain" @click="cadastrarPublicacao(publicacao)">Compartilhar</v-btn>
        </div>

        <v-divider></v-divider>

        <v-card-text class="d-flex">
          <div v-if="image != null" class="ma-auto">
              <div v-if="publicacao != null"  class="d-flex">
                <v-img class="mx-auto mr-4" width="250" :src="image"/>
                <div>
                  <v-textarea label="Escreva uma legenda..." v-model="publicacao.legenda"></v-textarea>
                  <div>
                    <v-btn class="mt-3" size="small" variant="plain">
                      <v-icon class="mx-1">fa-solid fa-location-dot</v-icon>
                      Adicionar localização
                    </v-btn>
                  </div>
                </div>
              </div>

              <div v-else>
                <v-img class="mx-auto" width="400" height="500" :src="image"/>
              </div>
          </div>

          <div v-else class="ma-auto">
              <v-img class="mx-auto" width="150" src="../assets/upload-foto.svg"/>
              <p class="my-4 text-center">Arraste as fotos e os vídeos aqui</p>
              <input class="custom-file-input" type="file" @change="openFile">
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
  
  <script>
  import axios from 'axios'
  export default {
    data () {
      return {
        image: null,
        publicacao: null
      }
    },

    methods: {
      openFile(el) {
        var file = el.target.files[0]
        var reader = new FileReader()

        if (file) {
          reader.onload = (e) => {
            this.image = e.target.result
          }
          reader.readAsDataURL(file)
        }
      },

      voltar() {
        this.image = null
        this.publicacao = null
      },

      publicar() {
        this.publicacao = {
          perfilId: this.$store.state.userData.perfil.id,
          foto: this.image,
          legenda: null,
          arquivar: false
        }
      },

      base64ToArrayBuffer(base64) {
        var binaryString = atob(base64);
        console.log('substring', binaryString)
          var bytes = new Uint8Array(binaryString.length);
          for (var i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
          }
          return bytes.buffer;
      },

      cadastrarPublicacao(publicacao) {
        console.log('testando cadastro de publi', publicacao)
          axios.post('https://localhost:44330/api/Publicacao/cadastrar', publicacao)
          .then(resp => {
              console.log('resposta', resp.data)
              this.$store.state.showCriar = false
              this.image = null
              this.publicacao = null
          })
      }
    }
  }
  </script>
  
<style scoped>

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Selecionar do computador';
  display: inline-block;
  background-color: #bb86fc;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  width: 100% !important;
  height: 38px;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>