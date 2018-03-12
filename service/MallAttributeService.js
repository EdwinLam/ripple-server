const {StringUtil,QueryUtil,SystemUtil} =  require('../utils')
const {mallAttributeModel} = require("../models")
module.exports = class TypeService{
  async queryPage(ctx){
    if(ctx.query.attributeName){
      ctx.query.attributeName={$like: '%'+ctx.query.attributeName+'%'}
    }
    return QueryUtil.queryPage(ctx,mallAttributeModel)
  }

  /*
   * 删除
   * @param {Number} id 唯一id
   */
  async destroy (ctx) {
    const count = await mallAttributeModel.destroy({where: {id: ctx.params.id}})
    const isSuccess = count > 0
    const message = isSuccess ? '删除数据成功' : '删除数据失败'
    ctx.body = SystemUtil.createResult({success: isSuccess, message: message})

  }

  async update(ctx){
    let attributeName = ctx.request.body.attributeName
    let typeId = ctx.request.body.typeId
    const id = ctx.params.id
    if (StringUtil.isNull(attributeName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '属性名称名称不能为空'})
      return
    }
    if(!await this.isExistsAttribute({attributeName,typeId})){
      await mallAttributeModel.update({attributeName,typeId}, {where: {id}})
      ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
    }else{
      ctx.body = SystemUtil.createResult({success: false, message: '该类型下已存在[' + attributeName+']'})
    }
  }

  async save (ctx) {
    let attributeName = ctx.request.body.attributeName
    let typeId = ctx.request.body.typeId

    if (!await this.isExistsAttribute({attributeName,typeId})) {
      const data = await mallAttributeModel.create({
        attributeName,typeId
      })
      ctx.body = SystemUtil.createResult({success: true, message: '新建成功', data})
    } else {
      const message = '该类型下已存在[' + attributeName+']'
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }

  async isExistsAttribute({attributeName,typeId}){
    const isExists = await mallAttributeModel.findOne({where: {attributeName,typeId}})
    return isExists != null
  }
}
