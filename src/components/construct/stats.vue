<template>
    <div class="flex flex-col items-start p-5 bg-white bg-opacity-70 rounded-xl shadow-lg border-2 border-gray-50 h-full">

        <div class="min-h-[10rem] md:w-full">
            <p class="flex flex-row align-baseline text-gray-500 text-sm">
                <MachineLearningIcon class="mt-[3px] mr-1 h-4" />
                <span class="m-0">Machine Learning</span>
            </p>
            <div class="state text-gray-700  mt-8 w-full h-full">
                <div class="unableCheck" v-if="this.pureTextPara.length<170 && !this.isChecked">
                    <div class="tooltip tooltip-bottom" data-tip="More than 170 characters.">
                        <TextWrapIcon class="-translate-x-1" />
                        <p class="text-left">
                            Please write a little bit more.
                        </p>
                    </div>
                </div>

                <div class="unCheck" v-else-if="!this.isChecked&&this.pureTextPara.length>=170">
                    <!-- button to check the paragraph -->
                    <button
                        class="btn btn-ghost border-2 border-black shadow-md shadow-blue-500 btn-lg flex flex-col justify-center w-44
                            hover:bg-gray-100 hover:border-indigo-700 hover:shadow-xl"
                        :class="{
                            'btn-disabled': !this.apiPayload.userToken
                        }"
                        @click="checkParagraph">
                        <img src="../../assets/logo_left.png" alt="" class="w-10 h-10 my-1">
                        <p class="">
                            Check
                        </p>
                    </button>
                    <div class="my-3 text-sm text-gray-400">
                        <p v-if="majors">{{majors}}</p>
                        <p v-else class="text-red-500"> Please input your major </p>
                    </div>
                </div>

                <div class="checked w-full" v-else>
                    <statResult :para="pureTextPara" :checkResult="this.result"
                        @recheckParaType="askParaType"
                        @recheckParaHeading="askParaHeading"
                        @recheckSentenceIssue="askSentenceIssue"/>
                    
                    <StatResultLearnMore :checkResult="this.result" v-model="this.para"
                        @recheckParaType="askParaType"
                        @recheckParaHeading="askParaHeading"
                        @recheckParaComment="askParaComment"
                        @recheckSentenceIssue="askSentenceIssue"/>
                </div>
            </div>
        </div>


        <!-- === stats === -->
        <div class="flex flex-row mt-auto space-x-5 h-fit bottom-0
            text-sm p-3 px-6">
            <div class="stat p-0 w-fit">
                <div class="stat-title">Characters</div>
                <div class="stat-value">{{this.pureTextPara.length}}</div>
            </div>
            <div class="stat p-0 w-fit">
                <div class="stat-title">Words</div>
                <div class="stat-value">{{this.wordCount}}</div>
            </div>
            <div class="tooltip tooltip-primary" data-tip="UCAS: 93 chars per line.">
                <div class="stat p-0 w-fit">
                    <p class="stat-title flex flex-row space-x-1"> <span>Lines</span>
                        <InfoIcon />
                    </p>
                    <div class="stat-value -translate-x-5">{{this.lineCount}}</div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import statResult from './statResultPreview.vue'
import StatResultLearnMore from './statResultLearnMore.vue'
import InfoIcon from '@carbon/icons-vue/es/information/16.js'
import MachineLearningIcon from '@carbon/icons-vue/es/machine-learning-model/16.js'
import TextWrapIcon from '@carbon/icons-vue/es/text--wrap/32.js'
import CheckIcon from '@carbon/icons-vue/es/watson--machine-learning/32.js'
import axios from 'axios'
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });


