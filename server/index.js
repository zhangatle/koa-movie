const Koa = require('koa');
const views = require("koa-views");
const {resolve} = require("path");
const {connect, initSchemas} = require('./database/init');
const router = require('./routes');
const app = new Koa();

;(async () => {
    await connect();
    initSchemas();
    // require('./tasks/api');

})();

app.use(router.routes()).use(router.allowedMethods());

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}));

app.use(async (ctx, next) => {
    await ctx.render('index')
});

app.listen(2345);