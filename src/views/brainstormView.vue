<template>
    <div class="flex justify-center">
        <h1 class="text-lg flex flex-row items-baseline">
            I'm Applying <majorInput class="translate-y-px"/>
        </h1>
    </div>
</template>

<script>
import majorInput from "../components/brainstorm/majorInput.vue";

export default {
    name: 'brainstormView',
    components: {
        majorInput,
    },
    data() {
        return {
            
        }
    },

}
</script>

<style>

</style>