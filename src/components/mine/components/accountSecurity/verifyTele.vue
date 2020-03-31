<template>
    <div class="container">
        <van-nav-bar title="1/2：验证手机号"
            left-arrow
            @click-left="onClickLeft"/>
        <van-cell-group>
            <van-field
                v-model="phone"
                center
                clearable
                placeholder="请输入手机号"
                use-button-slot>
                <van-button :disabled="isSend" slot="button" size="small" type="primary" @click="getCode">获取验证码</van-button>
            </van-field>
            <van-field
                v-model="sms"
                placeholder="请输入短信验证码"/>
        </van-cell-group>
        <van-button round class="submitBtn" type="warning" @click="submit">确定</van-button>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            phone:'',
            sms:'',
            isSend:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getCode(){
            if(this.phone){
                requestData('/api/sms/mp/send',{
                    tel:this.phone
                },'post').then((res)=>{
                    if(res.status==200){
                        this.$toast(res.message);
                        this.isSend = true;
                    }
                },(err)=>{
                    alert(err)
                })
            }else{
                this.$toast('请输入电话号码！')
            }
        },
        submit(){
            requestData('/api/wechat/mmc/tel/verify',{
                verification_code:this.sms,
                user_id:sessionStorage.getItem('user_id'),
            },'post').then((res)=>{
                if(res.status==200){
                    this.isSend = false;
                    this.$router.push({ name:'changeTradePwd' })
                }
            },(err)=>{
                alert(err)
            })
        }
    }
}
</script>

<style lang="css" scoped>
    .container .submitBtn{
        display: block;
        margin: 2rem auto;
        width: 80%;
    }
</style>