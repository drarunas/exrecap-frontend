<template>

  <div class="query-form-container flex flex-col items-center mt-9 max-w-[850px] w-full px-2 min-h-screen">

    <span
      class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      Enter a question, research summary, abstract, title, or query to search for experts.
    </span>

    <span v-if="!isSubscribed && query_count > 10"
      class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 my-4 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
      Subscripition is needed.
    </span>
    <form @submit.prevent="() => submitQuery(1, 20, 'formSubmit')" class=" w-full px-5">

      <textarea v-model="query" type="text" @input="autoExpand" ref="textarea" placeholder="Enter your query" row="1"
        class="overflow-hidden border-purple-200 ring-1 ring-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-300 py-4 px-4 rounded-xl w-full mb-4 mt-2 shadow-sm resize-none leading-tight bg-white h-[52px]">
      </textarea>

      <div class="flex flex-row flex-wrap items-center grow w-full ">

        <span
          class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Select filters.
        </span>
        <div class="flex flex-col mx-2 my-1">
          <div>
            <div class="flex items-center">
              <label class="mr-2 text-sm text-gray-700">With emails only</label>
              <Switch v-model="withEmailsOnly"
                :class="{ 'bg-indigo-300': withEmailsOnly, 'bg-gray-200': !withEmailsOnly }"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:outline-none">
                <span :class="{ 'translate-x-6': withEmailsOnly, 'translate-x-1': !withEmailsOnly }"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform">
                </span>
              </Switch>
            </div>
          </div>
        </div>

        <div class="relative flex items-center max-w-[11rem] my-2">
          <button type="button" id="decrement-button" @click="decrease" data-input-counter-decrement="h-input"
            class="bg-gray-100  hover:bg-indigo-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none">
            <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 18 2">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
            </svg>
          </button>
          <input v-model.number="minh" type="text" id="h-input" data-input-counter data-input-counter-min="0"
            data-input-counter-max="500" aria-describedby="helper-text-explanation"
            class="bg-gray-50 border-y border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-gray-300 focus:border-gray-300 focus:outline-none block w-full pb-6"
            placeholder="" value="10" required />
          <div
            class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
            <span>min h-index</span>
          </div>
          <button type="button" id="increment-button" @click="increase" data-input-counter-increment="h-input"
            class="bg-gray-100 hover:bg-indigo-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none ">
            <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>


        <!-- Check for COIs switch -->
        <div class="flex flex-col mx-2 my-1">
          <div>
            <div class="flex items-center">
              <label class="mr-2 text-sm text-gray-700">Check for COIs</label>
              <Switch v-model="checkForCOIs" :class="{ 'bg-indigo-300': checkForCOIs, 'bg-gray-200': !checkForCOIs }"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:outline-none">
                <span :class="{ 'translate-x-6': checkForCOIs, 'translate-x-1': !checkForCOIs }"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform">
                </span>
              </Switch>
            </div>
          </div>
        </div>

        <!-- The input field for Author IDs, visible only if "Check for COIs" is enabled -->
        <div v-if="checkForCOIs" class="flex flex-col items-center w-full">

          <span
            class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Enter a comma separated list of openalex author IDs.
          </span>
          <textarea v-model="authorIDs" type="text" placeholder="Author IDs"
            class="border border-gray-300  focus:outline-none ring-1 ring-inset focus:ring focus:ring-indigo-100 p-3 rounded-lg  w-full shadow-sm resize-none">
          </textarea>
        </div>
      </div>

      <button type="submit" :disabled="query_count > 10 && !isSubscribed"
        class="bg-main text-white py-2 px-4 rounded-full hover:bg-main-dark my-2">
        Submit
      </button>

    </form>

    <!-- Loading state -->
    <div v-if="loading" class="mt-4 container">
      <ResultsLoading v-if="loading" class="my-2" />
      <ResultsLoading v-if="loading" class="my-2" />
      <ResultsLoading v-if="loading" class="my-2" />
      <ResultsLoading v-if="loading" class="my-2" />

    </div>

    <!-- Error message -->
    <div v-if="error" class="mt-4 text-red-500">
      {{ error }}
    </div>



    <!-- Results -->

    <div v-if="results && results.length && !loading > 0" class="mt-6">



      <div class="grid grid-cols-1 gap-4">



        <div v-for="(result, index) in results" :key="result.auth_id || index"
          class="rounded bg-white grid rounded-lg border border-indigo-100">


          <div class="px-6 mt-4 mb-1">
            <div class="font-bold text-xl mb-2 inline-flex items-center">
              <UserIcon class="size-5 text-gray-500 mr-2" />
              <a :href="result.auth_id" target="_blank" rel="noopener">
                {{ result.name || "Name missing for now" }}</a>
              <!-- <span class="mx-1 text-gray-500">{{ (1 - result.distance).toFixed(2) }}</span> -->
            </div>
            <div v-for="(aff, aff_index) in (showMoreAffs[index] ? result.affs : result.affs.slice(0, 1))"
              :key="aff_index" class="mx-1 flex text-sm text-gray-500">{{ aff }}</div>
            <div v-if="result.affs.length > 1" @click="showMoreAffs[index] = !showMoreAffs[index]"
              class="flex items-center cursor-pointer">
              <span class="text-xs mx-1">Affiliations</span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showMoreAffs[index] }"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>


            <!-- <div class="mx-1 text-sm text-gray-500">{{ result.aff_years[0] }}</div> -->
          </div>

          <div class="px-6 ">
            <!-- STATS -->
            <span v-if="result.cois != 0"
              class="inline-block bg-red-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">COIs
              detected</span>
            <span
              class="inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{
                result.works_count || "unknown" }} publications</span>
            <span
              class="inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">h-index
              {{ result.h_index || "unknown" }}</span>
            <span v-if="isSubscribed && result.emails[0]"
              class="bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 inline-flex items-center">
              <AtSymbolIcon class="size-3 text-gray-500 mr-2" />
              <a :href="'mailto:' + result.emails[0]">{{ result.emails[0] }}</a>


            </span>
            <span v-if="!isSubscribed"
              class="bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 inline-flex items-center">
              <AtSymbolIcon class="size-3  text-gray-500 mr-2" />
              {{ '████████' }}
            </span>
          </div>



          <!-- TOPICS -->
          <div v-if="result.topics[0][0]" class="mx-6 my-2 bg-slate-200 rounded-lg">
            <div class="text-xs px-2 my-2 text-gray-900">An expert in:</div>

            <span v-for="topic in result.topics" :key="topic[0]"
              class="text-xs text-gray-900 bg-gray-50 rounded-lg mx-2 px-3 py-1 mb-2 inline-block  border border-indigo-200">{{
                topic[0] }}
              <!-- ({{ topic[1] }}) -->
            </span>
          </div>

          <!-- WORKS -->
          <div v-if="authorWorks[index] && authorWorks[index].length" class="mx-6 my-2 mb-4 bg-slate-200 rounded-lg">
            <div class="text-xs px-2 my-2 text-gray-900">The author of:</div>


            <span v-for="work in authorWorks[index]" :key="work.work_id"
              class="inline-block bg-gray-50 rounded-md mx-2 px-3 py-1 text-xs text-gray-900 mb-2 border border-indigo-200 hover:bg-indigo-50">
              <a :href="work.doi" target="_blank" rel="noopener">{{ work.title }}</a>
            </span>

          </div>


        </div>

      </div>
      <button
        class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2"
        v-if="results.length && results.length % limit === 0" @click="loadMore">More</button>



    </div>

  </div>

