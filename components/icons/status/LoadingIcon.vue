<template>
  <transition>
    <svg
      class="spinner show"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="4"
        stroke-linecap="round"
        cx="12"
        cy="12"
        r="11"
      />
    </svg>
  </transition>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.spinner {
  transition: opacity 0.15s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: paused;
}
.spinner.show {
  animation-play-state: running;
}
.spinner.v-enter,
.spinner.v-leave-active {
  opacity: 0;
}
.spinner.v-enter-active,
.spinner.v-leave {
  opacity: 1;
}
.spinner .path {
  stroke: #f60;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;
}
@-moz-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-webkit-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-o-keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@keyframes rotator {
  0% {
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    transform: scale(0.5) rotate(270deg);
  }
}
@-moz-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@-o-keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 126;
    transform: rotate(450deg);
  }
}


</style>