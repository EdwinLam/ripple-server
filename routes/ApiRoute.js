const router = require('koa-router')()
const {accountService,nodeService,userService,mallTypeService} = require('../service')

/* 账号相关接口 */
router.post('/account/save', (ctx) => accountService.save(ctx))
router.get('/account/queryPage', (ctx) => accountService.queryPage(ctx))
router.get('/account/getAccount', (ctx) => accountService.getAccount(ctx))
router.del('/account/:id', (ctx) => accountService.destroy(ctx))
router.post('/account/:id', (ctx) => accountService.update(ctx))

/* 商品类型相关接口 */
router.post('/mall/type/save', (ctx) => mallTypeService.save(ctx))
router.get('/mall/type/queryPage', (ctx) => mallTypeService.queryPage(ctx))
router.del('/mall/type/:id', (ctx) => mallTypeService.destroy(ctx))
router.post('/mall/type/:id', (ctx) => mallTypeService.update(ctx))
router.get('/mall/type/findAll', (ctx) => mallTypeService.findAll(ctx))

/* 用户相关接口*/
router.get('/user/findUserByAccountId', (ctx) => userService.findUserByAccountId(ctx))
router.post('/user/unBindUser', (ctx) => userService.unBindUser(ctx))
router.get('/user/findBindUserPage', (ctx) => userService.findBindUserPage(ctx))
router.post('/user/bindUser', (ctx) => userService.bindUser(ctx))

/* 节点相关接口*/
router.get('/node/all', (ctx) => nodeService.all(ctx))

module.exports = router
