<script setup lang="ts">
import { inject, ref } from 'vue';
import RegistrationForm from '../components/RegistrationForm.vue';
import Routes from '../consts/Routes';

const pb: any = inject('pb');
const errors = ref<string[]>([]);
const isSuccess = ref(false);

const handleRegister = async (data: any) => {
  console.log('> handleRegister', { ...data });
  errors.value = [];
  console.log('\t pb', pb);
  await pb
    .collection('users')
    .create({
      username: data.username,
      password: data.password,
      passwordConfirm: data.password,
    })
    .then((result: any) => {
      console.log('> handleRegister -> result:', result);
      isSuccess.value = true;
    })
    .catch((e: any) => {
      console.log('> handleRegister -> error:', e.data.data);
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
  <RegistrationForm title="Registration" v-if="!isSuccess" :errors="errors" registration @register="handleRegister">
    <RouterLink :to="Routes.LOGIN">
      <small>Login</small>
    </RouterLink>
  </RegistrationForm>
  <div v-else class="mt-28 text-center">
    <h1 class="text-green-500">User registered succesful</h1>
  </div>
</template>

<style scoped></style>
