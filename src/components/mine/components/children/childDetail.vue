<template>
    <div class="container">
        <van-nav-bar title="账号详情"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="userBox">
            <div class="userInfoBox">
                <div class="headPic">
                    <img :src="info.avatar" alt="">
                </div>
                <div class="userInfo">
                    <p class="name">{{info.name}}</p>
                    <p class="tele">{{info.phone}}</p>
                </div>
            </div>
            <div class="userIncome">
                <p class="price">{{info.amount}}元</p>
                <p class="title">销售金额</p>
            </div>
        </div>
        <div class="content">
            <p class="title">管理货柜<span class="number">({{product.length}}个)</span></p>
            <div class="productBox">
                <div v-for="(item,index) in product" :key="index" class="product">
                    <van-tag mark :type="item.dto_status=='正常'?'success':(item.dto_status=='缺货'?'danger':(item.dto_status=='连接断开'?'warning':''))" class="tag_normal">{{item.dto_status}}</van-tag>
                    <van-card :tag="item.volume==0?'缺货':''" :title="item.model" :thumb="item.icon==''?'https://img.yzcdn.cn/vant/t-thirt.jpg':item.icon">
                        <div slot="desc">
                            <div class="van-ellipsis">货机编码 ： {{item.surface_no}}</div>
                            <div class="van-ellipsis">管理员 ： {{item.manager}}</div>
                        </div>
                        <div slot="tags" style="margin-top:0.5rem;">
                            <p><b style="margin-right:0.5rem;"><i style="font-size:1rem;color:red;margin-right:0.5rem;">{{item.amount}}</i>/</b>{{item.volume}}</p>
                            <p>在售/容量</p>
                        </div>
                        <div slot="footer">
                            <p class="footer">{{item.name}}</p>
                        </div>
                    </van-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            info:{},
            product:[],
            searchForm:{
                merchant:sessionStorage.getItem('merchant'),
                manager:sessionStorage.getItem('user_id')
            }
        }
    },
    created(){
        this.getInfo();
        this.getList();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getInfo(){
            requestData('/api/wechat/mmc/user/profile',{
                user_id:this.$route.query.id 
            },'get').then((res)=>{
                if(res.status==200){
                    this.info = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        getList(){
            requestData('/api/wechat/mmc/container/list',{
                ...this.searchForm
            },'get').then((res)=>{
                if(res.status==200){
                    this.product = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
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
    .container .userBox .userInfoBox{
        height: 9rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 2rem;
        background: rgb(92, 92, 191);
    }
    .container .userBox .userInfoBox .headPic{
        width: 5rem;
        height: 5rem;
        border-radius: 5rem;
    }
    .container .userBox .userInfoBox .headPic img{
        width: 100%;
        height: 100%;
        border-radius: 5rem;
    }
    .container .userBox .userInfoBox .userInfo{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        margin-left: 1rem;
    }
    .container .userBox .userInfoBox .userInfo{
        font-size: 1.2rem;
        color: #fff;
    }
    .container .userBox .userInfoBox .tele{
        font-size: 1rem;
        color: #fff;
    }
    .container .userBox .userIncome{
        height: 5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fafafa;
    }
    .container .userBox .userIncome .price{
        font-size: 2rem;
    }
    .container .userBox .userIncome .title{
        color: #666;
    }
    .container .content .title{
        margin-left: 1rem;
        font-weight: bold;
        line-height: 2rem;
    }
    .container .content .productBox{
        overflow: auto;
    }
    .container .content .productBox .product{
        margin-bottom: 1rem;
        position: relative;
    }
    .container .content .productBox .product .tag_normal{
        position: absolute;
        left: 0.5rem;
        top: 0.7rem;
        z-index: 999;
    }
    .container .content .productBox .product .van-card{
        font-size: 12px;
        color: #666;
    }
    .container .content .productBox .product .van-card .footer{
        font-size: 14px;
    }
</style>