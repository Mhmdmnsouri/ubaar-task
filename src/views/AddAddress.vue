<template>
    <div class="add-address-page" :class="{ 'is-form': step === 1 }">
        <h2 class="page-title" v-if="step === 1">ثبت آدرس</h2>

        <div class="content-container">

            <AddressForm v-show="step === 1" ref="addressFormRef" @next-step="onFormNext" />
            <div class="map-header" v-if="step === 2">
                <RightIcon class="back-btn" @click="onBackToForm" />
                <h2 class="page-title">انتخاب آدرس</h2>
            </div>
            <MapPicker v-if="step === 2" @location-selected="onLocationSelected" @back="onBackToForm" />

            <Success v-if="step === 3" />
        </div>

        <Toast :message="toastMessage" :visible="toastVisible" @close="hideToast" />


        <div v-if="step !== 3" class="fixed-button-bar">
            <UiButton @click="onSubmit" :loading="isLoading" color="primary">
                ثبت و ادامه
            </UiButton>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AddressForm from '@/components/AddressForm.vue'
import MapPicker from '@/components/MapPicker.vue'
import Success from '@/components/Success.vue'
import UiButton from '@/components/ui/Button.vue'
import Toast from '@/components/ui/Toast.vue'
import RightIcon from '@/assets/icons/Right.vue'

import { createAddress } from '@/services/address'

const router = useRouter()

const step = ref(1)
const isLoading = ref(false)
const formData = ref(null)
const location = ref(null)

const addressFormRef = ref(null)

const toastMessage = ref('')
const toastVisible = ref(false)

const showToast = (message) => {
    toastMessage.value = message
    toastVisible.value = true
}

const hideToast = () => {
    toastVisible.value = false
}

const onFormNext = (data) => {
    formData.value = data
    step.value = 2
}

const onLocationSelected = (latLng) => {
    location.value = latLng
}

const onBackToForm = () => {
    step.value = 1
}

const onSubmit = async () => {
    if (isLoading.value) return

    if (step.value === 1) {
        addressFormRef.value?.submitForm()
        return
    }

    if (step.value === 2 && !location.value) {
        showToast('لطفاً ابتدا موقعیت را روی نقشه انتخاب کنید.')
        return
    }

    isLoading.value = true
    try {
        const payload = {
            ...formData.value,
            lat: location.value.lat,
            lng: location.value.lng
        }
        await createAddress(payload)
        step.value = 3
    } catch (error) {
        console.error(error)
        showToast('خطا در ثبت نهایی آدرس. لطفاً دوباره تلاش کنید.')
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.is-form {
    padding: 16px;
}

.add-address-page {
    height: calc(100vh - 250px);
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: var(--color-background);
    position: relative;
}

.page-title {
    font-size: 16px;
    color: var(--color-secondary);
    margin-bottom: 10px;
}

.map-header {
    display: none;
}

.content-container {
    display: flex;
    flex-direction: column;
}

.fixed-button-bar {
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 12px 16px;
    z-index: 100;
    box-shadow: 0px -1px 6px 0px #00000026;
}

.fixed-button-bar button {
    width: 100%;
}

.back-btn {
    cursor: pointer;
    margin-top: 3px;
    transition: all .2s;
}

.back-btn:hover {
    transform: translateX(5px);
}

@media (min-width: 768px) {
    .add-address-page {
        justify-content: center;
        max-width: 700px;

    }

    .fixed-button-bar button {
        width: 224px;
    }

    .map-header {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

@media (min-width: 992px) {
    .add-address-page {
        justify-content: center;
        max-width: 900px;

    }
}
</style>
