<template>
    <div class="stats stats-vertical border-2 border-gray-50 shadow h-fit">

        <div class="stat ai min-h-[10rem] w-full">
            <p class="flex flex-row align-baseline text-gray-500 text-sm">
                <MachineLearningIcon class="mt-[3px] mr-1 h-4" />
                <span class="m-0">Machine Learning</span>
            </p>
            <div class="state text-gray-700 w-full overflow-hidden">
                <div class="unableCheck" v-if="this.pureTextPara.length<170 && !this.isChecked">
                    <div class="tooltip tooltip-bottom" data-tip="More than 170 characters.">
                        <TextWrapIcon class="-translate-x-1" />
                        <p class="text-left">
                            Please write a little bit more.
                        </p>
                    </div>
                </div>

                <div class="unCheck" v-else-if="this.isChecked===false">
                    <!-- button to check the paragraph -->
                    <button
                        class="btn btn-ghost border-2 border-black shadow-md shadow-blue-500 btn-lg flex flex-col justify-center w-44
                            hover:bg-gray-100 hover:border-indigo-700 hover:shadow-xl"
                        @click="checkParagraph">
                        <img src="../../assets/logo_left.png" alt="" class="w-10 h-10 my-1">
                        <p class="">
                            Check
                        </p>
                    </button>
                </div>

                <div class="checked" v-else-if="this.isChecked===true">
                    <statResult class="" :para="pureTextPara" :checkResult="this.result"
                        @recheckParaType="askParaType"
                        @recheckParaHeading="askParaHeading"
                        @recheckSentenceIssue="askSentenceIssue"/>
                </div>
            </div>
        </div>


        <!-- === stats === -->
        <div class="flex flex-row justify-start space-x-5 h-fit 
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
import statResult from './statResult.vue'
import InfoIcon from '@carbon/icons-vue/es/information/16.js'
import MachineLearningIcon from '@carbon/icons-vue/es/machine-learning-model/16.js'
import TextWrapIcon from '@carbon/icons-vue/es/text--wrap/32.js'
import CheckIcon from '@carbon/icons-vue/es/watson--machine-learning/32.js'
import axios from 'axios'

export default {
    name: 'Stats',
    components: {
        statResult,
        InfoIcon,
        MachineLearningIcon,
        TextWrapIcon,
        CheckIcon

    },
    data(){
        return{
            startedCheck: false,
        }
    },
    props: {
        para: {
            type: Object,
            required: false,
        },
    },
    mounted(){
    },
    computed: {
        result() {
            if (this.para.content[0].meta){
                return this.para.content[0].meta
            }
            else{
                return {
                    "paraType": {"lastCheckValue": null, "checkResult": null},
                    "paraHeading": {"lastCheckValue": null, "checkResult": null},
                    "sentenceIssue": {"lastCheckValue": null, "checkResult": null},
                }
            }
        },
        isChecked() {
            if (this.result.paraType.checkResult === null && 
                this.result.paraHeading.checkResult === null &&
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
        async askParaType(){
            try {
                this.para.content[0].meta.paraType = {"lastCheckValue": null, "checkResult": null};
                const paraType = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/para-type', this.apiPayload);
                this.para.content[0].meta.paraType.lastCheckValue = paraType.data.statement;
                this.para.content[0].meta.paraType.checkResult = paraType.data.tag;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Something went wrong. Please try again.' + error,
                });
            };
        },

        async askParaHeading(){
            try {
                this.para.content[0].meta.paraHeading = {"lastCheckValue": null, "checkResult": null};
                const paraHeading = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/para-heading', this.apiPayload);
                this.para.content[0].meta.paraHeading.lastCheckValue = paraHeading.data.statement;
                this.para.content[0].meta.paraHeading.checkResult = paraHeading.data.heading;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Something went wrong. Please try again' + error,
                });
            };
        },

        async askSentenceIssue(){
            try {
                this.para.content[0].meta.sentenceIssue = {"lastCheckValue": null, "checkResult": null};
                const sentenceIssue = await axios.post('https://ps-htbbh2ws5a-uc.a.run.app/sentence-check', this.apiPayload);
                this.para.content[0].meta.sentenceIssue.lastCheckValue = sentenceIssue.data.statement;
                this.para.content[0].meta.sentenceIssue.checkResult = sentenceIssue.data.sentenceResults;
            } catch (error) {
                this.$store.commit('notify', {
                    type: 'error',
                    message: 'Something went wrong. Please try again.' + error,
                });
            };
        },


        async checkParagraph(){
            this.startedCheck = true;
            this.para.content[0].meta = {
                    "paraType": {"lastCheckValue": null, "checkResult": null},
                    "paraHeading": {"lastCheckValue": null, "checkResult": null},
                    "sentenceIssue": {"lastCheckValue": null, "checkResult": null},
                };
            await this.askParaType();
            await this.askParaHeading();
            await this.askSentenceIssue();
        }
    }
}
</script>

<style scoped>
.stat-value{
    @apply text-gray-600 text-lg;
}

</style>