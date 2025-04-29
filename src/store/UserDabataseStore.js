import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserDatabaseStore = defineStore('userDatabaseStore', () => {
  // List of users (admin, staff, etc.)
  const users = ref([
    { account: 'admin', password: "admin123", role: 'Admin' },
    { account: 'staff1', password: "staff123", role: 'Staff' },
    { account: 'staff2', password: "staff123", role: 'Staff' },
    { account: 'staff3', password: "staff123", role: 'Staff' },
  ]);

  // Check user login credential
  const authenticateLogin = (account, password) => {
    const user = users.value.find(user => user.account === account);
    if (!user || user.password !== password) {
      return { error: 'Invalid: User not found or password incorrect' };
    }
    return { user }; 
  };

  // List of Claim Application List
  // Use timestamp as id(9 digit)
  const applicationList = ref([
    { id: 1680432000, amount: 123, charge_type: "Travel", date_of_purchase: "2025-04-01", description: "Testing1", account: "staff1", status: "Pending" },
    { id: 1680703800, amount: 567, charge_type: "Meals", date_of_purchase: "2025-04-02", description: "Testing2", account: "staff1", status: "Approved" },
    { id: 1681105500, amount: 888, charge_type: "Training", date_of_purchase: "2025-04-03", description: "Testing3", account: "staff1", status: "Declined" },
    { id: 1681604100, amount: 731, charge_type: "Software", date_of_purchase: "2025-04-04", description: "Testing4", account: "staff2", status: "Pending" },
    { id: 1681987200, amount: 574, charge_type: "Miscellaneous", date_of_purchase: "2025-04-05", description: "Testing5", account: "staff3", status: "Declined" },
  ])

  // Add
  const addApplication = (newApplication) => {
    applicationList.value.push(newApplication);
  }

  // Approve by admin
  const approveApplication = (id) => {  
    for (let i = 0; i < applicationList.value.length; i++) {
      if (applicationList.value[i].id === id) {
        applicationList.value[i].status = 'Approved';
        break;
      }
    }
  };

  // Reject by adminn
  const rejectApplication= (id) => {
    for (let i = 0; i < applicationList.value.length; i++) {
      if (applicationList.value[i].id === id) {
        applicationList.value[i].status = 'Declined';
        break;
      }
    }
  };

  return {
    users,
    authenticateLogin,
    applicationList,
    addApplication,
    approveApplication,
    rejectApplication,
  };
});
