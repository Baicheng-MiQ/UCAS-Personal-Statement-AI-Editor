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
      <div v-show="!waitingResult && !noSubmission && numOfIssue==0">
        <div class="card w-fit mx-auto bg-base-100 shadow-xl border-2">
          <div class="card-body">
            <h2 class="card-title">Well done!</h2>
            <p>We have found no garmmar issues in your Personal Statement!</p>
            <div class="card-actions justify-end">
              <button class="btn btn-success bg-emerald-200 border-0 text-black" 
              @click="this.$router.push('/finalise/');">
                Go AI Expert
              </button>
            </div>
          </div>
        </div>
      <!-- \----------------------/ -->
      
      </div>

      <Transition enter-active-class="animate__animated animate__fadeInDown animate__faster">
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
      </Transition>
      
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
    // likely deprecated
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
    async strCheckGrammar() {
      const payload = {
        userToken: "this.$store.state.userIDtoken",
        major: 'this.$store.state.major.join(",")',
        statement_obj: this.$store.state.content,
      };
      console.log(payload);
      axios
        .post("https://ps-htbbh2ws5a-uc.a.run.app/grammar_v2", payload)
        .then((response) => {
          var pureRes = response.data;
          for (var i = 0; i < pureRes.length; i++) {
            for (var j = 0; j < pureRes[i].length; j++) {
              if (pureRes[i][j].length){
              pureRes[i][j].context.left = pureRes[i][j].context.text.substring(
                0,
                pureRes[i][j].context.offset
              );

              pureRes[i][j].context.wrong = pureRes[i][j].context.text.substring(
                pureRes[i][j].context.offset,
                pureRes[i][j].context.offset + pureRes[i][j].context.length
              );

              pureRes[i][j].context.right = pureRes[i][j].context.text.substring(
                pureRes[i][j].context.offset + pureRes[i][j].context.length,
                pureRes[i][j].context.text.length
              );}

          }
          }
          this.grammarResult = pureRes;
          this.waitingResult = false;
          })

        .catch((error) => {
        this.$store.commit("notify", {type:"error", titile:"Connection Error", message:`Please check your internet connection (${error})`});
        });
    },

    checkGrammar() {
      if (this.contentArray.length == 0) {
        this.$store.commit("notify", {type:"error", titile:"Empty statement", message:"Please add some content first"});
        return;
      }
      this.waitingResult = true;
      this.noSubmission = false;
      this.grammarResult = [];
      
      this.strCheckGrammar();
    },
  },
  mounted() {
    this.checkGrammar();
    console.log(this.$store.state.content)
  },
};
</script>

<style>
</style>