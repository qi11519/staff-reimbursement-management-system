<template>
  <div class="login-container">
    <h1>Staff Reimbursement Management System</h1>
    <h2>Login</h2>

    <div class="form-container">
      <!-- Account Field -->
      <FloatLabel variant="on">
        <InputText style="width: 400px" id="account" v-model="account" />
        <label for="account">Account</label>
      </FloatLabel>

      <!-- Password Field -->
      <FloatLabel variant="on">
        <Password style="width: 400px" id="password" v-model="password" :feedback="false" />
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
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import FloatLabel from 'primevue/floatlabel';
import InputText from "primevue/inputtext";
import Password from 'primevue/password';
import Button from 'primevue/button';

const router = useRouter();
const UserStore = useUserStore();
const UserDabataseStore = useUserDatabaseStore();

const account = ref("");
const password = ref("");
const error = ref("");

// Execute login action
const handleLogin = () => {
  // Authenticate login with provided account and password
  const result = UserDabataseStore.authenticateLogin(account.value, password.value);
  
  if (result.error) { 
    // If fail
    error.value = result.error;
  } else {
    // If Success
    error.value = null;
    UserStore.currentUser = result.user;
    alert('Login Success');
    router.push({ name: 'Dashboard' });
  }
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
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

:deep(.p-password .p-password-input) {
  width: 400px;
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
