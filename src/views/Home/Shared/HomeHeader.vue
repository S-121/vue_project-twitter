<template>
  <div class="container">
    <CustomText font="xlarge fw-heavy" >{{$t('index')}}</CustomText>
    <a  :key="locale?'en':'cn'"  @click="changeLang()">{{lang}}</a>
    <icon class="stars hover" name="stars" />
  </div>
</template>

<script>
import CustomText from "@/components/Post/CustomText";
export default {
  components: {CustomText},
  data () {
    return{
      name: "HomeHeader",
      locale: 'cn',
      lang: 'EN',
      components: { CustomText }
    }
  },
  methods: {
    changeLang () {
      // 增加传入语言
      if(this.locale === 'cn'){
        this.lang='EN';
        this.locale='en';
      }else{
        this.lang='中文';
        this.locale='cn';
      }
      this.$i18n.locale = this.locale;
      localStorage.setItem('lang', this.locale);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  background: #fff;
  width: 100%;
  height: 53px;
  border-bottom: 1px solid #efefef;
  border-right: 1px solid #efefef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 0 5px 0 15px;
  z-index: 99;
  span {
    cursor: pointer;
  }

  .stars {
    width: 40px;
    fill: #1da1f2;
    border-radius: 50%;
    padding: 8px;
  }
}
</style>
