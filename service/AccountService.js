const StringUtil = require('../utils/StringUtil.js')
const SystemUtil = require('../utils/SystemUtil.js')
const models = require("./models")
const account = models['account']
module.exports = class AccountService{

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
    const accountInfo = await account.findOne({where: {phone: phone}})
    const isExistsAccount = accountInfo != null
    if (!isExistsAccount) {
      const message = '新建账号' + phone + '成功'
      const data = await account.create({
        password: SystemUtil.enCodePassword(password),
        phone: phone
      })
      ctx.body = SystemUtil.createResult({success: true, message, data})
    } else {
      const message = '已存在' + phone + '手机的用户'
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }
}
