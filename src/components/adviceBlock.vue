<template>
<div>
    <ul>
        <li v-for="(advice, index) in adviceContent" :key="index">
            <div class="bg-gray-50 m-4 mx-0 p-2 px-5 rounded-lg shadow-sm
                            hover:bg-green-50">
                <span class="font-serif text-base leading-8">{{ advice }}</span>

                <div class="flex flex-row justify-end ">
                    <!-- copy botton -->
                    <!-- when clicked, activate an animation -->
                    <button class="py-1 px-1 mx-2 hover:bg-green-200 hover:rounded-full"
                            @click="copyAdvice(advice)">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                        </svg>
                    </button>

                    <!-- thumb up botton -->
                    <button class="py-1 px-1 mx-2"
                            @click="thumbUp(advice)">
                        <svg class="w-5 h-5" fill="#888" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
                        </svg>
                    </button>

                    <!-- thumb down botton -->
                    <button class="py-1 px-1 mx-2 rotate-180"
                            @click="thumbDown(advice)">
                        <svg class="w-5 h-5 " fill="#888" viewBox="0 0 24 24">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'adviceBlockC',
    components: {
        
    },
    data() {
        return {
        
        }
    },
    computed: {
        
    },
    props: {
        adviceContent: {
            type: [String, Array, null],
            required: true
        }
    },
    methods: {
        copyAdvice(advice) {
            navigator.clipboard.writeText(advice);
        },
        thumbUp(advice) {
            console.log(advice);
        },
        thumbDown(advice) {
            console.log(advice);
        },
        
    },
    watch: {
      adviceContent: {
        handler(newVal, oldVal) {
          console.log(newVal);
        },
        deep: true
      }  
    },
}
</script>

<style>

</style>