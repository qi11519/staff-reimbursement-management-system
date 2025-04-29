<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <!-- User Info -->
    <div class="user-info">
      <a><b>Current User:</b> {{ UserStore.currentUser?.account }}</a>
      <a><b>User Role:</b> {{ UserStore?.currentUser?.role }}</a>
      
      <!-- Submit Button -->
      <Button style="width: 150px; margin-top: 10px;" label="Logout" severity="danger" @click="handleLogout" />
    </div>

    <!-- Staff Dashboard -->
    <Tabs
      v-if="
        UserStore.currentUser?.role && UserStore.currentUser.role === 'Staff'
      "
      :value="0"
    >
      <TabList>
        <Tab :value="0">Application Form</Tab>
        <Tab :value="1">Application History</Tab>
      </TabList>
      <TabPanels>
        <!-- Rebursement Application Form -->
        <TabPanel :value="0">
          <ClaimApplication></ClaimApplication>
        </TabPanel>
        <!-- Rebursement Application History -->
        <TabPanel :value="1">
          <ClaimRecord></ClaimRecord>
        </TabPanel>
      </TabPanels>
    </Tabs>

    <!-- Rebursement Management Table -->
    <ClaimManagement
      v-if="
        UserStore.currentUser?.role && UserStore.currentUser.role === 'Admin'
      "
    ></ClaimManagement>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ClaimApplication from "../component/claimApplication.vue";
import ClaimRecord from "../component/claimRecord.vue";
import ClaimManagement from "../component/claimManagement.vue";
// Store
import { useUserStore } from "../store/UserStore";
// PrimeVue Component
import Button from "primevue/button";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

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
  align-items: center;
  margin-bottom: 20px;

  b {
    color: rgb(163, 142, 163);
  }
}
</style>