</template>

<script>
/* eslint-disable no-unused-vars */
import ResultsLoading from './ResultsLoading.vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'
import { Switch } from '@headlessui/vue'


export default {
  props: ['isSubscribed', 'q'],
  computed: {
    query: {
      get() {
        return this.q;
      },
      set(value) {
        this.$emit('update:q', value);
      }
    }
  },
  data() {
    return {
      results: [],
      loading: false, // Indicates whether the form is being submitted
      error: null,
      currentPage: 1,
      limit: 20,
      user: null,
      query_count: 0,
      withEmailsOnly: false,
      minh: 0,
      checkForCOIs: false, // New state for COI switch
      authorIDs: '',
      showMoreAffs: {}, // State for the Author IDs input field
      authorWorks: [],
      vector: null,

    };
  },
  components: {
    ResultsLoading,
    // AcademicCapIcon,
    UserIcon,
    AtSymbolIcon,
    Switch: Switch,

  },
  created() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.checkUserQueryCount(user);
    });

  },
  async mounted() {
    await this.checkUserQueryCount(this.user);
    //   setTimeout(() => {
    //   this.autoExpand(); 
    // }, 1500); 
  },


  methods: {
    autoExpand() {
      const textarea = this.$refs.textarea;
      textarea.style.height = '52px';
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to the scroll height
    },
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
    async checkUserQueryCount(user) {
      if (user) {

        const db = getFirestore();  // Get Firestore instance
        const userRef = doc(db, 'stripeCustomers', user.uid);  // Reference to Firestore document

        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            this.query_count = docSnap.data().query_count;
          } else {
            console.log('doc does not exist', user);
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

          if (docSnap.exists()) {

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
    async submitQuery(page = 1, limit = 20, source = 'formSubmit') {
      if (!this.user) {
        this.loginWithGoogle();
        return
      }
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
      this.authorWorks = [];
      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryauthors?q=${encodeURIComponent(this.query)}&page=${page}&limit=${limit}&with_emails_only=${this.withEmailsOnly}&minh=${this.minh}&coi-check=${this.checkForCOIs}&authors=${this.authorIDs}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();

        if (source === 'formSubmit') {
          this.results = data.results; // Replace on form submit
        } else {
          this.results = data.results.length ? this.results.concat(data.results) : this.results; // Append on "More" button
        }
        this.vector = data.vector;  // Assign the vector from the response
        await this.fetchWorksForAuthors(apiBaseUrl);

      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
        this.query_count += 1;
        this.writeUserQueryCount(this.user);
      }
    },
    async loadMore() {
      this.currentPage += 1; // Move to the next page
      await this.submitQuery(this.currentPage, this.limit, 'loadMore'); // Fetch more results
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
    },

    // Fetch works for each author based on their author_id
    async fetchWorksForAuthors(apiBaseUrl) {
      // Only fetch works if there are results
      //if (this.results.length === 0) return;

      // For each author, fetch the matched works asynchronously in the background
      this.results.forEach((author, index) => {
        this.fetchWorksForAuthor(author.auth_id, index, apiBaseUrl);
      });
    },

    async fetchWorksForAuthor(authorId, index, apiBaseUrl) {
      try {

        const response = await fetch(`${apiBaseUrl}match_works`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author_id: authorId,
            vector: this.vector,  // Send the vector in the request body
          }),
        });
        const data = await response.json();
        // const response = await fetch(`${apiBaseUrl}match_works?author_id=${authorId}&vector=${encodeURIComponent(JSON.stringify(this.vector))}`);

        // const data = await response.json();


        // Directly update the array at the specific index
        this.authorWorks[index] = data;
      } catch (error) {
        console.error(`Error fetching works for author ${authorId}:`, error);

        // Set an empty array on error
        this.authorWorks[index] = [];
      }
    }

  },
};
</script>
