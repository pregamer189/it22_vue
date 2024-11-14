<template>
    <div class="resultat">
        <p id="resultat">{{ resultat }}</p>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps(['valdaKnappar', 'reset']);
const emit = defineEmits(['vinnare']);
const resultat = ref('Låt spelet börja!');

watch(props, () => {
    if (props.valdaKnappar.spelare === props.valdaKnappar.dator) {
        resultat.value = "Oavgjort!";
    } else if (props.valdaKnappar.spelare % 2 === props.valdaKnappar.dator % 2) {
        resultat.value = props.valdaKnappar.spelare > props.valdaKnappar.dator ? "DU vann!" : "Datorn vann";
        emit('vinnare', props.valdaKnappar.spelare > props.valdaKnappar.dator ? 'spelare' : 'dator');
    } else {
        resultat.value = props.valdaKnappar.spelare < props.valdaKnappar.dator ? "DU vann!" : "Datorn vann";
        emit('vinnare', props.valdaKnappar.spelare < props.valdaKnappar.dator ? 'spelare' : 'dator');
    }
});

watch(() => props.reset, () => {
    if (props.reset) resultat.value = 'Låt spelet börja!';
});
</script>

<style scoped>
.resultat {
    font-size: 1.2em;
    text-align: center;
    margin: 1.2em 0;
}
</style>