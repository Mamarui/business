<template>
    <div class="container">
        <van-nav-bar title="银行卡管理"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="bankBox" :style="'background-color:'+ red">
            <div class="icon">
                <img src="../../../../assets/1.jpg" alt="">
            </div>
            <div class="info">
                <p class="name">招商银行</p>
                <p class="type">储蓄卡</p>
                <p class="code">卡号</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            red:''
        }
    },
    created(){
        this.red = "#000000"
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
    .container .bankBox{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 85%;
        height: 7rem;
        border-radius: 1rem;
        margin: 0.5rem auto;
        padding: 0 1rem;
    }
    .red{
        background-color: red;
    }
    .icon{
        width: 5rem;
        height: 5rem;
        border-radius: 5rem;
    }
    .icon img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .info{
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }
    .info p{
        line-height: 1.4rem;
        color: #fff;
    }
    .info .name{
        font-weight: bold;
    }
    .info .type{
        font-size: 0.6rem;
    }
    .info .code{
        font-size: 0.8rem;
        font-weight: bold;
    }
</style>