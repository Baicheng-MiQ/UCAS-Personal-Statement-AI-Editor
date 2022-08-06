<template>
    <div class="card w-full rounded-lg bg-base-100 shadow-lg border-2 border-gray-100">
      <div class="card-body">
        <h1 class="text-gray-400">Grammar</h1>
        <p class="leading-8 mb-2 font-serif text-slate-700 font-normal text-lg
          pb-4 border-b-2">
          {{ note.context.left }}
          <span
            class="
              pb-px border-b-2 border-blue-400
              hover:bg-blue-400 hover:cursor-not-allowed">
            {{ note.context.wrong }}
          </span>
          {{ note.context.right }}
        </p>
        
        <p class="text-base">
          {{ note.shortMessage }}:
        </p>
        <h2 class="card-title font-normal text-base">
          {{ note.message }}
        </h2>




        <div class="card-actions justify-end" v-show="note.replacements.length">
          <p class="text-right text-gray-500 text-sm">Suggestion:</p>
          <div
            class="badge badge-outline"
            v-for="(rep, subsubindex) in note.replacements"
            :key="subsubindex">
            {{ rep.value }}
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  name: "grammarResultC",
  components: {},
  props: {
    grammar: {
      type: Object,
      required: false,
    },
  },
  computed: {
    note() {
      var pureRes = this.grammar;
      pureRes.context.left = pureRes.context.text.substring(
        0,
        pureRes.context.offset
      );
      pureRes.context.wrong = pureRes.context.text.substring(
        pureRes.context.offset,
        pureRes.context.offset + pureRes.context.length
      );
      pureRes.context.right = pureRes.context.text.substring(
        pureRes.context.offset + pureRes.context.length,
        pureRes.context.text.length
      );
      return pureRes;
    },
  },
};
</script>

<style>
</style>