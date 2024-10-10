<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['vinnare']);
const score = ref({ spelare: 0, dator: 0 })
const localVinnare = ref('')

watch(props, () => {
    localVinnare.value = props.vinnare
})
watch(localVinnare, () => {
    if (localVinnare.value === 'spelare') {
        score.value.spelare++
    } else if (localVinnare.value === 'dator') {
        score.value.dator++
    }
    localVinnare.value = ''
})


</script>
<template>
<div class="score">
    <p>
        <span id="spelare">
            {{ score.spelare }}
        </span> - <span id="dator">
        {{ score.dator }}
        </span>
    </p>
</div>
</template>
<style scoped>
</style>