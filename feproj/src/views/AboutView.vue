<template>
    <div class="relative bg-white px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div class="absolute inset-0">
        <div class="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div class="relative mx-auto max-w-7xl">
        <div class="text-center bg-custom-cyan py-10 rounded-lg shadow-lg border-black border-2">
          <h2 class="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Disclaimer</h2>
          <p class="mx-auto mt-3 max-w-2xl text-lg text-left text-gray-700 sm:mt-4 px-4">&emsp; First and foremost, this is a
            side project
            created to display the use of VueJS, Django REST Framework, spaCy NLP Library, JavaScript/Python programming
            and more! Results of interpreted privacy policies may vary. The spaCy algorithm assumes the of
            standard boilerplate that most companies utilize when creating privacy policies. Associated text with
            elements
            pulled from privacy policy text should be read to confirm accuracy.</p>
        </div>
        <div class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          <div v-for="post in posts" :key="post.title" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div class="flex flex-1 flex-col justify-between bg-white p-6">
              <div class="flex-1">
                <p class="text-sm font-medium text-custom-cyan">
                  {{ post.category }}
                </p>
                <a :href="post.href" class="mt-2 block">
                  <p class="text-xl font-semibold text-gray-900">{{ post.title }}</p>
                  <p class="mt-3 text-sm text-gray-500">{{ post.description }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
const posts = [


  {
    title: 'Submitting a Policy',
    category: 'Policies',
    description:
      'Provide name of service and link to privacy policy. Category should be chosen based on the main purpose of the service. For example, you can purchase items off of Facebook using the marketplace, but the main purpose is for social media. The date of last update can be found at the beginning or end of the policy. Finally, copy and paste the text of the privacy policy excluding all other web page content if possible.',
  },
  {
    title: 'Find a Policy',
    category: 'Policies',
    description:
      'Policies can be found by name using the search bar or according to category. If a policy you are looking for is not in the database, consider adding it with the "New Policy" feature.',
  },
  {
    title: 'Interpret Policy Information',
    category: 'Policies',
    description:
      'Elements found in the policy can be viewed in the table. They are separated by green (good), yellow (neutral), and red (bad). Press on an element to view the associated text that triggered the algorithm to mark it as found. The full text of the privacy policy can be viewed at the bottom along with a link to the web page at the top.',
  },
  {
    title: 'View Elements',
    category: 'Elements',
    description:
      'There are 30 elements that can be triggered by the NLP algorithm. These elements can be viewed along with a more in-depth description. A weight is also associated with the elements that will be implemented at a later date to give the policy a score.',
  },
  {
    title: 'Compare Policies',
    category: 'Comparisons',
    description:
      "Policies can be compared side-by-side to decide which service best fits your needs. Simply select each policy from the dropdown bar and watch the elements fill with checkmarks and X's.",
  },
  {
    title: 'Creating and Managing Personal Accounts',
    category: 'Accounts',
    description:
      'This feature is not yet implemented. The vision is to give credit to users for uploading and editing (adding elements not found via the algorithm).',
  },
]
</script>