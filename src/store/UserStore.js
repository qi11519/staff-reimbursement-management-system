import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
  // Current Login User (Initially Null)
  const currentUser = ref(null);

  // Login Action
  const login = (user) => {
    currentUser = user;
  }

  // Logout Action
  const logout = () => {
    currentUser = null;
  }

  return {
    currentUser,
    login,
    logout,
  };
});
