const router = require('koa-router')()
const account =   service.account
const node =   service.node
/* 权限相关接口 */
router.post('/auth/login', (ctx) =>auth.login(ctx))

/* 账号相关接口 */
router.post('/account/save', (ctx) => account.save(ctx))
/* 节点相关接口*/
router.get('/node/all', (ctx) => node.all(ctx))

module.exports = router
