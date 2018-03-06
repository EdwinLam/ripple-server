const {StringUtil,QueryUtil,SystemUtil} =  require('../utils')
const {accountModel,userModel} = require("../models")

module.exports = class UserService{

  /**
   * 获取登录用户信息
   */
  async getUserInfo (ctx) {
    let  userInfo = await userModel.findOne({where: {id: ctx.state.user.id}})
    //获取权限信息
    ctx.body =SystemUtil.createResult({success: true, message: '获取成功', data:{
      userInfo:userInfo
    }})
  }
}
