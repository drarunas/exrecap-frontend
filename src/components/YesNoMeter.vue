<template>
  <div class="flex flex-col gap-3 px-4 py-3 rounded-xl">
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-0">
        <span class="inline-flex w-fit">
          <span class="py-1 px-2 rounded-lg bg-gray-50 border border-indigo-100">Based on {{ total }} papers</span>
        </span>
      </div>
    </div>

    <div class="relative">
      <!-- Yes Section -->
      <div class="flex items-center my-4">
        <div class="flex items-center gap-2 mb-2 md:mb-0">
          <div class="w-[120px] md:w-[150px] flex mr-3">
            <span class="flex-1 text-gray-500 font-semibold">Yes</span>
            <span class="text-gray-700 font-semibold">{{ yesPercentage }}%</span>
          </div>
        </div>
        <div class="h-5 flex-grow bg-zinc-50 rounded-full flex items-center overflow-hidden">
          <div class="rounded-full h-full bg-emerald-300 "
            :style="{ width: yesPercentage + '%' }"></div>
        </div>
      </div>

      <!-- Uncertain Section -->
      <div class="flex items-center my-4">
        <div class="flex items-center gap-2 mb-2 md:mb-0">

          <div class="w-[120px] md:w-[150px] flex mr-3">
            <span class="flex-1 text-gray-500 font-semibold">Uncertain</span>
            <span class="text-gray-700 font-semibold">{{ uncertainPercentage }}%</span>
          </div>
        </div>
        <div class="h-5 flex-grow bg-zinc-50 rounded-full flex items-center overflow-hidden">
          <div class="rounded-full h-full bg-sky-200 "
            :style="{ width: uncertainPercentage + '%' }"></div>
        </div>
      </div>

      <!-- No Section -->
      <div class="flex items-center my-4">
        <div class="flex items-center gap-2 mb-2 md:mb-0">
          <div class="w-[120px] md:w-[150px] flex mr-3">
            <span class="flex-1 text-gray-500 font-semibold">No</span>
            <span class="text-gray-700 font-semibold">{{ noPercentage }}%</span>
          </div>
        </div>
        <div class="h-5 flex-grow bg-zinc-100 rounded-full flex items-center overflow-hidden">
          <div class="rounded-full h-full bg-rose-300 "
            :style="{ width: noPercentage + '%' }"></div>
        </div>
      </div>
    </div>


    <div>
  <!-- Label with arrow icon -->
  <div
    @click="isExpanded = !isExpanded"
    class="flex items-center cursor-pointer select-none"
  >
    <span class="text-gray-800 font-medium mr-2">Explain</span>
    <svg
      :class="{ 'rotate-180': isExpanded }"
      class="w-4 h-4 transition-transform duration-200"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
    </svg>
  </div>

  <!-- Expandable Content -->
  <div v-show="isExpanded" class="rounded-xl">
    <div v-for="study in data.summary" :key="study.study_number"
      class="grid grid-cols-[auto,1fr] items-center gap-3 my-2">
      <div :class="{
        'bg-emerald-300': study.answer === 'yes',
        'bg-sky-200': study.answer === 'uncertain',
        'bg-rose-300': study.answer === 'no'
      }" class="flex items-center justify-center rounded-full text-gray-800 text-xs w-6 h-6">
        {{ study.study_number }}
      </div>
      <div class="text-sm">
        {{ study.explanation }}
      </div>
    </div>
  </div>
</div>




  </div>
</template>

<script>
export default {
  data() {
  return {
    isExpanded: false,
  };
},
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    total() {
      return this.data.counts.yes + this.data.counts.uncertain + this.data.counts.no;
    },
    yesPercentage() {
      return ((this.data.counts.yes / this.total) * 100).toFixed(0);
    },
    uncertainPercentage() {
      return ((this.data.counts.uncertain / this.total) * 100).toFixed(0);
    },
    noPercentage() {
      return ((this.data.counts.no / this.total) * 100).toFixed(0);
    }
  }
};
</script>

<style scoped>
/* Add any custom styling if necessary */
</style>