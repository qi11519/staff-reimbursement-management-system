<template>
  <div style="margin-bottom: 10px">
    <table v-if="pendingApplication && pendingApplication.length > 0">
      <thead>
        <tr>
          <td>Description</td>
          <td>Amount</td>
          <td>Staff</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="application in pendingApplication">
          <td>{{ application?.description }}</td>
          <td>{{ application?.amount }}</td>
          <td>{{ application?.account }}</td>
          <td>
            <Button
              style="margin-right: 5px"
              label="Approve"
              severity="success"
              @click="
                UserDabataseStore.approveApplication(application?.account)
              "
            />
            <Button
              label="Reject"
              severity="danger"
              @click="UserDabataseStore.rejectApplication(application?.account)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- If no pending application -->
    <div v-else class="form-container" style="justify-content: center">
      <b>No reimbursement application at the moment...</b>
    </div>
  </div>
  <!-- pendingApplication {{ pendingApplication }} -->
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
const pendingApplication = computed(() => {
  return UserDabataseStore.applicationList.filter(
    (app) => app.status === "Pending"
  );
});
</script>

<style scoped>
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

.form-container {
  width: 500px;
  height: 200px;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid rgb(166, 166, 166);
  border-radius: 5px;
}
</style>
