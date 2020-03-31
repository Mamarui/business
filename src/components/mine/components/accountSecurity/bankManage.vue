<template>
    <div class="container">
        <van-nav-bar title="银行卡管理"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="bankBox" @click="toBankInfo(item)" :style="'background-color:'+ item.background" v-for="item in list" :key="item.id">
            <div class="icon">
                <img :src="item.icon" alt="">
            </div>
            <div class="info">
                <p class="name">{{item.bank_name}}</p>
                <p class="type">{{item.cardType}}</p>
                <p class="code">{{item.enc_bank_no}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getList();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getList(){
            requestData('/api/wechat/mmc/card/list',{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status==200){
                    this.list = res.data;
                }
            },(err)=>{
                alert(err)
            })  
        },
        toBankInfo(item){
            this.$router.push({ path:'bankInfo', query:{ id:item.id } });
        }
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
</style>