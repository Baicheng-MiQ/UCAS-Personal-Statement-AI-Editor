<template>
<div class="mx-4 flex-1 my-5 focus:shadow-md lg:max-w-full lg:mx-2 2xl:mx-5 ">
    <div class="flex flex-col space-y-5 lg:space-y-0
                                lg:flex-row ">

        
        <InputFormC class="z-20 lg:w-3/5 lg:mr-4" 
        @toggleFullscreen="fullEditor = !fullEditor" v-show="!fullEditor"/>

            <div class="background inset-0 z-30 absolute bg-black opacity-10 blur-3xl"
            v-show="fullEditor"
            @click="fullEditor = false"></div>
            <InputFormC class="background z-40 w-3/4 absolute bg-white mx-32 rounded-xl shadow-2xl"
            v-show="fullEditor" :underFullscreen="true"
            @toggleFullscreen="fullEditor = !fullEditor"/>
        
        <!-- ====================== -->

        <div class="z-20 flex flex-col space-y-2 2xl:space-y-0 2xl:flex-row-reverse justify-between px-2 lg:w-2/5 ">
            <div class="navbar shadow-lg shadow-indigo-200 rounded-lg flex flex-row space-x-2 
                2xl:w-fit 2xl:flex-col 2xl:space-x-0 2xl:space-y-2">
                <a class="btn btn-ghost bg-slate-50 shadow-sm normal-case text-base"
                    @click="goGrammar">Grammar</a>
                <a class="btn btn-ghost bg-slate-50 shadow-sm normal-case text-base"
                    @click="goGPT">AI Expert</a>
            </div>
            <router-view class="2xl:w-min-4/5 2xl:w-full overflow-visible 
            lg:min-h-fit lg:h-full lg:overflow-scroll lg:max-h-[81vh] 2xl:max-h-[88.1vh]" />
        </div>


    </div>
</div>

</template>

<script>

import InputFormC from "../components/inputForm.vue";
import GPTResultC from "../components/gptResult.vue";

export default {
    name: 'Home',
    components: {
        InputFormC,
        GPTResultC,
    },
    data() {
        return {
            fullEditor: false,
        }
    },
    methods: {
        goGrammar() {
            this.$router.push('/home/grammar');
        },
        goGPT() {
            this.$router.push('/home/');
        },
    },

}
</script>

<style scoped>


</style>