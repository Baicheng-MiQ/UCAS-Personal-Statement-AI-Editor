<template>
<div class="mx-4 flex-1 focus:shadow-md lg:max-w-full lg:mx-14 2xl:mx-32 ">
    <div class="flex flex-col 
                                lg:flex-row lg:justify-center">

        <InputFormC class="z-20 my-5 lg:w-3/5 lg:mr-4" 
        @toggleFullscreen="fullEditor = !fullEditor" v-show="!fullEditor"/>

        <div class="background inset-0 z-30 absolute bg-black opacity-10 blur-3xl"
        v-show="fullEditor"
        @click="fullEditor = false"></div>
        <InputFormC class="background z-40 w-3/4 absolute bg-white mx-32 rounded-xl shadow-2xl"
        v-show="fullEditor" :underFullscreen="true"
        @toggleFullscreen="fullEditor = !fullEditor"/>

        <GPTResultC class="z-20 overflow-visible lg:w-2/5 lg:overflow-scroll lg:max-h-[88.1vh]"/>

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

}
</script>

<style scoped>


</style>