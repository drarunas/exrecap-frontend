<template>
  <div class="query-form-container flex flex-col items-center mt-9 w-full">

    <span
      class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      Enter a research summary, abstract, title, or query to search for expert reviewers.
    </span>


    <form @submit.prevent="submitQuery" class="flex flex-col items-start w-full px-5">
      <textarea v-model="query" type="text" placeholder="Enter your query"
        class="border border-gray-300  focus:ring focus:ring-blue-200 p-3 rounded-lg h-32 w-full mb-4 shadow-sm resize-none">
      </textarea>


      <div class="flex flex-row  items-center">

        <span
          class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Select filters.
        </span>
        <div class="flex flex-col mx-2">
          <Switch.Group>
            <div class="flex items-center">
              <Switch.Label class="mr-2 text-sm text-gray-700">With emails only</Switch.Label>
              <Switch v-model="withEmailsOnly"
                :class="{ 'bg-blue-600': withEmailsOnly, 'bg-gray-200': !withEmailsOnly }"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span :class="{ 'translate-x-6': withEmailsOnly, 'translate-x-1': !withEmailsOnly }"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform">
                </span>
              </Switch>
            </div>
          </Switch.Group>
        </div>

        <div class="relative flex items-center max-w-[11rem]">
          <button type="button" id="decrement-button" @click="decrease" data-input-counter-decrement="h-input"
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
            </svg>
          </button>
          <input v-model.number="minh" type="text" id="h-input" data-input-counter data-input-counter-min="0"
            data-input-counter-max="500" aria-describedby="helper-text-explanation"
            class="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="" value="10" required />
          <div
            class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">

            <span>min h-index</span>
          </div>
          <button type="button" id="increment-button" @click="increase" data-input-counter-increment="h-input"
            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>


      </div>



      <button type="submit" :disabled="query_count > 10 && !isSubscribed"
        class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">
        Submit
      </button>
      <span v-if="query_count > 5 && !isSubscribed"
        class="mt-1 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
        Queries are limited in your trial.
      </span>
    </form>

    <!-- Loading state -->
    <div v-if="loading" class="mt-4 container">
      <ResultsLoading v-if="loading" />
    </div>

    <!-- Error message -->
    <div v-if="error" class="mt-4 text-red-500">
      {{ error }}
    </div>

    <!-- No results message -->
    <div v-if="results && results.length === 0" class="mt-4 text-gray-500">
      No results found.
    </div>

    <!-- Results -->

    <div v-if="results && results.length && !loading > 0" class="mt-6">

      <!-- PAGINATION -->

      <PaginationForm :currentPage="currentPage" :prevPage="prevPage" :nextPage="nextPage"
        :isSubscribed="isSubscribed" />
      <span v-if="!isSubscribed && currentPage > 1"
        class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
        Results are limited in your trial.
      </span>


      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">



        <div v-for="(result, index) in results" :key="result.auth_id || index"
          class="max-w-sm m-1 rounded bg-slate-50 grid">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 inline-flex items-center">
              <UserIcon class="size-5 text-gray-500 mr-2" />
              <a :href="result.auth_id" target="_blank" rel="noopener">
                {{ result.name || "Name missing for now" }}</a>
              <span class="mx-1 text-gray-500">{{ (1 - result.distance).toFixed(2) }}</span>
            </div>
            <AcademicCapIcon class="size-5 text-gray-500" />
            <div v-for="aff in result.affs" :key="aff" class=" mx-1 flex text-sm text-gray-500">{{ aff }}</div>
            <div class="mx-1 text-sm text-gray-500">{{ result.aff_years[0] }}</div>
          </div>

          <!-- TOPICS -->
          <div v-if="result.topics[0][0]" class="max-w-sm p-1 bg-slate-100">
            <div v-for="topic in result.topics" :key="topic[0]"
              class="inline-block bg-white rounded-md px-3 py-1 text-xs font-thin text-gray-700 mr-2 mb-2">{{ topic[0]
              }} ({{ topic[1] }})
            </div>
          </div>

          <div class="px-6 pt-4 pb-2 self-end">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{
                result.works_count || "unknown" }} publications</span>
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">h-index
              {{ result.h_index || "unknown" }}</span>
            <span v-if="isSubscribed && result.emails[0]"
              class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 inline-flex items-center">
              <AtSymbolIcon class="size-5 text-gray-500 mr-2" />
              {{ result.emails[0] }}
            </span>
            <span v-if="!isSubscribed"
              class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 inline-flex items-center">
              <AtSymbolIcon class="size-5 text-gray-500 mr-2" />
              {{ '████████' }}
            </span>
          </div>
        </div>
      </div>
      <PaginationForm :currentPage="currentPage" :prevPage="prevPage" :nextPage="nextPage"
        :isSubscribed="isSubscribed" />


    </div>




  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import ResultsLoading from './ResultsLoading.vue';
import PaginationForm from './PaginationForm.vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { AcademicCapIcon, UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'


export default {
  props: ['isSubscribed'],
  data() {
    return {
      query: 'Forest fire size amplifies postfire land surface warming',
      results: null,
      loading: false, // Indicates whether the form is being submitted
      error: null,
      currentPage: 1,
      limit: 20,
      user: null,
      query_count: 0,
      withEmailsOnly: false,
      minh: 0,
    };
  },
  components: {
    ResultsLoading,
    AcademicCapIcon,
    UserIcon,
    AtSymbolIcon,
    PaginationForm,
    Switch
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async checkUserQueryCount(user) {
      if (user) {

        const db = getFirestore();  // Get Firestore instance
        const userRef = doc(db, 'stripeCustomers', user.uid);  // Reference to Firestore document

        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            this.query_count = docSnap.data().query_count;
          } else {
            this.query_count = 100;
          }

        } catch (error) {
          console.error("Error checking query count: ", error);
        }

      }
    },
    async writeUserQueryCount(user) {
      if (user) {

        const db = getFirestore();  // Get Firestore instance
        const userRef = doc(db, 'stripeCustomers', user.uid);  // Reference to Firestore document

        try {
          const docSnap = await getDoc(userRef);
          console.log(this.query_count);
          if (docSnap.exists()) {
            console.log('increasing count')
            if (isNaN(this.query_count)) {
              this.query_count = 1;

            }
            await updateDoc(userRef, {

              query_count: parseInt(this.query_count, 10)
            });
          } else {
            this.query_count = 100;
          }

        } catch (error) {
          console.error("Error writing user status: ", error);
        }

      }
    },
    async submitQuery(page = 1, limit = 20) {
      this.checkUserQueryCount(this.user);
      if (typeof page === 'object') {
        // If it's an event (like the form submit event), reset page to 1
        page = 1;
      }
      if (!this.query) {
        this.error = 'Please enter a query.';
        return;
      }

      this.error = null;
      this.loading = true;
      this.currentPage = page;
      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryauthors?q=${encodeURIComponent(this.query)}&page=${page}&limit=${limit}&with_emails_only=${this.withEmailsOnly}&minh=${this.minh}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        this.results = data.length ? data : [];
        console.log(this.results);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
        this.query_count += 1;
        this.writeUserQueryCount(this.user);
      }
    },
    async nextPage() {
      if (this.results.length) {
        await this.submitQuery(this.currentPage + 1);  // Move to the next page
      }
    },
    async prevPage() {
      if (this.currentPage > 1) {
        await this.submitQuery(this.currentPage - 1);  // Move to the previous page
      }
    },
    increase() {
      if (this.minh < 1000) {
        this.minh++;
      }
    },
    decrease() {
      if (this.minh > 1) {
        this.minh--;
      }
    }
  },
};
</script>
