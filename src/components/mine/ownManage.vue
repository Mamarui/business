<template>
    <div class="container">
        <div class="header" @click="toInfo(info)">
            <div class="headpic">
                <img :src="info.avatar">
            </div>
            <div class="infoBox">
                <span class="name">{{info.name}}<span class="txt">（{{info.merchant_name}}）</span></span>
                <span class="number">{{info.phone}}</span>
            </div>
            <van-icon name="arrow" size="2rem"/>
        </div>
        <div class="orderStatistic">
            <p class="headline">本月订单统计</p>
            <div class="numberBox">
                <div class="numbers">
                    <span class="number">{{statistic.unpaid}}</span>
                    <span class="title">未支付</span>
                </div>
                <div class="numbers">
                    <span class="number">{{statistic.failure}}</span>
                    <span class="title">交易失败</span>
                </div>
                <div class="numbers">
                    <span class="number">{{statistic.success}}</span>
                    <span class="title">交易成功</span>
                </div>
            </div>
        </div>
        <van-cell-group class="settings">
            <router-link to="/child">
                <van-cell title="子账户管理" icon="gold-coin-o" is-link></van-cell>           
            </router-link>
            <router-link to="/finance">
                <van-cell title="财务管理" icon="balance-o" is-link ></van-cell>           
            </router-link>
            <router-link to="/machine">
                <van-cell title="货机管理" icon="hotel-o" is-link ></van-cell>           
            </router-link>
            <router-link to="/message">
                <van-cell title="系统消息" icon="comment-o" is-link ></van-cell>           
            </router-link>
            <router-link to="/account">
                <van-cell title="账号安全" icon="desktop-o" is-link ></van-cell>           
            </router-link>
        </van-cell-group>
    </div>
</template>

<script>
import requestData  from '../../requestMethod';
export default {
    data(){
        return{
            statistic:{},
            info:{}
        }
    },
    created(){
        this.getInfo();
        this.getStatistic();
    },
    methods:{
        getInfo(){
            requestData('/api/wechat/mmc/user/profile',{
                user_id:sessionStorage.getItem('user_id')
            },'get').then((res)=>{
                if(res.status==200){
                    this.info = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        getStatistic(){
            requestData('/api/wechat/mmc/statistic/order',{
                mid:1
            },'get').then((res)=>{
                if(res.status==200){
                    this.statistic = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        toInfo(info){
            this.$router.push({ name: 'info', query:{ info: JSON.stringify(info) } });
        }
    }
}
</script>

<style lang="css" scoped>
    p{
        margin: 0;
    }
    .container{
        background: rgb(242, 242, 242);
    }
    .container .header{
        height: 5rem;
        background: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .container .header .headpic{
        width: 4rem;
        height: 4rem;
        border-radius: 4rem;
        margin-left: 1rem;
    }
    .container .header .headpic img{
        width: 100%;
        height: 100%;
        border-radius: 4rem;
    }
    .container .header .infoBox{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-left: 1rem;
    }
    .container .header .infoBox .name,.container .header .infoBox .number{
        display: inline-block;
        width: 15rem;
    }
    .container .header .infoBox .name{
        font-size: 1.2rem;
        font-weight: bold;
    }
    .container .header .infoBox .txt{
        font-size: 1rem;
        color: #777;
    }
    .container .header .infoBox .number{
        font-size: 0.8rem;
        color: #666;
    }
    .container .header .van-icon{
        float: right;
    }
    .container .orderStatistic{
        margin-top: 1rem;
        height: 7rem;
        background: #fff;
    }
    .container .orderStatistic .headline{
        line-height: 2.5rem;
        font-size: 1rem;
        font-weight: bold;
        margin: 0 1rem;
        border-bottom: 1px solid rgb(182, 182, 182);
    }
    .container .orderStatistic .numberBox{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin-top: 0.5rem;
    }
    .container .orderStatistic .numberBox .numbers{
        width: 30%;
        height: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border-right: 1px solid rgb(182, 182, 182);
    }
    .container .orderStatistic .numberBox .numbers:last-child{
        border-right: none;
    }
    .container .settings{
        margin-top: 1rem;
    }
    .container .settings .van-cell{
        background: #fff;
        font-size: 1rem;
        margin-bottom: 0.2rem;
    }
</style>