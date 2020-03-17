<template>
    <div class="container">
        <van-nav-bar title="系统消息"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="listItem" v-for="(item,index) in list" :key="index">
            <van-icon class="van_icon" name="location-o" size="2rem"/>
            <div class="itemContent">
                <p class="header"><span class="title">{{item.title}}</span><span class="time">{{item.gmt_created}}</span></p>
                <div class="van-multi-ellipsis--l2 content">{{item.content}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import requestData  from '../../../requestMethod';
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getMessage();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getMessage(){
            requestData('/api/message/list',{
                merchant:1,
                state:0
            },'get').then((res)=>{
                if(res.status==200){
                    this.list = res.data;
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
        background: #fafafa;
    }
    .container .listItem{
        padding: 0 1rem;
        height: 6rem;
        background: #fff;
        margin: 0.5rem auto;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }
    .container .listItem .van_icon{
        margin-top: 0.5rem;
        margin-right: 0.5rem;
    }
    .container .listItem .itemContent{
        width: 92%;
    }
    .container .listItem .itemContent .header{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.5rem;
    }
    .container .listItem .itemContent .header .title{
        font-weight: bold;
    }
    .container .listItem .itemContent .header .time{
        float: right;
        font-size: 0.8rem;
        color: #666;
    }
    .container .listItem .itemContent .content{
        font-size: 0.8rem;
        margin-top: 0.5rem;
    }
</style>