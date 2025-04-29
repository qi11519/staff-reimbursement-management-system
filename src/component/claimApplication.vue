<template>
  <div class="form-container">
    <h2>Apply Reimbursement</h2>
    <!-- Account Field -->
    <FloatLabel variant="on">
      <InputText style="width: 500px" id="amount" v-model="amount" />
      <label for="amount">Amount</label>
    </FloatLabel>

    <!-- description Field -->
    <FloatLabel variant="on">
      <InputText style="width: 500px" id="description" v-model="description" />
      <label for="description">Description</label>
    </FloatLabel>

    <!-- Submit Button -->
    <Button label="Submit" @click="handleSubmit" />
  </div>

  <!-- If application exist and still pending
  <div v-if="existingApplication && existingApplication.status === 'Pending'" class="form-container" style="justify-content: center;">
    <b>Your Reimbursement request is now waiting for approval...</b>
    <text>Please inform admin or your superior for follow up.</text>
    <text>Amount: {{ existingApplication.amount }}</text>
    <text>Description: {{ existingApplication.description }}</text>
    <text>Status: <status :class="existingApplication.status === 'Pending'? 'gray-text' : existingApplication.status === 'Approved' ? 'green-text' : 'red-text'">{{ existingApplication.status }}</status></text>
  </div>

 If application exist and is resovled
  <div v-if="existingApplication && (existingApplication.status === 'Approved' || existingApplication.status === 'Declined')" class="form-container" style="justify-content: center; ">
    <h4>Your previous reimbursement request</h4>
    <text>Amount: {{ existingApplication.amount }}</text>
    <text>Description: {{ existingApplication.description }}</text>
    <text>Status: <status :class="existingApplication.status === 'Pending'? 'gray-text' : existingApplication.status === 'Approved' ? 'green-text' : 'red-text'">{{ existingApplication.status }}</status></text>
    New Submit Button
    <Button style="margin-top: 20px" label="Make a new application" @click="doNewApplication" />
  </div>
  -->
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

const amount = ref("");
const description = ref("");

const handleSubmit = () => {
    UserDabataseStore.addApplication({ amount: amount, description: description, account: UserStore.currentUser?.account, status: "pending" });
}
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
</style>
