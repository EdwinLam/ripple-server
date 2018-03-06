const {StringUtil,SystemUtil} = require('../utils')
const {accountModel,userModel} = require("../models")

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
    const account = await accountModel.findOne({where: {phone: phone}})
    // if(!account||!SystemUtil.checkPassword(password, account.password)){
    //   ctx.body = SystemUtil.createResult({success: false, message: '用户名或者密码错误'})
    //   return
    // }
    const user = await userModel.findOne({where:{accountId:account.id}})
    const data ={
      token: SystemUtil.createJwt({account,user}),
      account,
      user
    }
    ctx.body = SystemUtil.createResult({success: true, message: '身份验证成功', data})
  }

}
