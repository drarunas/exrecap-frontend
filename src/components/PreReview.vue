<template>
  <div class="pre-review-container flex flex-col items-center mt-9 max-w-[850px] w-full px-2">

    <span v-if="!isSubscribed && query_count > 10"
      class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 my-4 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
      Subscripition is needed.
    </span>
    <span
      class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 grow">
      Upload a PDF for pre-review analysis.
    </span>

    <span
      class="inline-flex my-2 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 grow">
      BETA: this is a beta feature.
    </span>

    <div v-if="uploadError" class="mt-4 text-red-500">
      {{ uploadError }}
    </div>



    <div v-if="!loading && !reviewData && !uploadError"
      class="mt-4 flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-gray-300"
      @drop.prevent="handleFileDrop" @dragover.prevent @dragenter.prevent>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".pdf" class="hidden" />
      <button @click="triggerFileInput" :disabled="query_count > 10 && !isSubscribed"
        class="bg-main hover:bg-main-dark text-white  py-2 px-4 rounded-full">
        Upload PDF
      </button>
      <div class="mt-2 text-gray-600">
        Or drag and drop a PDF file here
      </div>
    </div>


  


  <!-- TOC -->
  <aside v-if="loading || reviewData" class="sticky top-[1px] left-0 h-fit w-fit bg-gray-600 p-2 mt-2 rounded">
    <nav class="flex flex-wrap justify-center ">
      <a
        href="#pre_review_summary"
        class="text-sm font-medium text-purple-50  mx-2"
        :class="{ 'animate-pulse font-semibold': loading }"
      >
        Pre-Review Summary
      </a>
      <a
        href="#prior_research"
        class="text-sm font-medium text-purple-50  mx-2"
        :class="{ 'animate-pulse font-semibold': research_loading }"
      >
        Prior Research
      </a>
      <a
        href="#experts"
        class="text-sm font-medium text-purple-50 mx-2"
        :class="{ 'animate-pulse font-semibold': experts_loading }"
      >
        Experts
      </a>
    </nav>
  </aside>

  




    <div id="pre_review_summary" v-if="reviewData" class="mt-4">
      <div class="px-4 py-3 text-right sm:px-6">
        <button @click="resetForm"
          class="inline-flex justify-center py-2 px-4  text-sm rounded-full text-white bg-main hover:bg-main-dark ">
          New Document
        </button>
      </div>
    </div>
    <div v-if="loading" class="mt-4 w-full">
      <ResultsLoadingAi />
    </div>
    <div v-if="reviewData" class="mt-4 mb-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Pre-Review Summary
          </h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">

          <dl class="sm:divide-y sm:divide-gray-200">


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Title
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.title }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Article type
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.article_type }}
              </dd>
            </div>


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Research Question
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.research_question }}
              </dd>
            </div>


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Key Takeaway
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.key_takeaway }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Summary
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.summary }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Ethics
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.ethics }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Human study
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.human_study }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Unscientific content
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.is_unscientific }}
              </dd>
            </div>


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Authors
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li v-for="(author, index) in reviewData.authors" :key="index">
                    {{ author }}
                  </li>
                </ul>
              </dd>
            </div>



            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Methods
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li v-for="(method, index) in reviewData.methods" :key="index">
                    {{ method }}
                  </li>
                </ul>
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Fields
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li v-for="(field, index) in reviewData.fields" :key="index">
                    {{ field }}
                  </li>
                </ul>
              </dd>
            </div>


            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                Data
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.data }}
              </dd>
            </div>

            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                N
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.sample_size }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                What they say is known
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ reviewData.prior_research }}
              </dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                References
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li v-for="(ref, index) in reviewData.references" :key="index">
                    {{ ref }}
                  </li>
                </ul>
              </dd>
            </div>


          </dl>
        </div>
      </div>
    </div>


    <!-- RELATED RESEARCH -->
    <div v-if="researchData || research_loading" class="mt-4 mb-8 w-full">
      <p id="prior_research" class="mt-4 mb-2 text-xl leading-8 text-gray-700 font-bold">Prior Research</p>
      <ResultsLoadingAi v-if="research_loading" />
      <div class="grid grid-cols-1 gap-4">
        <div v-for="(result, index) in researchData" :key="index"
          class="rounded bg-white grid rounded-lg border border-indigo-100 p-2">
          <div class="px-6 mt-4 mb-1">
            <div class="font-bold text-xl mb-2 inline-flex items-center">
              <a :href="result.doi" target="_blank" rel="noopener">
                {{ result.title || "Title missing for now" }}</a>
            </div>

            <!-- {{ result.citations }} -->
            <div class="flex flex-row mt-1 text-sm leading-5 text-gray-500">
                <div class="mr-2" v-if="result.year">
                  {{ result.year }}
                  
                </div>
                <div v-if="result.journal">
                  {{ result.journal }}
                </div>
              </div>

            <div class="mt-1 text-sm leading-5 text-gray-500">
              <!-- <div v-if="result.name[0] && result.name[0].length > 0"> -->
              <div>
                {{ result.name[0] }} et al.
              </div>
            </div>

            <!-- <div
                            class="mt-1 text-sm leading-5 border border-pink-200 rounded-xl p-4 bg-gray-100 text-gray-500">
                            <div v-if="result.summary && result.summary.length > 0">
                                {{ result.summary }}
                            </div>
                        </div> -->

            <div class="mt-2">
              <div v-if="!showMore[index]" class="flex text-sm text-gray-500">{{
                result.abstract.slice(0, 0) }}</div>
              <div v-if="showMore[index]" class="flex text-sm text-gray-500">{{ result.abstract }}</div>
              <div v-if="result.abstract.length > 0" @click="showMore[index] = !showMore[index]"
                class="flex items-center cursor-pointer">
                <span class="text-xs">More</span>
                <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showMore[index] }"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="expertsData || experts_loading" class="mt-4 mb-8 w-full">
      <p id="experts" class="mt-4 mb-2 text-xl leading-8 text-gray-700 font-bold">Experts</p>
      <ResultsLoadingAi v-if="experts_loading" />
      <div class="grid grid-cols-1 gap-4">



        <div v-for="(result, index) in expertsData" :key="result.auth_id || index"
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

    </div>




  </div>
