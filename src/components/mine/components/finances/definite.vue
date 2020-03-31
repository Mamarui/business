<template>
    <div class="container">
        <van-nav-bar title="收提明细"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="listItem" v-for="(item,index) in list" :key="index">
            <p class="definite"><span>{{item.type}}</span><span :class="item.type=='交单返佣'?'add':'cut'">{{item.type=='交单返佣'?'+':'-'}}{{item.amount}}</span></p>
            <p class="time">{{item.gmt_created}}</p>
            <div class="van-multi-ellipsis--l2 content">{{item.detail}}</div>
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
            requestData('/api/wechat/mmc/finance/flow',{
                merchant:sessionStorage.getItem('merchant'),
            },'post').then((res)=>{
                if(res.status==200){
                    this.list = res.data;
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
    .container .listItem{
        padding: 0 1rem;
        height: 6rem;
        background: #fff;
        margin: 0.5rem auto;
        overflow: hidden;
    }
    .container .listItem .definite{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5rem;
    }
    .container .listItem .definite span{
        font-size: 1.2rem;
        font-weight: bold;
    }
    .add{
        color: rgba(37, 155, 36, 1);
    }
    .cut{
        color: rgba(255, 101, 63, 1);
    }
    .container .listItem .time{
        font-size: 0.8rem;
        color: #666;
    }
    .container .listItem .content{
        font-size: 0.9rem;
    }
</style>