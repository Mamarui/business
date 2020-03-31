<template>
    <div class="container">
        <van-nav-bar
            title="登录"
            left-text="取消"
            @click-left="onClickLeft"/>
        <van-cell-group style="margin-top:2rem;">
            <van-field
                v-model="tel"
                center
                clearable
                placeholder="请输入手机号"
                use-button-slot>
                <van-button :disabled="isSend" slot="button" size="small" type="primary" @click="getCode">获取验证码</van-button>
            </van-field>
            <van-field
                v-model="verification_code"
                placeholder="请输入短信验证码"/>
            </van-cell-group>
        <van-button round class="submitBtn" type="warning" @click="submit">确定</van-button>
    </div>
</template>

<script>
import requestData from './requestMethod.js'
export default {
    data(){
        return{
            tel:'',
            verification_code:'',
            isSend:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getCode(){
            if(this.tel){
                requestData('/api/sms/mp/send',{
                    tel:this.tel
                },'post').then((res)=>{
                    if(res.status==200){
                        this.$toast(res.message);
                        this.isSend = true;
                    }else{
                        this.$toast(res.message);
                    }
                },(err)=>{
                    alert(err)
                })
            }else{ 
                this.$toast('请输入电话号码！')
            }
        },
        submit(){
            requestData('/api/oauth/tel/bind',{
                user_id:sessionStorage.getItem('user_id'),
                tel:this.tel,
                verification_code:this.verification_code
            },'post').then((res)=>{
                if(res.status==200){
                    sessionStorage.setItem('avatar',res.data.avatar);
                    sessionStorage.setItem('name',res.data.name);
                    sessionStorage.setItem('openid',res.data.openid);
                    sessionStorage.setItem('role',res.data.role);
                    sessionStorage.setItem('phone',res.data.phone);
                    sessionStorage.setItem('merchant',res.data.merchant);
                    sessionStorage.setItem('merchant_name',res.data.merchant_name);
                    this.$router.push({ path: '/index' });
                }else{
                    this.$toast(res.message);
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