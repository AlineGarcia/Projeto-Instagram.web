<template>
  <v-container class="h-100 d-flex">
    <v-card class="ma-auto" variant="text" width="350">
      <div class="text-center">
        <v-avatar
          color="#212121"
          size="180"
          :image="formData.fotoPerfil"
        >
          <input class="custom-file-input" type="file" @change="openFile">
        </v-avatar>
        <div v-if="formData.fotoPerfil != null" class="my-4">
          <input class="custom-file-input-editar" type="file" @change="openFile">
        </div>
      </div>

      <v-col cols="12" md="12">
          <v-text-field
              v-model="formData.nomeUsuario"
              density="compact"
              label="Nome de Usuário"
              variant="outlined"
              hide-details
          ></v-text-field>
      </v-col>

      <v-col class="py-0 my-0" cols="12" md="12">
        <v-textarea v-model="formData.descricao" hide-details label="Descrição" variant="outlined">

        </v-textarea>
      </v-col>

      <v-col cols="12" md="12">
        <strong>Tipo de Perfil:</strong>
      </v-col>

      <v-radio-group v-model="formData.tipoPerfil" hide-details>
        <v-radio label="Público" :value="1"></v-radio>
        <v-radio label="Privado" :value="2"></v-radio>
      </v-radio-group>
      <v-col>
        <v-btn @click="cadastrarPerfil(formData)" variant="text" class="float-right" color="secondary">
          Criar Perfil
        </v-btn>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      formData: {
        usuarioId: null,
        fotoPerfil: null,
        nomeUsuario: null,
        descricao: null,
        tipoPerfil: null
      }
    }
  },

  methods: {
      openFile(el) {
        var file = el.target.files[0]
        var reader = new FileReader()

        if (file) {
          reader.onload = (e) => {
            this.formData.fotoPerfil = e.target.result
          }
          reader.readAsDataURL(file)
        }
      },

      cadastrarPerfil(formData) {
          console.log('teste do perfil cadastrar =>', formData)
          formData.usuarioId = this.$store.state.userData.usuario.id
          axios.post(`https://localhost:44330/api/Perfil/cadastrar`, formData)
          .then(resp => {
            console.log('resposta ====>', resp.data)
            this.$router.push('/perfil')
          })

          // let obj = {
          //   endPoint: '/perfil/cadastrar',
          //   payLoad: formData
          // }
          
      }
  },
}
</script>

<style scoped>
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Inserir foto';
  display: inline-block;
  border-radius: 3px;
  padding: 5px 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16pt;
  text-align: center;
  width: 100% !important;
  height: 38px;
}

.custom-file-input-editar::before {
  content: 'Editar Foto';
  display: inline-block;
  border-radius: 3px;
  background-color: #212121;
  border: 1px solid #999;
  padding: 5px 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 12pt;
  text-align: center;
  width: 100% !important;
  height: 38px;
}
</style>