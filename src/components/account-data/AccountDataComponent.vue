<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AccountData } from '../../entities/AccountData'
import { Select, InputText, Button, Password } from 'primevue'
import useAppStore from '../../stores/AppStore'
import { AccountMark } from '../../entities/AccountMark'

const appStore = useAppStore()

const props = defineProps<{
  accountData: AccountData
}>()

const passwordMaxLength = 100
const loginMaxLength = 100
const markMaxLength = 100

const accountTypeSelectPickerOptions = ref(["local", "LDAP"])
const formAccountData = reactive<AccountData>(props.accountData)

const calculateLoginColspan = () => {
  return props.accountData.accountType === "local" ? 1 : 2
}
const calculateHaveToShowPasswordInput = () => {
  return props.accountData.accountType === "local"
}

const calculateUpdatedMark = () => {
    const separatedMarkInputValue = formAccountDataMarkInputValue.value.split("; ")
  const updatedMark: AccountMark[] = []
  separatedMarkInputValue.forEach((mark) => {
    const text = mark.replace(/\s+/g,' ').trim();
    if (text !== "") {
      updatedMark.push({ text: mark })
    }
  })

  return updatedMark
}

const updateAndSaveAccountDataFromComponent = () => {
  if (
    (formAccountData.accountType === "local" && formAccountData.password?.length === 0) ||
    formAccountData.login.length === 0
  ) return

  const { id, login, password } = formAccountData
  const updatedMark = calculateUpdatedMark()

  if (formAccountData.accountType === "LDAP") {
    appStore.updateAccountData({
      id: formAccountData.id,
      updatedAccountData: {
        id,
        mark: updatedMark,
        login,
        accountType: "LDAP",
        password: null
      }
    })

    appStore.saveAccountDataByAccountId()
    return
  }

  appStore.updateAccountData({
    id: formAccountData.id,
    updatedAccountData: {
      id,
      mark: updatedMark,
      accountType: "local",
      login,
      password
    }
  })

  appStore.saveAccountDataByAccountId()
}

const calculateInitFormAccountDataMarkInputValue = () => {
  let initValue = ""
  formAccountData.mark.forEach((mark) => {
    initValue += `${mark.text}; `
  })
  return initValue
}

const deleteAndSaveAccountDataFromComponent = () => {
  appStore.deleteAccountData(formAccountData.id)
  appStore.saveAccountDataByAccountId()
}

const formAccountDataMarkInputValue = ref(calculateInitFormAccountDataMarkInputValue())
</script>

<template>
  <tr>
    <td>
      <InputText
        type="text"
        inputmode="text"
        autocomplete="new-password"
        :maxlength="markMaxLength"
        v-model="formAccountDataMarkInputValue"
        @blur="updateAndSaveAccountDataFromComponent"
      />
    </td>
    <td>
      <Select
        v-model="formAccountData.accountType" 
        :options="accountTypeSelectPickerOptions"
        style="width: 100%;"
        @change="updateAndSaveAccountDataFromComponent"
      />
    </td>
    <td :colspan="calculateLoginColspan()">
      <InputText
        type="text"
        inputmode="text"
        autocomplete="new-password"
        v-model="formAccountData.login"
        :invalid="!formAccountData.login"
        :maxlength="loginMaxLength"
        :required="true"
        @blur="updateAndSaveAccountDataFromComponent"
      />
    </td>
    <td v-if="calculateHaveToShowPasswordInput()">
      <Password
        inputmode="text"
        autocomplete="new-password" 
        v-model="formAccountData.password" :feedback="false"
        :invalid="!formAccountData.password"
        :required="true"
        :maxlength="passwordMaxLength"
        toggleMask
        @blur="updateAndSaveAccountDataFromComponent"
      />
    </td>
    <td>
      <Button
        icon="pi pi-times"
        severity="danger"
        aria-label="Delete accountData"
        @click="deleteAndSaveAccountDataFromComponent"
      />
    </td>
  </tr>
</template>

<style scoped>
input {
  width: 100%;
}
</style>