<template>
    <v-row>
        <v-col class="mx-8" md="4" cols="12">
            <v-avatar
                size="160"
                class="float-right"
                :image="perfil.foto"
            ></v-avatar>
        </v-col>

        <v-col class="mx-8" md="6" cols="12">
            <div class="d-flex">
                <h3 class="my-auto">{{perfil.nomeUsuario}}</h3>
                <v-spacer></v-spacer>
                <v-btn class="mr-6" variant="outlined">Editar Perfil</v-btn>
                <i class="fa-solid fa-gear ma-auto"></i>
                <v-spacer></v-spacer>
            </div>

            <div class="d-flex my-5">
                <p class="mr-6" >{{perfil.publicacoes}} publicações</p>
                <p class="mr-6">{{perfil.seguidores}} seguidores</p>
                <p class="mr-6">{{perfil.seguindo}} seguindo</p>
            </div>

            <div>
                <p v-html="perfil.descricao"></p>
            </div>            
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: {
        perfil: Object
    }
}
</script>

