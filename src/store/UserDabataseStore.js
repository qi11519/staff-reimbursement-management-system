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
  // Use timestamp as id
  const applicationList = ref([
    { id: 123123123, amount: 111, description: "Testing", account: "staff1", status: "Pending" },
    { id: 122122122, amount: 111, description: "Testing", account: "staff1", status: "Approved" },
    { id: 122122122, amount: 111, description: "Testing", account: "staff1", status: "Declined" },
    { id: 124124124, amount: 111, description: "Testing", account: "staff2", status: "Pending" },
    { id: 125125125, amount: 111, description: "Testing", account: "staff3", status: "Declined" },
  ])

  // Add
  const addApplication = (newApplication) => {
    applicationList.value.push(newApplication);
  }

  // Approve by admin
  const approveApplication = (account) => {
    console.log(account);
    
    for (let i = 0; i < applicationList.value.length; i++) {
      if (applicationList.value[i].account === account) {
        applicationList.value[i].status = 'Approved';
        break;
      }
    }
  };

  // Reject by adminn
  const rejectApplication= (account) => {
    for (let i = 0; i < applicationList.value.length; i++) {
      if (applicationList.value[i].account === account) {
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
