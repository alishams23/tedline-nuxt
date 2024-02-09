<template>
    <div>

        <v-card class=" rounded-xl   text-right" :color="color ? color : 'auto'" rounded="xl" elevation="0">
            <v-card :ripple="false" class=" pa-0  " color="transparent" elevation="0" :to="'/blog/' + data.id">

                <div>
                    <v-img class=" align-end rounded-xl  text-auto  " :aspect-ratio="1 / 1"
                        :src="data.imageBlog.photo" cover>
                        <div class="h-100  w-100 rounded-xl d-flex align-end">
                            <div class="bg-gradient-glass2 pt-16 py-md-5 w-100 ">
                                <v-container>
                                    <div  class=' text-body-2 test-n text-white text-md-body-1 font-weight-black irsa rtl  '>
                                        {{ data.title }}
                                    </div>
                                </v-container>
                            </div>
                        </div>
                    </v-img>
                </div>
               
            </v-card>
        </v-card>
    </div>
</template>
<script>
import { IconClockFilled } from '@tabler/icons-vue';
export default {
    props: ["data", "width", "detail", "color"],
    components: { IconClockFilled, },
    data: () => ({
        show: false,
    }),
}
</script>
<style>
.test-n {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}</style>