<template>

    <div class="query-form-container flex flex-col items-center mt-9 max-w-[850px] w-full px-2">

        <span
            class="inline-flex my-2 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            Enter a question, research summary, abstract, title, or query to search for research.
        </span>
        <span v-if="!isSubscribed && query_count > 10"
            class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 my-4 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
            Subscripition is needed.
        </span>
        <form @submit.prevent="() => submitQuery(1, limit, 'formSubmit')" class="flex flex-col items-start w-full px-5">
            <textarea v-model="query" type="text" @input="autoExpand" ref="textarea" placeholder="Enter your query"
                class="h-[52px] min-h-[52px] overflow-hidden block border-purple-200 ring-1 ring-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-300 py-4 px-4 rounded-xl w-full mb-4 mt-2  resize-none leading-tight bg-white">
      </textarea>
            <button type="submit" :disabled="query_count > 10 && !isSubscribed"
                class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2">
                Submit
            </button>

        </form>



        <!-- Error message -->
        <div v-if="error" class="mt-4 text-red-500">
            {{ error }}
        </div>



        <!-- Results -->
        <div class="mt-6 container p-2">
            <div v-if="summary || summary_loading"
                class="rounded bg-white border border-purple-100 grid  p-4 mb-5 text-gray-800 shadow-xs shadow-purple-50">
                <p class="font-bold text-xl">Meta-summary ✨</p>
                <div v-if="query_type == 'question' && data.summary && !summary_loading">
                    <YesNoMeter :data="data" />


                </div>
                <div v-else>
                    {{ summary }}
                </div>
                <ResultsLoadingAi v-if="summary_loading" />
            </div>

            <!-- Loading state -->
            <div v-if="loading" class="mt-4 container">
                <ResultsLoading v-if="loading" />

            </div>
            <div v-if="results && results.length && !loading > 0" class="grid grid-cols-1 gap-4">
                <div v-for="(result, index) in results" :key="index"
                    class="bg-white grid rounded-lg border border-indigo-100 p-2">
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

                        <div
                            class="mt-1 text-sm leading-5 border border-pink-200 rounded-xl p-4 bg-gray-50 text-gray-500">
                            <div v-if="result.summary && result.summary.length > 0">
                                {{ result.summary }}
                            </div>
                        </div>

                        <div class="mt-2">
                            <div v-if="!showMore[index]" class="flex text-sm text-gray-500">{{
                                result.abstract.slice(0, 0) }}</div>
                            <div v-if="showMore[index]" class="flex text-sm text-gray-500">{{ result.abstract }}</div>
                            <div v-if="result.abstract.length > 0" @click="showMore[index] = !showMore[index]"
                                class="flex items-center cursor-pointer">
                                <span class="text-xs">More</span>
                                <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': showMore[index] }"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <button v-if="results.length && results.length % limit === 0"
                class="bg-main text-white  py-2 px-4 rounded-full hover:bg-main-dark my-2"
                @click="loadMore">More</button>
        </div>
    </div>
</template>

<script>
import ResultsLoading from './ResultsLoading.vue';
import ResultsLoadingAi from './ResultsLoadingAi.vue';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import YesNoMeter from './YesNoMeter.vue';


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

            user: null,
            results: [],
            summary: null,
            loading: false, // Indicates whether the form is being submitted
            error: null, // Stores error messages
            showMore: {},
            query_count: 0,
            summary_loading: false,
            currentPage: 1,
            limit: 20,
            query_type: null,
            data: null,
        };
    },
    components: {
        ResultsLoading,
        ResultsLoadingAi,
        YesNoMeter,
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
        autoExpand() {
            const textarea = this.$refs.textarea;
            textarea.style.height = '52px'; // Reset height
            textarea.style.height = textarea.scrollHeight + 'px'; // Set to the scroll height
        },
        async loadMore() {
            this.currentPage += 1; // Move to the next page
            await this.submitQuery(this.currentPage, this.limit, 'loadMore'); // Fetch more results
        },
        async submitQuery(page = 1, limit = 10, source = 'formSubmit') {
            if (!this.query) {
                this.error = 'Please enter a query.';
                return;
            }
            this.showMore = {};
            this.summary = null;
            this.error = null;
            this.loading = true;
            this.summary_loading = true;
            if (typeof page === 'object') {
                // If it's an event (like the form submit event), reset page to 1
                page = 1;
            }

            try {
                const apiBaseUrl = process.env.NODE_ENV === 'production'
                    ? 'https://exprecapp-204008519850.europe-west4.run.app/'
                    : 'http://127.0.0.1:5000/';

                const response = await fetch(`${apiBaseUrl}queryresearch?q=${encodeURIComponent(this.query)}&page=${page}&limit=${limit}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }

                const data = await response.json();

                if (source === 'formSubmit') {
                    this.results = data.results.length ? data.results : ["No results"];
                } else {
                    this.results = data.results.length ? this.results.concat(data.results) : this.results;
                }

                this.summary = data.summary;
                // After fetching results, summarize each abstract
                if (this.results && this.results.length > 0) {
                    if (this.summary == null) {
                        this.summarizeResults(this.results, this.query)
                    }
                    this.results.forEach((result, index) => {
                        this.summarizeAbstract(result.abstract, index);
                    });
                }

            } catch (err) {
                this.error = err.message;
            } finally {
                await this.checkUserQueryCount(this.user);
                this.loading = false;
                this.query_count += 1;
                this.writeUserQueryCount(this.user);

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
                this.results[index].summary = data.summary;


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