<template>
  <div class="table-container">
    <!-- Record Table -->
    <DataTable
      v-if="historicalApplication && historicalApplication.length > 0"
      :value="historicalApplication"
      stripedRows
      tableStyle="min-width: 50rem"
    >
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
      <Column header="Result">
        <template #body="slotProps">
          <Tag
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
  <!-- historicalApplication {{ historicalApplication }} -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";

const UserStore = useUserStore();
const UserDabataseStore = useUserDatabaseStore();

// Keep track if theres existing application for current staff
const historicalApplication = computed(() => {
  return UserDabataseStore.applicationList.filter(
    (app) => app.account === UserStore.currentUser?.account
  );
});

// Get severity for record status/result
const getSeverity = (status) => {
  switch (status) {
    case "Pending":
      return "contrast";

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
  min-width: 840px;
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
