<script>
import CommentC from "../components/comment.vue";
import HomeC from "../components/home.vue";
export default {
    name: 'Home',
    components: {
    CommentC,
    HomeC
}
}
</script>

<template>
<HomeC class="text-center"/>
<h1 class="text-8xl text-pink-800 hover:text-blue-300 hover:text-left text-center">
Hello VUE+Tailwind </h1>
<CommentC/>
</template>



<style>

</style>