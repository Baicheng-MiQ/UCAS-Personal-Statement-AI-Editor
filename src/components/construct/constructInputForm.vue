<template>
    <div class="flex flex-col relative">
        <div class="lg:overflow-auto lg:h-full ">
            <majorInputC/>
            <div class="paragraphs flex flex-col my-2 space-y-6">
                <div class="paragraph flex flex-col " 
                    v-for="(item, index) in content.content" :key="index" >
                    <div class="flex flex-row space-x-5">
                        <div class="left p-6 bg-gray-50 flex flex-col rounded-xl w-full
                            border-2 border-white focus-within:border-blue-600"
                            @mousedown="this.$refs['ta'+index][0].focusMe()">
                            <!-- ======== -->
                            <p class="w-fit border-b-2">
                                <span class="text-gray-400">{{index+1}}</span>
                                <span class="text-gray-400">/</span>
                                <span class="text-gray-400">{{content.content.length}}</span>
                            </p>
                            <richText class="font-serif mt-1 h-full lg:text-lg"
                                v-model="content.content[index]"
                                :ref="'ta' + index"
                                :id="'ta' + index"
                                @focusin="focusedRichText=index;"
                                @keydown.enter="insertEmptyParagraphAfter(index);"/>

                            <!-- ======== -->
                            <div class="flex flex-row space-x-3 mt-2
                                text-gray-500">
                                <!-- toolbox -->
                                <div class="tooltip tooltip-bottom" data-tip="Delete">
                                    <a href="#really" class="p-0 m-0 disabled:text-gray-300"
                                        @click="toBeDeleted=index"> 
                                        <deleteIcon/>
                                    </a>
                                </div>
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
                                <div class="tooltip tooltip-bottom" data-tip="Move Up">
                                    <button class="move-up disabled:text-gray-300" @click="moveParagraphUp(index)"
                                    :disabled="index===0">
                                        <moveUpIcon/>
                                    </button>
                                </div>

                                <div class="tooltip tooltip-bottom" data-tip="Move Down">
                                    <button class="move-down disabled:text-gray-300" @click="moveParagraphDown(index)"
                                    :disabled="index===(content.content.length-1)">
                                        <moveDownIcon/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Stats class="w-2/3 max-w-md min-w-[250px]" v-model="content.content[index]"/>

                    </div>
                    <div class="divider mt-12"></div>
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
import Stats from "./stats.vue"

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
    Stats,
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