<template>
  <div class="login-container flex flex-col items-center mt-0">
    <button v-if="!user" @click="loginWithGoogle" class="z-[1] bg-main text-white rounded-full hover:bg-main-dark  p-2">
      Sign In
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

