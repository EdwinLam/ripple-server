const router = require('koa-router')()
const {accountService,nodeService,userService} = require('../service')

/* 账号相关接口 */
router.post('/account/save', (ctx) => accountService.save(ctx))
router.get('/account/queryPage', (ctx) => accountService.queryPage(ctx))
router.get('/account/getAccount', (ctx) => accountService.getAccount(ctx))
router.del('/account/:id', (ctx) => accountService.destroy(ctx))
router.post('/account/:id', (ctx) => accountService.update(ctx))

/* 用户相关接口*/
router.get('/user/findUserByAccountId', (ctx) => userService.findUserByAccountId(ctx))
router.post('/user/unBindUser', (ctx) => userService.unBindUser(ctx))
router.get('/user/findBindUserPage', (ctx) => userService.findBindUserPage(ctx))
router.post('/user/bindUser', (ctx) => userService.bindUser(ctx))

/* 节点相关接口*/
router.get('/node/all', (ctx) => nodeService.all(ctx))

module.exports = router
