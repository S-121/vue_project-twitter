<template>
    <b-row class="row-footer" fluid="">
        <b-col class="mycol">
            <div class="footer">
                版权 © vog.media
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: 'homeFooter',
        data () {
            return {
            }
        }
    }
</script>

<style scoped>
    .row-footer {
        background-color:#F7F7F7;
        height:30px
    }
    .footer {
        background-color: #F7F7F7;
        clear: both;
        text-align: center;
        color: #004085;
        font-size: 11px;
        padding: 0.2rem
    }
</style>
