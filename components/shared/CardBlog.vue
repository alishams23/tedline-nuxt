<template>
    <div>

        <v-card class=" rounded-xl   text-right" :color="color ? color : 'auto'" rounded="xl" elevation="0">
            <v-card :ripple="false" class=" pa-0  " color="transparent" elevation="0" :to="'/blog/' + data.id">

                <div>
                    <v-img  class=" align-end  text-auto bg-grey2 rounded-xl " :aspect-ratio="2 / 1"
                        :src="data.imageBlog.photo" cover>
                      
                    </v-img>
                    <div  class=' pt-5 pb-2 px-3  test-n  text-body-2 font-weight-black irsa rtl  '>
                                        {{ data.title }}
                                    </div>
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
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    height: 62px;
   
}


</style>