export default {
    name: 'Stats',
    components: {
        statResult,
        StatResultLearnMore,
        InfoIcon,
        MachineLearningIcon,
        TextWrapIcon,
        CheckIcon

    },
    emits: ['recheckParaType', 'recheckParaHeading', 'recheckSentenceIssue', 'update:modelValue'],
    data(){
        return{
            startedCheck: false,
        }
    },
    props: {
        modelValue: {
            type: Object,
            required: false,
        },
    },
    mounted(){
    },
    computed: {
        para: {
            get(){
                return this.modelValue
            },
            set(value){
                this.$emit('update:modelValue', this.modelValue);
            }
        },
        result() {
            if (this.para.content && this.para.content[0] && this.para.content[0].meta 
                && this.para.content[0].meta.paraType
                && this.para.content[0].meta.paraHeading
                && this.para.content[0].meta.paraComment
                && this.para.content[0].meta.sentenceIssue) {
                return this.para.content[0].meta
            }
            else{
                return {
                    "paraType": {"lastCheckValue": null, "checkResult": null},
                    "paraHeading": {"lastCheckValue": null, "checkResult": null},
                    "paraComment": {"lastCheckValue": null, "checkResult": null},
                    "sentenceIssue": {"lastCheckValue": null, "checkResult": null},
                }
            }
        },
        majors(){
            // get from vuex state
            return this.$store.state.major.join(', ');
        },
        isChecked() {
            if (this.result.paraType.checkResult === null && 
                this.result.paraHeading.checkResult === null &&
                this.result.paraComment.checkResult === null &&
                this.result.sentenceIssue.checkResult === null && !this.startedCheck){
                return false
            }
            else{
                return true
            }
        },
        pureTextPara(){
            if (this.para.content) {
                return this.para.content[0].text;
            } else {
                return "";
            }
        },
        wordCount(){
            if (this.pureTextPara) {
                return this.pureTextPara.split(" ").length;
            } else {
                return 0;
            }
        },
        lineCount() {
            const ps = this.pureTextPara;
            if (ps==='') {
                return 0;
            }
            var pars = ps.split('\n');

            var total_lines = 0;
            for (var i=0; i<pars.length; i++) {
                var par_line = 1;
                var line_char = 0;
                var words = pars[i].split(' ');
                for (var j=0; j<words.length; j++) {
                    if (line_char + words[j].length > 93) {
                        line_char = words[j].length;
                        par_line += 1;
                    } else {
                        line_char = line_char + words[j].length + 1;
                    }
                }
                total_lines += par_line;
            }
            return total_lines;
        },
        apiPayload() {
            return {
                userToken: this.$store.state.userIDtoken,
                major: this.$store.state.major.join(", "),
                statement: this.pureTextPara,
            }
        }
        
    },
    methods: {
        validateCheckBody(){
            if (this.apiPayload.statement.length < 170) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Paragraph is too short. Please write at least 170 characters.'
                });
                throw new Error("Paragraph is too short. Please write at least 170 characters.")
            }
            if (this.apiPayload.statement.length > 2000) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Paragraph is too long. Please write at most 2000 characters.'
                });
                throw new Error("Paragraph is too long. Please write at most 2000 characters.");
            }
            if (this.apiPayload.major.length === 0) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Please select at least one major at the top of the page.'
                });
                throw new Error("Please select at least one major at the top of the page.")
            }
        },
        async askParaType(){
            try {
                this.validateCheckBody();
                this.startedCheck = true;
                this.para.content[0].meta.paraType = {"lastCheckValue": null, "checkResult": null};
                const paraType = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/para-type', this.apiPayload);
                this.para.content[0].meta.paraType.lastCheckValue = paraType.data.statement;
                this.para.content[0].meta.paraType.checkResult = paraType.data.tag;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong. Please try again.' + error,
                });
                this.para.content[0].meta.paraType.lastCheckValue = "Error...";
                this.para.content[0].meta.paraType.checkResult = ["Error..."];
            };
        },

        async askParaHeading(){
            try {
                this.validateCheckBody();
                this.startedCheck = true;
                this.para.content[0].meta.paraHeading = {"lastCheckValue": null, "checkResult": null};
                const paraHeading = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/para-heading', this.apiPayload);
                this.para.content[0].meta.paraHeading.lastCheckValue = paraHeading.data.statement;
                this.para.content[0].meta.paraHeading.checkResult = paraHeading.data.heading;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong. Please try again' + error,
                });
                this.para.content[0].meta.paraHeading.lastCheckValue = "Error...";
                this.para.content[0].meta.paraHeading.checkResult = "Error...";
            };
        },
        async askParaComment(){
            try {
                this.validateCheckBody();
                this.startedCheck = true;
                this.para.content[0].meta.paraComment = {"lastCheckValue": null, "checkResult": null};
                const paraComment = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/para-comment', this.apiPayload);
                this.para.content[0].meta.paraComment.lastCheckValue = paraComment.data.statement;
                this.para.content[0].meta.paraComment.checkResult = paraComment.data.comment;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong. Please try again' + error,
                });
                this.para.content[0].meta.paraComment.lastCheckValue = "Error...";
                this.para.content[0].meta.paraComment.checkResult = "Error...";
            };
        },

        async askSentenceIssue(){
            try {
                this.validateCheckBody();
                this.startedCheck = true;
                this.para.content[0].meta.sentenceIssue = {"lastCheckValue": null, "checkResult": null};
                const sentenceIssue = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/sentence-check', this.apiPayload);
                this.para.content[0].meta.sentenceIssue.lastCheckValue = sentenceIssue.data.statement;
                this.para.content[0].meta.sentenceIssue.checkResult = sentenceIssue.data.sentenceResults;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong. Please try again.' + error,
                });
                this.para.content[0].meta.sentenceIssue.lastCheckValue = "Error...";
                this.para.content[0].meta.sentenceIssue.checkResult = [
                    {
                        "sentence": "Error...",
                        "pure_reses": {},
                        "ner_reses": [],
                        "grammar_reses": [],
                        "flags": []
                    }
                ];
            };
        },


        async checkParagraph(){
            this.validateCheckBody();
            this.startedCheck = true;
            this.para.content[0].meta = {
                    "paraType": {"lastCheckValue": null, "checkResult": null},
                    "paraHeading": {"lastCheckValue": null, "checkResult": null},
                    "paraComment": {"lastCheckValue": null, "checkResult": null},
                    "sentenceIssue": {"lastCheckValue": null, "checkResult": null},
                };
            await this.askParaType();
            await this.askParaHeading();
            await this.askParaComment();
            await this.askSentenceIssue();
        }
    },
    watch: {
        pureTextPara: {
            handler(newVal, oldVal) {
                this.startedCheck = false;
            },
            deep: true,
        },
        para(){
            this.$emit('update:modelValue', this.para);
        }

    },
}
</script>

<style scoped>
.stat-value{
    @apply text-gray-600 text-lg;
}

</style>