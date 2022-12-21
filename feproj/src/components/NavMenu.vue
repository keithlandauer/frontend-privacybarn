<!-- eslint-disable no-unused-vars -->
<template>
    <nav>
        <Disclosure as="nav" class="bg-gray-800 relative w-full overflow-hidden" v-slot="{ open }">
            <div class="max-w-full mx-auto font-bold">
                <div class="flex justify-between">
                    <div class="flex space-x-4 items-center text-gray-50 active:text-custom-cyan cursorpointer">
                        <!-- logo -->
                        <router-link to="/"
                            class="flex items-center p-4 hover:text-custom-cyan hover:scale-125 duration-200 mr-4">
                            <img class="h-8 w-8 mx-2 rounded-full shrink-0" src="./../assets/barn.png"
                                alt="Privacy Barn" />
                            <span class="font-extrabold">Privacy Barn</span>
                        </router-link>


                        <!-- primary nav -->
                        <div class="hidden md:flex items-center space-x-6 text-gray-50 active:text-custom-cyan">
                            <router-link class="hover:text-custom-cyan hover:scale-125 duration-200 whitespace-nowrap"
                                v-for="item in navigation" :key="item.name" :to="item.href">{{ item.name }}
                            </router-link>
                        </div>
                    </div>
                    <!-- secondary nav -->
                    <div class="hidden md:flex items-center space-x-3 p-4 cursor-pointer whitespace-nowrap ">
                        <p class="px-3 text-gray-50 hover:scale-125 hover:text-custom-cyan duration-200">Login</p>
                        <p
                            class="px-3 bg-custom-cyan rounded text-cyan-700 hover:scale-125 hover:bg-yellow-200 duration-200">
                            Sign Up</p>
                    </div>
                    <!-- mobile button-->
                    <DisclosureButton class="flex md:hidden justify-center rounded-md hover:scale-125 duration-200">
                        <Bars3Icon v-if="!open" class="h-6 w-6 mx-2" />
                        <XMarkIcon v-else class="h-6 w-6 mx-2" />
                    </DisclosureButton>
                </div>
            </div>
            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 px-2 pt-2 pb-3">
                    <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                        class= "flex flex-col items-start px-4 py-2 rounded-md font-bold text-gray-200 cursor-pointer hover:text-custom-cyan hover:bg-gray-700 duration-200">
                        <span class="hover:scale-125 duration-200"> {{ item.name }}</span>
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </nav>
</template>
  
<script setup>
// eslint-disable-next-line no-unused-vars
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue"
// eslint-disable-next-line no-unused-vars
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline"

const navigation = [

    { name: 'About', href: '/about', current: false },
    { name: 'Policies', href: '/view-policies', current: false },
    { name: 'New Policy', href: '/submit', current: false },
    { name: 'View Elements', href: '/elements', current: false },
    { name: 'Compare', href: '/compare', current: false }
]
</script>
<style>
router-link {
    list-style: none;
    list-style: none;
    text-align: center;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
}

a:active {
    color: #67E9FF
}
</style>