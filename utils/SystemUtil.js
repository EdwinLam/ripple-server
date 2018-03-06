const SystemConfig = require('../config/SystemConfig')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
module.exports = class SystemUtil {
  /* 创建jwt */
  static createJwt ({account,user}) {
    return jwt.sign({
      id:account.id,
      userId:user.id,
      accountName: account.phone,
      userName:user.userName
    }, SystemConfig.secret)
  }

  /* 密码加密 */
  static enCodePassword (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  /* 统一返回格式标砖 */
  static createResult ({success, message, data}) {
    return {
      success: success,
      message: message,
      data: data  ?  data :{}
    }
  }

  /* 检查密码 */
  static checkPassword (password, dbPassword) {
    return bcrypt.compareSync(password, dbPassword)
  }
}