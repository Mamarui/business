<template>
    <div class="container">
        <van-nav-bar
            title="解绑银行卡"
            left-arrow
            left-text="取消"
            @click-left="onClickLeft"/>
        <van-password-input
            style="margin-top:1rem;"
            :value="password"
            info="请输入支付密码，以验证身份"
            :focused="showKeyboard"
            @focus="showKeyboard = true"/>
        <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"/>
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
        onInput(key) {
            this.password = (this.password + key).slice(0, 6);
        },
        onDelete() {
            this.password = this.password.slice(0, this.password.length - 1);
        },
        verifyPwd(){
            var that = this;
            requestData('/api/wechat/mmc/trade/verify',{
                user_id:sessionStorage.getItem('user_id'),
                trade_pwd:this.password
            },'get').then((res)=>{
                if(res.status==200){
                    that.unbind();
                }else{
                    this.$toast(res.message);
                    this.password='';
                }
            },(err)=>{
                alert(err)
            }) 
        },
        unbind(){
            requestData('/api/wechat/mmc/account/unbind',{
                id:1
            },'post').then((res)=>{
                if(res.status==200){
                    this.$toast(res.message);
                    this.$router.push({ path:'bankManage' });  
                }
            },(err)=>{
                alert(err)
            }) 
        }
    },
    watch:{
        password(){
            if(this.password.length==6){
                this.verifyPwd();
            }
        }
    }
}
</script>