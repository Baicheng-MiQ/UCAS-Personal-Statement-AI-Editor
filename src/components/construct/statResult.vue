<template>
    <div class="flex flex-col space-y-4 py-4">
        <div class="tags w-full">
            <div v-if="checkResult.paraType"  class="flex flex-row whitespace-nowrap space-x-2 w-full overflow-auto">
                <div
                    v-for="(paraType, index) in checkResult.paraType" :key="index">
                    <div class="badge badge-xl badge-info bg-blue-600 text-white font-bold py-3 capitalize"> {{paraType}} </div>
                </div>
            </div>
            <div v-else class="animate-pulse badge badge-lg badge-info bg-blue-100"> ... </div>
        </div>
        <div class="heading text-2xl font-serif">
            <h1 v-if="checkResult.paraHeading">
                {{checkResult.paraHeading}}
            </h1>
            <h1 v-else class="animate-pulse w-fit">
                Loading...
            </h1>
        </div>
        <div class="sent">
            <div v-if="checkResult.sentenceIssue" class="flex flex-row space-x-2 w-full overflow-auto">
                <div
                    v-for="(paraSent, index) in checkResult.sentenceIssue" :key="index">
                    <div class="font-bold py-3 capitalize"> {{paraSent}} </div>
                </div>
            </div>
            <div v-else class="animate-pulse badge badge-lg badge-info bg-blue-100"> ... </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StatResult',
    components: {

    },
    data(){
        return{
        }
    },
    props: {
        para: {
            type: Object,
            required: true,
        },
        checkResult: {
            type: Object,
            required: true,
        },
    },

}
</script>

<style>

</style>