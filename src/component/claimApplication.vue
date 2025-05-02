<template>
  <div class="form-container">
    <h2>Apply Reimbursement</h2>

    <!-- Charge Type -->
    <div style="width: 500px; display: flex; justify-content: space-between; align-items: center;">
      <b style="margin-right: 20px; margin-left: 10px">Charge Type</b>
      <Select style="width: 320px" v-model="selectedType" :options="typeList" placeholder="Select charge type" class="w-full md:w-56" />
    </div>

     <!-- Date of Purchase -->
     <div style="width: 500px; display: flex; justify-content: space-between; align-items: center;">
      <b style="margin-right: 20px; margin-left: 10px">Date of Purchase</b>
      <DatePicker style="width: 320px" v-model="dateOfPurchase" dateFormat="yy-mm-dd" showIcon iconDisplay="input" />
    </div>

    <!-- Account Field -->
    <FloatLabel variant="on">
      <InputNumber style="width: 500px" id="amount" v-model="amount" />
      <label for="amount">Amount (RM)</label>
    </FloatLabel>

    <!-- description Field -->
    <FloatLabel variant="on">
      <InputText style="width: 500px" id="description" v-model="description" />
      <label for="description">Description</label>
    </FloatLabel>

    <!-- Submit Button -->
    <Button style="margin-top: 20px; width: 200px" label="Submit" @click="handleSubmit" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";
// Store
import { useUserStore } from "../store/UserStore";
import { useUserDatabaseStore } from "../store/UserDabataseStore";
// PrimeVue Component
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Button from "primevue/button";

const UserStore = useUserStore();
const UserDabataseStore = useUserDatabaseStore();

// Form Field
const amount = ref("");
const description = ref("");
const selectedType = ref("Travel");
const typeList = ['Travel', 'Meals', 'Office Supplies', 'Training', 'Software', 'Miscellaneous'];
const dateOfPurchase = ref("");

// Date picker default date set to today
onMounted(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  dateOfPurchase.value = formattedDate;
});

const handleSubmit = () => {
  // Use timestamp(9 digit) as application id
  const id = Math.floor(Date.now() / 1000);

  // Date picker returns Date object, need to reformat
  if(typeof(dateOfPurchase.value) != "string"){
    dateOfPurchase.value = formatDateToYYYYMMDD(dateOfPurchase.value);
  }

  UserDabataseStore.addApplication({ id: id, amount: amount.value, charge_type: selectedType.value, date_of_purchase: dateOfPurchase.value, description: description.value, account: UserStore.currentUser?.account, status: "Pending" });
  alert("Submission Successfully");

  // Reset Form
  amount.value = null;
  description.value = null;
  selectedType.value = "Travel";

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  dateOfPurchase.value = formattedDate;
}

// Date picker returns Date object, need to reformat
function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear(); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0'); 

  return `${year}-${month}-${day}`;
}
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
</style>
