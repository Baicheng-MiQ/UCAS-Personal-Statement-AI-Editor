<template>
  <div class="flex flex-col m-2">
    <!-- <p v-for="(para, index) in contentArray" :key="index" class="m-2">
    {{para}}
  </p> -->
    <button class="btn btn-success ml-auto mr-3 my-4 shadow-lg" @click="checkGrammar">check grammar</button>
    <div v-show="grammarResult.length">
      <div v-for="(para, index) in grammarResult" :key="index" v-show="para"
        class="m-2 p-2 shadow-lg shadow-indigo-100 rounded-lg flex flex-col space-y-4">

        <h1 class="text-gray-500 translate-y-1 font-bold">Paragraph {{ index + 1 }}</h1>

        <div v-for="(note, subindex) in para" :key="subindex">
          <div class="card w-full bg-base-100 shadow-lg border-2 border-indigo-50">
            <div class="card-body">

            <!--|=================== CARD ======================|  -->
              <p class="text-gray-500 shadow-sm shadow-red-100 text-sm">{{ note.shortMessage }}</p>
              <h2 class="card-title">
                {{ note.message }}
              </h2>
              <p class="leading-8 my-4">
                {{ note.context.left }}
                <span class="
                    bg-emerald-500 rounded-md font-bold text-white p-1 m-1 shadow-md
                    hover:bg-indigo-500 hover:cursor-default
                  ">
                  {{ note.context.wrong }}
                </span>
                {{ note.context.right }}
              </p>
              <div class="card-actions justify-end" v-show="note.replacements.length">
                <p class="text-right text-gray-500 text-sm">Replace:</p>
                <div class="badge badge-outline" v-for="(rep, subsubindex) in note.replacements" :key="subsubindex">
                  {{ rep.value }}
                </div>
              </div>
            <!--|================================================|  -->


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "grammarResultC",
  components: {},
  data() {
    return {
      grammarResult: [],
      noSubmission: true,
      waitingResult: false,
    };
  },
  computed: {
    contentArray() {
      var content = this.$store.state.content.content;
      var paras = [];
      for (var i = 0; i < content.length; i++) {
        if (content[i].content) {
          paras.push(content[i].content[0].text);
        }
      }
      return paras;
    },
  },
  methods: {
    async strCheckGrammar(i, para) {
      const payload = {
        language: "en-GB",
        text: para,
      };
      axios
        .post("https://ps-htbbh2ws5a-uc.a.run.app/grammar", payload)
        .then((response) => {
          console.log(response.data);
          var pureRes = response.data;
          for (var j = 0; j < pureRes.length; j++) {
            if (!pureRes[j]) {
              continue;
            }
            pureRes[j].context.left = pureRes[j].context.text.substring(
              0,
              pureRes[j].context.offset
            );
            pureRes[j].context.wrong = pureRes[j].context.text.substring(
              pureRes[j].context.offset,
              pureRes[j].context.offset + pureRes[j].context.length
            );
            pureRes[j].context.right = pureRes[j].context.text.substring(
              pureRes[j].context.offset + pureRes[j].context.length,
              pureRes[j].context.text.length
            );
            this.grammarResult[i] = pureRes;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },

    async checkGrammar() {
      this.waitingResult = true;
      this.noSubmission = false;
      var paras = this.contentArray;
      var results = [];
      for (var i = 0; i < paras.length; i++) {
        this.strCheckGrammar(i, paras[i]);
      }
      this.grammarResult = results;
      this.waitingResult = false;
    },
  },
  mounted() {
    this.checkGrammar();
  },
};
</script>

<style>
</style>