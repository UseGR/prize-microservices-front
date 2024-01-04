<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-11 self-center">
          <div class="text-h5 text-weight-bold text-center">Обновление лота</div>
        </div>
        <div class="col-1 self-center">
          <div class="text-h5 text-weight-bold text-center">
            <q-btn flat round icon="dark_mode" @click="$q.dark.toggle()"/>
          </div>
        </div>
      </div>
    </div>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
    >
      <q-input
          filled
          v-model="adminDescription"
          label="Описание для администратора *"
          hint="Описание для администратора"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Введи описание для администратора']"
      />

      <q-input
          filled
          v-model="winnerDescription"
          label="Описание для победителя *"
          hint="Описание для победителя"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Введи описание для победителя']"
      />

      <div class="flex wrap justify-center q-px-*">
        <q-btn label="Сохранить" type="submit" color="primary"/>
        <q-btn label="Сбросить" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>

  </div>
</template>

<script>
import {useQuasar} from 'quasar'
import {ref, onMounted} from 'vue'
import axios from "axios";
import {useRoute} from "vue-router";

const api_url = import.meta.env.VITE_API

export default {
  setup() {
    const $q = useQuasar()
    const adminDescription = ref(null)
    const winnerDescription = ref(null)
    const id = useRoute().params.id;

    onMounted(() => {
      axios.get(`${api_url}/api/v1.0/prizes/${id}`)
          .then(response => {
            const data = response.data;
            adminDescription.value = data.adminDescription
            winnerDescription.value = data.winnerDescription
          })
    })

    return {
      adminDescription,
      winnerDescription,

      onSubmit() {
        console.log();
        axios.post(`${api_url}/api/v1.0/prizes`, {
          id: id,
          adminDescription: adminDescription.value,
          winnerDescription: winnerDescription.value
        })
            .then(() => {
              adminDescription.value = null;
              winnerDescription.value = null;
            })
      },

      onReset() {
        adminDescription.value = null
        winnerDescription.value = null
      }
    }
  }
}
</script>
