<template>
    <div class="submit container-sm mx-auto px-10 py-3">
        <form @keydown.prevent.enter @submit.prevent @submit="handleSubmit">
            <div>
                <label for="text" class="flex text-sm font-medium text-gray-700 py-3 justify-center">Name of
                    Service</label>
                <div class="mt-1 flex justify-center">
                    <input type="text" name="text" id="text" required v-model=form.name
                        class="xl:w-96 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Facebook, Twitter, Instagram, etc." />
                </div>
            </div>
            <div>
                <label for="text" class="flex justify-center text-sm font-medium text-gray-700 py-3">Link</label>
                <div class="mt-1 flex justify-center">
                    <input type="url" name="link" id="link" required v-model=form.link
                        class="xl:w-96 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://brave.com/privacy/browser/" />
                </div>
            </div>
            <div>
                <label class="mt-1 flex justify-center text-sm font-medium text-gray-700 py-3">Category</label>
                <div class="mt-1 flex justify-center">
                    <select
                        class="xl:w-96 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required v-model=form.category placeholder="Select Category">
                        <option value="Social Media">Social Media</option>
                        <option value="Streaming">Streaming</option>
                        <option value="News">News</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Finance">Finance</option>
                        <option value="Misc">Misc</option>
                    </select>
                </div>
            </div>
            <div>
                <label for="floatingInput" class="flex justify-center text-sm font-medium text-gray-700 py-3">Date of
                    Last
                    Update</label>
                <div class="mt-1 flex justify-center">
                    <input type="date" required v-model=form.date
                        class="xl:w-96 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

                </div>
            </div>
            <div>
                <label for="exampleFormControlTextarea1"
                    class="flex text-sm font-medium text-gray-700 py-3 justify-center">Policy
                    Text</label>
                <div class="mt-1 flex justify-center">
                    <textarea type="text" name="comment" id="comment" required v-model=form.fullText
                        class="min-w-full h-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div class="flex-shrink-0">
                    <button type="submit"
                        class="rounded-md border border-transparent bg-indigo-500 px-4 py-2 sm:text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-indigo-500">
                        Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import axios from 'axios'
export default {
    setup() {
        const router = useRouter()
        const form = ref({
            category:ref(null),
            name:ref(''),
            fullText:ref(''), 
            link:ref(null),
            date:ref(null)
        })
    
   
    const handleSubmit = () => {
            axios.post(`/api/policy/`, form.value)
                .then((res) => {
                    const slugged = slugify(res.data.name)
                    router.push('/view-policies/' + slugged)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                })
        }
    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        return {form, handleSubmit}
    }
}
</script>
<style>
button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}

input[type=date]:invalid::-webkit-datetime-edit {
    color: #999;
}
</style>