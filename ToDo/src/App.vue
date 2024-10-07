<script setup>
import { ref } from 'vue';


const list = ref([])
const itemText = ref('')

function addItem() {
    let listItem = { text: itemText.value, done: false }
    list.value.push(listItem)
    itemText.value = ''
}

function radera(listItem) {
    list.value = list.value.filter((obj) => {
        return obj !== listItem
    })
}
</script>

<template>
    <header>
        <h1>ToDo-lista</h1>
        <input type="text" placeholder="Ny uppgift" v-model="itemText" />
        <button v-on:click="addItem">Lägg till</button>
    </header>

    <main>
        <h3 id="todo">Att göra:</h3>
        <ul>

            <template v-for="itm in list" v-bind:key="itm">
                <li class="todoItm" v-if="!itm.done" @click="itm.done = !itm.done">{{ itm.text }}
                    <span title="Radera" @click="radera(itm)">x</span>
                </li>
            </template>
        </ul>
        <h3 id="klart">Klart:</h3>
        <ul>

            <template v-for="itm in list" v-bind:key="itm">
                <li class="todoItm done" v-if="itm.done" @click="itm.done = !itm.done">{{ itm.text }}
                    <span title="Radera" @click="radera(itm)">x</span>
                </li>
            </template>
        </ul>
    </main>
</template>

<style scoped>
.todoItm {
    font-weight: bold;
    padding: .5em;
    list-style-type: none;
    cursor: pointer;
}

.todoItm:nth-child(even) {
    background-color: lightblue;
}

.todoItm:nth-child(odd) {
    background-color: aqua;
}

.done {
    text-decoration: solid black line-through;
}

#klart {
    color: greenyellow;
}

#todo {
    color: pink;
}

li span {
    display: inline-block;
    position: absolute;
    right: 3em;
    background-color: red;
    color: wheat;
    padding-left: .5em;
    padding-right: .5em;
}
</style>
