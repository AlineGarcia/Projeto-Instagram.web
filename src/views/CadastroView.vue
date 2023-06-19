<template>
  <v-container class="h-100 d-flex">
    <v-card variant="text" class="ma-auto pa-5" width="400">
        <v-form>
            <v-row>
                <v-col class="text-center my-3">
                    <h1 class="fonte-titulo">Linstagram</h1>
                    <small>Cadastre-se para ver fotos e vídeos dos seus amigos.</small>
                </v-col>

                <v-col class="py-0" cols="12" md="12">
                    <v-text-field
                        v-model="formData.nomeCompleto"
                        :rules="[required]"
                        density="compact"
                        label="Nome Completo"
                        variant="outlined"
                    ></v-text-field>
                </v-col>

                <v-col class="py-0" cols="12" md="12">
                    <v-text-field
                        v-model="formData.email"
                        :rules="[required]"
                        density="compact"
                        label="Email"
                        variant="outlined"
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
                        variant="outlined"
                        :type="showSenha ? 'text' : 'password'"
                    ></v-text-field>
                </v-col>
         
                <v-col class="mb-3 text-center" cols="12">
                    <v-btn
                        color="secondary"
                        variant="flat"
                        block
                        class="mb-4"
                        @click="cadastrarUsuario(formData)"
                        >
                        Cadastre-se
                    </v-btn>
                    <small>
                        <div>Ao se cadastrar, você concorda com nossos</div>
                        <div>Termos, Política de Dados e Política de Cookies</div>
                    </small>
                </v-col>

                <v-col class="" cols="12">
                    <div class="d-flex mb-2">
                        <v-divider class="my-auto"></v-divider>
                        <div class="mx-3">Ou</div>
                        <v-divider class="my-auto"></v-divider>
                    </div>

                    <v-btn block class="text-capitalize" variant="plain" @click="$router.push('/login')">login</v-btn>
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
        cadastrarUsuario(formData) {
            console.log('testando cadastro de dados', formData)
                axios.post('https://localhost:44330/api/Usuario/cadastrar', formData)
                .then(resp => {
                    console.log('resposta', resp.data)
                    this.$router.push('/')
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