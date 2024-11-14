<template>
    <div>
        <label for="gameMode">Välj spelläge:</label>
        <select v-model="gameMode" @change="emitGameMode">
            <option value="Oändligt">Oändligt</option>
            <option value="BestOfX">Bäst av</option>
        </select>
        <div v-if="gameMode === 'BestOfX'">
            <label for="seriesLength">Välj antal omgångar:</label>
            <select v-model="seriesLength" @change="emitSeriesLength">
                <option :value="1">Bäst av 1</option>
                <option :value="5">Bäst av 3</option>
                <option :value="9">Bäst av 5</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits(['updateGameMode', 'updateSeriesLength']);
const gameMode = ref('Oändligt');
const seriesLength = ref(3);

watch(gameMode, () => emit('updateGameMode', gameMode.value));
watch(seriesLength, () => emit('updateSeriesLength', seriesLength.value));
</script>



<style scoped>
select {
    font-size: 1em;
    margin-left: 1em;
}

label {
    font-size: 1.2em;
    margin-right: 1em;
}
</style>
