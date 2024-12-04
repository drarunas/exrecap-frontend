<template>


  <!-- COVER RESULTS -->
  <Transition>
    <div v-if="cover_results"
      class="query-form-container flex flex-col items-center justify-center mt-9 max-w-[850px] w-full px-2">

      <div class="relative ">
        <svg viewBox="0 0 1024 1024"
          class="absolute  -z-10 h-full w-full sm:translate-y-1/2 translate-y-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true">
          <circle cx="50%" cy="50%" r="250%" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.1" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="10%" cy="50%" r="250%" fx="50%" fy="50%">
              <stop stop-color="blue" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
          </defs>
        </svg>

        <svg viewBox="0 0 1024 1024"
          class="absolute -z-10 h-1/2 w-1/2 sm:translate-y-1/3 translate-y-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true">
          <circle cx="50%" cy="50%" r="150%" fill="url(#759c1415-0410-454c-8f7c-9a820de03642)" fill-opacity="0.1" />
          <defs>
            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03642" cx="70%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop stop-color="purple" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
          </defs>
        </svg>

        <div class="flex flex-col items-center justify-center">

          <div
            class="isolate relative max-w-full my-1 mb-1 px-1 overflow-hidden flex flex-col items-cetner justify-center">


            <div class="mx-auto max-w-full text-center lg:flex-auto lg:py-5">
              <h1 class="text-balance text-3xl font-bold tracking-tight text-gray-700 sm:text-3xl lg:text-3xl my-2">
                Connecting
                You to the World of Expert Knowledge ✨</h1>



              <form @submit.prevent="askToLogin" class=" w-full px-5 pt-2">

                <textarea v-model="query" rows="1" style="min-height: auto; overflow-y: hidden;" type="text"
                  @input="autoExpand" ref="textarea" placeholder="Enter your query"
                  class="block border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-50 py-4 px-4 pb-5 rounded-xl w-full mb-4 shadow-sm resize-none leading-tight">
            </textarea>

                <div class="flex items-center justify-center gap-x-6">
                  <LoginForm v-if="!user" />
                  <a href="#getstarted" class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2">Learn
                    more</a>
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
      <p class="mt-4 text-3xl leading-8 text-gray-700 font-bold">Experts</p>

<!-- Loading state -->
<div v-if="loading_experts" class="mt-4 container">
  <ResultsLoading v-if="loading_experts" class="my-2" />
</div>


