<script setup lang="ts">
import { inject, ref } from 'vue';
import { RouterView } from 'vue-router';
import Routes from '../consts/Routes';
import { useRouter } from 'vue-router';

import RegistrationForm from '../components/RegistrationForm.vue';

const router = useRouter();

const pb: any = inject('pb');
const errors = ref<string[]>([]);
const isSuccess = ref(pb.authStore.isValid);

const handleLogin = async (data: any) => {
  console.log('> handleLogin', data);
  errors.value = [];
  console.log('\t pb', pb);
  await pb
    .collection('users')
    .authWithPassword(data.username, data.password)
    .then((result: any) => {
      console.log('> handleLogin -> result:', result);
      router.push({ path: '/calendar' });
      // isSuccess.value = true;
    })
    .catch((e: any) => {
      console.log('> handleLogin -> error:', e.data.data);
      const data = e.data.data;
      errors.value.push(e.toString());
      for (let item in data) {
        const message = `${item}: ${data[item].message}`;
        errors.value.push(message);
      }
    });
};
</script>

<template>
  <RegistrationForm v-if="!isSuccess" :errors="errors" title="Login" @login="handleLogin">
    <RouterLink :to="Routes.REGISTER">
      <small>Register</small>
    </RouterLink>
  </RegistrationForm>

  <!-- <div v-else class="mt-28 text-center">
    <h1 class="text-green-500">User login succesful</h1>
    <RouterLink :to="Routes.CALENDAR"> Calendar </RouterLink>

    <RouterLink :to="Routes.HOME"> Home </RouterLink>
  </div> -->
</template>
<style scoped></style>
