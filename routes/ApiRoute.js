const router = require('koa-router')()
const {accountService,nodeService} = require('../service')

/* 账号相关接口 */
router.post('/account/save', (ctx) => accountService.save(ctx))
router.get('/account/queryPage', (ctx) => accountService.queryPage(ctx))
router.get('/account/getAccount', (ctx) => accountService.getAccount(ctx))

/* 节点相关接口*/
router.get('/node/all', (ctx) => nodeService.all(ctx))

module.exports = router
