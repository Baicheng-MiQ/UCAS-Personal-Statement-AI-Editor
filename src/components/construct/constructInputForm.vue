<template>
    <div class="flex flex-col relative">
        <div class="lg:overflow-auto lg:h-full">
            <majorInputC/>
            <div class="paragraphs flex flex-col my-2 space-y-6">
                <div class="paragraph flex flex-row" 
                    v-for="(item, index) in content.content" :key="index" >
                    <div class="left p-6 bg-blue-50 flex flex-col rounded-xl w-full
                        focus-within:border-2 focus-within:border-blue-600 focus-within:p-[1.38rem]">
                        <richText class="font-serif "
                            v-model="content.content[index]"
                            :ref="'ta' + index"
                            :id="'ta' + index"
                            @focusin="focusedRichText=index;"
                            @keydown.enter="insertEmptyParagraphAfter(index);"/>

                        <div class="flex flex-row space-x-3 mt-2
                            text-gray-500">
                            <!-- toolbox -->

                            <a href="#really" class="p-0 m-0 disabled:text-gray-300"
                                @click="toBeDeleted=index"> 
                                <deleteIcon/>
                            </a>
                            <div class="modal" id="really">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Do you want to delete this paragraph?</h3>
                                <p class="py-4"> This action cannot be undone.</p>
                                <div class="modal-action">

                                    <a :href="'#ta'+toBeDeleted" class="btn"
                                        @click="toBeDeleted=-1">
                                        Cancel
                                    </a>
                                    
                                    <a :href="'#ta'+toBeDeleted" class="btn btn-error"
                                        @click="deleteParagraph(this.toBeDeleted)">
                                        Confirm
                                    </a>
                                </div>
                            </div>
                            </div>

                            <button class="move-up disabled:text-gray-300" @click="moveParagraphUp(index)"
                            :disabled="index===0">
                                <moveUpIcon/>
                            </button>

                            <button class="move-down disabled:text-gray-300" @click="moveParagraphDown(index)"
                            :disabled="index===(content.content.length-1)">
                                <moveDownIcon/>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================================ -->

        <div class="relative bottom-0 p-1 h-fit">
            <TextInfoBar :saveStatus="saveStatus"  :showFullscreenButton="false"/>
        </div>
    </div>


</template>

<script>

import MajorInputC from "../editor/majorInput.vue";
import debounce from "lodash.debounce";
import TextInfoBar from "../editor/textInfoBar.vue";
import richText from "./constructRichText.vue";

import deleteIcon from "@carbon/icons-vue/es/row--delete/20.js"
import moveUpIcon from "@carbon/icons-vue/es/row--collapse/20.js"
import moveDownIcon from "@carbon/icons-vue/es/row--expand/20.js"

var emptyParagraph = {
    "type": "paragraph"
}

export default {
    name: 'InputFormC',
    components: {
    richText,
    MajorInputC,
    TextInfoBar,
    deleteIcon,
    moveUpIcon,
    moveDownIcon,

    }, 
    data(){
        return{
            saveStatus: "Saved.",
            focusedRichText: -1,
            toBeDeleted: -1,
        }
    },
    computed: {
        content: {
            get() {
                return this.$store.state.content;
            },
            set(value) {
                this.$store.commit('setContent', value);
            }
        },
        pureContent () {
            return this.$store.getters.pureContent;
        },
        
    },
    methods: {
        onInput(newValue, oldValue) {
            this.saveStatus = '';
            this.content = newValue;
            this.debouncedWatch(newValue, oldValue);
        },
        insertEmptyParagraphAfter(index) {
            this.content.content.splice(index + 1, 0, emptyParagraph);
            this.$refs['ta'+(index+1)][0].focusMe();
        },
        deleteParagraph(index) {
            this.content.content.splice(index, 1);
            this.$refs['ta'+index][0].focusMe();
            setTimeout(() => {
                window.scrollBy({top:-50, behavior: 'smooth'});
            }, 2);
        },
        moveParagraphUp(index) {
            this.content.content.splice(index - 1, 0, this.content.content[index]);
            this.content.content.splice(index + 1, 1);
            this.$refs['ta'+(index-1)][0].focusMe();
            setTimeout(() => {
                window.scrollBy({top:-200, behavior: 'smooth'});
            }, 2);
        },

        moveParagraphDown(index) {
            this.content.content.splice(index + 2, 0, this.content.content[index]);
            this.content.content.splice(index, 1);
            this.$refs['ta'+(index+1)][0].focusMe();
            // sleep 0.2 sec
            setTimeout(() => {
                window.scrollBy({top:200, behavior: 'smooth'});
            }, 2);

        },

        
    },

    watch: {
        content: {
            handler(newValue, oldValue) {
                this.onInput(newValue, oldValue);
            },
            deep: true,
        },
    },
    
    created() {

        // console.log(this.$store.state.userDetail);
        this.debouncedWatch = debounce((newValue, oldValue) => {
            if (oldValue===''){
                return;
            } else {
                console.log(newValue);
                this.$store.dispatch('dbUpdateUserStatement');
                this.saveStatus = 'Saved.';
                }
            }, 1000);
        },

    beforeUnmount() {
        this.debouncedWatch.cancel();


    },

}
</script>

<style>

</style>