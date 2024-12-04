<template>
  <div>
    <button @click="subscribe">Subscribe</button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.user = firebase.auth().currentUser;
  },
  methods: {
    async subscribe() {
      if (!this.user) {
        console.error('User not logged in');
        return;
      }

      const db = firebase.firestore();
      const customerRef = db.collection('customers').doc(this.user.uid);

      try {
        // Create a Checkout session in Firestore
        const checkoutSessionRef = await customerRef.collection('checkout_sessions').add({
          price: 'price_1QCeuIJqQ5pyGwZ7zpUb9ANr', // The price ID from Stripe
          success_url: window.location.origin + '/success', // Redirect after success
          cancel_url: window.location.origin + '/cancel',   // Redirect after cancel
        });

        // Wait for the Checkout session ID to be generated
        checkoutSessionRef.onSnapshot(async (snap) => {
          const { sessionId } = snap.data();

          if (sessionId) {
            const stripe = await loadStripe('your_stripe_public_key');
            stripe.redirectToCheckout({ sessionId });
          }
        });
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    },
  },
};
</script>
