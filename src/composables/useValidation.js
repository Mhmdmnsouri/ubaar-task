// src/composables/useValidation.js
import { reactive } from "vue";

export function useAddressValidation() {
  const errors = reactive({});

  function validate(form) {
    Object.keys(errors).forEach((key) => delete errors[key]);

    if (!form.firstName || form.firstName.trim().length < 3) {
      errors.firstName = "حداقل ۳ حرف وارد کنید.";
    }
    if (!form.lastName || form.lastName.trim().length < 3) {
      errors.lastName = "حداقل ۳ حرف وارد کنید.";
    }
    if (!/^\d{11}$/.test(form.mobile)) {
      errors.mobile = "فرمت تلفن همراه باید ۱۱ عدد باشد.";
    }
    if (form.landline && !/^\d{11}$/.test(form.landline)) {
      errors.landline = "فرمت تلفن ثابت باید ۱۱ عدد باشد.";
    }
    if (!form.address || form.address.trim().length < 10) {
      errors.address = "حداقل ۱۰ حرف وارد کنید.";
    }
    if (!["male", "female"].includes(form.gender)) {
      errors.gender = "یک گزینه را انتخاب کنید.";
    }

    return Object.keys(errors).length === 0;
  }

  return { errors, validate };
}
