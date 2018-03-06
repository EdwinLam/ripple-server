const router = require('koa-router')()
const {authService} = require('../service')

/* 权限相关接口 */
router.post('/auth/login', (ctx) =>authService.login(ctx))

module.exports = router