<div v-if="expert_results && expert_results.length && !loading_experts > 0" class="mt-6">
  <div class="grid grid-cols-1 gap-4">
    <div v-for="(result, index) in expert_results" :key="result.auth_id || index"
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
          {{ result.emails[0] }}
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
      <p class="mt-4 mb-2 text-3xl leading-8 text-gray-700 font-bold">Research</p>
      <!-- Loading state -->



      <div class="mt-2 container p-2">
        <div v-if="summary || summary_loading"
          class="rounded bg-white border border-purple-100 grid  p-4 mb-5 text-gray-800 shadow-xs shadow-purple-50">
          <p class="font-bold text-xl">Meta-summary ✨</p>
          <div v-if="query_type == 'question' && data.summary">
            <YesNoMeter :data="data" />


          </div>
          <div v-else>
            {{ summary }}
          </div>
          <ResultsLoadingAi v-if="summary_loading" />
        </div>

        <div v-if="loading_research" class="mt-4 container">
          <ResultsLoading v-if="loading_research" class="my-2" />
        </div>


        <div v-if="research_results && research_results.length > 0" class="grid grid-cols-1 gap-4">

          <div v-for="(result, index) in research_results" :key="index"
            class="bg-white grid rounded-lg border border-indigo-100 p-2">
            <div class="flex mr-2 items-center justify-center rounded-full bg-gray-100 text-gray-800 text-sm min-w-6 min-h
            -6 w-6 h-6">
              {{ index +1 }}
            </div>
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
                <div v-if="result.name[0] && result.name[0].length > 0">
                  {{ result.name[0] }} et al.
                </div>
              </div>
              <div class="mt-2 text-sm leading-5 border border-pink-50 rounded-xl p-4 bg-gray-100 text-gray-800">
                <div v-if="result.summary && result.summary.length > 0">
                  {{ result.summary }}
                </div>
              </div>

              <div class="mt-2">
                <div v-if="!showMore[index]" class="flex text-sm text-gray-500">{{ result.abstract.slice(0, 0) }}
                </div>
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
      
    </div>
  </Transition>


  <!-- COVER -->

  <Transition>
    <div v-if="!cover_results" class="relative">

      <svg viewBox="0 0 1024 1024"
        class="absolute fixed  z-[-9999] h-full w-full sm:translate-y-1/2 translate-y-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true">
        <circle cx="0px" cy="0px" r="150%" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.1" />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0px" cy="0px" r="150%" fx="50%" fy="50%">
            <stop stop-color="blue" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 1024 1024"
        class="absolute fixed z-[-9999] h-1/2 w-1/2 sm:translate-y-1/3 translate-y-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true">
        <circle cx="50%" cy="50%" r="150%" fill="url(#759c1415-0410-454c-8f7c-9a820de03642)" fill-opacity="0.1" />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03642" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop stop-color="purple" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
      </svg>

      <div class="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">

        <div
          class="isolate relative max-w-full my-4 mb-8 py-16 px-4 lg:px-10 sm:px-5 overflow-hidden flex flex-col items-cetner justify-center min-h-[calc(70vh)]">


          <div class="mx-auto max-w-full text-center flex flex-col items-center justify-center lg:flex-auto lg:py-16 ">
            <h1 class="text-balance text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl lg:text-6xl">Connecting
              You to the World of Expert Knowledge ✨</h1>
            <p class="mt-6 text-lg leading-8 text-gray-700">AI-powered discovery grounded in real expert knowledge</p>

            <form @submit.prevent="submitQuery" class="max-w-[850px] w-full px-5 pt-2">

              <textarea v-model="query" rows="1" style="min-height: auto; overflow-y: hidden;" type="text"
                @input="autoExpand" ref="textarea" placeholder="Enter your query, abstract, or research summary"
                class="block border-2 border-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-50 py-4 px-4 pb-5 rounded-xl w-full mb-4 shadow-sm resize-none leading-tight">
            </textarea>

              <div class="flex items-center justify-center gap-x-6">
                <button type="submit" class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2 ">
                  Submit
                </button>
                <a href="#getstarted" class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2 ">Learn
                  more</a>
              </div>
            </form>
            <div class="mt-2 flex flex-wrap justify-center">
              Or try:
            </div>


            <ExampleQueries :setQueryAndSubmit="setQueryAndSubmit" />




          </div>
        </div>
      </div>
    </div>
  </Transition>

  <div id="getstarted" class="my-5 bg-gradient-to-t from-gray-50 to-transparent rounded-3xl  overflow-hidden">
    <!-- EXPERTS -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8 my-10">

      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:pr-8 lg:pt-4">
          <div class="lg:max-w-lg">
            <h2 class="text-base font-semibold leading-7 text-blue-500 mt-2"></h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Experts. Research. Pre Review Reports.
            </p>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Unlock the power of AI-driven expert recommendation and scientific discovery engine with access to over
              50M experts and their
              research.
            </p>

            <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <PresentationChartLineIcon class="size-6 text-blue-500" />
                  Research: AI based search grounded in real expert knowledge. Discover science by asking a question and
                  synthesize insights from multiple studies
                </dt>
                <dd class="inline"></dd>
              </div>

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <BeakerIcon class="size-6 text-blue-500" /> Experts: Quickly discover scientific experts based on
                  research summaries, questions, abstracts, and free-form queries,
                </dt>
                <dd class="inline"></dd>
              </div>

              <!-- <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <UserGroupIcon class="size-6 text-blue-500" /> Cois: Ensure review integrity with automated conflict
                  of
                  interest checks
                </dt>
                <dd class="inline"></dd>
              </div> -->



              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <SparklesIcon class="size-6 text-blue-500" /> Pre Review: Generate initial peer review reports for a
                  research study using custom AI models
                </dt>
                <dd class="inline"></dd>
              </div>



              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <CpuChipIcon class="size-6 text-blue-500" /> Seamless integration directly into your
                  systems via our APIs
                </dt>
                <dd class="inline"></dd>
              </div>


            </dl>
          </div>
        </div>
        <img :src="require('@/assets/cover.png')" alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[70rem] md:-ml-4 lg:-ml-0"
          width="2432" height="1442">
      </div>
    </div>



    <div class="flex flex-col items-center justify-center m-4 font-light text-gray-900  rounded-md p-5">

      <GlobeAmericasIcon class="size-12 text-gray-500" />
      <span class="m-4">Get in touch to schedule a demo</span>
      <button @click="showForm = !showForm" class="bg-main text-white rounded-full hover:bg-main-dark p-2 ">Contact
        us</button>
      <div v-if="showForm" class="transition-transform transform ease-out duration-500 m-4 w-full"
        :class="{ 'translate-y-0': showForm, '-translate-y-full': !showForm }">
        <ContactForm />
      </div>
    </div>
    <div v-if="!user" class="flex flex-col items-center justify-center m-4 font-light text-gray-900 p-5 rounded-md">
      <CheckBadgeIcon class="size-12 text-gray-500" />
      <span class="m-4">Log In For a Trial</span>
      <LoginForm v-if="!user" />
    </div>

  </div>

  <div class="w-full mt-6 mb-2 h-[1px] bg-purple-100"></div>

  <div class="flex flex-col items-center justify-center m-1 font-light text-gray-900 rounded-md p-5">
    <!-- Service Agreement Link -->
    <a href="#" @click.prevent="togglePopup" class="text-blue-500 underline hover:text-blue-400 text-sm">
      Privacy Policy, Cookies, and User Agreement
    </a>

    <!-- Popup Window -->
    <div v-if="showPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg max-w-5xl shadow-lg p-6 relative overflow-auto max-h-[80vh]">
        <!-- Close Button -->
        <button @click="togglePopup"
          class="p-2 text-white hover:text-white-900 bg-main hover:bg-main-dark rounded-full ">
          Close
        </button>

        <!-- Service Agreement Content -->
        <div class="transition-transform transform ease-out duration-500 m-1 w-full">
          <ServiceAgreement />
        </div>
        <button @click="togglePopup" class="p-2 text-white bg-main hover:bg-main-dark  rounded-full ">
          Close
        </button>
      </div>
    </div>
  </div>




