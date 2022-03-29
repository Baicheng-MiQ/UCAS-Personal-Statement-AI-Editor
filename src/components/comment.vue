<template>
<div class="p-4 bg-slate-50 max-w-md mx-auto rounded-xl shadow-lg hover:bg-slate-100
        flex flex-col items-start space-x-4
        lg:flex-row">

  <div class="shrink-0">
    <img class="h-auto w-12 mx-4 rounded-full" src="src/assets/chat.png" alt="ChitChat Logo">
  </div>

  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>

  <div >
      <button class="bg-sky-500 text-white px-4 py-2 rounded-full mt-1
            hover:bg-sky-600 hover:shadow-md cursor-wait">
        Start</button>

  </div>
</div>
</template>

<script>
export default {
  name: 'CommentC',
  data() {
    return {
      alpha: 0.5,
    }
  },
  methods: {
    sayHello() {
      this.message = 'Hello!'
    }
  },
  created() {
    console.log('Comment component created!')
  },
  mounted() {
    console.log('Comment component mounted!')
  },
  props: {
    message: {
      type: String,
      default: 'Hello World'
    }
  }
}
</script>

<style>

</style>