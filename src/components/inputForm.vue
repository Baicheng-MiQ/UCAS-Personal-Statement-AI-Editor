<template>
    <div class="flex flex-col px-4 border-r-2 border-gray-100 
                focus-within:shadow-md">

        <div class="px-3 pt-4 mb-1 border-b-2 text-gray-800 font-bold sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-40"> 
            <a class="text-xl">UC<a class="text-red-600">A</a>S</a>  Personal Statement 
        </div>

        <div class="lg:overflow-auto lg:h-full">
            <majorInputC/>
            <RichTextC v-model="content" class="mr-4" @input="onInput"/>
        </div>

        <!-- ================================ -->

        <div class="relative bottom-0 p-1 h-fit">
            <TextInfoBar :saveStatus="saveStatus" :showFullscreenButton="showFullscreenButton" @toggleFullscreen="toggleFullscreen"/>
        </div>

        <Transition enter-active-class="animate__animated animate__fadeInDown animate__faster" 
                    leave-active-class="animate__animated animate__fadeOutDown animate__faster">
        <div class="fullscreen z-50 fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-90" v-show="underFullscreen && showFullscreenButton" >
            <div class="fixed top-0 left-0 w-screen h-screen" @click="closeFullScreen"></div>
            <div class="bg-white rounded-2xl p-16 pb-2 shadow-2xl mx-24 fixed top-16 bottom-0 my-0 z-50 overflow-scroll">
                <RichTextC v-model="content" class="min-h-full" @input="onInput" @keydown.esc="closeFullScreen"/>
                <TextInfoBar :saveStatus="saveStatus" :showFullscreenButton="showFullscreenButton" @toggleFullscreen="toggleFullscreen"/>
            </div>
        </div>
        </Transition>
    </div>


</template>

<script>
import RichTextC from "../components/richText.vue";
import MajorInputC from "../components/majorInput.vue";
import debounce from "lodash.debounce";
import TextInfoBar from "./textInfoBar.vue";


export default {
    name: 'InputFormC',
    components: {
    RichTextC,
    MajorInputC,
    TextInfoBar
}, 
    data() {
        return {
            width: window.innerWidth, 
            height: window.innerHeight,
            saveStatus: 'Saved.',
            underFullscreen: false,
            
        }
    },
    props: {
        
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
        
    },
    methods: {
        onInput(newValue, oldValue) {
            this.saveStatus = '';
            this.content = newValue;
            this.debouncedWatch(newValue, oldValue);
        },

        toggleFullscreen() {
            this.underFullscreen = !this.underFullscreen;
        },

        closeFullScreen() {
            this.underFullscreen = false;
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
            }, 1000);
        },

    beforeUnmount() {
        this.debouncedWatch.cancel();
        window.removeEventListener("resize", this.onResize);

    },

}
</script>

<style>
input {
    border-bottom: 1px solid #eee;

}

input:focus {
    outline: none !important;
}
</style>