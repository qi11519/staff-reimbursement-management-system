<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <!-- User Info -->
    <div class="user-info">
      <a><b>Current User:</b> {{ UserStore.currentUser?.account }}</a>
      <a><b>User Role:</b> {{ UserStore?.currentUser?.role }}</a>
    </div>

    <!-- Rebursement Application Form -->
    <ClaimApplication
      v-if="
        UserStore.currentUser?.role && UserStore.currentUser.role === 'Staff'
      "
    ></ClaimApplication>

    <!-- Rebursement Management Table -->
    <ClaimManagement
      v-if="
        UserStore.currentUser?.role && UserStore.currentUser.role === 'Admin'
      "
    ></ClaimManagement>

    <!-- Submit Button -->
    <Button label="Logout" severity="danger" @click="handleLogout" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ClaimApplication from "../component/claimApplication.vue";
import ClaimManagement from "../component/claimManagement.vue";
// Store
import { useUserStore } from "../store/UserStore";
// PrimeVue Component
import Button from "primevue/button";

const router = useRouter();
const UserStore = useUserStore();

// Execute logout action
const handleLogout = () => {
  UserStore.currentUser = null;
  alert("Logout Success");
  router.push({ name: "Login" });
};

onMounted(() => {
  // Logout if no user
  if (!UserStore.currentUser) {
    UserStore.currentUser = null;
    router.push({ name: "Login" });
  }
});
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;

  b {
    color: rgb(163, 142, 163);
  }
}
</style>
