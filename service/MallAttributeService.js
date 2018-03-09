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
    let typeName = ctx.request.body.typeName
    let typeId = ctx.request.body.typeId
    const id = ctx.params.id
    if (StringUtil.isNull(typeName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '类型名称不能为空'})
      return
    }
    if(!await this.isExistsType({typeName,typeId})){
      await mallTypeModel.update({typeName,typeId}, {where: {id}})
      ctx.body = SystemUtil.createResult({success: true, message: '更新成功'})
    }else{
      ctx.body = SystemUtil.createResult({success: false, message: '更新失败,同级类型已存在' + typeName})
    }
  }

  async save (ctx) {
    let typeName = ctx.request.body.typeName
    let typeId = ctx.request.body.typeId
    let idLink = ctx.request.body.idLink

    if (StringUtil.isNull(typeName)) {
      ctx.body = SystemUtil.createResult({success: false, message: '类型名称不能为空'})
      return
    }
    if (!await this.isExistsType({typeName,typeId})) {
      const data = await mallTypeModel.create({
        typeName,typeId,idLink
      })
      ctx.body = SystemUtil.createResult({success: true, message: '新建成功', data})
    } else {
      const message = '同级类型已存在' + typeName
      ctx.body = SystemUtil.createResult({success: false,message})
    }
  }

  async isExistsType({typeName,typeId}){
    const accountInfo = await mallTypeModel.findOne({where: {typeName,typeId}})
    return accountInfo != null
  }
}
