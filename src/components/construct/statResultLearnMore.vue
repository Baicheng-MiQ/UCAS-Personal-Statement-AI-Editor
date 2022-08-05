<template>
    <!-- a right arrow, click to learn more -->
    <!-- LEARN MORE! -->
    <label class="stat p-1 mr-0 ml-auto btn modal-button btn-ghost h-fit" for="learnMore">
        <rightArrowIcon class="mr-0 ml-auto" />
        <h6 class="stat-desc mr-1 ml-auto">More</h6>
    </label>

    <input type="checkbox" id="learnMore" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <label for="" class="modal-box sm:w-11/12 sm:max-w-[100rem] max-h-[90vh]">
            <label for="learnMore" class="btn btn-sm btn-circle absolute right-4 top-4">✕</label>

            <!-- ===MAIN STARTS=== -->
            
            <div class="flex flex-col sm:flex-row sm:space-x-10">
                <!-- ===LEFT===  -->
                <div class="sm:w-1/2 sm:mt-20 h-fit flex flex-col border-b-2 border-blue-200">
                    <quoteIcon class="h text-blue-400" />
                    <richText class="font-serif italic cursor-text my-6 h-full sm:text-xl lg:text-2xl" v-model="this.para" />
                </div>
                <!-- ===RIGHT===  -->
                <div class="sm:w-1/2">
                    <div class="flex flex-col space-y-4 py-4 w-full">
                        <!-- tags -->
                        <div class="w-full">

                            <div v-if="checkResult.paraType.checkResult"
                                class="flex flex-row whitespace-nowrap space-x-2 w-full overflow-auto">
                                <div v-for="(paraType, index) in checkResult.paraType.checkResult" :key="index">
                                    <div
                                        class="badge badge-xl badge-info bg-blue-600 text-white font-bold py-3 capitalize">
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
                        <div class="text-2xl md:text-4xl font-serif">
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

                        <div class="divider"></div>

                        <!-- sentence -->
                        <div class="sent w-full">
                            <div v-if="checkResult.sentenceIssue.checkResult"
                                class="flex flex-row space-x-2 w-full overflow-auto">
                                <div hidden v-for="(paraSent, index) in checkResult.sentenceIssue.checkResult"
                                    :key="index">
                                    <div class="font-bold py-3 capitalize"> {{ paraSent.sentence }} </div>
                                </div>

                                <div class="flex flex-col space-y-4 w-full">
                                    <!-- num of issue -->
                                    <div class="stat m-0 p-0">
                                        <div class="stat-title flex flex-row">
                                            Found
                                            <refreshIcon v-show="this.hasParaChangedAfterCheck.includes('sentenceIssue') ||
                                            this.checkResult.sentenceIssue.checkResult === null ||
                                            this.checkResult.sentenceIssue.checkResult === 'Error...'"
                                                @click="this.$emit('recheckSentenceIssue')"
                                                class="h-5 cursor-pointer" />
                                        </div>
                                        <div class="stat-value" :class="{
                                            'text-red-600': this.numOfSentenceIssue > 0,
                                            'text-green-600': this.numOfSentenceIssue === 0
                                        }">
                                            {{ this.numOfSentenceIssue }}</div>
                                        <div class="stat-desc">issues in {{ this.numOfSentence }} sentences</div>
                                    </div>
                                    <!-- issue list -->
                                    <div class="flex flex-col">
                                        <div v-for="(paraSent, index) in checkResult.sentenceIssue.checkResult"
                                            :key="index">
                                            <div class="font-bold py-3 capitalize"> {{ paraSent.sentence }} </div>
                                            <div class="font-bold py-3 capitalize"> {{ paraSent.flags }} </div>
                                            <div class="font-bold py-3 capitalize"> {{ paraSent.ner_reses }} </div>
                                            <div class="font-bold py-3 capitalize"> {{ paraSent.grammar_reses }} </div>

                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                            <div v-else class="animate-pulse w-fit px-2 text-lg">
                                {{ this.loadingMessage }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ===MAIN ENDS=== -->
            <div class="modal-action">
            </div>
        </label>
    </div>

</template>

<script>
import rightArrowIcon from "@carbon/icons-vue/es/arrow--right/32.js"
import quoteIcon from "@carbon/icons-vue/es/quotes/32.js"
import refreshIcon from "@carbon/icons-vue/es/restart/24.js"

import richText from "./constructRichText.vue";

export default {
    name: 'LearnMoreModal',
    components: {
        rightArrowIcon,
        quoteIcon,
        refreshIcon,
        richText
    },
    // very bad practice below, but I don't know how to do it better
    // duplicated code as in statResult.vue
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
        checkResult: {
            type: Object,
            required: true,
        },
        modelValue: {
            type: Object,
            required: false,
        },
    },
    computed: {
        para: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', this.modelValue);
            }
        },

        pureTextPara(){
            if (this.para.content) {
                return this.para.content[0].text;
            } else {
                return "";
            }
        },

        numOfSentence() {
            return this.checkResult.sentenceIssue.checkResult.length;
        },
        numOfSentenceIssue() {
            var issueCounter = 0;
            for (var i = 0; i < this.checkResult.sentenceIssue.checkResult.length; i++) {
                // count number of elements in array checkResult.sentenceIssue.checkResult[i].ner_reses 
                // where ner_reses[i].entity_group is in ['PER', 'LOC', 'ORG']
                issueCounter += this.checkResult.sentenceIssue.checkResult[i].ner_reses.filter(function (ner_res) {
                    return ner_res.entity_group in ['PER', 'LOC', 'ORG'];
                }).length;
                // count number of key value pairs in object checkResult.sentenceIssue.checkResult[i].flags
                issueCounter += Object.keys(this.checkResult.sentenceIssue.checkResult[i].flags).length;
                // count number of elements in array checkResult.sentenceIssue.checkResult[i].grammar_reses
                issueCounter += this.checkResult.sentenceIssue.checkResult[i].grammar_reses.length;
            }
            return issueCounter;

        },
        hasParaChangedAfterCheck() {
            var thisChanged = [];
            if (this.checkResult.paraType.lastCheckValue != this.pureTextPara) {
                thisChanged.push('paraType');
            }
            if (this.checkResult.paraHeading.lastCheckValue != this.pureTextPara) {
                thisChanged.push('paraHeading');
            }
            if (this.checkResult.sentenceIssue.lastCheckValue != this.pureTextPara) {
                thisChanged.push('sentenceIssue');
            }
            return thisChanged;
        },
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
    watch: {
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },



}
</script>

<style>
</style>