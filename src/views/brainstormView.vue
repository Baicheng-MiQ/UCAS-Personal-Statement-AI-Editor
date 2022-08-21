<template>
    <div class="flex justify-center">
        <h1 class="text-lg flex flex-row items-baseline">
            I'm Applying <majorInput class="translate-y-px"/>
        </h1>
        {{brainstormData}}
    </div>
</template>

<script>
import majorInput from "../components/brainstorm/majorInput.vue";

const NEW_ENTRY = {
                        "meta": {
                            "createdAt": null,
                            "updatedAt": null,
                            "contentID": null
                        },
                        "dateFrom": null,
                        "dateTo": null,
                        "type": null,
                        "title": null,
                        "content": [null],
                    }

export default {
    name: 'brainstormView',
    components: {
        majorInput,
    },
    data() {
        return {
            
        }
    },
    computed: {
      brainstormData:{
        get() {
            return this.$store.state.brainstormData;
        },
        set(value) {
            this.$store.commit('setBrainstormData', value);
        }
      }  
    },

}
</script>

<style>

</style>