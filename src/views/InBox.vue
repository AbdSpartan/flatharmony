<template>
    <div class="inbox">
      <h2>Your Inbox</h2>
      <ul v-if="messages.length">
        <li v-for="message in messages" :key="message.id" class="message">
          <p><strong>From:</strong> {{ message.sender }}</p>
          <p>{{ message.content }}</p>
          <small>{{ new Date(message.createdAt).toLocaleString() }}</small>
        </li>
      </ul>
      <p v-else>No messages in your inbox.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const messages = ref([]);
  
      const fetchMessages = async () => {
        try {
          const response = await fetch('http://localhost:3000/messages/inbox', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.ok) {
            messages.value = await response.json();
          } else {
            console.error('Failed to fetch messages');
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      onMounted(fetchMessages);
  
      return { messages };
    },
  };
  </script>
  
  <style scoped>
  .inbox {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .message {
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  </style>