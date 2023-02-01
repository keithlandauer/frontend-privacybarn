<template>
    <div class="w-72 m-8">
        <Listbox v-model="tablePolicies" multiple>
            <div class="relative mt-1">
                <ListboxLabel class="font-bold">Choose Policies to Compare</ListboxLabel>
                <ListboxButton
                    class="relative w-full h-10 cursor-default rounded-lg bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span v-if="tablePolicies" class="block truncate text-custom-cyan">
                        {{ tablePolicies.map((t) => t.name).join(', ') }}</span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-custom-cyan" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions
                        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-slot="{ active, selected }" v-for="p in policies" :key="p.name" :value="p"
                            as="template">
                            <li :class="[
                                active ? 'bg-custom-cyan text-gray-50' : 'text-gray-50',
                                'relative cursor-pointer select-none py-2 pl-10 pr-4 duration-200',
                            ]">
                                <span :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate',
                                ]">{{ p.name }}</span>
                                <span v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
    <div class="m-8 flex flex-col">
        <div class="sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden rounded-lg">
                    <table class="table-fixed">
                        <thead class="border-b">
                            <tr class="bg-gray-900">
                                <th scope="col" class="text-sm font-medium px-4 py-4 text-left text-custom-cyan">
                                    Elements
                                </th>
                                <th v-for="t in tablePolicies" :key="t.id" scope="col"
                                    class="text-sm font-medium px-4 py-4 text-left text-custom-cyan">
                                    {{ t.name }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in elements" :key="e.id" class="bg-gray-800 border-b">
                                <td v-if="e.weight > 0" class="px-6 py-4 text-sm font-medium text-green-300">
                                    {{ e.smallDescription }}
                                </td>
                                <td v-else-if="e.weight < 0" class="px-6 py-4 text-sm font-medium text-red-300">
                                    {{ e.smallDescription }}
                                </td>
                                <td v-else class="px-6 py-4 text-sm font-medium text-yellow-300">
                                    {{ e.smallDescription }}
                                </td>
                                <td v-for="t in tablePolicies" :key="t.id" class="px-6 py-4 text-sm font-medium">
                                    <span v-if="determinePresent(e, t)">
                                        <CheckIcon class="h-5 w-5 text-green-500" />
                                    </span>
                                    <span v-else>
                                        <XMarkIcon class="h-5 w-5 text-red-500" />
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxLabel } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from "@heroicons/vue/24/outline"

const elements = ref([])
const policies = ref([])
const flags = ref([])
//map with true/false array
const tablePolicies = ref([])
const fetchInitial = async () => {
    try {
        const res = await axios.get(`/api/elements/`);
        elements.value = res.data;
        //sort by good to bad 
        elements.value = elements.value.sort((a, b) => b.weight - a.weight);
    } catch (error) {
        console.error("Element Error: ", error);
    }
    try {
        const res0 = await axios.get(`/api/policy/`);
        policies.value = res0.data
        policies.value = policies.value.sort((a, b) => b.name - a.name)
    } catch (error) {
        console.error("Policy Error: ", error);
    }
    try {
        const res1 = await axios.get(`/api/element-flags/`);
        flags.value = res1.data;
    } catch (error) {
        console.error("Element Flag Error: ", error)
    }
}
/**
 * Get policy in column and determine if flag found for the element. 
 * @param *element 
 * @param *tablePolicy 
 */
const determinePresent = (element, tablePolicy) => {
    console.log("Element", element)
    let filteredFlags = flags.value.filter(f => f.policy == tablePolicy.id)
    console.log("TEST", filteredFlags[0].element.id)
    for (const f of filteredFlags) {
        if (f.element.id == element.id) {
            return true
        }
    }
    return false
}
fetchInitial()
</script>