</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

import LoginForm from './LoginForm.vue';
import ContactForm from './ContactForm.vue';
import { BeakerIcon, ChatBubbleBottomCenterIcon, UserGroupIcon, CpuChipIcon, CheckBadgeIcon, GlobeAmericasIcon, SparklesIcon, PresentationChartLineIcon } from '@heroicons/vue/24/outline'
import { BookOpenIcon, UsersIcon, CurrencyDollarIcon, BuildingOffice2Icon } from '@heroicons/vue/24/solid'
import ServiceAgreement from './ServiceAgreement.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { UserIcon, AtSymbolIcon } from '@heroicons/vue/24/outline'
import ResultsLoading from './ResultsLoading.vue';
import ResultsLoadingAi from './ResultsLoadingAi.vue';
import ExampleQueries from './ExampleQueries.vue';
import YesNoMeter from './YesNoMeter.vue';





export default {
  data() {
    return {
      user: null,
      cover_results: false,
      loading_experts: false,
      loading_research: false,
      showForm: false, // To track form visibility
      showPopup: false,
      query: null,
      expert_results: null,
      research_results: null,
      showMoreAffs: {},
      showMore: {},
      authorWorks: [],
      summary: null,
      query_type: null,
      summary_loading: false,
      data: null,
    };
  },
  mounted() {
    this.autoExpand();
    window.addEventListener('resize', this.autoExpand);

  },
  beforeUnmount() {
    window.removeEventListener('resize', this.autoExpand);
  },
  watch: {
    cover_results(newValue) {
      if (newValue) { // Check if cover_results is now true
        this.$nextTick(() => {
          this.autoExpand();
        });
      }
    }
  },
  methods: {
    autoExpand() {
      const textarea = this.$refs.textarea;
      textarea.style.height = '52px'; // Reset height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to the scroll height
    },

    togglePopup() {
      this.showPopup = !this.showPopup;
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
    setQueryAndSubmit(newQuery) {
      this.query = newQuery;
      this.submitQuery();
      this.autoExpand();
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional for smooth scrolling
      });
    },
    async submitQuery(page = 1, limit = 10) {

      if (typeof page === 'object') {
        // If it's an event (like the form submit event), reset page to 1
        page = 1;
      }
      if (!this.query) {
        this.error = 'Please enter a query.';
        return;
      }

      this.error = null;
      this.loading_experts = true;
      this.loading_research = true;
      this.summary_loading = true;
      this.currentPage = page;
      this.authorWorks = [];
      this.cover_results = true;


      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryresearch?q=${encodeURIComponent(this.query)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        this.research_results = data.results.length ? data.results : ["No results"];
        this.summary = data.summary;
        // After fetching results, summarize each abstract
        if (this.research_results && this.research_results.length > 0) {
          this.summarizeResults(this.research_results, this.query);
          this.research_results.forEach((result, index) => {
            this.summarizeAbstract(result.abstract, index);
          });
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading_research = false;
      }
      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';

        const response = await fetch(`${apiBaseUrl}queryauthors?q=${encodeURIComponent(this.query)}&page=${page}&limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();

        this.expert_results = data.results.length ? data.results : [];
        this.vector = data.vector;  // Assign the vector from the response
        await this.fetchWorksForAuthors(apiBaseUrl);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading_experts = false;
      }
    },
    async summarizeAbstract(abstract, index) {

      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';
        const response = await fetch(`${apiBaseUrl}summarize_study`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ abstract: abstract })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        this.research_results[index].summary = data.summary;


      } catch (err) {
        this.error = err.message;
      } finally {
        console.log('');
      }
    },
    async summarizeResults(results, query) {
      this.summary_loading = true;
      try {
        const apiBaseUrl = process.env.NODE_ENV === 'production'
          ? 'https://exprecapp-204008519850.europe-west4.run.app/'
          : 'http://127.0.0.1:5000/';
        const response = await fetch(`${apiBaseUrl}summarize_research_results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ abstracts: results, query: query })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        this.data = data;
        this.summary = data.summary;
        this.query_type = data.type;
        


      } catch (err) {
        this.error = err.message;
      } finally {
        this.summary_loading = false;
      }
    },
    async fetchWorksForAuthors(apiBaseUrl) {
      // Only fetch works if there are results
      //if (this.results.length === 0) return;

      // For each author, fetch the matched works asynchronously in the background
      this.expert_results.forEach((author, index) => {
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

        // Directly update the array at the specific index
        this.authorWorks[index] = data;
      } catch (error) {
        console.error(`Error fetching works for author ${authorId}:`, error);

        // Set an empty array on error
        this.authorWorks[index] = [];
      }
    },


  },
  components: {
    LoginForm,
    ContactForm,
    BeakerIcon,
    ChatBubbleBottomCenterIcon,
    UserGroupIcon,
    CpuChipIcon,
    CheckBadgeIcon,
    GlobeAmericasIcon,
    SparklesIcon,
    BookOpenIcon,
    UsersIcon,
    CurrencyDollarIcon,
    BuildingOffice2Icon,
    ServiceAgreement,
    PresentationChartLineIcon,
    UserIcon,
    AtSymbolIcon,
    ResultsLoading,
    ResultsLoadingAi,
    ExampleQueries,
    YesNoMeter,
  }
};
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.0s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>