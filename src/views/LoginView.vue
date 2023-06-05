<template>
  <v-container class="h-100 d-flex">
    <v-card variant="text" class="ma-auto pa-5" width="400">
        <v-form>
            <v-row>
                <v-col>
                    <h1 class="fonte-titulo text-center mb-3">Linstagram</h1>
                </v-col>

                <v-col class="py-0" cols="12" md="12">
                    <v-text-field
                        v-model="formData.email"
                        :rules="[required]"
                        density="compact"
                        label="Email"
                        variant="solo"
                    ></v-text-field>
                </v-col>

                <v-col class="py-0" cols="12" md="12">
                    <v-text-field
                        v-model="formData.senha"
                        :append-inner-icon="showSenha ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                        @click:append-inner="showSenha = !showSenha"
                        :rules="[required]"
                        density="compact"
                        label="Senha"
                        variant="solo"
                        :type="showSenha ? 'text' : 'password'"
                    ></v-text-field>
                </v-col>
            
                <v-col cols="12">
                    <v-btn
                        color="secondary"
                        variant="flat"
                        block
                        class="mb-3"
                        @click="logarUsuario(formData)"
                        >
                        Logar
                    </v-btn>
                </v-col>

                <v-col class="" cols="12">
                    <div class="d-flex mb-2">
                        <v-divider class="my-auto"></v-divider>
                        <div class="mx-3">Ou</div>
                        <v-divider class="my-auto"></v-divider>
                    </div>

                    <v-btn block class="text-capitalize" variant="plain" @click="$router.push('/cadastro')">cadastre-se</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            formData: {
                email: null,
                nomeCompleto: null,
                senha: null
            },
            showSenha: false,
        }
    },

    methods: {
        logarUsuario(formData) {
            axios.get(`https://localhost:44330/api/Usuario/logar?email=${formData.email}&senha=${formData.senha}`)
            .then(resp => {
                sessionStorage.setItem('userData', JSON.stringify(resp.data))
                this.$router.push('/gerenciar-perfil')
            })
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Dosis&family=Roboto:ital,wght@0,300;0,700;0,900;1,300;1,700;1,900&family=Source+Sans+Pro:wght@300;600&display=swap');
.fonte-titulo {
  font-family: 'Dancing Script', cursive;
  font-size: 2.852rem;
}
</style>