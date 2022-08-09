<template>
    <div class="flex flex-col relative w-full ">
        <div class="lg:h-full">
            <div class="flex flex-col"
                :class="{'md:flex-row items-end justify-between': this.pureContent.length>=5,
                        'flex-col-reverse justify-center': this.pureContent.length<5}">
                <majorInputC />
                <button @click="pasteMultipleParagraphs"
                class="btn w-fit "
                :class="{'self-center btn-ghost border-black lg:translate-x-9 h-20 flex flex-col btn-primary border-2 hover:scale-110': this.pureContent.length<5,
                        'btn-ghost': this.pureContent.length>=5}"
                >
                    <pasteIcon/> Paste
                </button>
            </div>
            <div class="paragraphs flex flex-col my-2 space-y-6">
                <draggable class="dragArea list-group w-full" :list="content.content" handle=".handle">
                    <div class="paragraph flex flex-col" v-for="(item, index) in content.content" :key="index">
                        <div class="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-5 ">
                            <div class="left p-6 bg-white bg-opacity-80 backdrop-blur-md flex flex-col rounded-xl md:w-full
                                border-2 border-gray-100 focus-within:border-blue-600">
                                <!-- ======== -->
                                <div class="flex flex-row">
                                    <dragIcon class="handle cursor-grab text-gray-400 -translate-x-2 " />
                                    <p class="w-fit border-b-2">
                                        <span class="text-gray-400">{{index+1}}</span>
                                        <span class="text-gray-400">/</span>
                                        <span class="text-gray-400">{{content.content.length}}</span>
                                    </p>
                                </div>
                                <richText class="font-serif mt-1 md:h-full lg:text-lg" v-model="content.content[index]"
                                    :ref="'ta' + index" :id="'ta' + index" @focusin="focusedRichText=index;"
                                    @mousedown="this.$refs['ta'+index][0].focusMe()"
                                    @keydown.enter="insertEmptyParagraphAfter(index);" />

                                <!-- ======== -->
                                <div class="flex flex-row space-x-3 mt-2
                                    text-gray-500">
                                    <!-- toolbox -->
                                    <div class="tooltip tooltip-bottom" data-tip="Delete">
                                        <button class="p-0 m-0 disabled:text-gray-300" @click="toBeDeleted=index;this.$refs['ta'+index][0].focusMe()"
                                            :disabled="content.content.length==1">
                                            <a href="#really">
                                                <deleteIcon />
                                            </a>
                                        </button>
                                    </div>

                                    <div class="tooltip tooltip-bottom" data-tip="Move Up">
                                        <button class="move-up disabled:text-gray-300" @click="moveParagraphUp(index)"
                                            :disabled="index===0">
                                            <moveUpIcon />
                                        </button>
                                    </div>

                                    <div class="tooltip tooltip-bottom" data-tip="Move Down">
                                        <button class="move-down disabled:text-gray-300"
                                            @click="moveParagraphDown(index)"
                                            :disabled="index===(content.content.length-1)">
                                            <moveDownIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Stats class="md:w-2/3 md:max-w-md md:min-w-[250px]" v-model="content.content[index]" />

                        </div>
                        <div class="divider mt-6 h-fit">
                            <button class="btn btn-ghost py-0 h-1 w-fit border-2 border-gray-200 rounded-full " @click="insertEmptyParagraphAfter(index);"
                            :ref="'plus' + index" > 
                                + 
                            </button>
                        </div>
                    </div>
                </draggable>
            </div>
        </div>

        <!-- ================================ -->

        <div class="relative bottom-0 p-1 h-fit">
            <TextInfoBar :saveStatus="saveStatus" :showFullscreenButton="false" />
        </div>
    </div>
    <div class="modal z-50" id="really">
        <div class="modal-box fixed">
            <h3 class="font-bold text-lg">Do you want to delete this paragraph?</h3>
            <p class="py-4"> This action cannot be undone.</p>
            <div class="modal-action">

                <a :href="'#ta'+toBeDeleted" class="btn" @click="toBeDeleted=-1">
                    Cancel
                </a>

                <a :href="'#ta'+toBeDeleted" class="btn btn-error" @click="deleteParagraph(this.toBeDeleted)">
                    Confirm
                </a>
            </div>
        </div>
    </div>


</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'


import MajorInputC from "../editor/majorInput.vue";
import debounce from "lodash.debounce";
import TextInfoBar from "../editor/textInfoBar.vue";
import richText from "./constructRichText.vue";
import Stats from "./stats.vue"

import deleteIcon from "@carbon/icons-vue/es/row--delete/20.js"
import moveUpIcon from "@carbon/icons-vue/es/row--collapse/20.js"
import moveDownIcon from "@carbon/icons-vue/es/row--expand/20.js"
import dragIcon from "@carbon/icons-vue/es/draggable/24.js"
import pasteIcon from "@carbon/icons-vue/es/paste/32.js"

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
    draggable: VueDraggableNext,
    deleteIcon,
    moveUpIcon,
    moveDownIcon,
    dragIcon,
    pasteIcon

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
            setTimeout(() => {
                this.$refs['plus' + (index + 1)][0].focus();
                this.$refs['ta' + (index + 1)][0].focusMe();
            }, 20);

        },
        deleteParagraph(index) {
            this.content.content.splice(index, 1);
            setTimeout(() => {
                this.$refs['plus' + (index)][0].focus();
                this.$refs['ta'+index][0].focusMe();
                window.scrollBy({top:-50, behavior: 'smooth'});
            }, 2);
        },
        moveParagraphUp(index) {
            this.content.content.splice(index - 1, 0, this.content.content[index]);
            this.content.content.splice(index + 1, 1);
            setTimeout(() => {
                if (index - 2 >= 0) {
                    this.$refs['plus' + (index - 2)][0].focus();
                }
                this.$refs['ta'+(index-1)][0].focusMe();
                window.scrollBy({top:-200, behavior: 'smooth'});
            }, 2);
        },

        moveParagraphDown(index) {
            this.content.content.splice(index + 2, 0, this.content.content[index]);
            this.content.content.splice(index, 1);
            // sleep 0.2 sec
            setTimeout(() => {
                this.$refs['plus' + (index + 1)][0].focus();
                this.$refs['ta'+(index+1)][0].focusMe();
                window.scrollBy({top:200, behavior: 'smooth'});
            }, 2);

        },
        async pasteMultipleParagraphs() {
            var text = await navigator.clipboard.readText();
            var paragraphs = text.split('\n');
            
            paragraphs.forEach(paragraph => {
                if (paragraph != '') {
                    
                    this.content.content.push({
                        "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": paragraph
                        }
                    ]
                });
                }
            });
            // sleep 200 ms
            setTimeout(() => {
                this.$refs['plus'+(this.content.content.length-1)][0].focus();
                var newObj = this.$refs['ta'+(this.content.content.length-1)][0];
                newObj.focusMe();

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