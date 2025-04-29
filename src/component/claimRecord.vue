<template>
  <div class="table-container">
    <table v-if="historicalApplication && historicalApplication.length > 0">
      <thead>
        <tr>
          <td>ID</td>
          <td>Description</td>
          <td>Amount</td>
          <td>Result</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in historicalApplication">
          <td>{{ application?.id }}</td>
          <td>{{ application?.description }}</td>
          <td>{{ application?.amount }}</td>
          <td :class="application.status === 'Pending'? 'gray-text' : application.status === 'Approved' ? 'green-text' : 'red-text'">
            {{ application.status }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- If no pending application -->
    <div v-else class="form-container" style="justify-content: center">
      <b>No reimbursement application at the moment...</b>
    </div>
  </div>
  <!-- historicalApplication {{ historicalApplication }} -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const UserStore = useUserStore();
const UserDabataseStore = useUserDatabaseStore();

// Keep track if theres existing application for current staff
const historicalApplication = computed(() => {
  return UserDabataseStore.applicationList.filter(
    (app) => app.account === UserStore.currentUser?.account
  );
});
</script>

<style scoped>
.form-container {
  width: 600px;
  height: 400px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(166, 166, 166);
  border-radius: 5px;
}

.gray-text {
    color: rgb(149, 147, 169);
    font-weight: bold;
}

.green-text {
    color: rgb(0, 176, 0);
    font-weight: bold;
}

.red-text {
    color: rgb(207, 0, 0);
    font-weight: bold;
}

/* Table Matters */
table,
th,
td {
  border: 1px solid rgb(157, 157, 157);
  border-collapse: collapse;
}

th,
td {
  padding: 5px 15px 5px 15px;
}

tr td {
  min-width: 150px;
  font-weight: bold;
}

.table-container {
  min-width: 600px;
  height: 400px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
