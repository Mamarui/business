<template>
    <div class="container">
        <van-nav-bar title="账户提现"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="cashoutBox">
            <p class="toast">当前可提现金额 ¥ {{this.$route.query.withdrawable}}（元）</p>
            <div class="txtIn">
                <b class="icon">¥</b>
                <van-field v-model="info.amount" class="txt"/>
                <van-button class="button" round type="warning" size="small" @click="allCashOut">全部提现</van-button>
            </div>
            <p class="metion">实际到账扣除个税和相关手续费</p>
        </div>
        <van-field
            class="account"
            readonly
            clickable
            is-link
            label="收款账户"
            v-model="name"
            input-align="right"
            @click="show_account = true"/>
        <van-popup v-model="show_account" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="show_account = false"
                @confirm="onConfirm"/>
        </van-popup>
        <van-button class="cashoutButton" round type="primary" block @click="toCashOut">全部提现</van-button>
    </div>
</template>
z
<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            info:{
                amount:'',
                account_id:'',
                merchant:sessionStorage.getItem('merchant'),
            },
            name:'',
            show_account:false,
            columns:[],
            accounts:[]
        }
    },
    created(){
        this.getAccount();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getAccount(){
            requestData('/api/wechat/mmc/card/list',{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status==200){
                    this.accounts = res.data;
                    this.columns = res.data.map(function(obj){
                        return obj.bank_name;
                    });
                }
            },(err)=>{
                alert(err)
            })
        },
        onConfirm(value, index){
            this.name = value;
            this.info.account_id = this.accounts[index].id;
            this.show_account = false;
        },
        allCashOut(){
            this.info.amount = this.$route.query.withdrawable;
        },
        toCashOut(){
            requestData('/api/wechat/mmc/finance/withdrawal',{
                merchant:sessionStorage.getItem('merchant'),
                ...this.info
            },'post').then((res)=>{
                if(res.status==200){
                    this.$toast(res.message);
                    this.$router.go(-1);
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        background: #fafafa;
    }
    .container .cashoutBox{
        height: 9rem;
        background: #fff;
        margin-top: 0.5rem;
        padding: 0 1rem;
        overflow: hidden;
    }
    .container .cashoutBox .txtIn{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .container .cashoutBox .toast{
        margin-top: 0.5rem;
        line-height: 2.2rem;
    }
    .container .cashoutBox .txtIn .icon{
        font-size: 2rem;
    }
    .container .cashoutBox .txtIn .txt{
        font-size: 1.6rem;
    }
    .container .cashoutBox .txtIn .button{
        width: 7rem;
    }
    .container .cashoutBox .metion{
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
    .container .account{
        margin-top: 0.5rem;
    }
    .container .cashoutButton{
        width: 20rem;
        margin: 4rem auto 0 auto;
    }
</style>