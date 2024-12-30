<template>
  <div class="dashboard">
    <h1>Welcome to Your Dashboard</h1>
    <nav>
      <router-link to="/anonymous-messaging" class="btn">Anonymous Messaging</router-link>
      <router-link to="/polls" class="btn">Polls</router-link>
      <router-link to="/task-scheduling" class="btn">Task Scheduling</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 30px;
}

nav {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>