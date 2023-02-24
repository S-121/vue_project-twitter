<template>
  <div class="d-flex flex-column ">



    <!--START  本人卡片信息-->
    <MyUserCard ></MyUserCard>
    <!--END  本人卡片信息-->

    <!--START  当前用户卡片信息-->
    <CurrentUserCard v-if="$store.getters['Post/userInfoState'].UserId !== $store.getters['Post/currentUserGroupState'].UserId" ></CurrentUserCard>
    <!--END  当前用户卡片信息-->

    <!--START  搜索-->
    <SearchInputCard></SearchInputCard>
    <!--END  搜索-->

    <!--START  用户推荐-->
    <RecoUsers />
    <!--END  用户推荐-->

<!--    <RecoGroups />

    <RightAD />

    <RightNewsList />-->
  </div>
</template>

<script>
import RightNewsList from "@/components/Post/RightNewsList";
import RightAD from "@/components/Post/RightAD";
import RecoUsers from "@/components/Post/RecoUsers";
import RecoGroups from "@/components/Post/RecoGroups";
import CurrentUserCard from "@/components/Post/CurrentUserCard";
import MyUserCard from "@/components/Home/MyUserCard";
import SearchInputCard from "@/components/Post/SearchInputCard";

export default {
  name: "RightBar",
  components: {SearchInputCard, MyUserCard, CurrentUserCard, RecoGroups, RecoUsers, RightAD, RightNewsList },

};
</script>

<style lang="scss" scoped>

</style>
