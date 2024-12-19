<template>

<v-card class="d-flex mb-6 px-2 py-2 " elevation="0" color="transparent" :to="'/profile/' + data.username" >

    <v-avatar :image="`https://tedline.org/api/account/user_profile_image/${data.username}`" size="48"></v-avatar>
    <div class="mr-3 overflow-hidden">
        <div class="text-overflow">{{ data.first_name }} {{ data.last_name }}</div>
        <p class="font-weight-thin text-overflow text-body-2 text-grey-lighten-1">
            {{ data.username }}
        </p>
    </div>
</v-card>

</template>

<script setup>
  const {data} = defineProps(["data"]);

</script>

