<template>
    <div class="container">
        <van-nav-bar title="子账号"
            left-arrow
            @click-left="onClickLeft"/>
        <p class="title">当前共{{list.length}}个成员</p>
        <router-link v-for="item in list" :key="item.id" :to="{ path: 'childDetail', query: { id: item.id }}">
            <van-swipe-cell>
                <van-contact-card
                    type="edit"
                    :name="item.name?item.name:'- -'"
                    :tel="item.phone?item.phone:'- -'"
                    :editable="false"/>
                <van-icon class="van_icon" name="arrow" />
                <template slot="right">
                    <van-button
                        @click="deleteItem(item.id)"
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"/>
                </template>
            </van-swipe-cell>
        </router-link>
        <van-button class="van_button" @click="toAdd" round type="warning" size="large">添加子账号</van-button>
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
        this.getList();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getList(){
            requestData('/api/wechat/mmc/subaccount/list',{
                pid:1
            },'get').then((res)=>{
                if(res.status==200){
                    this.list = res.data;
                }
            },(err)=>{
                alert(err)
            })
        },
        deleteItem(id){
            requestData('/api/wechat/mmc/subaccount/delete',{
                id:id
            },'get').then((res)=>{
                if(res.status==200){
                    this.$toast(res);
                    this.getList();
                }
            },(err)=>{
                alert(err)
            })
        },
        toAdd(){
            this.$router.push({ name:'addChild' })
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
    .container .title{
        margin-left: 2rem;
        line-height: 2rem;
    }
    /* .container .van-swipe-cell{
        position: relative;
    } */
    .container .van_icon{
        position: absolute;
        right: 1rem;
        bottom: 1.5rem;
    }
    .container .delete-button{
        height: 100%;
    }
    .container .van_button{
        margin-top: 1rem;
    }
</style>