<template>
  <div class="login-container flex flex-col items-center mt-0">
    <button v-if="!user" @click="loginWithGoogle" class="bg-indigo-600 text-white rounded hover:bg-indigo-500 p-2">
      Login with Google
    </button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
  data() {
    return {
      user: null,
      isSubscribed: false,  // This could be passed as a prop or used in child components
    };
  },
  methods: {
    loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // User is signed in
          this.user = result.user;

          // Check if user exists in Firestore, and create if not
          
        })
        .catch((error) => {
          console.error("Error during login: ", error);
        });
    },
    
  }
};
</script>

