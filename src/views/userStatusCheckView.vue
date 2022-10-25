<template>
  <headingVue />
  <div class="mt-8 w-full flex">
      <div class="flex flex-col m-auto border-2 border-gray-200 rounded-lg p-10">
        <h1 class="text-2xl font-bold">Thank you for your interest!</h1>

        <h2 class="max-w-md mt-2">
            If you are interested in joining beta, please fill out the form below and we will get back to you as soon as possible.
        </h2>
        <!-- A button redirecting to google forms -->
        <div>
            <a class="btn btn-info mx-auto mt-10" href="https://www.google.com">
                Join!
            </a>
        </div>
      </div>
  </div>
</template>

<script>
import headingVue from '../components/heading.vue';
export default {
    name: 'userStatusCheckView',
    data() {
        return {
        }
    },
    components: {
        headingVue
    },
    computed: {
    },

}
</script>

<style>

</style>