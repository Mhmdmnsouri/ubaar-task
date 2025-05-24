<template>
    <div class="address-list-page">
        <div v-if="isLoading" class="loader-wrapper">
            <Loader />
        </div>

        <div v-else-if="hasError" class="error-wrapper">
            <ErrorIcon />
            <p class="error-message">خطا در دریافت آدرس‌ها</p>
            <UiButton @click="loadAddresses" class="primary">تلاش دوباره</UiButton>
        </div>

        <div v-else>
            <h2 class="page-title">آدرس ها و مشخصات</h2>
            <section class="address-list">
                <article v-for="address in addresses" :key="address.id" class="address-card" aria-label="اطلاعات آدرس">
                    <label>نام<span>{{ address.first_name }}</span></label>
                    <label>نام خانوادگی<span>{{ address.last_name }}</span></label>
                    <label>شماره همراه<span>{{ address.coordinate_mobile }}</span></label>
                    <label>شماره تلفن ثابت<span>{{ address.coordinate_phone_number || '-' }}</span></label>
                    <label>جنسیت<span>{{ address.gender === 'male' ? 'آقا' : 'خانم' }}</span></label>
                    <label>آدرس<span class="truncate-address">{{ address.address }}</span></label>
                </article>
            </section>
        </div>

        <Toast :message="toastMessage" :visible="toastVisible" @close="hideToast" />
    </div>
</template>



<script setup>
import { onMounted, ref } from 'vue'
import { fetchAddressList } from '@/services/address'
import Toast from '@/components/ui/Toast.vue'
import Loader from '@/assets/icons/loader.vue'
import UiButton from '@/components/ui/button.vue'
import ErrorIcon from '@/assets/icons/Error.vue'

const addresses = ref([])
const isLoading = ref(true)
const hasError = ref(false)

const toastMessage = ref('')
const toastVisible = ref(false)

const showToast = (message) => {
    toastMessage.value = message
    toastVisible.value = true
}

const hideToast = () => {
    toastVisible.value = false
}

const loadAddresses = async () => {
    isLoading.value = true
    hasError.value = false

    try {
        const { data } = await fetchAddressList()
        addresses.value = data
    } catch (err) {
        hasError.value = true
        showToast('خطا در دریافت آدرس‌ها. لطفا مجدد تلاش کنید.')
    } finally {
        isLoading.value = false
    }
}

onMounted(loadAddresses)
</script>


<style scoped>
.address-list-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    background-color: var(--color-background);
}

.loader-wrapper {
    height: calc(100vh - 220px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader-wrapper svg {
    width: 65px;
    height: 65px;
    color: var(--color-primary);
}

.page-title {
    font-size: 16px;
    color: var(--color-secondary);
    margin-bottom: 10px;
}

.address-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.error-wrapper {
    height: calc(100vh - 220px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--color-error);
}

.error-wrapper svg {
    color: var(--color-error);
}

.error-message {
    font-size: 16px;
    font-weight: 500;
}


.address-card {
    display: grid;
    background-color: #fff;
    padding: 16px;
    border-radius: var(--radius-xs);
    box-shadow: 0px 0px 16px 0px #00000014;
    font-size: 13.5px;
    color: var(--color-text-dark);
    gap: 30px 20px;
}

.address-card label {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    color: var(--color-label);
}

.address-card label:last-of-type {
    border-top: 1px solid var(--color-border);
    flex-direction: column;
    gap: 8px;
    padding-top: 20px;
}

.address-card label span {
    color: var(--color-secondary);
}

.truncate-address {
    word-break: break-word;
}

@media (min-width: 768px) {
    .address-card {
        grid-template-columns: repeat(3, 1fr);
    }

    .address-card label {
        flex-direction: column;
        gap: 16px;
    }

    .address-card {
        font-size: 13px;
    }

    .address-card label:last-of-type {
        padding-top: 0;
        border: none;
    }
}
</style>
