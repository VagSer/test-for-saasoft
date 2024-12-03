<script setup lang="ts">
import useAppStore from './stores/AppStore'
import { Message, Button } from 'primevue'
import AccountDataComponent from './components/account-data/AccountDataComponent.vue'

const appStore = useAppStore()
</script>

<template>
  <header class="header">
    <h2>Таблица с данными пользователей</h2>
    <Button
      icon="pi pi-user-plus"
      @click="() => appStore.addAccountData()"
    />
  </header>
  <Message severity="info">
    Для указания нескольких меток для одной пары логин/пароль испольщуйте разделитель ;
  </Message>
  <main class="main">
    <table v-if="appStore.accountDataByAccountId.size > 0">
      <thead>
        
        <tr>
          <th>Метка</th>
          <th>Тип аккаунта</th>
          <th>Логин</th>
          <th>Пароль</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <AccountDataComponent
          v-for="accountData in appStore.accountDataByAccountId.values()"
          :key="accountData.id"
          :account-data="accountData"
        />
      </tbody>
    </table>
    <Message severity="info" v-else>
      Список пользователей пуст
    </Message>
  </main>
</template>

<style scoped></style>
