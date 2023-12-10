var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var userRouter = require('./routes/admin/userRoute');
const JWT = require('./util/JWT');



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

//验证token每次发请求之前,需要放到路由前面,不然全局路由就不是在路由前面使用了
app.use((req, res, next) => {

  if (req.url === '/adminapi/user/login') {

    next()
    return
  }
  else {

    const token = req.headers['authorization'].split(' ')[1]//真6666,所以说之前发的请求都没有执行到这个else,authorization没有加引号
    const payload = JWT.verifyToken(token)


    if (token) {

      if (payload) {

        const newToken = JWT.generateToken({ id: payload.id }, '1d')//这里传的应该与之前的一样

        res.header.Authorization = newToken
        next()

      } else {
        res.send.status(401).send({ message: '过期了' })
      }

    }

  }

})
app.use(indexRouter);
app.use(userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
