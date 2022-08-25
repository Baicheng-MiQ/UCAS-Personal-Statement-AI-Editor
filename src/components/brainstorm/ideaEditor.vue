<template>
    <!-- a right arrow, click to learn more -->
    <!-- LEARN MORE! -->
    <label class="modal-button" :for="this.ideaIndex">
    </label>

    <input type="checkbox" :id="this.ideaIndex" class="modal-toggle " />
    <div class="modal modal-bottom sm:modal-middle">
        <label for="" class="modal-box sm:w-11/12 sm:max-w-[100rem] h-[70vh] sm:h-[90vh] p-0 mt-16">
            <label :for="this.ideaIndex" class="btn btn-sm opacity-50 btn-circle z-50 absolute right-4 top-4">✕</label>
            <div class="flex flex-row h-full">
                <div class="left w-1/2 flex justify-center bg-cyan-400">
                    <ideaCard class="mx-auto my-auto" :idea="idea" :showArrow="false"/>
                </div>
                <div class="right w-1/2 p-10">
                    <h1 class="text-6xl">Idea</h1>
                    <p class="text-2xl font-bold">{{idea}}</p>

                </div>
            </div>

        </label>
    </div>
</template>

<script>
import ideaCard from './ideaCard.vue';
import rightArrowIcon from "@carbon/icons-vue/es/arrow--right/32.js"
import { watch } from '@vue/runtime-core';
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
    data() {
        return {
            activeIdea: this.idea,
            // 
            // { "meta": 
            //     { "createdAt": "2018-01-01", 
            //       "updatedAt": "2018-01-01", 
            //       "contentID": "1" }, 
            //   "content": [ "I love mc", "I host a MC server", "I created a mod" ], 
            //   "dateTo": "2018-01-01", 
            //   "title": "I love Minecraft", 
            //   "type": "major", 
            //   "dateFrom": "2018-01-01" }
        }
    },
    computed: {
    },
    watch: {
        idea: {
            handler: function (newVal, oldVal) {
                this.activeIdea = newVal;
            },
            deep: true,
        },
    },
}
</script>

<style>

</style>