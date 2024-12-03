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

const updateAccountDataFromComponent = () => {
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
}

const calculateInitFormAccountDataMarkInputValue = () => {
  let initValue = ""
  formAccountData.mark.forEach((mark) => {
    initValue += `${mark.text}; `
  })
  return initValue
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
        v-model="formAccountDataMarkInputValue"
        @blur="updateAccountDataFromComponent"
      />
    </td>
    <td>
      <Select
        v-model="formAccountData.accountType" 
        :options="accountTypeSelectPickerOptions"
        style="width: 100%;"
        @change="updateAccountDataFromComponent"
      />
    </td>
    <td :colspan="calculateLoginColspan()">
      <InputText
        type="text"
        inputmode="text"
        autocomplete="new-password"
        v-model="formAccountData.login"
        @blur="updateAccountDataFromComponent"
      />
    </td>
    <td v-if="calculateHaveToShowPasswordInput()">
      <Password
        inputmode="text"
        autocomplete="new-password" 
        v-model="formAccountData.password" :feedback="false"
        toggleMask
        @blur="updateAccountDataFromComponent"
      />
    </td>
    <td>
      <Button
        icon="pi pi-times"
        severity="danger"
        aria-label="Delete accountData"
        @click="appStore.deleteAccountData(formAccountData.id)"
      />
    </td>
  </tr>
</template>

<style scoped>
input {
  width: 100%;
}
</style>