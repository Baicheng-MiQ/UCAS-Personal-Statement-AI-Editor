<template>
  <div class="flex flex-col m-2">
    <div class="flex flex-row justify-between items-start">
      <div class="stats stats-vertical lg:stats-horizontal shadow mb-2">
          <div class="stat">
            <div class="stat-title text-slate-800">Found</div>
            <div class="stat-value text-success">{{numOfIssue}}</div>
            <div class="stat-desc text-slate-800">issues</div>
          </div>
      </div>
      <button class="btn btn-success ml-auto mr-3 my-4 shadow-lg" @click="checkGrammar">check grammar</button>
    </div>

    <div>
      <GrammarBlock :note="null" v-show="waitingResult" class="mb-3"/>

      <!-- /------No issue-------\ -->
      <div v-show="!waitingResult && !noSubmission && grammarResult.length==contentArray.length && numOfIssue==0">
        <div class="card w-fit mx-auto bg-base-100 shadow-xl border-2">
          <div class="card-body">
            <h2 class="card-title">Well done!</h2>
            <p>We have found no garmmar issues in your Personal Statement!</p>
            <div class="card-actions justify-end">
              <button class="btn btn-success bg-emerald-200 border-0 text-black" 
              @click="this.$router.push('/home/');">
                Go AI Expert
              </button>
            </div>
          </div>
        </div>
      <!-- \----------------------/ -->
      
      </div>
      <div v-show="grammarResult.length">
      <div v-for="(para, index) in grammarResult" :key="index" v-show="(para && para.length)" class="m-2 p-2 shadow-md shadow-indigo-100 rounded-lg flex flex-col space-y-4">
        <h1 class="text-gray-800 translate-y-1 font-bold"> Paragraph {{ index + 1 }}</h1>
        <div v-for="(note, subindex) in para" :key="subindex" >
          <Transition appear-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
            <GrammarBlock :note="note" />
          </Transition>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GrammarBlock from "./grammarBlock.vue";
export default {
  name: "grammarResultC",
  components: { GrammarBlock },
  data() {
    return {
      grammarResult: [],
      waitingResult: false,
      noSubmission: true,
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
    numOfIssue() {
      var counter = 0;
      for (var i = 0; i < this.grammarResult.length; i++) {
        if (this.grammarResult[i]) {
          counter+=this.grammarResult[i].length;
        }
      }
      return counter
    }
  },
  methods: {
    async strCheckGrammar(i, para, total) {
      const payload = {
        language: "en-GB",
        text: para,
      };
      axios
        .post("https://ps-htbbh2ws5a-uc.a.run.app/grammar", payload)
        .then((response) => {
          var pureRes = response.data;
          if (!pureRes.length) {
            this.grammarResult[i] = [];
          } else {
          for (var j = 0; j < pureRes.length; j++) {

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
          }
          if (this.grammarResult.length==total){
            this.waitingResult = false;
          };
        })
        .catch((error) => {
          alert(error);
        });
    },

    checkGrammar() {
      if (this.contentArray.length == 0) {
        this.$store.commit("notify", {type:"error", titile:"Empty statement", message:"Please add some content first"});
        return;
      }
      this.waitingResult = true;
      this.noSubmission = false;
      var paras = this.contentArray;
      var results = [];
      for (var i = 0; i < paras.length; i++) {
        this.strCheckGrammar(i, paras[i], paras.length);
      }
      this.grammarResult = results;
    },
  },
  mounted() {
    this.checkGrammar();
  },
};
</script>

<style>
</style>