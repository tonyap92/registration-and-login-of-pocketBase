<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import { inject, ref } from 'vue';
// import { RouterView } from 'vue-router';

const pb: any = inject('pb');
const userData = ref(pb.authStore.model);
pb.authStore.onChange(() => {
  userData.value = pb.authStore.model;
});
</script>

<template>
  <div class="w-full mx-auto mt-20 pb-16 xs:px-24 xs:py-24 font-sans text-black bg-white box-border overflow-hidden">
    <AppHeader :userData="userData"></AppHeader>
    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
</template>

<style scoped></style>
