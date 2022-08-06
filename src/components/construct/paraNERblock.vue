
<script>
import { computed } from '@vue/runtime-core'
export default {
    name: 'paraNER',
    props: {
        ner: {
        type: Object,
        required: true
        // {
        //             "entity_group": "PER",
        //             "score": 0.9999706745147705,
        //             "word": "I Michael John",
        //             "start": 0,
        //             "end": 14,
        //             "message": "It looks like you might be mentioning a specific person in your personal statement. Please remember that your personal statement should be about you, so try to avoid mentioning any specific people."
        //         }
        },
        sent: {
        type: String,
        required: true
        }
    },
    computed: {
        textLeftSide() {
            // return the last word of the left side of the ner, if there is one
            if (this.ner.start > 0) {
                const allLeft = this.sent.slice(0, this.ner.start)
                const leftWords = allLeft.split(' ')
                const lastWord = leftWords[leftWords.length - 2]
                return lastWord
            } else {
                return ''
            };
            

        },
        textError() {
            return this.sent.substring(this.ner.start, this.ner.end)
        },
        textRightSide() {
            // return the first word of the right side of the ner, if there is one
            if (this.ner.end < this.sent.length) {
                const allRight = this.sent.slice(this.ner.end)
                const rightWords = allRight.split(' ')
                const firstWord = rightWords[1]
                return firstWord
            } else {
                return ''
            };
        }
    }
}
</script>

<template>
<div class="card lg:card-side bg-base-100 shadow-lg border-2 font-normal">
  <div class="card-body">
    <h2 class="card-title capitalize text-base text-gray-400">{{this.ner.entity_group}}</h2>
    <p class="leading-8 font-serif text-lg">
        <span v-show="textLeftSide">...{{textLeftSide}} </span>
        <span class="mx-1 bg-blue-600 text-white rounded-md p-1">{{textError}}</span>
        <span v-show="textRightSide"> {{textRightSide}}...</span>
    </p>
    <p>
        {{ner.message}}
    </p>
  </div>
</div>
</template>


<style>

</style>