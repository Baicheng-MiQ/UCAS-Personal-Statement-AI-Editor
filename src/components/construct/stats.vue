<template>
    <div class="stats stats-vertical shadow min-w-[10rem]">

    <div class="stat">
        <div class="stat-title">Characters</div>
        <div class="stat-value">{{this.pureTextPara.length}}</div>
        <div class="stat-desc">in this paragraph (approx.)</div>
    </div>

    <div class="stat">
        <div class="stat-title">Words</div>
        <div class="stat-value">{{this.pureTextPara.split(" ").length}}</div>
        <div class="stat-desc">in this paragraph (approx.)</div>
    </div>

    <div class="stat">
        <div class="stat-title">Lines</div>
        <div class="stat-value">{{this.pureTextPara.split("\n").length}}</div>
        <div class="stat-desc">in this paragraph (approx.)</div>
    </div>
    

    
</div>
</template>

<script>
export default {
    name: 'Stats',
    components: {
    },
    data(){
        return{

        }
    },
    props: {
        para: {
            type: Object,
            required: false,
        },
    },
    computed: {

        pureTextPara(){
            if (this.para.content) {
                return this.para.content[0].text;
            } else {
                return "";
            }
        }
    }
}
</script>

<style>

</style>