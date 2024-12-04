<template>
  <div class="overflow-hidden bg-white py-10 sm:py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:pr-8 lg:pt-4">
          <div class="lg:max-w-lg">
            <h2 class="text-base font-semibold leading-7 text-indigo-600">Find the Right Experts, Instantly.</h2>

            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Automate Peer Review Workflows 
            </p>

            <p class="mt-6 text-lg leading-8 text-gray-600">
              Unlock the power of AI-driven recommendation engine with access to over 50M experts and their research.
            </p>
            
             

            <dl class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <BeakerIcon class="size-6 text-blue-500" /> Quickly match expert reviewers to content based on
                  research summaries, abstracts, and free-form queries
                </dt>
                <dd class="inline"></dd>
              </div>

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <SparklesIcon class="size-6 text-blue-500" /> Generate initial peer review reports using custom AI models
                </dt>
                <dd class="inline"></dd>
              </div>

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <UserGroupIcon class="size-6 text-blue-500" /> Ensure peer review integrity with automated conflict of
                  interest checks
                </dt>
                <dd class="inline"></dd>
              </div>

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <ChatBubbleBottomCenterIcon class="size-6 text-blue-500" />
                  Enhance relevance by discovering related research
                </dt>
                <dd class="inline"></dd>
              </div>

              <div class="relative pl-9">
                <dt class="inline font-semibold text-gray-900">
                  <CpuChipIcon class="size-6 text-blue-500" /> Seamless integration directly into your editorial
                  workflows via our APIs
                </dt>
                <dd class="inline"></dd>
              </div>


            </dl>
          </div>
        </div>
        <img :src="require('@/assets/cover.png')" alt="Product screenshot"
          class="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          width="2432" height="1442">
      </div>
    </div>




    <div class="flex flex-col items-center justify-center m-4 font-light text-gray-900  rounded-md p-5">

<GlobeAmericasIcon class="size-12 text-indigo-500" />
<span class="m-4">Get in touch to schedule a demo</span>
<button @click="showForm = !showForm" class="bg-indigo-600 text-white rounded hover:bg-indigo-500 p-2">Contact
us</button>
<div v-if="showForm" class="transition-transform transform ease-out duration-500 m-4 w-full"
:class="{ 'translate-y-0': showForm, '-translate-y-full': !showForm }">
<ContactForm />
</div>
</div>




<div class="flex flex-col items-center justify-center m-4 font-light text-gray-900 p-5 rounded-md">
<CheckBadgeIcon class="size-12 text-indigo-500" />
<span class="m-4">Log In For a Trial</span>
<LoginForm v-if="!user" />
</div>
  </div>







</template>

<script>
import LoginForm from './LoginForm.vue';
import ContactForm from './ContactForm.vue';
import { BeakerIcon, ChatBubbleBottomCenterIcon, UserGroupIcon, CpuChipIcon, CheckBadgeIcon, GlobeAmericasIcon, SparklesIcon } from '@heroicons/vue/24/outline'

export default {
  data() {
    return {
      showForm: false, // To track form visibility
    };
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
    SparklesIcon
  }
};
</script>
