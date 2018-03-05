const router = require('koa-router')()
const auth =   service.auth
/* 权限相关接口 */
router.post('/auth/login', (ctx) =>auth.login(ctx))

module.exports = router
