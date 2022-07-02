<template>
<div class="mx-4 flex-1 my-2 focus:shadow-md lg:max-w-full lg:mx-2 2xl:mx-5 ">
    <div class="flex flex-col space-y-5 lg:space-y-0 lg:flex-row ">

        <InputFormC class="z-30 border-r-2 lg:w-3/5 lg:mx-4 lg:h-[calc(100vh-5.6rem)]"/>
        
        <!-- ====================== -->

        <div class="z-20 flex flex-col space-y-2 2xl:space-y-0 2xl:flex-row-reverse justify-start px-2 lg:w-2/5 ">
            <div class="navbar z-20 shadow-md mb-2 2xl:mb-0 shadow-gray-300 border-t-2 rounded-lg flex flex-row space-x-2 
                2xl:w-fit 2xl:flex-col 2xl:space-x-0 2xl:space-y-2">
                <a class="btn btn-ghost z-20 bg-green-50 hover:bg-emerald-100 shadow-md shadow-green-100 normal-case text-base"
                    @click="goGrammar">Grammar</a>
                <a class="btn btn-ghost bg-indigo-50 hover:bg-indigo-100 shadow-md shadow-indigo-100 normal-case text-base"
                    @click="goGPT">AI Expert</a>
            </div>
            <router-view class="2xl:w-min-4/5 2xl:w-full overflow-visible 
            lg:min-h-fit lg:overflow-scroll lg:h-[calc(100vh-10.3rem)] 2xl:h-[calc(100vh-5.3rem)]" v-slot="{ Component }"> 
                <Transition enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutRight animate__faster">
                    <component :is="Component" />
                </Transition>
            </router-view>
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