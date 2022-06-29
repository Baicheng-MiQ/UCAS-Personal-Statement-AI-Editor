<template>
  <div class="card w-full bg-base-100 shadow-sm border-2 border-indigo-50">
    <div class="card-body">
      <p class="text-gray-500 shadow-sm shadow-red-100 text-sm" v-if="note">
        {{ note.shortMessage }}
      </p>
      <p class="animate-pulse shadow-sm shadow-red-100 text-sm rounded-full" v-else>
         Processing...
      </p>

      <h2 class="card-title text-lg" v-if="note">
        {{ note.message }}
      </h2>
      <h2 class="animate-pulse bg-gray-100 card-title w-20 rounded-full " v-else>
        <br>
      </h2>

      <p class="leading-8 mb-2 font-serif text-slate-500" v-if="note">
        {{ note.context.left }}
        <span
          class="
            bg-emerald-500 rounded-md font-bold text-white p-1 m-1 shadow-md
            hover:bg-emerald-400 hover:cursor-default">
          {{ note.context.wrong }}
        </span>
        {{ note.context.right }}
      </p>
      <p class="animate-pulse w-full bg-gray-100 rounded-full" v-else>
        <br>
      </p>

      <div class="card-actions justify-end" v-show="note.replacements.length" v-if="note">
        <p class="text-right text-gray-500 text-sm">Replace:</p>
        <div
          class="badge badge-outline"
          v-for="(rep, subsubindex) in note.replacements"
          :key="subsubindex"
        >
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
    note: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style>
</style>