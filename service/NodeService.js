const {SystemUtil} = require('../utils')
const {nodeModel} = require("../models")

module.exports = class NodeService{
  /*
   * 获取所有节点
   */
  async all (ctx) {
    let success = false
    const data =await nodeModel.findAll()
    ctx.body = SystemUtil.createResult({success,  data})
  }
}
