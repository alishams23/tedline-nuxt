

<template>
    <div>
        <v-list class="pa-6">
            <!---Menu Loop -->
            <div class="d-flex justify-center mt-5">
                <v-avatar color="blue-accent-4" variant="tonal" :size="100">
                    <v-icon :size="29" icon="fad fa-chalkboard-teacher"></v-icon>
                </v-avatar>
            </div>
           
            <div v-for="(item, i) in $store.state.isAuthenticated == true ? sidebarMenuLogin : sidebarMenu">

                <v-list-subheader v-if="item.header" :item="item" :key="item.title" color="grey"
                    class="  smallCap text-xs mt-10 font-weight-bold justify-end   ">{{ item.header }}</v-list-subheader>

                <v-list-item v-if="!item.header" variant="flat"  :to="item.to" class="leftPadding px-7  custom-rounded-1 mb-1" color="blue-accent-4">
                    <template v-slot:prepend="{ isActive }">
                        <v-icon :icon="isActive ? 'fa ' + item.icon: 'far ' + item.icon" :size="15"></v-icon>
                    </template>


                    <v-list-item-title class=" text-right  rtl text-body-2 font-weight-bold  irsa  ">{{ item.title
                    }}</v-list-item-title>

                </v-list-item>

            </div>
        </v-list>


    </div>
</template>
<script>

export default {

    data: () => ({

        sidebarMenu: [
            { header: 'عمومی' },
            {
                title: 'خانه',
                icon: "fa-home",
                to: '/'
            },
            {
                title: 'وبلاگ',
                icon: "fa-book",
                to: '/blog/'
            },
            {
                title: 'ارتباط با ما',
                icon: "fa-comments-alt",
                to: '/contactUs'
            },
            {
                title: ' دوره ها',
                icon: "fa-photo-video",
                to: '/explore/'
            },
            {
                title: 'قوانین',
                icon: "fa-shield-check",
                to: '/terms/'
            },
            { header: 'کاربر' },
            {
                title: 'ورود',
                icon: "fa-sign-in",
                to: '/auth/signIn/'
            },
            {
                title: 'ثبت نام',
                icon: "fa-sign-in",
                to: '/auth/signUp/'
            },


        ],
        sidebarMenuLogin: [
            { header: 'عمومی' },
            {
                title: 'خانه',
                icon: "fa-home",
                to: '/home'
            },
            {
                title: 'وبلاگ',
                icon: "fa-book",
                to: '/blog/'
            },
            {
                title: 'ارتباط با ما',
                icon: "fa-comments-alt",
                to: '/contactUs'
            },
            {
                title: ' دوره ها',
                icon: "fa-photo-video",
                to: '/explore/'
            },
            {
                title: 'قوانین',
                icon: "fa-shield-check",
                to: '/terms/'
            },
            { header: 'کاربر' },
            {
                title: 'خروج',
                icon: "fa-sign-out",
                to: '/auth/logout/'
            },
          


        ]
    }),
}
</script>
