<template>
    <div class="flex flex-col space-y-4 py-4 md:w-full">
        <!-- tags -->
        <div class="w-full">
            <div v-if="checkResult.paraType.checkResult"
                class="flex flex-row whitespace-nowrap space-x-2 w-full overflow-x-auto">
                <div v-for="(paraType, index) in checkResult.paraType.checkResult" :key="index">
                    <div class="badge badge-xl badge-info bg-blue-600 text-white font-bold py-3 capitalize">
                        {{ paraType }} </div>
                </div>
                <refreshIcon v-show="this.hasParaChangedAfterCheck.includes('paraType') || 
                    this.checkResult.paraType.checkResult === null || 
                    this.checkResult.paraType.checkResult === 'Error...'" @click="this.$emit('recheckParaType')"
                    class="cursor-pointer w-6 h-6 text-gray-400" />

            </div>
            <div v-else class="animate-pulse badge badge-lg badge-info bg-blue-100"> ... </div>
        </div>

        <!-- headings -->
        <div class="text-2xl font-serif">
            <div v-if="checkResult.paraHeading.checkResult" class="flex flex-row justify-between ">
                <h1>{{ checkResult.paraHeading.checkResult }} </h1>
                <div>
                    <refreshIcon v-show="this.hasParaChangedAfterCheck.includes('paraHeading') ||
                        this.checkResult.paraHeading.checkResult === null ||
                        this.checkResult.paraHeading.checkResult === 'Error...'"
                        @click="this.$emit('recheckParaHeading')"
                        class="cursor-pointer w-6 h-6 text-gray-400 p-px border-2 rounded-full" />
                </div>
            </div>
            <h1 v-else class="animate-pulse w-fit">
                Loading...
            </h1>
        </div>

        <!-- AI comment -->
        <div class=" w-fit p-1" v-show="checkResult.paraComment.checkResult">
            
            <div class="flex flex-row space-x-2 align-middle">
                <div class="indicator ">
                    <span class="scale-75 scale-x-[0.7] indicator-item indicator-bottom bg-green-500 border-2 border-white badge badge-secondary
                                            -translate-x-[1px] -translate-y-[1px]"></span>
                    <div class="avatar" v-show="checkResult.paraComment.checkResult">
                        <div class="w-16 rounded-full p-1 border-2 border-blue-400">
                            <img class="rounded-full"
                                :src="`https://avatars.dicebear.com/api/micah/${this.imageURL}.png?mouth[]=laughing&baseColor=mellow&b=%23b8edff`" />
                        </div>
                    </div>
                </div>
                <h2 class="font-bold text-lg my-auto">PSAI Expert Advice</h2>
            </div>
        </div>

        <div class="divider"></div>

        <!-- sentence -->
        <div class="sent w-full">
            <div v-if="checkResult.sentenceIssue.checkResult" class="flex flex-row space-x-2 w-full">
                <div hidden v-for="(paraSent, index) in checkResult.sentenceIssue.checkResult" :key="index">
                    <div class="font-bold py-3 capitalize"> {{ paraSent.sentence }} </div>
                </div>

                <div class="flex flex-row w-full">
                    <div class="stat m-0 p-0">
                        <div class="stat-title flex flex-row">
                            Found
                            <refreshIcon v-show="this.hasParaChangedAfterCheck.includes('sentenceIssue') ||
                                this.checkResult.sentenceIssue.checkResult === null ||
                                this.checkResult.sentenceIssue.checkResult === 'Error...'"
                                @click="this.$emit('recheckSentenceIssue')" class="h-5 cursor-pointer" />
                        </div>
                        <div class="stat-value" :class="{
                            'text-red-600': this.numOfSentenceIssue > 0 || this.numOfSentenceIssue === 'Error...',
                            'text-green-600': this.numOfSentenceIssue === 0
                        }">
                            {{ this.numOfSentenceIssue }}</div>
                        <div class="stat-desc">issues in {{ this.numOfSentence }} sentences</div>
                    </div>
                </div>
            </div>
            <div v-else class="animate-pulse w-fit px-2 text-lg">
                {{ this.loadingMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import refreshIcon from "@carbon/icons-vue/es/restart/24.js"
export default {
    name: 'StatResult',
    emits: ['recheckParaType', 'recheckParaHeading', 'recheckSentenceIssue'],
    components: {
    refreshIcon,
},
// very bad practice below, but I don't know how to do it better
// duplicated code as in statResultLearnMore.vue
    data() {
        return {
            loadingMessage: 'Loading...',
            timer: ''
        }
    },
    created() {
        this.timer = setInterval(() => {
            this.updateLoadingMessage()
        }, 5000)
    },
    props: {
        para: {
            type: String,
            required: true,
        },
        checkResult: {
            type: Object,
            required: true,
        },
    },
    computed: {
        numOfSentence() {
            return this.checkResult.sentenceIssue.checkResult.length;
        },
        numOfSentenceIssue() {
            var issueCounter = 0;
            if (this.checkResult.sentenceIssue.checkResult && this.checkResult.sentenceIssue.checkResult!="Error..."){
                for (var i = 0; i < this.checkResult.sentenceIssue.checkResult.length; i++) {
                    // count number of elements in array checkResult.sentenceIssue.checkResult[i].ner_reses 
                    // where ner_reses[i].entity_group is in ['PER', 'LOC', 'ORG']
                    issueCounter += this.checkResult.sentenceIssue.checkResult[i].ner_reses.length;
                    // count number of key value pairs in object checkResult.sentenceIssue.checkResult[i].flags
                    issueCounter += this.checkResult.sentenceIssue.checkResult[i].flags.length;
                    // count number of elements in array checkResult.sentenceIssue.checkResult[i].grammar_reses
                    issueCounter += this.checkResult.sentenceIssue.checkResult[i].grammar_reses.length;
                }
            };
            return issueCounter;

        },
        hasParaChangedAfterCheck() {
            var thisChanged = [];
            if (this.checkResult.paraType.lastCheckValue != this.para) {
                thisChanged.push('paraType');
            }
            if (this.checkResult.paraHeading.lastCheckValue != this.para) {
                thisChanged.push('paraHeading');
            }
            if (this.checkResult.sentenceIssue.lastCheckValue != this.para) {
                thisChanged.push('sentenceIssue');
            }
            return thisChanged;
        },
        imageURL() {
            if (this.checkResult.paraComment.checkResult) {
                return this.checkResult.paraComment.checkResult.slice(-31, -1).replace(/[^a-z]+/gi, '');
            } else {
                return 'error';
            }
        }
    },
    methods: {
        updateLoadingMessage() {
            const messages = [
                "Loading...",
                "I'm reviewing each and every sentence very carefully...",
                "Loading... It may take about 20 seconds...",
                "I'm checking the paragraph for errors...",
                "Almost there...",
                "I'm thinking...",
            ]
            this.loadingMessage = messages[Math.floor(Math.random() * messages.length)];
        },
    },


}
</script>

<style>
</style>