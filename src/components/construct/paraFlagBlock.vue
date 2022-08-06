<template>
<div class="card lg:card-side bg-base-100 shadow-lg border-2 font-normal">
  <figure><img src="../../assets/logo_left.png" alt="Logo" class="h-20 w-20 mt-8 lg:mt-0 lg:ml-8"></figure>
  <div class="card-body">
    <h2 class="card-title capitalize">{{flag.prob}}?</h2>
    <p>{{flag.message}}</p>
  </div>
</div>
</template>

<script>
export default {
    name: 'paraFlagBlock',
    components: {
        
    },
    props: {
        flag: {
        type: Object,
        required: true
        }
    }
}
</script>

<style>

</style>