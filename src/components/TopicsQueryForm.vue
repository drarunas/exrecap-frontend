<template>
    <div class="query-form-container flex flex-col items-center mt-9 w-full">
        <form @submit.prevent="submitQuery" class="flex flex-col items-center w-full px-5">
            <textarea v-model="query" type="text" placeholder="Enter your query"
                class="border border-gray-300  focus:ring focus:ring-blue-200 p-3 rounded-lg h-32 w-full mb-4 shadow-sm resize-none">
      </textarea>
            <button type="submit" class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                Submit
            </button>
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
        <div v-if="results && results.length > 0" class="mt-6 container p-2">

            <div class="container p-2">
                <ul role="list" class="divide-y divide-gray-100">
                    <li v-for="(result, index) in results" :key="index" class="flex justify-between gap-x-6 py-5">
                        <div class="flex min-w-0 gap-x-4">
                            <div class="min-w-0 flex-auto">
                                <p class="mt-1 text-sm leading-5 text-gray-500"><a :href="result.topic_id"
                                        target="_blank" rel="noopener">{{ result.topic_id }}</a></p>
                                <p class="mt-1 text-sm font-semibold leading-6 text-gray-900">{{ result.topic_name ||
                                    "Name missing" }}</p>
                                <p class="mt-1 text-sm leading-5 text-gray-500">{{ (1 - result.distance).toFixed(2) }}
                                </p>
                                <p class="mt-1 text-sm leading-5 text-gray-500">{{ result.summary }}</p>
                            </div>
                        </div>


                    </li>
                </ul>

            </div>




        </div>
    </div>
</template>

<script>
import ResultsLoading from './ResultsLoading.vue';

export default {
    data() {
        return {
            query: '',
            results: null,
            loading: false, // Indicates whether the form is being submitted
            error: null // Stores error messages
        };
    },
    components: {
        ResultsLoading
    },
    methods: {
        async submitQuery() {
            if (!this.query) {
                this.error = 'Please enter a query.';
                return;
            }

            this.error = null;
            this.loading = true;

            try {
                const apiBaseUrl = process.env.NODE_ENV === 'production' 
                ? 'https://exprecapp-204008519850.europe-west4.run.app/' 
                : 'http://127.0.0.1:5000/';

                const response = await fetch(`${apiBaseUrl}querytopics?q=${encodeURIComponent(this.query)}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }

                const data = await response.json();
                this.results = data.length ? data : ["No results"];
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
