<template>
<div>
<!--  <v-text-field
      class="mx-2 mt-2"
      hide-details
      color="info"
      background-color="grey lighten-2"
      flat
      dense
      solo
      label="Search"
      prepend-inner-icon="ri-search-2-line"
  />-->

  <v-autocomplete

      class="mx-2 mb-0 pt-2"
      elevation='1'
      :menu-props="{
          nudgeBottom: 4 + 'px',
          zIndex: 2,
          rounded: 'sm'      // <-- Here ✅
        }"
      no-filter
      append-icon="ri-search-line"
      :items="items"

      :search-input.sync="search"
      color="info"
      background-color="white lighten-2"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      :label="$t('search')"
      solo
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          {{ $t('search for') }}
          <strong>{{ $t('users') }}</strong>
        </v-list-item-title>
      </v-list-item>
    </template>


    <template v-slot:item="{ item }" >

        <v-list-item-avatar

            class="text-h5 font-weight-light white--text"
            @click.stop="getUserCenter(item)"
        >
          <v-img :src="item.Avatar96 | getFullUrl" :alt="item.DisplayName" :lazy-src="require('../../assets/users/user-d.png')"></v-img>

        </v-list-item-avatar>
        <v-list-item-content @click.stop="getUserCenter(item)">
          <v-list-item-title v-text="item.DisplayName"></v-list-item-title>
          <v-list-item-subtitle class="d-inline-block text-truncate"
                                style="max-width: 150px;" v-text="item.Description"  ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action @click.stop="getUserCenter(item)">
          <v-icon v-if="item.IsGroup > 0" small color="orange">ri-group-fill</v-icon>
        </v-list-item-action>

    </template>
  </v-autocomplete>


</div>
</template>

<script>
import untils from "@/utils/untils";


export default {
  name: "SearchInputCard",
  data () {
    return {
      isLoading: false,
      model: null,
      items: [],
      search: null,
    }
  },
  watch: {
    search (val) {
      // Items have already been loaded

      this.isLoading = true


      this.querySelections(val)

    }

  },

  methods: {


    querySelections (v) {

      console.log('v length: ' + v.length)

      // 2个字符以下使用searchfollow
      if(v.length <= 2) {

        this.api.searchFollow(v).then(response =>{

          // console.log('搜索用户结果:'+ JSON.stringify(response.data['Body']['Result']))

          let data = response.data['Body']

          if(data) {
            this.items = data
          }else{
            this.items = []
          }

        })
            .catch(err => console.log(err))
            .finally(() => (this.isLoading = false))


        // 2-4个字符使用searchuser
      }else if(v.length > 2 && v.length <=4) {

        this.api.getSearchUserAPI(v).then(response =>{

          // console.log('搜索用户结果:'+ JSON.stringify(response.data['Body']['Result']))

          let data = response.data['Body']['Result']

          if(data) {
            this.items = data
          }else{
            this.items = []
          }


        })
            .catch(err => console.log(err))
            .finally(() => (this.isLoading = false))

        // 4个字符以上不调用API
      }else{


      }



    },

    //进入所选用户中心
    getUserCenter: function (user) {

      //跳转到用户中心页面
      this.$router.push({
        path: "/usercenter",
        query: {
          name: user.Username
        }
      })

    },
  },

}
</script>

<style scoped>

</style>
