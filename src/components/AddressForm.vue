<template>
    <div class="address-form-container">
        <h2 class="form-title">لطفا مشخصات و آدرس خود را وارد کنید</h2>
        <form @submit.prevent="onSubmit" class="address-form">
            <div v-for="field in fields" :key="field.model" class="form-group"
                :class="{ 'col-span-2': field.model === 'address' }">
                <label :for="field.model" class="form-label">
                    {{ field.label }}
                    <span v-if="field.optional" class="optional-label">(اختیاری)</span>
                </label>
                <div class="input-wrapper">
                    <input :id="field.model" v-model="form[field.model]" :type="field.type"
                        :placeholder="field.placeholder" :class="{ 'has-error': errors[field.model] }" />
                    <button v-if="form[field.model]" type="button" class="clear-btn" @click="form[field.model] = ''"
                        aria-label="پاک کردن">
                        <CloseIcon />
                    </button>
                </div>
                <p v-if="errors[field.model]" class="error-message">
                    {{ errors[field.model] }}
                </p>
            </div>

            <div>
                <div class="radio-group">
                    <label class="radio-label">جنسیت</label>
                    <div class="radio-items">
                        <label class="radio">
                            <input type="radio" value="female" v-model="form.gender" />
                            خانم
                        </label>
                        <label class="radio">
                            <input type="radio" value="male" v-model="form.gender" />
                            آقا
                        </label>
                    </div>
                </div>
                <p v-if="errors.gender" class="error-message">{{ errors.gender }}</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAddressValidation } from '@/composables/useValidation'
import CloseIcon from '@/assets/icons/Close.vue'

const emit = defineEmits(['next-step'])
function submitForm() {
    if (onSubmit()) emit('next-step', { ...form })
}
defineExpose({ submitForm })

const form = reactive({
    firstName: '',
    lastName: '',
    mobile: '',
    landline: '',
    address: '',
    gender: '',
})

const { errors, validate } = useAddressValidation()

const fields = [
    { model: 'firstName', label: 'نام', placeholder: 'مثال: محمد', type: 'text' },
    { model: 'lastName', label: 'نام خانوادگی', placeholder: 'مثال: رضایی', type: 'text' },
    { model: 'mobile', label: 'شماره تلفن همراه', placeholder: '۰۹۱۲۱۲۳۴۵۶۸۷', type: 'tel' },
    { model: 'landline', label: 'شماره تلفن ثابت', placeholder: '۰۲۱۴۴۲۵۶۷۸۰', type: 'tel', optional: true },
    { model: 'address', label: 'آدرس', placeholder: '', type: 'text' },
]

function onSubmit() {
    return validate(form)
}
</script>

<style scoped>
.address-form-container {
    border-radius: var(--radius-xs);
    background-color: #fff;
    border: 1px solid #edf0f2;
    padding: 12px;
    padding-bottom: 20px;
}

.form-title {
    margin: 0;
    font-size: 12.5px;
    margin-bottom: 12px;
    color: var(--color-secondary);
}

.address-form {
    display: grid;
    gap: 24px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-label {
    font-size: 12.5px;
    margin-bottom: 8px;
    color: var(--color-secondary);
}

.optional-label {
    font-size: 12.5px;
    color: var(--color-muted);
    margin-left: 4px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper input {
    width: 100%;
    padding: 12px 8px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    font-size: 12.5px;
    color: var(--color-text-dark);
    font-family: var(--font-primary);
}

.input-wrapper input:focus {
    border-color: var(--color-primary);
    outline: none;
}

.input-wrapper input.has-error {
    border-color: var(--color-error);
}

.input-wrapper input::placeholder {
    color: var(--color-placeholder);
    opacity: 1;
}

.clear-btn {
    position: absolute;
    left: 8px;
    top: 12px;
    background: none;
    border: none;
    color: var(--color-muted);
    font-size: 16px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.clear-btn:hover {
    color: var(--color-error);
}

.form-group input[type='tel'] {
    text-align: end;
}

.radio-group {
    display: flex;
    font-size: 12.5px;
    color: var(--color-secondary);
}

.radio-label {
    width: 120px;
}

.radio-items {
    display: flex;
    gap: 50px;
}

.radio {
    display: flex !important;
    align-items: start;
    gap: 2px;
}

.radio input {
    scale: 1.2;
    accent-color: #0da490;
}

.error-message {
    margin: 0;
    margin-top: 2px;
    font-size: 10px;
    color: var(--color-error);
}

@media (min-width: 768px) {
    .address-form-container {
        padding: 20px 40px;
    }

    .form-title {
        font-size: 16px;
        margin-bottom: 30px;
    }

    .address-form {
        grid-template-columns: repeat(3, 1fr);
        gap: 42px 24px;
    }

    .form-label,
    .optional-label,
    .radio-group {
        font-size: 14px;
    }


    .col-span-2 {
        grid-column: span 2;
    }
}
</style>
