import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { id: number; username: string; email: string } | null,
    isAuthenticated: false,
    refreshing: false,
  }),
  actions: {
    async fetchUser() {
      try {
        // Fetch the user's profile (requires a valid access token)
        const response = await $fetch('/api/profile/');
        this.user = response;
        this.isAuthenticated = true;
      } catch (error:any) {
        if (error.response?.status === 401) {
          // Attempt to refresh token if access_token has expired
          await this.refreshToken();
        } else {
          this.isAuthenticated = false;
          this.user = null;
        }
      }
    },

    async refreshToken() {
      if (this.refreshing) return; // Prevent multiple refresh attempts
      this.refreshing = true;

      try {
        // Request a new access token using the refresh token
        await $fetch('/api/account/token/refresh/', { method: 'POST' });
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.isAuthenticated = false;
        this.user = null;
        navigateTo('/login'); // Redirect to login if refresh fails
      } finally {
        this.refreshing = false;
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await $fetch('/api/login/', {
          method: 'POST',
          body: { username, password },
        });
        this.isAuthenticated = true;
        await this.fetchUser(); // Fetch the user's profile after login
      } catch (error) {
        console.error('Login failed:', error);
        this.isAuthenticated = false;
      }
    },

    async logout() {
      try {
        await $fetch('/api/logout/', { method: 'POST' });
        this.isAuthenticated = false;
        this.user = null;
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
});
