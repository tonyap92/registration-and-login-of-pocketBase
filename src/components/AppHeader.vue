<script setup lang="ts">
import { computed } from 'vue';
import Routes from '../consts/Routes';
import { useRouter } from 'vue-router';

const props = defineProps<{ userData?: any }>();
const router = useRouter();

const isUserAuthenticated = computed(() => !!props.userData);
const isCurrentPageNotLogin = computed(() => {
  const currentRoute = router.currentRoute.value;
  return currentRoute.path !== Routes.LOGIN;
});

const isCurrentPageNotCalendar = computed(() => {
  const currentRoute = router.currentRoute.value;
  return currentRoute.path !== Routes.CALENDAR;
});
</script>
<template>
  <header
    class="w-full p-4 fixed top-0 grid grid-cols-2 items-center justify-between text-md xl:text-lg text-black"
    style="max-width: inherit; background: rgba(0, 0, 0, 0.1)"
  >
    <h2>
      <!-- Header -->
    </h2>

    <div v-if="isUserAuthenticated" class="justify-self-end">
      <div class="grid grid-cols-2 items-center text-black">
        Hello {{ userData.username }}!
        <div v-if="isCurrentPageNotCalendar" class="justify-self-end">
          <button class="py-2 px-4 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-full">
            <RouterLink :to="Routes.CALENDAR">Calendar</RouterLink>
          </button>
        </div>

        <div v-else="isCurrentPageNotCalendar" class="justify-self-end">
          <button class="py-2 px-4 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-full">
            <RouterLink :to="Routes.HOME">Home</RouterLink>
          </button>
        </div>
      </div>
    </div>

    <div class="justify-self-end" v-else-if="isCurrentPageNotLogin">
      <RouterLink :to="Routes.LOGIN">Login</RouterLink>
    </div>

    <div class="text-red-400 justify-self-end" v-else>You don't have access</div>
  </header>
</template>
<style scoped></style>
