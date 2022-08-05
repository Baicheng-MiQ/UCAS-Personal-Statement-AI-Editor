<template>
    <!-- a right arrow, click to learn more -->
    <!-- LEARN MORE! -->
    <label class="stat p-1 mr-0 ml-auto btn modal-button btn-ghost w-fit h-fit" for="learnMore">
        <rightArrowIcon class="mr-0 ml-auto" />
        <h6 class="stat-desc mr-1 ml-auto">More</h6>
    </label>
    <input type="checkbox" id="learnMore" class="modal-toggle"/>
    <label for="learnMore" class="modal modal-bottom sm:modal-middle">
        <label for="" class="modal-box sm:w-11/12 sm:max-w-5xl">
            <!-- MAIN STARTS -->
            
            <div class="flex flex-row">
                <div class="w-1/2 bg-blue-100">
                    <richText class="font-serif mt-1 h-full lg:text-xl"
                                v-model="this.para"/>
                </div>
                <div class="w-1/2 bg-yellow-200">

                </div>
            </div>

            <!-- MAIN ENDS -->
            <div class="modal-action">
                <label for="learnMore" class="btn btn-success">Close</label>
            </div>
        </label>
    </label>

</template>

<script>
import rightArrowIcon from "@carbon/icons-vue/es/arrow--right/32.js"
import richText from "./constructRichText.vue";

export default {
    name: 'LearnMoreModal',
    components: {
        rightArrowIcon,
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
        para:{
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', this.modelValue);
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