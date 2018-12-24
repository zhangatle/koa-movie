module.exports = `
doctype html
html
 head
  meta(charset='utf-8')
  meta(name='viewport' content='width=device-width, initial-scale=1.0')
  meta(http-equiv='X-UA-Compatible' content='ie=edge')
  title Koa server Pug
  link(href='https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.css' rel='stylesheet')
  script(src='https://cdn.bootcss.com/jquery/3.3.1/jquery.js')
  script(src='https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.js')
 body
  .container
   .row
    .col-md-8
     h1 Hi #{you}
     p This is #{me}
    .col-md-4
     p 测试动态 pug 模板引擎
`;