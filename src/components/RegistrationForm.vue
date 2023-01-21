<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    registration: boolean;
    title: string;
    errors: string[];
  }>(),
  {
    registration: false,
  }
);

const emit = defineEmits(['login', 'register']);

const inputUsername = ref<HTMLInputElement | null>(null);
const inputPassword = ref<HTMLInputElement | null>(null);
const inputConfirm = ref<HTMLInputElement | null>(null);

const checkPasswordsMatch = (): boolean => inputPassword.value!.value === inputConfirm.value?.value;

const onSendClick = async () => {
  const username = inputUsername.value!.value || '';
  const password = inputPassword.value!.value || '';
  const dto = { username, password };
  const canRegister = props.registration && checkPasswordsMatch();
  console.log('> RegistrationForm -> onSendClick', canRegister);
  if (canRegister) {
    emit('register', dto);
  } else {
    emit('login', dto);
  }
};
</script>

<template>
  <h1 class="mt-28 mb-10 text-5xl text-center">{{ props.title }}</h1>
  <div v-if="props.errors.length > 0" class="mb-10">
    <div v-for="(error, index) in errors" :key="index" class="text-center text-red-500">
      <small> {{ error }}</small>
    </div>
  </div>

  <div class="w-full max-w-xs mx-auto">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref="inputUsername"
          id="username"
          type="text"
          placeholder="username"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          ref="inputPassword"
          id="password"
          type="password"
          placeholder="******"
        />
      </div>
      <div v-if="props.registration" class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm"> Confirm </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          ref="inputConfirm"
          id="confirm"
          type="password"
          placeholder="******"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="onSendClick"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-black border-solid rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Sign In
        </button>
        <button class="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <slot />
        </button>
      </div>
    </form>
  </div>

  <div>
    <!-- <slot /> -->
  </div>
</template>

<style scoped></style>
