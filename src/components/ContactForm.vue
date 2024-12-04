<template>
  <div class="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name:</label>
        <input 
          type="text" 
          v-model="name" 
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input 
          type="email" 
          v-model="email" 
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        />
      </div>

      <div class="mb-6">
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message:</label>
        <textarea 
          v-model="message" 
          required 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          rows="4">
        </textarea>
      </div>

      <button 
        type="submit" 
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
      >
        Submit
      </button>
    </form>

    <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
      {{ successMessage }}
    </div>
  </div>
</template>


<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "../main";

export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      successMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        await addDoc(collection(db, "messages"), {
          name: this.name,
          email: this.email,
          message: this.message,
          timestamp: new Date(),
        });

        // Reset form
        this.name = "";
        this.email = "";
        this.message = "";
        this.successMessage = "Message sent successfully!";
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    },
  },
};
</script>