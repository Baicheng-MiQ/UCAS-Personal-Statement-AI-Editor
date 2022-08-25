<template>
<div class="card w-96 shadow-2xl text-white
    hover:scale-105 hover:shadow-blue-600 transition-all image-full">
    <figure class="w-full h-full bg-gradient-to-r from-blue-600 to-sky-600"></figure>
    <div class="card-body">
        <h2 class="card-title">{{idea.title}}</h2>

        <!-- idea.dateFrom - idea.dateTo convert from yyyy-mm-dd to dd-mm-yyyy format-->
        <p class="card-text">{{idea.dateFrom}} ~ {{idea.dateTo}}</p>

        <span class="badge">{{idea.type}}</span>

        <div class="flex flex-row">
            <!-- iterate elements in idea.content as bulletpoints -->
            <ul class="list-unstyled w-4/5">
                <li v-for="(content, index) in idea.content" :key="index">
                    {{content}}
                </li>
            </ul>
            <arrow class="w-1/5 mt-auto hover:scale-125 transition-all cursor-pointer"
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
    },
}
</script>

<style>
.card.image-full:before {
    background-color: rgba(0, 0, 0, 0) !important;
}
</style>