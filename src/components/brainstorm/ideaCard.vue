<template>
<div class="card w-96 shadow-2xl text-white z-0
    hover:scale-105 hover:shadow-blue-600 transition-all image-full">
    <figure class="w-full h-full bg-gradient-to-r from-blue-600 to-sky-600"></figure>
    <div class="card-body ">
        <span class="badge m-0">{{idea.type}}</span>

        <h2 class="card-title">{{idea.title}}</h2>

        <!-- idea.dateFrom - idea.dateTo convert from yyyy-mm-dd to dd-mm-yyyy format-->
        <p class="card-text">{{idea.dateFrom}} ~ {{idea.dateTo}}</p>


        <div class="flex flex-row">
            <div class="collapse  w-4/5">
                <input type="checkbox" style="padding: 0rem; min-height:0rem" v-model="this.thisShowMore"/>
                <div v-if="!this.thisShowMore" class="collapse-title p-0 min-h-0 "><p class="font-bold">MORE</p></div>
                <div v-else class="collapse-title p-0 min-h-0 "><p class="font-bold">LESS</p></div>
                <!-- iterate elements in idea.content as bulletpoints -->
                <ul class="collapse-content list-disc p-0">
                    <div class="divider"></div> 
                    <li v-for="(content, index) in idea.content" :key="index">
                        {{content}}
                    </li>
                </ul>
            </div>

            <arrow v-show="this.showArrow" class="w-1/5 mt-auto ml-auto hover:scale-125 transition-all cursor-pointer"
                @click="this.$emit('editIdea')"/>
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