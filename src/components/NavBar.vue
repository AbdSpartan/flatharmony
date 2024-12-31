<template>
  <nav>
    <router-link to="/dashboard">Dashboard</router-link> |
    <router-link to="/dashboard/inbox">Inbox</router-link> |
    <router-link to="/dashboard/anonymous-messaging">Anonymous Messaging</router-link> |
    <button @click="logout">Logout</button>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button {
  margin-left: 10px;
}
</style>