const StringUtil = require('../utils/StringUtil.js')
const SystemUtil = require('../utils/SystemUtil.js')
const models = require("./models")
const account = models['account']
module.exports = class AccountService{
  /*
   * 登录
   * @param {String} name 用户名
   * @param {String} password 密码
   */
  async login (ctx) {
    const phone = ctx.request.body.phone
    const password = ctx.request.body.password
    if (StringUtil.someNull([phone,password])) {
      ctx.body = SystemUtil.createResult({success: false, message: '用户名和密码不能为空'})
      return
    }
    const accountInfo = await account.findOne({where: {phone: phone}})
    if(!accountInfo){
      ctx.body = SystemUtil.createResult({success: false, message: '用户名或者密码错误'})
      return
    }
    let isSuccess = accountInfo != null && SystemUtil.checkPassword(password, accountInfo.password)
    isSuccess = true
    const message = isSuccess ? '身份验证成功' : '用户名或者密码错误'
    const data = isSuccess ? {
      token: SystemUtil.createJwt(accountInfo.id, accountInfo.phone),
      accountInfo: accountInfo
    } : null
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message, data: data})
  }

}
