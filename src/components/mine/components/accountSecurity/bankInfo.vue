<template>
    <div class="container">
        <van-nav-bar :title="title"
            left-arrow
            right-text="解除绑定"
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <div class="bankBox" :style="'background-color:'+ info.background">
            <div class="icon">
                <img :src="info.logo" alt="">
            </div>
            <div class="info">
                <p class="name">{{info.bank_name}}</p>
                <p class="type">{{info.cardType}}</p>
                <p class="code">{{info.enc_bank_no}}</p>
            </div>
        </div>
        <div class="limitBox">
            <p class="limitTitle">银行卡每日提取限额</p>
            <van-divider />
            <p class="each">单笔限额<span>￥{{info.single_maximum}}</span></p>
            <p class="each">每日限额<span>￥{{info.day_maximum}}</span></p>
        </div>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            info:{},
            title:''
        }
    },
    created(){
        this.getInfo();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getInfo(){
            requestData('/api/wechat/mmc/account/detail',{
                id:this.$route.query.id
            },'get').then((res)=>{
                if(res.status==200){
                    this.info = res.data;
                    this.title = this.info.bank_name+this.info.cardType;
                }
            },(err)=>{
                alert(err)
            })  
        },
        onClickRight(){
            this.$router.push({ path:'disBandCard',query:{ id:this.$route.query.id } });
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
    .icon{
        width: 2rem;
        height: 2rem;
        border-radius: 2rem;
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
    .limitBox{
        width: 85%;
        height: 8rem;
        border-radius: 1rem;
        margin: 1rem auto;
        padding: 0 1rem;
        background: #cacaca;
        overflow: hidden;
    }
    .limitBox p{
        color: rgb(61, 60, 60);
    }
    .limitBox .limitTitle{
        margin-top: 1rem;
    }
    .limitBox .each span{
        float: right;
    }
</style>