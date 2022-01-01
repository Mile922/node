const express = require("express")
const app = express()
const template = require('art-template');
const ejs=require('ejs')
const path = require('path');
const mongoose = require('mongoose');
template.defaults.root = path.join(__dirname, 'public');
mongoose.connect('mongodb://172.21.2.236:27017/190110910627');
mongoose.connection.once("open",err=>{
    if(err)
        throw err;
    console.log("database connection success!!");
})
//用户管理员
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

const movieschema = mongoose.Schema({
    moviename:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    }
});

const buyschema = {
    userbuy:{
        type:String,
        unique:true,
        require:true
    },
    buy:{
        type:String,
        require:true
    }

}

const mydata = mongoose.model('testuser02', schema);
const mydata1 = mongoose.model('manager', schema);
const mydata2 = mongoose.model('movie', movieschema);
const mydata3 = mongoose.model('dingdan', buyschema);
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
            res.sendfile('./public/manager.html'); 
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
            res.sendfile('./public/user.html'); 
        }else{
            res.send('账号或密码错误')
        }
    } )
});

//管理员添加电影
app.get("/add",(req,res)=>{
	var postData = {
        moviename: req.query.moviename,
        director: req.query.director,
    };
    const m = new mydata2({ moviename: req.query.moviename,director:req.query.director });
        m.save();
        res.send('添加成功')
});

//管理员下架电影
app.get("/delete",(req,res)=>{
	var postData = {
        moviename: req.query.moviename,
    };
      
        mydata2.deleteOne({name:req.query.moviename},(err,data)=>{
            if(err){
                res.send('下架失败')
            }
            else{
                res.send('下架成功！！')
            }
        })

  

});

//用户查询电影名
app.get("/find",(req,res)=>{
	var postData = {
        moviename: req.query.moviename,
    };
    mydata2.findOne({moviename: postData.moviename}, function (err, data) {
        console.log('data',data)
        if(data){   
            ejs.renderFile('result.html', {result:'电影名:'+'《'+data.moviename+'》'+'导演:'+data.director}, function(err, str){
                if(err){console.log("File is error.")}
                else {
                res.setHeader('Content-Type', 'text/html')
                res.end(str)
                }
            });
             //res.send('电影名：'+'《'+data.moviename+'》'+'  ,  '+'导演:'+data.director)
        }else{
            res.send('未查询到该电影')
        }
    } )
});


// 呈递在售电影信息列表页面
app.get('/list', async (req, res) =>{
	// 查询电影信息
	let students = await mydata2.find();
	console.log(students);
	let html = template('list.art', {
		movies: students
	})
	res.end(html)
})

//用户buy电影
app.get("/buy",(req,res)=>{
	var postData = {
        buym: req.query.buym,
    };

    mydata2.findOne({moviename: postData.buym}, function (err, data) {
        if(data){   
            const b = new mydata3({ userbuy: req.query.usern,buy:req.query.buym });
            b.save();
            res.send('购买成功')
        }else{
            res.send('未查询到该电影')
        }
    } )
});


app.listen(10627)