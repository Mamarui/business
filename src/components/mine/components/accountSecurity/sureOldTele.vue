<template>
    <div class="container">
        <van-nav-bar title="确认手机号"
            left-arrow
            @click-left="onClickLeft"/>
        <div class="topContent">
            <div class="img">
                <img src="../../../../assets/sure.jpg">
            </div>
            <p>当前绑定手机号</p>
            <p>{{ $route.query.phone }}</p>
            <van-field
                v-model="code"
                center
                clearable
                placeholder="请输入短信验证码"
                use-button-slot>
                <van-button :disabled="isSend" slot="button" size="small" type="primary" @click="getCode">获取验证码</van-button>
            </van-field>
            <van-button round class="submitBtn" type="warning" @click="submit">确定</van-button>
        </div>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            code:'',
            isSend:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getCode(){
            requestData('/api/sms/mp/send',{
                tel:this.$route.query.phone
            },'post').then((res)=>{
                if(res.status==200){
                    this.$toast(res.message);
                    this.isSend = true;
                }
            },(err)=>{
                alert(err)
            })
        },
        submit(){
            requestData('/api/wechat/mmc/tel/verify',{
                user_id:1,
                verification_code:this.code
            },'post').then((res)=>{
                if(res.status==200){
                    this.$router.push({ path:'changeTele' });
                    this.isSend = false;
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .container .topContent{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3rem;
    }
    .container .topContent .img{
        width: 5rem;
        height: 8rem;
    }
    .container .topContent .img img{
        width: 100%;
        height: 100%;
    }
    .container .submitBtn{
        margin: 2rem;
        width: 80%;
    }
</style>