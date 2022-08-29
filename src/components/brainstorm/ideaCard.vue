<template>
<div class="card w-96 shadow-2xl text-white z-0
    hover:scale-105 hover:shadow-blue-600 transition-all image-full">
    <figure class="w-full h-full bg-gradient-to-r from-blue-700 to-sky-500"></figure>
    <div class="card-body p-0">
        <div class="flex flex-row m-5">
            <div>
                <span class="badge m-0 mb-2 bg-white text-blue-700 font-bold border-0">{{idea.type}}</span>
                <h2 class="card-title">{{idea.title}}</h2>
                <p class="card-text">{{idea.dateFrom}} to {{idea.dateTo}}</p>
            </div>
            <arrow v-show="this.showArrow" class="w-1/5 my-auto ml-auto hover:scale-125 transition-all cursor-pointer"
                @click="this.$emit('editIdea')"/>
        </div>

        <div class="collapse bg-white p-5 text-black">
            <input type="checkbox" style="padding: 0rem; min-height:0rem" v-model="this.thisShowMore"/>
            <div v-if="!this.thisShowMore" class="collapse-title p-0 min-h-0 "><p class="font-bold text-sm text-gray-600 underline underline-offset-2">Expand</p></div>
            <div v-else v-show="this.showArrow" class="collapse-title p-0 min-h-0 "><p class="text-gray-600 mb-2 text-sm">Hide</p></div>
            <!-- iterate elements in idea.content as bulletpoints -->
            <ul class="collapse-content list-disc p-0 pb-0 w-full">
                <li v-for="(content, index) in idea.content" :key="index">
                    {{content}}
                </li>
            </ul>
        </div>
    </div>


</div>

</template>

<script>
import arrow from "@carbon/icons-vue/es/arrow--right/32.js";
export default {
    name: 'ideaCard',
    components: {
        arrow
    },
    emits: ['editIdea'],
    props: {
        idea: {
            type: Object,
            required: true,
        },
        showArrow: {
            type: Boolean,
            required: false,
            default: true,
        },
        showMore: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            thisShowMore: this.showMore,
        }
    }
}
</script>

<style>
.card.image-full:before {
    background-color: rgba(0, 0, 0, 0) !important;
}
</style>