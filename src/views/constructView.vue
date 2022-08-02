<template>
    <div class="flex flex-col relative m-6 lg:mx-20 p-6">

        <h1 id="bigHeading" class="text-3xl">
            <span
                class="font-black text-6xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-400">
                Construct <br>
            </span>
                Paragraph by paragraph, sentence by sentence.        
        </h1>

        <div>
            <InputFormC/>
        </div>


    </div>


</template>

<script>
import InputFormC from "../components/construct/constructInputForm.vue";

export default {
    name: 'ConstructView',
    components: {
        InputFormC
    },
    data(){
        return{
            
        }
    },
    computed: {

    },
    methods: {

    },
}
</script>

<style scoped>

</style>