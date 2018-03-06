const SystemUtil = require('./SystemUtil')
module.exports = class QueryUtil {
  /**
   * 分页查询数据
   * @param {ctx}
   * @param {dao} 数据库模型
   */
  static async queryPage (ctx,dao) {
    let pageNo = parseInt(ctx.query.pageNo) || 1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    delete ctx.query.pageNo
    delete ctx.query.pageSize
    let result = await dao.findAndCount({
      where: ctx.query,
      limit: pageSize,
      offset: (pageNo - 1) * pageSize
    })
    result.pageNo = pageNo
    result.pageSize = pageSize
    ctx.body = SystemUtil.createResult({success: true, message: '成功获取', values: result})
  }
}
