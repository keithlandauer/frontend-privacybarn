<template>
    <div class="container mx-auto p-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
        <div v-for="e in elements" :key="e.id">
            <div class="flex flex-col">
                <div v-if="e.weight > 0">
                    <div class="btn btn-default relative h-64 p-6 bg-green-50 hover:bg-green-300 rounded shadow-md border-1 border-gray-800 text-left"
                        @click="toggleInfo(e.id)">
                        <i class="fa-solid fa-thumbs-up h-6 w-6" style="color:rgb(99, 205, 105)"></i>
                        <h2 class="font-bold text-gray-800 lg:text-xs md:text-md">{{ e.smallDescription }}</h2>
                    </div>
                    <div v-show="showInfo.get(e.id)">
                        <div class="px-6 py-3 bg-green-200 rounded shadow-md border-t border-gray-800 text-gray-600">
                            <p class="text-black"><span class="font-bold">Weight: </span>{{ e.weight }}</p>
                            <p class="italic pt-2">
                                <span v-if="e.fullExplanation">
                                    {{ e.fullExplanation }}
                                </span>
                                <span v-else>
                                    None
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else-if="e.weight < 0">
                    <div class="btn btn-default relative h-64 p-6 bg-red-50 hover:bg-red-300 rounded shadow-md border-1 border-gray-800 text-left"
                        @click="toggleInfo(e.id)">
                        <div class="align-items-center justify-center">
                            <i class="fa-solid fa-thumbs-down h-6 w-6" style="color:red"></i>
                            <h2 class="py-2 font-bold text-gray-800 lg:text-xs md:text-md">{{ e.smallDescription }}</h2>
                        </div>
                    </div>
                    <div v-show="showInfo.get(e.id)">
                        <div class="px-6 py-3 bg-red-200 rounded shadow-md border-t border-gray-300 text-gray-600">
                            <p class="text-black"><span class="font-bold">Weight: </span>{{ e.weight }}</p>
                            <p class="italic pt-2">
                                <span v-if="e.fullExplanation">
                                    {{ e.fullExplanation }}
                                </span>
                                <span v-else>
                                    None
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="btn btn-default relative h-64 p-6 bg-yellow-50 hover:bg-yellow-300 rounded shadow-md border-1 border-black text-left"
                        @click="toggleInfo(e.id)">
                        <i class="fa-solid fa-circle-notch h-6 w-6" style="color:grey"></i>
                        <h2 class="py-2 font-bold text-gray-800 lg:text-xs md:text-md">{{ e.smallDescription }}</h2>
                    </div>
                    <div v-show="showInfo.get(e.id)">
                        <div class="px-6 py-3 bg-yellow-200 rounded shadow-md border-t border-gray-300 text-gray-600">
                            <p class="text-black"><span class="font-bold">Weight: </span>{{ e.weight }}</p>
                            <p class="italic pt-2">
                                <span v-if="e.fullExplanation">
                                    {{ e.fullExplanation }}
                                </span>
                                <span v-else>
                                    None
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const elements = ref([])
        const showInfo = ref(new Map())

        const fetchElements = async () => {
            await axios
                .get(`/api/elements/`)
                .then((res) => {
                    elements.value = res.data
                    elements.value = elements.value.sort((a, b) => b.weight - a.weight)
                })
                .finally(() => {
                    for (const e of elements.value) {
                        showInfo.value.set(e.id, false)
                    }
                })
        }
        const toggleInfo = (instance) => {
            showInfo.value.set(instance, !showInfo.value.get(instance))
            console.log(instance, showInfo.value.get(instance))
        }
        fetchElements()
        return { elements, showInfo, toggleInfo }



    }
}

</script>
<style>

</style>