<template>
    <div class="container">
        <van-nav-bar title="绑定货机"
            left-arrow
            @click-left="onClickLeft"/>
        <van-field class="name" v-model="counter.name" label="货机名" placeholder="请输入货机名"/>
        <van-field v-model="counter.manager" label="管理员" placeholder="请输入管理员"/>
        <van-field v-model="counter.qrcode" label="机身条码" placeholder="请输入机身条码"/>
        <van-field v-model="counter.surface_no" label="货机型号" placeholder="请输入货机型号"/>
        <van-button class="button" @click="addSure" round type="warning" size="large">绑定</van-button>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            counter:{
                name:'',
                manager:sessionStorage.getItem('user_id'),
                qrcode:'',
                surface_no:'',
                merchant:sessionStorage.getItem('merchant'),
            }
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        addSure(){
            requestData('/api/wechat/mmc/container/bind',{
                ...this.counter
            },'get').then((res)=>{
                if(res.status==200){
                    console.log(res)
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
        top: 17rem;
    }
</style>