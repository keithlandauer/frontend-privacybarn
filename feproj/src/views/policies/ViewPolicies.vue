
<template>
    <div class="h-screen">
        <p class="text-4xl text-center font-bold my-5">Search or View Policies by Category</p>
        <div v-if="!loading" class="flex flex-col items-center my-5">
            <input type="text" class="
        form-control
        shadow
        block
        w-2/4
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-800
        bg-white bg-clip-padding
        border-1 border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-500 focus:outline-none
      " v-model="search" placeholder="Search Policy..." />
            <div v-if="search" class="block w-2/4 border-b-[1px] border-gray-300 rounded shadow">
                <div v-for="s in filterSearch" :key="s.id">
                    <router-link :to="{ name: 'single-policy', params: { slug: s.slug } }"
                        class="text-gray-800 px-3 py-1.5 hover:text-custom-cyan transition duration-200">
                        {{ s.name }}
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="loading">
        <div class="flex flex-col justify-center items-center mx-auto font-bold text-xl">LOADING....</div>
        </div>
        <div v-else
            class="flex flex-wrap justify-around items-center mx-6 mb-5 cursor-pointer border-1 border-gray-300 rounded shadow h-20 overflow-hidden">
            <div v-for="category in categories" :key="category.valueOf">
                <div
                    class="p-2 text-center md:text-xl sm:text-lg text-xs hover:text-custom-cyan hover:scale-150 transition duration-200 overflow-hidden">
                    <p @mouseover="dropDownPolicies(category)">{{ category }}</p>
                </div>
            </div>
        </div>
        <div v-if="featuredPolicy">
            <div class="flex flex-col justify-center items-center my-3 mx-4 cursor-pointer">
                <ul class="text-gray-800 rounded-lg border-1 shadow border-gray-300 w-2/4 hover:bg-custom-cyan hover:scale-125 transition ease-in-out duration-300"
                    v-for="p in filterPolicies(category)" :key="p.id">
                    <li class="text-center px-6 py-2">
                        <router-link class="hover:text-gray-50"
                            :to="{ name: 'single-policy', params: { slug: p.slug } }">
                            {{ p.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, computed } from 'vue'
import axios from 'axios'
export default {
    setup() {
        const policies = ref([]) // main store of policies
        const categories = ref(['Social Media', 'Streaming', 'News', 'Shopping', 'Finance', 'Misc'])
        const showPolicies = ref(false) // flag for showing category policies
        const featuredPolicy = ref('') // for category of policies being featured
        const search = ref('') // for search function
        const loading = ref(false) // flag to show loading when fetching 

        const fetchPolicies = async () => {
            try {
                loading.value = true;
                const res = await axios.get(`/api/policy/`);
                policies.value = res.data;
                loading.value = false;
            } catch (error) {
                console.error(error)
            }
        }
        /**
         *  Filter policies based on category chosen by user 
         */
        const filterPolicies = () => {
            let matchingPolicies = policies.value.filter(p => p.category == featuredPolicy.value)
            return matchingPolicies
        }
         /**
         * Set category based on user choice(event), toggle whether to show policies 
         * @param *event
         */
        const dropDownPolicies = (event) => {
            if (showPolicies.value && (event == featuredPolicy.value)) {
                showPolicies.value = !showPolicies.value
                featuredPolicy.value = ''
            }
            else if (showPolicies.value) {
                featuredPolicy.value = event
            }
            else {
                showPolicies.value = !showPolicies.value
                featuredPolicy.value = event
            }
        }
        /**
         * Find matches of user search
         */
        const filterSearch = computed(() => {
            return policies.value.filter((p) => {
                return p.name.toLowerCase().match(search.value.toLowerCase())
            })
        })

        fetchPolicies()

        return { filterPolicies, policies, categories, showPolicies, dropDownPolicies, featuredPolicy, filterSearch, search, loading }
    }
}

</script>
<style>
div {
    color: black;
}
</style>