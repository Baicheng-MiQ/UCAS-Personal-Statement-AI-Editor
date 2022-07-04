<template>
<div>
    <ul>
        <li v-for="(advice, index) in adviceContent" :key="index">
            <div class="bg-gray-50 m-4 mx-0 p-2 px-5 rounded-lg shadow-sm
                            hover:bg-indigo-50 ">
                <span class="font-serif text-base leading-8">{{ advice }}</span>

                <div class="flex flex-row justify-between items-baseline my-2 ">
                    <!-- copy botton -->
                    <!-- when clicked, activate an animation -->
                    <button class="py-1 px-1 mx-2 hover:bg-green-200 hover:rounded-full"
                            @click="copyAdvice(advice)">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                        </svg>
                    </button>

                    <div class="rating rating-sm flex flex-row">
                        <p class="relative text-sm text-slate-400">Feedback: </p>
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-slate-300" />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-slate-300" />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-slate-300" />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-slate-300" />
                        <input type="radio" name="rating-1" class="mask mask-star-2 bg-slate-300" checked/>
                    </div>
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