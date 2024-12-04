<template>
  <div class="min-h-screen bg-gray-50">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" :src="require('@/assets/logo.png')" alt="" />
            </div>
            <div class="hidden md:block">
              <div v-if="user" class="ml-10 flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" href=""
                  :class="[item.name === currentTab ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                  :aria-current="item.name === currentTab ? 'page' : undefined"
                  @click.prevent="currentTab = item.name">{{ item.name }}</a>

              </div>
            </div>
          </div>
          

          <div v-if="user" class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">

              <!-- Profile dropdown -->
              <div class="text-white">
                {{ user.displayName }}
              </div>

              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.photoURL" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a v-if="user" href="" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700">
                      Logout
                    </a>
                    <a v-if="!isSubscribed && user" href="" @click.prevent="createCheckoutSession"
                    class="block px-4 py-2 text-sm text-gray-700">Subscribe</a>
                    <a v-if="isSubscribed && user" href="" @click.prevent="redirectToStripePortal"
                    class="block px-4 py-2 text-sm text-gray-700">Manage Your Subscription
                    </a>

                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton v-if="user"
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <LoginForm v-if="!user" />
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div v-if="user" class="space-y-1 px-2 pb-3 pt-2 sm:px-3">

          <DisclosureButton v-for="item in navigation" :key="item.name"
            :class="[item.name === currentTab ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', ' block rounded-md px-3 py-2 text-base font-medium']"
            :aria-current="item.name === currentTab ? 'page' : undefined" @click="currentTab = item.name">{{ item.name
            }}</DisclosureButton>
        </div>
        <div v-if="user" class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.photoURL" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{{ user.displayName }}</div>
              <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
            </div>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
              <a v-if="user" href="" @click.prevent="logout" class="block px-4 py-2 text-sm text-white">
                Logout
              </a>
            </DisclosureButton>
            <DisclosureButton
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
              <a v-if="isSubscribed && user" href="" @click.prevent="redirectToStripePortal"
                    class="block px-4 py-2 text-sm text-white">Manage Your Subscription
                    </a>
              
            </DisclosureButton>
              
              <DisclosureButton
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">
              <a v-if="!isSubscribed && user" href="" @click.prevent="createCheckoutSession"
                    class="block px-4 py-2 text-sm text-white">Subscribe</a>
            </DisclosureButton>


          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>



    <main class="flex flex-col items-center justify-center">

      <div class="px-4 sm:px-6 lg:px-8 w-full">
        <!-- Display content based on the current tab -->
        <div v-show="user && currentTab === 'Experts'" class="flex flex-col items-center justify-center" >
          <ExpertsQueryForm :isSubscribed="isSubscribed" v-model:q="user_query" />
        </div>

        

        <div v-show="currentTab === 'Research'" class="flex flex-col items-center justify-center" >
          <ResearchQueryForm v-if="user" :isSubscribed="isSubscribed" v-model:q="user_query" />
        </div>

        <div v-show="currentTab === 'Pre Review'" class="flex flex-col items-center justify-center" >
          <PreReview v-if="user" :isSubscribed="isSubscribed" />
        </div>

        


        <div v-if="!user" class="flex flex-col items-center justify-center">
            <CoverPage :user="user" />
        </div>
      </div>


    </main>
  </div>
  <FooterComponent />
</template>

<script>
/* eslint-disable no-unused-vars */
import LoginForm from './components/LoginForm.vue';
import ExpertsQueryForm from './components/ExpertsQueryForm.vue';
import FooterComponent from './components/Footer.vue'

import TopicsQueryForm from './components/TopicsQueryForm.vue';
import ResearchQueryForm from './components/ResearchQueryForm.vue';
import PreReview from './components/PreReview.vue';
import CoverPage from './components/CoverPage.vue';
import ContactForm from './components/ContactForm.vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, query } from 'firebase/firestore';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { loadStripe } from '@stripe/stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';




export default {
  components: {
    LoginForm,
    ExpertsQueryForm,
    PreReview,
    FooterComponent,

  },
  data() {
    return {
      user: null,
      currentTab: '',
      isSubscribed: false,
      stripe: null,
      user_query: 'Is climate change related to mental health?',
    };
  },
  async mounted() {
    this.stripe = await loadStripe('pk_live_51Q67WsJqQ5pyGwZ7xetglLSjv1lB4wj8qNl5LBGeNPCG8b9ODe9OtPRp6P3tzGnU3wch2HhuIGWItEZ2P4Zf2dBo00aUHKCQT9');
    // Track authentication state changes
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      this.user = user;
      this.currentTab = 'Experts'
      console.log('mounted', user);

      if (this.user) {
        // Check the subscription status when a user is logged in
        await this.checkUserSubscription(this.user);

      } else {
        // If the user is not logged in, reset subscription status
        this.isSubscribed = false;
      }
      window.scrollTo({
        top: 70,
        behavior: 'smooth' // Optional for smooth scrolling
      });
    });
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      console.log('created', user);
    });



  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).catch((error) => {
        console.error("Error during logout: ", error);
      });
    },

    async createCheckoutSession() {
      const functions = getFunctions(); // Initialize Firebase Functions
      const createSession = httpsCallable(functions, 'createCheckoutSession');


      const session = await createSession({
        priceId: 'price_1QCeuIJqQ5pyGwZ7zpUb9ANr', // 5 USD individual monthly
      });

      const result = await this.stripe.redirectToCheckout({
        sessionId: session.data.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    },
    async checkUserSubscription(user) {
      if (!user) {
        console.error("No user provided.");
        return;
      }

      try {
        const db = getFirestore();
        const userDocRef = doc(db, 'stripeCustomers', user.uid);

        // Fetch the user's subscription document from Firestore
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Get the subscription status from Firestore
          const userData = userDoc.data();
          const subscriptionStatus = userData.subscriptionStatus;

          // Update isSubscribed based on subscription status
          if (subscriptionStatus === 'active') {
            this.isSubscribed = true;  // The user has an active subscription
          } else {
            this.isSubscribed = false; // The user does not have an active subscription
          }

          console.log(`Subscription status for ${user.email}: ${subscriptionStatus}`);
        } else {
          // If no document is found for this user
          console.warn(`No subscription data found for user ${user.uid}`);
          this.isSubscribed = false;
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        this.isSubscribed = false;  // In case of an error, assume not subscribed
      }
    },
    redirectToStripePortal() {
      // Replace the URL below with your actual Stripe billing portal link
      const stripeBillingPortalURL = 'https://billing.stripe.com/p/login/fZe7vAa16ej9cX65kk';

      // Redirect the user to the Stripe billing portal
      window.location.href = stripeBillingPortalURL;
    }
  }
};
</script>
<script setup>


const navigation = [
  { name: 'Experts', href: '', current: false },
  // { name: 'Conflicts of Interest', href: '', current: false },
  { name: 'Research', href: '', current: false },
  { name: 'Pre Review', href: '', current: false },
]


</script>

<style></style>
