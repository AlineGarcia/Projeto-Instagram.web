<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props }">
        <div class="d-flex">
            <v-btn
              variant="text"
              v-bind="props"
              block
            >
            <i class="fa-solid fa-bars mr-1"></i>
              Mais
            </v-btn>
        </div>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title><v-btn>{{ item.title }}</v-btn></v-list-item-title>
          
          <template v-slot:prepend>
                <v-icon size="small">{{item.icon}}</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
data: () => ({
      items: [
        { title: 'Configurações', icon: 'fa-solid fa-gear' },
        { title: 'Salvos', icon: 'fa-regular fa-bookmark' },
        { title: 'Alterar modo', icon: 'fa-regular fa-moon' },
        { title: 'Sair', icon: 'fa-regular fa-circle-xmark' },
      ],
    }),
}
</script>

<style>

</style>