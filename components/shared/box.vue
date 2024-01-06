<template>
    <v-list-item :disabled="disable" :to="to" class="mb-3 rounded-lg  border rtl">
    
        <template v-slot:prepend>
            <v-avatar size="x-large" rounded="lg" :color="color">
                <v-icon color="auto"> fad {{ icon }}</v-icon>
            </v-avatar>
        </template>
        <template v-slot:title>
            <div class="font-weight-bold">
                {{ title }}
            </div>
        </template>

        <template v-slot:append>
            <v-btn v-if="read == true" color="green" append-icon="fal fa-check" size="x-small" variant="flat"> خوانده شده</v-btn>
            <v-btn v-else color="grey-lighten-1" size="x-small" variant="outlined"> خوانده نشده</v-btn>
        </template>
    </v-list-item>
</template>

<script>
export default {
    props: ["color", "icon", "title","to","read","disable"]
}

</script>