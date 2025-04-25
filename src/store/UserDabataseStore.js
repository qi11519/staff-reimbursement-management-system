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
  const applicationList = ref([
    { amount: 111, description: "Testing", account: "staff1", status: "Pending" },
    { amount: 111, description: "Testing", account: "staff2", status: "Pending" },
    { amount: 111, description: "Testing", account: "staff3", status: "Declined" },
  ])

  // Add
  const addApplication = (newApplication) => {
    applicationList.value.push(newApplication);
  }

  // Remove if reviewed by the staff
  const removeApplicationBasedOnAccount = (account) => {
    applicationList.value = applicationList.value.filter(app => app.account !== account);
  };

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
    removeApplicationBasedOnAccount,
    approveApplication,
    rejectApplication,
  };
});
