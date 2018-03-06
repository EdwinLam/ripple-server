const {StringUtil,QueryUtil,SystemUtil} =  require('../utils')
const {accountModel,userModel} = require("../models")
module.exports = class AccountService{
  /**
   * 分页查询数据
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async queryPage(ctx){
    return QueryUtil.queryPage(ctx,accountModel)
  }

  /**
   * 新建账号
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async save (ctx) {
    let phone = ctx.request.body.phone
    let password = ctx.request.body.password
    if (StringUtil.isNull(phone)) {
      ctx.body = SystemUtil.createResult({success: false, message: '号码不能为空'})
      return
    }
    if (StringUtil.isNull(password)) {
      ctx.body = SystemUtil.createResult({success: false, message: '密码不能为空'})
      return
    }
    // 检查是否已存在相同号码
    const accountInfo = await accountModel.findOne({where: {phone: phone}})
    const isExistsAccount = accountInfo != null
    if (!isExistsAccount) {
      const message = '新建账号' + phone + '成功'
      const data = await accountModel.create({
        password: SystemUtil.enCodePassword(password),
        phone: phone
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = '已存在' + phone + '手机的用户'
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }

  /**
   * 获取登录用户信息
   */
  async getAccount (ctx) {
    let  account = await accountModel.findOne({where: {id: ctx.state.user.id}})
    let user = await userModel.findOne({where:{id:ctx.state.user.userId}})
    //获取权限信息
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', data:{
      account:account,
      user:user
    }})
  }
}
