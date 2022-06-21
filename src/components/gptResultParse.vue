<template>
<div class="flex flex-col">
    <h3>Strengths</h3>
    <adviceBlockC :adviceContent="result.pro"/>
    <h3>Suggestions</h3>
    <adviceBlockC :adviceContent="result.con"/>
    <h3>Comments</h3>
    <adviceBlockC :adviceContent="result.comm"/>
</div>

</template>

<script>
import adviceBlockC from "../components/adviceBlock.vue";
export default {
    name: 'gptResultParseC',
    components: {
        adviceBlockC
    },
    data() {
        return {
        
        }
    },
    props: {
        result: {
            type: Object,
            required: true
        }
    },
    computed: {
    },

}
</script>

<style scoped>

h3 {
    @apply m-3 text-3xl leading-9 font-black;
}

</style>