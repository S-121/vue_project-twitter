<template>
  <div>
    <div v-for="(item, index) in items"  :key="index">
      <div class="px-6 py-2">
        <div>
          {{ $t('report time') }}: <span>{{ parseDate(item.RTime) }}</span>
        </div>
        <div>
          {{ $t('report reason') }}: <span>{{ item.RReason }}</span>
        </div>
        <div>
          {{ $t('report post') }}: <span><a :href="`/postlist?pid=${item.Post.T}`">{{ item.Post.Tw }}</a></span>
        </div>
        <div v-if="item.Punish.length">
          {{ $t('feedback') }}: <span style="font-weight: bold; color: firebrick">{{ item.Punish }}</span>
        </div>
        <div v-if="item.Punish.length">
          Account Freeze to{{ $t('account Freeze to') }}: <span>{{ parseDate(item.FreezeTo) }}</span>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'ReportList',
  props: {
    items: Array,
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  watch: {

  },
  computed: {
  },
  methods: {
    parseDate(timestamp) {
      return format(new Date(timestamp * 1000), 'h:mm, d LLL yyyy')
    }
  }
}
</script>
