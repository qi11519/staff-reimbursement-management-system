import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserDatabaseStore = defineStore('userDatabaseStore', () => {
  // List of users (admin, staff, etc.)
  const users = ref([
    { account: 'admin', password: "admin123", role: 'admin' },
    { account: 'staff1', password: "staff123", role: 'staff' },
  ]);

  // Check user login credential
  const authenticateLogin = (account, password) => {
    const user = users.value.find(user => user.account === account);

    if (!user || user.password !== password) {
      return { error: 'Invalid: User not found or password incorrect' };
    }

    return { user }; 
  };

  return {
    users,
    authenticateLogin,
  };
});
