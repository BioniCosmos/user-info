<script setup lang="ts">
import { fetchData } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const account = ref('')
const age = ref('')
const router = useRouter()
onMounted(async () => {
    try {
        const data = await fetchData('/api/user')
        account.value = data.account
        age.value = data.age
    } catch (err) {
        const e = err as Error
        if (e.message.slice(0, 3) === '401') {
            sessionStorage.removeItem('account')
            router.replace('/login')
        } else {
            console.error(e)
        }
    }
})
</script>

<template>
    <div class="container mx-auto flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                        <thead class="border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    账号
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    年龄
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ account }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ age }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
