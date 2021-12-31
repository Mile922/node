const express = require("express")
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://172.21.2.236:27017/190110910627');
mongoose.connection.once("open",err=>{
    if(err)
        throw err;
    console.log("database connection success!!");
})
const schema = {
    username:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    }

}
const mydata = mongoose.model('testuser02', schema);
const mydata1 = mongoose.model('manager', schema);
app.use('/',express.static('public'))

app.get("/register",(req,res)=>{
    console.log(req.query)
    // 获取用户提交的信息
    var postData = {
        username: req.query.username,
        password: req.query.password,

    };
    mydata.findOne({username: postData.username}, function (err, data){
        if (data) {
            res.send('用户名已被注册');
        } else{
            const u = new mydata({ username: req.query.username,password:req.query.password });
            u.save();
            console.log('注册成功');
            res.sendfile('./public/userlogin.html'); 
        }

    })
});
//管理员登录 只能用 wt 1246
app.get("/managelogin",(req,res)=>{
	var postData = {
        username: req.query.username,
        password: req.query.password,
    };
    mydata1.findOne({username: postData.username,password: postData.password}, function (err, data) {
        console.log('data',data)
        if(data){
            res.send('管理员页面');
        }else{
            res.send('账号或密码错误')
        }
    } )
});

//用户登录
app.get("/login",(req,res)=>{
	var postData = {
        username: req.query.username,
        password: req.query.password,
    };
    mydata.findOne({username: postData.username,password: postData.password}, function (err, data) {
        console.log('data',data)
        if(data){
            res.send('用户页面');
        }else{
            res.send('账号或密码错误')
        }
    } )
});

app.listen(10627)