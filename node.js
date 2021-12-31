const express = require("express")
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910627');
const schema = {
    username:String,
    password:String

}
const mydata = mongoose.model('testuser02', schema);
app.use('/',express.static('public'))

app.post("/register",(req,res)=>{
    console.log(req.query)
    // 获取用户提交的信息
    var postData = {
        username: req.query.username,
        password: req.query.password

    };
    mydata.findOne({username: postData.username}, function (err, data){
        if (data) {
            res.send('用户名已被注册');
        } else{
            const user = new mydata({ username: req.query.username,password:req.query.password });
            user.save()
            console.log('注册成功');
            res.sendfile('./public/login.html'); 
        }

    })
});

app.post("/login",(req,res)=>{
	var postData = {
        username: req.query.username,
        password: req.query.password,
    };
    mydata.findOne({username: postData.username,password: postData.password}, function (err, data) {
        console.log('data',data)
        if(data._doc.username){
            res.send('登录成功');
        }else{
            res.send('账号或密码错误')
        }
    } )
});

app.listen(10627)