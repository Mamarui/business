<template>
    <div class="container">
        <van-nav-bar title="2/2：设置交易密码"
            left-arrow
            @click-left="onClickLeft"/>
        <p class="mention">请设置交易密码，方便提现</p>
        <van-password-input
            v-model="password"
            info="密码为 6 位数字"
            :focused="showKeyboard"
            @focus="showKeyboard = true"/>
        <!-- <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required/> -->
        <van-button round class="submitBtn" type="warning" @click="submit">确定</van-button>
    </div>
</template>

<script>
import requestData  from '../../../../requestMethod';
export default {
    data(){
        return{
            password:'',
            showKeyboard: true
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1);
        },
        submit(){
            requestData('/api/wechat/mmc/trade_pwd/change',{
                trade_pwd:this.password,
                id:1
            },'post').then((res)=>{
                if(res.status==200){
                    this.$toast('设置成功！');
                    this.$router.push({ path:'account' })
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