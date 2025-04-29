<template>
  <div class="table-container">
    <!-- Record Table -->
    <DataTable v-if="existingApplication && existingApplication.length > 0" :value="existingApplication" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column header="Charge Type">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.charge_type"
            severity="contrast"
          />
        </template>
      </Column>
      <Column field="date_of_purchase" header="Date Of Purchase"></Column>
      <Column header="Amount">
        <template #body="slotProps">
          {{ "RM " + Number(slotProps.data.amount ?? 0).toFixed(2) }}
        </template>
      </Column>
      <Column field="description" header="Description"></Column>
      <Column field="account" header="Staff"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <!-- If pending record -->
          <div v-if="slotProps.data.status === 'Pending'">
            <Button
              style="margin-right: 5px"
              label="Approve"
              severity="success"
              @click="
                UserDabataseStore.approveApplication(slotProps.data.id)
              "
            />
            <Button
              label="Reject"
              severity="danger"
              @click="UserDabataseStore.rejectApplication(slotProps.data.id)"
            />
          </div>
          <Tag
          v-else
            :value="slotProps.data.status"
            :severity="getSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
    </DataTable>


    <!-- If no pending application -->
    <div v-else class="form-container" style="justify-content: center">
      <b>No reimbursement application at the moment...</b>
    </div>
  </div>
  <!-- existingApplication {{ existingApplication }} -->
</template>

<script setup>
import { ref, computed } from "vue";
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from "primevue/tag";
import Button from "primevue/button";

const UserStore = useUserStore();
const UserDabataseStore = useUserDatabaseStore();

// Keep track if theres existing application for current staff
const existingApplication = computed(() => {
  return UserDabataseStore.applicationList;
});

// Get severity for record status/result
const getSeverity = (status) => {
  switch (status) {
    // case "Pending":
    //   return "contrast";

    case "Approved":
      return "success";

    case "Declined":
      return "danger";
    default:
      return null;
  }
};
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
