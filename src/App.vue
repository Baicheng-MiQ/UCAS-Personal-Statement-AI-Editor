<template>
  <!-- nav bar -->
  <nav class="sticky lg:top-0 z-40 backdrop-blur-sm">
    <navBarC/>
  </nav>

  <!-- global loading -->
  <div wire:loading 
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden 
          bg-gray-700 opacity-75 flex flex-col items-center justify-center"
    v-show="user && !this.$store.state.appReady" >
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
  </div>

  <router-view/>
  

  <!-- https://github.com/kyvg/vue3-notification -->
  <notifications position="top right" 
                  classes="notif"
                  :width=360
                  :max=200 />
  <!-- Developer Box -->
  <devC v-show="false" class="max-h-48 bottom-0 absolute z-50"/>
</template>

<script>
import navBarC from "/src/components/navBar.vue";
import devC from "/src/components/dev.vue";

export default {
  name: 'App',
  components: {
    navBarC,
    devC,
  },
  computed: {
    user()  {
        return this.$store.state.userDetail;
      },
    },
  methods: {
  },
  watch: {
    user() {
      if (!this.user) {
        this.$router.push('/');
      }
    },
  },
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.notif {
  // styling
  margin: 14px;
  padding: 10px;
  font-size: 18px;
  color: #555;
  // rounded-lg right
  border-radius: 0 10px 10px 0;
  // opacity 90
  opacity: 0.9;
  // border-2 border-gray-100
  border: 1px solid #ccc;

  // style for title line
  .notification-title {
    /*...*/
  }

  // style for content
  .notification-content {
    font-size: 16px;
  }

  // default (white)
  background: #e54d42;
  border-left: 5px solid #187fe7;

  // types (green, amber, red)
  &.success {
    border-left-color: #42a85f;
  }

  &.warn {
    border-left-color: #f48a06;
  }

  &.error {
    border-left-color: #b82e24;
  }
}

.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

</style>
