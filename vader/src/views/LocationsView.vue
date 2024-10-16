<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const location = ref({ name: '', position: { lat: 0, long: 0 }, default: false })

const locationsList = ref([
    { name: 'Mariehamn', position: { lat: 60, long: 20 }, default: false },
    { name: 'Stockholm', position: { lat: 59.32, long: 18.32 }, default: true },
    { name: 'London', position: { lat: 51.5, long: -0.1 }, default: false },
    { name: 'Cape Town', position: { lat: -34, long: 18.5 }, default: false }

])

const saveLocation = () => {
    locationsList.value.push({ ...location.value })
    resetLocation()
}

const resetLocation = () => {
    location.value = { name: '', position: { lat: 0, long: 0 }, default: false }
}

const removeLocation = (index) => {
    locationsList.value.splice(index, 1)
}

const setDefault = (index) => {
    locationsList.value.forEach((loc, i) => loc.default = i === index)
}

const goToForecast = (location) => {
    router.push({ name: 'ForecastResult', params: { location: location.name } })
}

</script>
<template>
    <h2>Locations</h2>
    <label>Namn: <input type="text" v-model="location.name" /></label>
    <label>Lat: <input type="number" max="90" min="-90" step=".1" size="5" v-model="location.position.lat" /></label>
    <label>Long: <input type="number" max="180" min="-180" step=".1" size="8" v-model="location.position.long" /></label>
    <button @click="saveLocation">Save</button> <button @click="resetLocation">Reset</button>
    <hr>
    <h3>List</h3>
        <ul>
            <li v-for="loc in locationsList" :key="loc" :class="loc.default ? 'default' : ''">
                <span @click="goToForecast(loc)">
                    {{ loc.name }}
                    ( {{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }}
                    {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }} )
                </span>
                <span class="remove" @click="removeLocation(index)">x</span>
                <button @click="setDefault(index)">Set Default</button>
            </li>
        </ul>
</template>

<style scoped>
label {
    display: block;
    width: 15em;
    padding-top: .5em;
}

.default {
    font-weight: bold;
}

.remove {
    color: red;
    cursor: pointer;
    margin-left: 10px;
}
</style>