</template>

<script>
import ResultsLoadingAi from './ResultsLoadingAi.vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    
    ResultsLoadingAi,
    UserIcon,
    AtSymbolIcon,
  },
  props: ['isSubscribed'],
  data() {
    return {
      file: null,
      uploadError: null,
      loading: false,
      reviewData: null,
      researchData: null,
      expertsData: null,
      research_loading: false,
      experts_loading: false,
      user: null,
      query_count: 0,
      showMore: {},
      showMoreAffs: {}, // State for the Author IDs input field
      authorWorks: [],
      vector: null,
    };
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
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.uploadError = null; // Clear any previous errors
      if (this.file && this.file.type === 'application/pdf') {
        this.uploadFile();
      } else {
        this.uploadError = "Invalid file type. Please select a PDF file.";
        this.file = null; // Reset file input
      }
    },
    async submitResearchQuery() {

      this.showMore = {};
      this.researchData = null;
      this.error = null;
      this.research_loading = true;

      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryresearch?q=${encodeURIComponent(this.summary)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        this.researchData = data.results.length ? data.results : ["No results"];



      } catch (err) {
        this.error = err.message;
      } finally {
        this.research_loading = false;
      }
    },
    async submitExpertsQuery() {
      
      this.error = null;
      this.experts_loading = true;
      this.authorWorks = [];
      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryauthors?q=${encodeURIComponent(this.summary)}&page=1&limit=10`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();

        this.expertsData = data.results.length ? data.results : [];
        this.vector = data.vector;  // Assign the vector from the response
        await this.fetchWorksForAuthors(apiBaseUrl);
        
      } catch (err) {
        this.error = err.message;
      } finally {
        this.experts_loading = false;
        
        
      }
    },
    async fetchWorksForAuthors(apiBaseUrl) {
      // Only fetch works if there are results
      //if (this.results.length === 0) return;

      // For each author, fetch the matched works asynchronously in the background
      this.expertsData.forEach((author, index) => {
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
    },
    async uploadFile() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('file', this.file);

        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}pre_review`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json(); // Assuming the error is sent as JSON
          throw new Error(errorData.error || "Upload failed.");
        }

        const data = await response.json();
        this.reviewData = data;
        this.summary = data.summary;
        this.submitResearchQuery()
        this.submitExpertsQuery();
      } catch (error) {
        this.uploadError = error.message;
      } finally {
        await this.checkUserQueryCount(this.user);
        this.loading = false;
        this.query_count += 1;
        this.writeUserQueryCount(this.user);
      }
    },
    resetForm() {
      this.file = null;
      this.uploadError = null;
      this.loading = false;
      this.reviewData = null;
      this.$nextTick(() => {
        this.$refs.fileInput.value = null;
      });
    },
    handleFileDrop(event) {
      this.file = event.dataTransfer.files[0];
      this.uploadError = null;
      if (this.file && this.file.type === 'application/pdf') {
        if (this.isSubscribed || (!this.isSubscribed && this.query_count < 10)) {
          this.uploadFile();
        }
      } else {
        this.uploadError = "Invalid file type. Please select a PDF file.";
        this.file = null;
      }
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
  },
};
</script>