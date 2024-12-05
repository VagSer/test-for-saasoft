import { defineStore } from "pinia"
import { AccountData } from "../entities/AccountData"
import { ref } from "vue"

const useAppStore = defineStore("appStore", () => {
  const accountDataByAccountId = ref(new Map<number, AccountData>())

  const saveAccountDataByAccountId = () => {
    localStorage.setItem("accountDataByAccountId", JSON.stringify(Array.from(accountDataByAccountId.value.entries())))
  }

  const restoreAccountDataByAccountId = () => {
    const savedAccountDataByAccountId = localStorage.getItem("accountDataByAccountId")
    if (savedAccountDataByAccountId === null) return

    accountDataByAccountId.value = new Map<number, AccountData>(JSON.parse(savedAccountDataByAccountId))
  }

  restoreAccountDataByAccountId()

  const addAccountData = () => {
    const updatedAccountDataById = new Map<number, AccountData>(accountDataByAccountId.value)
    updatedAccountDataById.set(Date.now(), {
      id: Date.now(),
      mark: [],
      accountType: "LDAP",
      login: "",
      password: null
    })
    accountDataByAccountId.value = updatedAccountDataById
  }

  const deleteAccountData = (id: number) => {
    const updatedAccountDataById = new Map<number, AccountData>(accountDataByAccountId.value)
    updatedAccountDataById.delete(id)
    accountDataByAccountId.value = updatedAccountDataById
  }

  const updateAccountData = ({
    id,
    updatedAccountData: newAccountData
  }: {
    readonly id: number
    readonly updatedAccountData: AccountData
  }) => {
    const updatedAccountDataById = new Map<number, AccountData>(accountDataByAccountId.value)
    updatedAccountDataById.set(id, newAccountData)
    accountDataByAccountId.value = updatedAccountDataById
  }

  return {
    accountDataByAccountId,
    addAccountData,
    deleteAccountData,
    updateAccountData,
    saveAccountDataByAccountId
  }
})

export default useAppStore
