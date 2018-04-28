/**
 * @author : wenhao.huang
 * @date   : 2018/4/11
 * @project: 获取验证码倒计时
 */

export default {
    data() {
        return {
            smsCodeText: '获取验证码',
            frozenSms: false,
            smsTime: 60
        }
    },
    methods: {
        canSms() {
            let res = true
            res = (!this.frozenSms && this.$util.checkPhone(this.phoneNumber)) ? false : true
            return res
        },
        smsCountDown() {
            this.smsCodeText = `${this.smsTime}s后重发`
            if(this && this._isDestroyed){
                return false
            }
            if(this.smsTime <= 0){
                this.smsCodeText = '获取验证码'
                this.frozenSms = false
                return false
            }
            setTimeout(() => {
                this.smsTime --
                this.smsCountDown()
            }, 1000)
        }
    }
}
