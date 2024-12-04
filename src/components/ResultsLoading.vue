<template>
  <div class="border border-purple-100 shadow rounded-md p-4 w-full mx-auto my-6" >
    <div class="animate-pulse flex space-x-4" >
      <div class="rounded-full bg-slate-400 h-10 w-10"></div>

      <div class="flex-1 space-y-6 py-1">
        <div class="h-3 bg-slate-400 rounded text-xs"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-400 rounded col-span-1"></div>
            <div class="h-2 bg-slate-300 rounded col-span-1"></div>
            <div class="h-2 bg-slate-400 rounded col-span-1"></div>
            <div class="h-2 bg-slate-300 rounded col-span-1"></div>
            <div class="h-2 bg-slate-400 rounded col-span-1"></div>
            <div class="h-2 bg-slate-300 rounded col-span-1"></div>
            <div class="h-2 bg-slate-400 rounded col-span-1"></div>
            <div class="h-2 bg-slate-300 rounded col-span-1"></div>
            <div class="h-2 bg-slate-400 rounded col-span-1"></div>
            <div class="h-2 bg-slate-300 rounded col-span-3"></div>
          </div>
          <div class="h-2 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ResultsLoading',
  mounted() {
    
  }
}
</script>

<style>
</style>