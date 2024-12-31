<template>
  <div class="anonymous-messaging">
    <h2>Anonymous Messaging</h2>
    <div class="message-form">
      <select v-model="selectedMessage">
        <option value="">Select a message</option>
        <option v-for="(message, index) in presetMessages" :key="index" :value="message">
          {{ message }}
        </option>
      </select>
      <input v-model="recipient" placeholder="Recipient username" />
      <button @click="sendMessage" :disabled="!selectedMessage || !recipient">Send</button>
    </div>
    <div class="message-list">
      <div v-for="message in messages" :key="message.id" class="message">
        <p>{{ message.content }}</p>
        <small>From: {{ message.sender }} at {{ new Date(message.createdAt).toLocaleString() }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMessage: '',
      recipient: '',
      messages: [],
      presetMessages: [
        "Great job on your recent work!",
        "Thank you for your help.",
        "Can we schedule a meeting soon?",
        "I appreciate your contribution to the team.",
        "Please review the latest document when you have a chance.",
        "The kitchen needs cleaning.",
        "Could you please turn down the music?",
        "Thanks for doing the dishes!",
        "We're out of milk, could someone buy some?",
        "Great party last night, thanks for cleaning up!"
      ]
    }
  },
  methods: {
    async sendMessage() {
      if (!this.selectedMessage || !this.recipient) {
        alert('Please select a message and enter a recipient.');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/messages', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: this.selectedMessage,
            recipient: this.recipient
          })
        });
        if (response.ok) {
          this.selectedMessage = '';
          this.recipient = '';
          alert('Message sent successfully!');
          this.fetchMessages(); // Refresh the message list
        } else {
          alert('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message');
      }
    },
    async fetchMessages() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/messages', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          this.messages = await response.json();
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  },
  mounted() {
    this.fetchMessages();
  }
}
</script>

<style scoped>
.anonymous-messaging {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.message-form {
  display: flex;
  margin-bottom: 20px;
}

.message-form select,
.message-form input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
}

.message-form button {
  padding: 5px 10px;
}

.message {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.message p {
  margin: 0 0 5px 0;
}

.message small {
  color: #666;
}
</style>