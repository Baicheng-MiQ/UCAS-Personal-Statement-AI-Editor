<template>
    <!-- a right arrow, click to learn more -->
    <!-- LEARN MORE! -->
    <label class="stat p-1 mr-0 ml-auto btn modal-button btn-ghost h-fit w-full" :for="randomUniqueID">
        <rightArrowIcon class="mr-0 ml-auto" />
        <h6 class="stat-desc mr-1 ml-auto">More</h6>
    </label>

    <input type="checkbox" :id="randomUniqueID" class="modal-toggle " />
    <div class="modal modal-bottom sm:modal-middle">
        <label for="" class="modal-box sm:w-11/12 sm:max-w-[100rem] h-[70vh] sm:h-[90vh] py-0 mt-16">
            <label :for="randomUniqueID" class="btn btn-sm opacity-50 btn-circle z-50 absolute right-4 top-4">✕</label>

            <p class="text-2xl font-bold">More {{idea}}</p>

        </label>
    </div>
</template>

<script>
import ideaCard from './ideaCard.vue';
import rightArrowIcon from "@carbon/icons-vue/es/arrow--right/32.js"
export default {
    name: 'ideaEditor',
    components: {
        ideaCard,
        rightArrowIcon,
    },
    props: {
        idea: {
            type: Object,
            required: true,
        },
        ideaIndex: {
            type: Number,
            required: true,
        },
    },
    // emits: ['saveIdea'],
    computed: {
        randomUniqueID() {
            return Math.random().toString(36).substr(2, 9)
        },
    }
}
</script>

<style>

</style>