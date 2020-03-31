<template>
    <div class="container">
        <van-nav-bar title="添加银行卡"
            left-arrow
            @click-left="onClickLeft"/>
        <p class="mention">请绑定持卡人本人的银行卡</p>
        <van-field
            v-model="info.enc_true_name"
            label="持卡人"
            placeholder="请输入持卡人姓名"
            input-align="right"
            required/>
        <van-field
            v-model="info.enc_bank_no"
            label="银行卡号"
            placeholder="请输入银行卡号"
            input-align="right"
            required/>
        <van-field
            v-model="info.tel"
            label="手机号"
            placeholder="请输入手机号"
            input-align="right"
            required/>
        <van-field
            v-model="info.verification_code"
            center
            clearable
            placeholder="请输入短信验证码"
            use-button-slot
            required>
            <van-button :disabled="isSend" slot="button" size="small" type="primary" @click="getCode">获取验证码</van-button>
        </van-field>
        <van-button round class="submitBtn" type="warning" @click="submit">确定</van-button>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            info:{
                enc_true_name:'',
                enc_bank_no:'',
                tel:'',
                verification_code:'',
                user_id:sessionStorage.getItem('user_id'),
                merchant:sessionStorage.getItem('merchant')
            },
            isSend:false
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        getCode(){
            requestData('/api/sms/mp/send',{
                tel:this.info.tel
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
            requestData('/api/wechat/mmc/account/bind',{
                ...this.info
            },'post').then((res)=>{
                if(res.status==200){
                    this.$toast(res.data.msg);
                    // if(res.data.hasTpwd==0){
                    //     this.$router.push({ path:'changeTradePwd' });
                    // }else{
                    //     this.$router.push({ path:'bankManage' });
                    // }
                     this.$router.push({ path:'bankManage' });
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
    .container .mention{
        font-size: 0.8rem;
        padding-left: 1rem;
    }
    .container .submitBtn{
        display: block;
        margin: 2rem auto;
        width: 80%;
    }
</style>