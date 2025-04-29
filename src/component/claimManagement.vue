<template>
  <div class="table-container">
    <!-- Record Table -->
    <DataTable v-if="pendingApplication && pendingApplication.length > 0" :value="pendingApplication" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="amount" header="Amount"></Column>
      <Column field="account" header="Staff"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button
              style="margin-right: 5px"
              label="Approve"
              severity="success"
              @click="
                UserDabataseStore.approveApplication(slotProps.data.account)
              "
            />
            <Button
              label="Reject"
              severity="danger"
              @click="UserDabataseStore.rejectApplication(slotProps.data.account)"
            />
        </template>
      </Column>
    </DataTable>


    <!-- If no pending application -->
    <div v-else class="form-container" style="justify-content: center">
      <b>No reimbursement application at the moment...</b>
    </div>
  </div>
  <!-- pendingApplication {{ pendingApplication }} -->
</template>

<script setup>
import { ref, computed } from "vue";
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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
