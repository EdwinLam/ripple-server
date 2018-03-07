const {StringUtil,QueryUtil,SystemUtil} =  require('../utils')
const {accountModel,userModel} = require("../models")

module.exports = class UserService{
  /**
   * 分页查询需要可以绑定的用户数据
   * @param {number} phone 电话号码
   */
  async findBindUserPage(ctx){
    if(ctx.query.phone){
      ctx.query.phone={$like: ctx.query.phone+'%'}
    }
    ctx.query.isMain=0
    ctx.query.accountId=0
    return QueryUtil.queryPage(ctx,userModel)
  }
  /**
   * 查询账号绑定的用户
   */
  async findUserByAccountId (ctx) {
    const data =await userModel.findAll({
      where:{
        accountId:ctx.query.accountId
      }
    })
    ctx.body = SystemUtil.createResult({success:true,message:"获取数据成功",data})
  }

  /**
   * 在账号解绑用户
   */
  async unBindUser (ctx) {
    await userModel.update({accountId:0},{where:{id:ctx.request.body.id}})
    ctx.body = SystemUtil.createResult({success:true,message:"解除绑定成功"})
  }

  /**
   * 在账号绑定用户
   */
  async bindUser (ctx) {
    await userModel.update({accountId:ctx.request.body.accountId},{where:{id:ctx.request.body.id}})
    ctx.body = SystemUtil.createResult({success:true,message:"绑定成功"})
  }
}
