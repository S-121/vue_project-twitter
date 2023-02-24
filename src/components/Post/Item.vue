<template>
<div>
  <div class="item-inner">
    <div class="head">
      <span># {{ source.index }}</span>
      <span>{{ source.name }}</span>
    </div>
    <div class="desc">{{ source.desc }}</div>
  </div>

  <div>
  <div class="mx-4">
    <v-icon small>mdi-repeat</v-icon>
    <label class="font-italic font-weight-light text-caption">
      引用
    </label>
  </div>
  <div  class="c-container comment-container">

    <v-card class="" flat>
      <v-list three-line>
          <v-list-item
          >
            <v-list-item-avatar>
              <v-img :src="require('../../assets/users/user-02.jpg')"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="324"></v-list-item-title>
              <v-list-item-subtitle >
                234234234234234推文内容：测试文本 测试文本 测试文 本测试文本 测试文本 测试文本 测试文本 测试文 本测试文本 测试文本 测试文本 测试文本 测试文 本测试文本 测试文本234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234234223423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423423434234234234234234234234234234234234234234234234234234234234234234234234234234234234234
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-list>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar  color="grey darken-3" size="52">
            <v-avatar size="52">
              <img
                  :src="require('../../assets/users/user-02.jpg')"
                  alt="Zac"
              >
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <label class="mr-1 font-weight-bold">Zac</label>
              <label class="mr-0 font-weight-medium text-caption text--lighten-1 blue-grey--text">@Zac</label>
              <label class="ml-1 mr-1 font-weight-bold   text--lighten-1 blue-grey--text">·</label>
              <label class="font-weight-normal text-subtitle-2   text--lighten-1 blue-grey--text">a day ago</label>
            </v-list-item-title>
            <v-card-text  class="font-weight-medium body-1 grey--text text--darken-4  pt-0 pb-0">
              推文内容：测试文本 测试文本 测试文 本测试文本 测试文本 测试文本 测试文本 测试文 本测试文本 测试文本 测试文本 测试文本 测试文 本测试文本 测试文本
            </v-card-text>
            <v-card class="ma-6" flat>
              <v-row>
                <v-col
                    v-for="(pic,index) in P"
                    :key="index"
                    class="d-flex child-flex pa-1"
                    cols="6"
                >
                  <v-img
                      :src="pic.src"
                      :lazy-src="pic.thumb"
                      aspect-ratio="1"
                      class="grey lighten-2 rounded"
                      @click="openGallery(index)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                      >
                        <v-progress-circular
                            indeterminate
                            color="blue lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-card>
          </v-list-item-content>

        </v-list-item>
      </v-card-actions>

    </v-card>
  </div>
</div>
</div>
</template>

<script>
export default {
  name: "Item",
  props: {
    source: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss"  scoped>

.item-inner .head {
    font-weight: 500;
  }
.item-inner span:first-child {
    margin-right: 1em;
  }
.item-inner .desc {
    padding-top: .5em;
    text-align: justify;
  }


.c-container {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  border-bottom: 1px solid #efefef;
  cursor: pointer;
  padding: 12px;
  transition: 200ms;
&:hover {
   background: lighten(#000, 95%);
 }
.profileImage {
  margin-right: 5px;
}
.tweet {
  width: 100%;
.tweetDetail {
span {
  margin-right: 5px;
}
.username,
.date {
  color: #8899a6;
}
.date:hover {
  text-decoration: underline;
}
}
.tweetAction {
  display: flex;
  width: 100%;
  margin-top: 7px;
div {
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: 50%;
  width: max-content;
svg {
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  fill: #8899a6;
  margin-right: 2px;
}

.actionHover,
svg,
span {
  transition: 300ms;
}

&:hover {
.actionHover {
  padding: 5px;
  border-radius: 50%;
}
svg.comment,
svg.share {
  background: rgba(#1da1f2, 0.1);
  fill: #1da1f2;
}
span.comment {
  color: #1da1f2;
}
svg.rt {
  background: rgba(#17bf63, 0.1);
  fill: #17bf63;
}
span.rt {
  color: #17bf63;
}
svg.fav {
  background: rgba(#e0245e, 0.1);
  fill: #e0245e;
}
span.fav {
  color: #e0245e;
}
}
&.clicked {
svg.comment,
svg.share {
  fill: #1da1f2;
}
span.comment {
  color: #1da1f2;
}
svg.rt {
  fill: #17bf63;
}
span.rt {
  color: #17bf63;
}
svg.fav {
  fill: #e0245e;
}
span.fav {
  color: #e0245e;
}
}
}
}
}
}

</style>
