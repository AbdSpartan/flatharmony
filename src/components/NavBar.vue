<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">FlatHarmony</router-link>
    </div>
    <div class="navbar-menu">
      <template v-if="isLoggedIn">
        <span class="navbar-item welcome-message">Hello, {{ firstName }}</span>
        <router-link to="/dashboard" class="navbar-item">Dashboard</router-link>
        <a @click="logout" class="navbar-item">Logout</a>
      </template>
      <template v-else>
        <router-link to="/login" class="navbar-item">Login</router-link>
        <router-link to="/register" class="navbar-item">Register</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      firstName: ''
    }
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      const firstName = localStorage.getItem('firstName');
      this.isLoggedIn = !!token;
      this.firstName = firstName || '';
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      this.isLoggedIn = false;
      this.firstName = '';
      this.$router.push('/');
    }
  },
  created() {
    this.checkLoginStatus();
    // Listen for login/logout events
    this.$root.$on('login', (firstName) => {
      this.isLoggedIn = true;
      this.firstName = firstName;
    });
    this.$root.$on('logout', this.checkLoginStatus);
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-item {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.navbar-item:hover {
  color: #007bff;
}

.welcome-message {
  font-weight: bold;
  color: #28a745;
}
</style>