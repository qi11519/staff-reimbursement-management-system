<template>
  <div class="login-container">
    <h1>Staff Reimbursement Management System</h1>
    <h2>Login</h2>

    <div class="form-container">
      <!-- Account Field -->
      <FloatLabel variant="on">
        <InputText id="account" v-model="account" />
        <label for="account">Account</label>
      </FloatLabel>

      <!-- Password Field -->
      <FloatLabel variant="on">
        <Password id="password" v-model="password" :feedback="false" />
        <label for="password">Password</label>
      </FloatLabel>

      <Button label="Submit" @click="handleLogin" />
      
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// PrimeVue Component
import FloatLabel from 'primevue/floatlabel';
import InputText from "primevue/inputtext";
import Password from 'primevue/password';
import Button from 'primevue/button';

const account = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();

// Execute login action
const handleLogin = () => {
  router.push({ name: "Dashboard"});
  console.log("afefwegrg");
}
</script>

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  flex-direction: column;;
  justify-content: center;
  align-items: center;
}

.form-container {
  max-width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
