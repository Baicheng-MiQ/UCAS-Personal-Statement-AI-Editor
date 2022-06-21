<template>
    <div class="flex flex-col m-0 mt-8 lg:m-3 lg:mb-0 lg:w-1/2">
        <div class="flex flex-row mx-7 ml-auto">

            <p class="my-auto mx-3 text-gray-600">
                {{ gptQuota + " left "}}
            </p>

            <button class="bg-indigo-500 rounded-md font-mono shadow-sm
            text-white font-bold p-2 px-5
            hover:bg-indigo-600-600 hover:shadow-lg" @click="callAI">
                <p> Call AI </p>
            </button>
        </div>

<!-- ========================================== -->
        <div>
            <!-- pending -->
            <div v-show="noSubmission" class="flex flex-col mr-4">
                <h2 class="my-10 lg:top-64 relative text-gray-500 font-bold text-center text-lg pb-40">
                    Write your statement and click 'Call AI' to get the result.
                </h2>
            </div>

            <!-- wait result -->
            <div v-show="waitingResult" class="lg:mx-2 lg:mt-60 my-auto">
                <img src="/src/assets/loading.gif" alt="" width="50" height="50" class="mx-auto my-5">
                <h2 class="text-gray-500 font-bold text-center text-lg pb-40">
                    I'm thinking... this may take a while.
                </h2>
            </div>

            <!-- result -->
            <div v-show="result.comm" class="m-0 lg:mx-2 p-8 border-gray-100 rounded-lg">
                <gptResultParseC :result="result" />
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
            if (extractPureContent(this.$store.state.content).length < 2000) {
                this.$store.commit('notify',
                    { type: 'error', title: 'Too Short', message: 'Your Personal Statement is too short to be analysed, please enter at least 2000 characters' });
                return;
            }
            if (extractPureContent(this.$store.state.content).length > 4000) {
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
            const statement = extractPureContent(this.$store.state.content);
            const payload = {
                major: major,
                statement: statement,
                userToken: this.$store.state.userIDtoken
            }
            console.log(payload);
            // call GPT
            // 1. Curie; 2. Davinci
            axios.post('https://ps-htbbh2ws5a-uc.a.run.app/GPT-comment', payload)
            // axios.post('https://ps-davinci-htbbh2ws5a-uc.a.run.app/GPT-comment', payload)
            .then(response => 
                {this.waitingResult = false;
                this.result = response.data;
                console.log(response.data);})
            .catch(error =>
                {this.waitingResult = false; 
                this.result = error;})

            // update gpt quota
            this.$store.dispatch('dbUpdateUserStatus', {
                "status.usage.gptLeft": this.$store.state.userStatus["status"]["usage"]["gptLeft"] - 1
            });
        },

    },

}

// utils
function extractPureContent (content) {
    return content
        .replace(/<\/p>/g, '\n')
        .replace(/<[^>]*>?/gm, '')
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
};
</script>

<style>

</style>