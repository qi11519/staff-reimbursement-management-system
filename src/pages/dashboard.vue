<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>

    <p>Current User: {{ UserStore.currentUser }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// Store
import { useUserStore } from "../store/UserStore";

const UserStore = useUserStore();
</script>

<style scoped></style>
