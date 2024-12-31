<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <nav>
      <router-link to="/dashboard/inbox">Inbox</router-link> |
      <router-link to="/dashboard/anonymous-messaging">Anonymous Messaging</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
}
</style>