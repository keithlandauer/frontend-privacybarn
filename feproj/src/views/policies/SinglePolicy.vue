<template>
    <div class="container-md text-center">
        <div v-if="policy">
            <p class="text-5xl font-bold py-3">
                {{ policy.name }}
            </p>
            <a :href=policy.link
                class="btn border-2 shadow text-gray-800 border-custom-cyan hover:bg-custom-cyan hover:scale-125 hover:text-white transition ease-in-out duration-500 rounded-full ">View
                Policy</a>
            <p class="text-sm py-3 text-gray-400">Date: {{ policy.date }}</p>
        </div>
    </div>
    <div class="mx-8 flex flex-col">
        <div id="topOfTable" class="py-2 inline-block min-w-full">
            <div class="overflow-hidden rounded-lg">
                <table class="table-fixed border-3 border-gray-800 mx-auto">
                    <thead>
                        <th
                            class="h-14 font-bold border-b-2 border-gray-800 text-black text-2xl text-center bg-custom-cyan">
                            Found
                            Elements</th>
                    </thead>
                    <tbody>
                        <tr v-for="[key, value] in createElementMap" :key="key">
                            <td v-if="value.weight < 0"
                                class="border-b-2 bg-red-100 border-red-200 hover:bg-red-200 transition ease-in-out duration-300">
                                <a href="#flagText"
                                    class="btn btn-default btn-lg float-left mb-3 text-base text-justify"
                                    @click="setShowInfo(value)">
                                    <p class="font-bold p-4">{{ value.smallDescription }}</p>
                                </a>
                            </td>
                            <td v-else-if="value.weight > 0"
                                class="border-b-2 bg-green-100 border-green-200 hover:bg-green-200 transition ease-in-out duration-300">
                                <a href="#flagText"
                                    class="btn btn-default btn-lg float-left mb-3 text-base text-justify"
                                    @click="setShowInfo(value)">
                                    <p class="font-bold p-4">{{ value.smallDescription }}</p>
                                </a>
                            </td>
                            <td v-else
                                class="border-b-2 bg-yellow-100 border-yellow-200 hover:bg-yellow-200 transition ease-in-out duration-300">
                                <a href="#flagText"
                                    class="btn btn-default btn-lg float-left mb-3 text-base text-justify"
                                    @click="setShowInfo(value)">
                                    <p class="font-bold p-4">{{ value.smallDescription }}</p>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div id="flagText" v-if="showInfo['show']">
        <a href="#topOfTable" class="btn btn-default btn-lg mx-3" @click="showInfo['show'] = !showInfo['show']">
            <i class="fa-solid fa-circle-xmark"></i>
        </a>
        <FlagInfo :transferFlags="showInfo['flag']" />
    </div>
    <div class="mx-8 my-3 font-serif break-words whitespace-pre">{{ policy.fullText }}</div>
</template>

<script>
import axios from "axios"
import { ref, computed, watchEffect } from "vue"
import { useRoute } from "vue-router"
import FlagInfo from './FlagInfo.vue'
export default {
    setup() {
        const route = useRoute();
        const policy = ref(null);
        const elementFlags = ref([]);
        const showInfo = ref({ show: false, flag: null });

        watchEffect(() => {
            console.log("showInfo:", showInfo.value["show"], "////", showInfo.value["flag"]);
        });
        const fetchPolicy = async () => {
            await axios
                .get(`/api/policy/${route.params.slug}`)
                .then((res) => {
                    policy.value = res.data;
                })
                .catch((error) => {
                    console.log("ERROR", error);
                })
                .finally(() => {
                    fetchElementFlags()
                });
        };
        const fetchElementFlags = async () => {
            await axios
                .get(`/api/element-flags/`)
                .then((res) => {
                    elementFlags.value = res.data;
                    elementFlags.value = elementFlags.value.filter(e => e.policy == policy.value.id);
                    elementFlags.value = elementFlags.value.sort((a, b) => b.element.weight - a.element.weight)
                })
                .catch((error) => {
                    console.log("ERROR", error);
                })
                .finally(() => {
                    //nothing
                });
        };
        const createElementMap = computed(() => {
            const filteredFlags = new Map();
            for (const e of elementFlags.value) {
                if (filteredFlags.has(e.element.id)) {
                    continue;
                }
                else {
                    filteredFlags.set(e.element.id, e.element);
                }
            }
            return filteredFlags
        });
        const setShowInfo = (flag) => {
            if (showInfo.value['show'] == true) {
                let temp = elementFlags.value.filter(e => e.element.id == flag.id)
                showInfo.value['flag'] = temp
            } else {
                showInfo.value["show"] = !showInfo.value["show"];
                let temp = elementFlags.value.filter(e => e.element.id == flag.id)
                showInfo.value['flag'] = temp
            }
        };
        fetchPolicy();
        return { policy, elementFlags, createElementMap, showInfo, setShowInfo };
    },
    components: { FlagInfo }
};
</script>
<style>

</style>
