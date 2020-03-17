<template>
    <div class="container">
        <van-nav-bar title="添加子账号"
            left-arrow
            @click-left="onClickLeft"/>
        <van-field class="name" v-model="user.name" label="姓名" placeholder="请输入姓名"/>
        <van-field v-model="user.phone" type="tel" label="手机号" placeholder="请输入手机号" maxlength="11"/>
        <van-button class="button" @click="addSure" round type="warning" size="large">确定</van-button>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            user:{
                name:'',
                phone:'',
                pid:1
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        addSure(){
            requestData('/api/wechat/mmc/subaccount/add',{
                ...this.user
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
    .container{
        background: #fafafa;
    }
    .name{
        margin-top: 1rem;
    }
    .button{
        position: absolute;
        top: 15rem;
    }
</style>