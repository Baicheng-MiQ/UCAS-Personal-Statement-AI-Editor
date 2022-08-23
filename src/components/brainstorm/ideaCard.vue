<template>
    <div>
        <div class="card w-96 shadow-2xl text-white
        hover:scale-105 hover:shadow-blue-600 transition-all image-full">
        <figure class="w-full h-full bg-gradient-to-r from-blue-600 to-sky-600"></figure>
        <div class="card-body">
            <h2 class="card-title">{{idea.title}}</h2>

            <!-- idea.dateFrom - idea.dateTo convert from yyyy-mm-dd to dd-mm-yyyy format-->
            <p class="card-text">{{idea.dateFrom}} - {{idea.dateTo}}</p>

            <!-- iterate elements in idea.content as bulletpoints -->
            <ul class="list-unstyled">
                <li v-for="(content, index) in idea.content" :key="index">
                    {{content}}
                </li>
            </ul>

        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ideaCard',
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