import { defineStore } from "pinia";
import { AccountData } from "../entities/AccountData";
import { ref } from "vue";

const useAppStore = defineStore("appStore", () => {
  const accountDataByAccountId = ref(new Map<number, AccountData>())

  accountDataByAccountId.value.set(1, {
    id: 1,
    mark: [
      { text: "YYY" },
      { text: "XXX" },
      { text: "YYY" },
    ],
    accountType: "LDAP",
    login: "Sergei",
    password: null
  })

  accountDataByAccountId.value.set(2, {
    id: 2,
    mark: [],
    accountType: "local",
    login: "User",
    password: "Password"
  })

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
    updateAccountData
  }
})

export default useAppStore
