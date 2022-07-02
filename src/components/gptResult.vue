<template>
<div class="">
    <div class="flex flex-col m-0 mt-8 lg:m-3 lg:mt-6 lg:mb-0">
        <div class="flex flex-row justify-between items-end">

            <div class="my-auto stats shadow">
                <div class="stat p-3">  
                    <div class="stat-title text-sm">AI Usage</div>
                    <div class="stat-value text-lg">{{ gptQuota }}</div>
                    <div class="stat-desc text-sm">left</div>
                </div>
            </div>

            <button class="btn btn-primary rounded-md font-mono shadow-sm
            text-white font-bold p-1 px-5
            hover:bg-indigo-600-600 hover:shadow-lg" @click="callAI">
                <p> Call AI </p>
            </button>
        </div>

<!-- ========================================== -->
        <div>
            <!-- pending -->
            <div v-show="noSubmission" class="flex flex-col mr-4 items-center">
                <h2 class="my-10 top-20 relative text-gray-500 font-bold text-center text-lg pb-40">
                    Write your statement and click 'Call AI' to get the result.
                </h2>
            </div>

            <!-- wait result -->
            <div v-show="waitingResult" class="lg:mx-2 lg:mt-60 lg:w-full my-auto">
                <img src="/src/assets/loading.gif" alt="" width="50" height="50" class="mx-auto my-5">
                <h2 class="text-gray-500 font-bold text-center text-lg pb-40">
                    I'm thinking... this may take a while.
                </h2>
            </div>

            <!-- result -->
        <Transition enter-active-class="animate__animated animate__fadeInDown animate__faster">
            <div v-show="result.comm" class="m-0 border-gray-100 rounded-lg">
                <gptResultParseC :result="result" />
            </div>
        </Transition>
        </div>
    </div>
</div>
</template>

<script>
import gptResultParseC from "../components/gptResultParse.vue";
import axios from 'axios';

export default {
    name: 'GPTResultC',
    components: {
        gptResultParseC
    },

    data() {
        return {
            noSubmission: true,
            waitingResult: false,
            result: {
                pro: null,
                con: null,
                comm: null
            },
        }
    },
    computed: {
        userDetails(){
            return this.$store.state.userDetails;
        },

        gptQuota() {
            if (this.$store.state.userStatus) {
            return this.$store.state.userStatus["status"]["usage"]["gptLeft"];
            } else {
                return 0;
            }
        }
    },
    methods: {
        async callAI() {
            if (this.$store.state.major.length === 0) {
                this.$store.commit('notify', 
                    { type: 'error', title: 'Major', message: 'Please enter your a major' });
                return;
            }
            if (this.$store.getters.pureContent.length < 2000) {
                this.$store.commit('notify',
                    { type: 'error', title: 'Too Short', message: 'Your Personal Statement is too short to be analysed, please enter at least 2000 characters' });
                return;
            }
            if (this.$store.getters.pureContent.length > 4000) {
                this.$store.commit('notify',
                    { type: 'error', title: 'Too Long', message: 'The limit given by UCAS is 4000 characters, please shorten your Personal Statement' });
                return;
            }
            if (this.gptQuota <= 0) {
                this.$store.commit('notify',
                    { type: 'error', title: 'Usage', message: 'You have used all your GPT quota. We are still in beta stage, so please <a href="mailto:ybaicheng.outlook.com" class="text-blue-600 font-bold">e-mail</a> me if you need more' });
                return;
            }

            // set loading state
            this.waitingResult = true;
            this.noSubmission = false;
            this.result= {
                pro: null,
                con: null,
                comm: null
            };
            
            // call getUserIDtoken action
            if (!this.$store.state.userIDtoken) {
                await this.$store.dispatch('getUserIDtoken');
            }

            // construct request
            const major = this.$store.state.major.join(", ");
            const statement = this.$store.getters.pureContent;
            const payload = {
                proEngine: "Curie",
                conEngine: "Curie",
                commEngine: "Curie",
                statement:{
                    major: major,
                    statement: statement,
                    userToken: this.$store.state.userIDtoken
                }
            };
            console.log(payload);
            // call GPT
            // 1. Curie; 2. Davinci
            axios.post('https://ps-htbbh2ws5a-uc.a.run.app/GPT-comment', payload)
            // axios.post('http://localhost:8000/GPT-comment', payload)
            .then(response => 
                {this.waitingResult = false;
                this.result = response.data;
                console.log(response.data);})
            .catch(error =>
                {this.waitingResult = false; 
                alert(error);})

        },

    },

}
</script>

<style>

</style>