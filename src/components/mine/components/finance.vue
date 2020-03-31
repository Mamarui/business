<template>
    <div class="container">
        <van-nav-bar title="我的收益"
            right-text="收提明细"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <div class="curBalance">
            <p class="curPrice">¥{{finance.balance}}</p>
            <p class="curTitle">当前资金余额（元）</p>
        </div>
        <div class="canBalance">
            <p class="canPrice">¥{{finance.withdrawable}}</p>
            <p class="canTitle">可提现金额（元）</p>
            <van-button class="van_button" round type="warning" :disabled="isDisable" @click="toCashout">立即提现</van-button>
        </div>
        <!-- <div class="progress">
            <p class="proTitle">2019年放款成绩（截止到6-26）</p>
            <van-slider class="proStep" v-model="value" disabled />
            <p class="proToast">放款成绩打败了98.99%的用户，加油！</p>
        </div> -->
    </div>
</template>

<script>
import requestData  from '../../../requestMethod';
export default {
    data(){
        return{
            value:80,
            finance:{},
            isDisable:false
        }
    },
    created(){
        this.getFinance();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        onClickRight(){
            this.$router.push({ name:'definite' });
        },
        getFinance(){
            requestData('/api/wechat/mmc/finance',{
                merchant:sessionStorage.getItem('merchant'),
            },'get').then((res)=>{
                if(res.status==200){
                    this.finance = res.data;
                    if(this.finance.balance<=0){
                        // this.isDisable = true;
                    }
                }
            },(err)=>{
                alert(err)
            })
        },
        toCashout(){
            this.$router.push({ name:'cashOut' ,query:{ withdrawable:this.finance.withdrawable }});
        }
    }
}
</script>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        background-color: #fafafa;
    }
    .container .curBalance{
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;
        background: rgb(92, 92, 191);
    }
    .container .curBalance .curPrice{
        font-size: 1.8rem;
        color: #fff;
    }
    .container .curBalance .curTitle{
        color: #fff;
    }
    .container .canBalance{
        height: 15rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-left: 2rem;
        background: #fff;
    }
    .container .canBalance .canPrice{
        font-size: 2.4rem;
        color: rgb(211, 51, 34);
    }
    .container .canBalance .canTitle{
        font-size: 0.8rem;
    }
    .container .canBalance .van_button{
        width: 16rem;
        margin-top: 1rem;
    }
    .container .progress{
        margin-top: 1rem;
        height: 10rem;
        background: rgb(182, 185, 227);
    }
    .container .progress p{
        text-align: center;
        line-height: 5rem;
    }
    .container .progress .proToast{
        color: #476685;
    }
</style>