<template>
    <div class="flex h-32 gap-4 p-5">
      <div class="flex w-full max-w-3xl flex-col gap-4 pt-2">
        <div
          class="h-2 w-full origin-left animate-loading rounded-full bg-gradient-to-r from-purple-100 from-20% via-indigo-600/60 to-purple-50 to-70% bg-[length:200%] opacity-0"
        ></div>
        <div
          class="h-2 w-3/4 origin-left animate-loading rounded-full bg-gradient-to-r from-purple-100 from-20% via-indigo-600/60 to-purple-50 to-70% bg-[length:200%] opacity-0"
        ></div>
        <div
          class="h-2 w-full origin-left animate-loading rounded-full bg-gradient-to-r from-purple-100 from-20% via-indigo-600/60 to-purple-50 to-70% bg-[length:200%] opacity-0"
        ></div>
        <div
          class="h-2 w-1/2 origin-left animate-loading rounded-full bg-gradient-to-r from-purple-100 from-20% via-indigo-600/60 to-purple-50 to-70% bg-[length:200%] opacity-0"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResultsLoadingAi",
  };
  </script>
  
  <style scoped>
  @keyframes expanding {
    0% {
      transform: scaleX(0);
      opacity: 0.8;
    }
    100% {
      transform: scaleX(1);
      opacity: 1;
    }
  }
  
  @keyframes moving {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .animate-loading {
    animation: expanding 0.7s 0.4s forwards linear, moving 1.4s 1.1s infinite forwards linear;
  }
  </style>
  