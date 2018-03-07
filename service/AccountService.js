const {StringUtil,QueryUtil,SystemUtil} =  require('../utils')
const {accountModel,userModel} = require("../models")
module.exports = class AccountService{
  /**
   * 分页查询数据
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async queryPage(ctx){
    if(ctx.query.phone){
      ctx.query.phone={$like: ctx.query.phone+'%'}
    }
    return QueryUtil.queryPage(ctx,accountModel)
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  async destroy (ctx) {
    const count = await accountModel.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})
  }

  async update(ctx){
    const {phone,email} = ctx.request.body
    const id = ctx.params.id
    const updatedAt = new Date().getTime()
    if (StringUtil.isNull(phone)) {
      ctx.body = SystemUtil.createResult({success: false, message: '手机号不能为空'})
    }
    await accountModel.update({phone,updatedAt,email}, {where: {id}})
    ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
  }

  /**
   * 新建账号
   * @param {number} phone 电话号码
   * @param {number} password 密码
   */
  async save (ctx) {
    let phone = ctx.request.body.phone
    let email = ctx.request.body.email
    let password = ctx.request.body.password
    if(!password || password=='undefined')
      password = '123123'
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
      const data = await accountModel.create({
        password: SystemUtil.enCodePassword(password),
        phone: phone,
        email:email
      })
      ctx.body = SystemUtil.createResult({success: true, message: '新建账号' + phone + '成功', data})
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
