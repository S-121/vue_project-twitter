<template>
    <div>
        <b-container fluid="" class="bv-example-row">
            <b-row style="background-color:#F7F7F7;height:800px" cols-md="1">
                <b-col cols="3" xl="2" lg="3" style="background-color:#FFFFFF" class="mycol d-none d-lg-block d-xl-block">
                    <videoMenu/>
                </b-col>
                <b-col cols="12" xl="10" lg="9" style="background-color:#F7F7F7" class="mycol">
                    <router-view  :key="$route.fullPath"/>
                </b-col>
            </b-row>
            <!-- <homeFooter></homeFooter> -->
        </b-container>

    </div>
</template>

<script>
    import videoMenu from "../components/video/video_menu"
    export default {
        name: 'VideoLayout',
        components: {videoMenu}
    }
</script>

<style scoped>
    .mycol {
        padding-top: 0.5rem;
        padding-left: 0rem;
        padding-right: 0rem;
        padding-bottom: 0.5rem;
    }

</style>
