<template>
    <div class="flex flex-col px-4 border-2 border-gray-100 shadow-md rounded-md
                focus-within:shadow-xl" :class="{ 'absolute top-20': underFullscreen }">

        <div class="px-3 pt-4 mb-1 border-b-2 text-gray-600 font-bold sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-40"
        v-show="!underFullscreen"> 
            <a class="text-xl">UC<a class="text-red-600">A</a>S</a>  Personal Statement 
        </div>

        
        <div class="lg:overflow-auto lg:h-[76vh]"
        :class="{ 'lg:h-[81.0vh]': underFullscreen }">
            <majorInputC v-show="!underFullscreen"/>

            <RichTextC v-model="content" class="mr-4" @input="onInput"
            :class="{ 'ml-10 mr-32 mt-11': underFullscreen }"/>
        </div>

        <!-- ================================ -->

        <div class="relative bottom-0 flex flex-row justify-between p-2">
            <div>
                <button class="rounded-full p-1 bg-slate-100 hover:bg-slate-200"
                @click="toggleFullscreen" v-show="this.showFullscreenButton">
                    <!-- concise fullscreen icon-->
                    <svg style="height: 20px; width: 20px; color: rgb(0, 0, 255);" width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M30 6H42V18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 6H6V18" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M30 42H42V30" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 42H6V30" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M42 6L29 19" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 29L6 42" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </div>
            <div class="flex flex-row">
                <p class="my-auto mx-2">{{saveStatus}}</p>
                <div class="py-1 px-2 my-auto bg-gray-100 text-sm rounded-full text-gray-800">
                    <span :class="{'text-red-500 font-black text-lg': lineCount>47}">{{lineCount}} of 47 UCAS Lines</span>
                    <span class="text-gray-500"> | </span>
                    <span :class="{'text-red-500 font-black text-lg': charCount>4000}">{{charCount}} of 4000 characters</span>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import RichTextC from "../components/richText.vue";
import MajorInputC from "../components/majorInput.vue";
import debounce from "lodash.debounce";


export default {
    name: 'InputFormC',
    components: {
        RichTextC,
        MajorInputC,
    }, 
    data() {
        return {
            width: window.innerWidth, 
            height: window.innerHeight,
            saveStatus: 'Saved.'
            
        }
    },
    props: {
        underFullscreen : {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        showFullscreenButton() {
            return this.width > 1024;
        },
        // Binding with Vuex

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
        charCount() {
            // only count the characters in this HTML (No tags)
            return this.pureContent.length;
        },
        lineCount() {
            const ps = this.pureContent;
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
        }
    },
    methods: {
        onInput(newValue, oldValue) {
            this.saveStatus = '';
            this.content = newValue;
            this.debouncedWatch(newValue, oldValue);
        },

        toggleFullscreen() {
            this.$emit('toggleFullscreen');
        },
        onResize(e) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
        },
    },
    created() {
        window.addEventListener("resize", this.onResize);

        // console.log(this.$store.state.userDetail);
        this.debouncedWatch = debounce((newValue, oldValue) => {
            if (oldValue===''){
                return;
            } else {
                console.log(newValue);
                this.$store.dispatch('dbUpdateUserStatement');
                this.saveStatus = 'Saved.';
                }
            }, 3000);
        },

    beforeUnmount() {
        this.debouncedWatch.cancel();
        window.removeEventListener("resize", this.onResize);

    },

}



function extractPureContent (content) {
    try {
    // grab array in content field
    var contentArray = content.content
    // iterate the content field of the array
    var pureContent = '';
    for (var i=0; i<contentArray.length; i++) {
        // if the content is a string, add it to the pure content
        pureContent += "\n";
        if (typeof contentArray[i].content === 'object') {
            pureContent += contentArray[i].content[0].text;
        }
    }
    return pureContent.trim();} catch (e) {
        return '';
    }
};


</script>

<style>
input {
    border-bottom: 1px solid #eee;

}

input:focus {
    outline: none !important;
}
</style>