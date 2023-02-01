<template>
    <br>
    <div class="flex justify-center items-center w-75 mx-auto pb-6">
        <div class="flex-1 border-2 border-gray-800 rounded overflow-hidden shadow">
            <div class="grid grid-flow-col divide-x-2 divide-gray-800 rounded gap-0 auto-cols-fr">
                <div v-for="(f, index) in flag" :key="f.id">
                    <div class="bg-custom-cyan p-2 border-b-2 border-gray-800">
                        <p class="text-gray-100 mx-2 text-sm"> {{ index + 1 }} of {{ flag.length }}</p>
                    </div>
                    <h5 class="font-bold m-3">{{ f.associatedText }}</h5>
                    <p class="m-3 text-sm">{{ f.fullSentence }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
/**
 * Prop for receiving flag to be displayed from singlePolicy.vue
 */
const props = defineProps({
    transferFlags: {}
})
// filled via prop to display to local html
const flag = ref([])
/**
 * Watch for prop to be populated
 */
watchEffect(() => {
    console.log('PROP:', props.transferFlags)
    flag.value = props.transferFlags
    console.log('FINAL', flag.value)
})
</script>
<style>
.card-group {
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
}
</style>