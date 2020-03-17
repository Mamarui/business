<template>
    <div class="container">
        <van-nav-bar title="手机号"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="phoneImg">
            <img src="../../../../assets/phone.png">
        </div>
        <b>{{ $route.query.phone }}</b>
        <p>当前绑定手机号</p>
        <router-link :to="{ path: 'sureOldTele', query: { phone: $route.query.phone } }">
            <van-button round type="danger">更换手机号</van-button>
        </router-link>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
    }
}
</script>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container .phoneImg{
        width: 10rem;
        height: 100%;
        margin: 3rem auto 1rem auto;
    }
    .container .phoneImg img{
        width: 100%;
        height: 100%;
    }
    .container b{
        width: 100%;
        display: inline-block;
        font-size: 2rem;
        text-align: center;
    }
    .container p{
        text-align: center;
    }
    .van-button{
        display: block;
        width: 20rem;
        margin: 0.5rem auto;
    }
</style>