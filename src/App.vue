<template>
  <div class="content" :class="darkTheme ? 'dark' : 'light'">
    <!-- Header bar -->
    <div class="header">
      <b>{{ darkTheme ? 'Dark Theme' : 'Light Theme' }}</b>
      <ToggleSwitch v-model="darkTheme" />
    </div>
    <div class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// PrimeVue Component
import ToggleSwitch from "primevue/toggleswitch";

// Default is dark theme
const darkTheme = ref(true);
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 1rem;
  transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
}

/* Theme */
.light {
  color: #213547;
  background-color: #ffffff;
}

.dark {
  color: #ffffffde;
  background-color: #242424;

  :deep(.p-tablist-tab-list), :deep(.p-tabpanels), :deep(.p-datatable-header-cell) ,:deep(.p-datatable-tbody > tr){
    background-color: #242424;
    color: #ffffffde;
  }
}

:deep(.p-tablist-tab-list), :deep(.p-tabpanels), :deep(.p-datatable-header-cell) ,:deep(.p-datatable-tbody > tr){
  transition: color 0.35s ease-in-out, background-color 0.35s ease-in-out;
}

:deep(.p-datatable-column-header-content){
  display: flex;
  justify-content: center;
}

:deep(.p-datatable-tbody > tr > td){
  text-align: center;
}

/* Header */
.header {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-right: 20px;

  b {
    margin-right: 10px;
  }
}
</style>
