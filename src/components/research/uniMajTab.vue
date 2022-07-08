<template>
    <div class="flex flex-row min-w-12 h-24 rounded-lg  items-center justify-between p-4
                bg-white backdrop-filter shadow-lg border-l-4 border-black
                motion-safe:hover:scale-105 motion-safe:transition hover:cursor-pointer">

        <div class="flex flex-col w-11/12" v-if="choice.uniName">
            <h2 class="text-2xl font-bold truncate text-gray-800">
                {{choice.uniName.replace('University', 'Uni').replace('university', 'uni')}} 
            </h2>
            <!-- <h3>{{choice.major}}</h3> -->
        </div>

        <div class="flex flex-col w-11/12" v-else>
            <h2 class="text-2xl text-gray-400 text-center">Add a Choice</h2>
        </div>
        
        <img class="right-0" src="../../assets/entry.png" alt="" width="20" height="20">
    </div>
</template>

<script>
export default {
    name: 'uniMajTabC',
    props: {
        choice: {
            type: Object,
            default: { notes: "", major: "", uniName: "", links: { uniPS: "", uniMainSite: "", majPS: "" }},
        },
        choiceNo: {
            type: Number,
            default: 0,
        },
    }
}
</script>

<style>

</style>