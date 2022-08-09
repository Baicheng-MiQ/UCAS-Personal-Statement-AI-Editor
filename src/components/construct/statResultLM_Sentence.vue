<template>
  <div class="flex flex-col p-4 border-2 mx-5 my-3 rounded-2xl">
      <p class="pt-2 text-base text-gray-400">Sentence</p>
      <h1 class="py-4 text-lg lg:text-xl font-serif"> {{ paraSent.sentence }} </h1>
      <div class="font-bold py-3" v-for="(note, index) in paraSent.flags" :key="index"> 
        <ParaFlagBlock :flag="note"/>
      </div>
      <div class="font-bold py-3" v-for="(note, index) in paraSent.ner_reses" :key="index">
        <ParaNERblock :ner="note" :sent="paraSent.sentence"/>
      </div>
      <div class="font-bold py-3" v-for="(note, index) in paraSent.grammar_reses" :key="index">
        <GrammarBlock :grammar="note"/>
      </div>
      <!-- Well done! -->
      <div class="card lg:card-side bg-base-100 shadow-md" 
      v-show="paraSent.flags.length+paraSent.ner_reses.length+paraSent.grammar_reses.length===0">
      <figure><img src="../../assets/target.png" alt="well done" class="h-44 w-44"></figure>
      <div class="card-body">
        <h2 class="card-title">Well Done!</h2>
        <p>
          We found no issue in this sentence.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GrammarBlock from "./grammarBlock.vue";
import ParaFlagBlock from "./paraFlagBlock.vue";
import ParaNERblock from "./paraNERblock.vue";
export default {
    name: 'statResultLM_Sentence',
    components: {
    GrammarBlock,
    ParaFlagBlock,
    ParaNERblock
},
    props: {
        paraSent: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>