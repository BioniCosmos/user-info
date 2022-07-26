<script setup lang="ts">
import { fetchData } from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const account = ref<string>()
const password = ref<string>()
const router = useRouter()
if (sessionStorage.getItem('account') !== null) {
    router.replace(`/user`)
}

async function login() {
    try {
        await fetchData('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account.value,
                password: password.value,
            }),
        })
        router.push(`/user`)
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <div class="container px-6 py-12 mx-auto">
        <div class="flex justify-center items-center flex-wrap h-full text-gray-800">
            <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <img src="/images/login.svg" class="w-full" />
            </div>
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                <form @submit.prevent="login">
                    <div class="mb-6">
                        <input type="text"
                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="账号" v-model="account" required />
                    </div>
                    <div class="mb-6">
                        <input type="password"
                            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="密码" v-model="password" required />
                    </div>
                    <button type="submit"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                        data-mdb-ripple="true" data-mdb-ripple-color="light">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>
