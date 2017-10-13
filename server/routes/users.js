var express = require('express');
var router = express.Router();
var mongoDB=require("./MGDB");
var DBMan=require("./DBManager");
var User = require("../model/users");
var mongoose = require('mongoose');
var until =require('./util')
mongoose.connect('mongodb://localhost:27017/shop');

mongoose.connection.on('connected', function() {
    console.log("mongondb connected success");
})

mongoose.connection.on('error', function() {
    console.log("mongondb connected fail");
})

mongoose.connection.on('disconnected', function() {
    console.log("mongondb connected disconnected");
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    console.log(req.body);
    var info={};
    var result=null;
    if(!req.body.username||!req.body.password){
        info={
            code:3005,
            message:"注册失败，username,password为必传字段",

        }
        res.send(info);
        return;
    }
    mongoDB.CON(function (err,db) {
        DBMan.insertData(db,function () {
            db.collection("users").createIndexes([
                {
                    key: { userName:1},
                    background: true,
                    sparse: true,
                    unique: true,
                },
            ]);
            var collection = db.collection('users');
            //插入数据
            var data = [{"userName":req.body.username,"password":req.body.password,}];
            // var data=[{"userName":"hanjixin","password":"123456","phone":"15501259989"}];
            collection.insert(data, function(err, result) {

                if(err)
                {
                    console.log('Error:'+ err);
                    if( err.code==11000)
                        res.send({
                            code :3007,
                            message:"用户名已存在"
                        })
                    return;
                }
                console.log(result)
                res.send({
                    code:200,
                    message:"注册成功"
                })
                
            });
        })
    })

    console.log(req.body);


});


router.post('/login', function(req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    // 把用户名和密码，去数据库查询，看看是否存在
    User.findOne(param, function(err, doc) {
        if (err) { res.json({ status: 1, msg: '用户名或密码错误' }) }
        else {

            if (doc) {
                res.cookie('userId', doc.userId, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })

                res.cookie('userName', doc.userName, {
                    path: '/',
                    maxAge: 1000 * 60 * 60
                })
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }else {
                res.json({ status: 1, msg: '用户名或密码错误' })
            }
        }
    })
})


router.post("/checkLogin", function(req, res, next) {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }
})


router.post('/logout', function(req, res, next) {
    res.cookie('userId', "", {
        path: '/',
        maxAge: -1
    });

    res.json({
        status: 0,
        msg: '',
        result: "退出成功"
    })
});
router.post('/cartEdit', function(req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked,
        productNum = req.body.productNum;
         console.log(userId,productId,productNum,checked)
    User.update({ 'userId': userId,'cartList.productId':productId},{$set:{
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    }}, function(err, doc) {
        console.log(doc)
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: '更新购物车成功'
            })
        }
    })
});
router.post('/editCheckAll', function(req, res, next) {
    let userId = req.cookies.userId,
        checkAll = req.body.checkAll;

    User.findOne({ 'userId': userId }, function(err, user) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            user.cartList.forEach((item) => {
                item.checked = checkAll;
            })

            user.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({ status: '0', msg: '', result: '操作成功' })
                }
            })
        }
    })
});
router.post('/delCart', function(req, res, next) {
    var userId = req.cookies.userId,
        productId = req.body.productId;
    User.update({
        userId: userId //确定的条件
    }, {
        // 操作的事情
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, function(err, doc) {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            res.json({ status: 0, msg: '', result: '商品删除成功' })
        }
    })
});
router.post('/delAddress', function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    User.update({
        userId: userId //确定的条件
    }, {
        // 操作的事情
        $pull: {
            'addressList': {
                'addressId': addressId
            }
        }
    }, function(err, doc) {
        if (err) {
            res.json({ status: 1, msg: err.message, result: '' })
        } else {
            res.json({ status: 0, msg: '', result: '地址删除成功' })
        }
    })
});
router.post('/setDefault', function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId;
    console.log(addressId)
    User.findOne({userId:userId},function (err,doc) {
        doc.addressList.forEach(item=>{
            "use strict";
            console.log(item)
            if(item.addressId == addressId){
                console.log(item)
                item.isDefault=true;
            }else
            {
                item.isDefault=false;
            }

        });
        doc.save(function (err1,doc2) {
            if(err1){
                res.json({
                    status:1,
                    msg:err1.message
                    }
                )
            }
            else {
                res.json({
                        status:0,
                        msg:'设置默认收货地址成功'
                    }
                )
            }
        })
    })
});
router.post("/payMent", function(req, res, next) {
    var userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            var address = '',
                goodsList = [];
            // 获取当前用户的地址信息
            doc.addressList.forEach((item) => {
                if (item.addressId == addressId) {
                    address = item;
                }
            })

            // 获取用户购物车，项购买的商品

            doc.cartList.filter((item) => {
                if (item.checked == '1') {
                    goodsList.push(item);
                }
            })
            goodsList.forEach(item=>{
                console.log(item)
                "use strict";
                User.update({
                    userId: userId //确定的条件
                }, {
                    // 操作的事情
                    $pull: {
                        'cartList': {
                            'productId': item.productId
                        }
                    }
                },function (err) {
                    console.log(err)
                })
            })

            var platform = '622';
            var r1 = Math.floor(Math.random() * 10);
            var r2 = Math.floor(Math.random() * 10);
            var sysDate = new Date().Format('yyyyMMddhhmmss');

            var orderId = platform + r1 + sysDate + r2;
            var createData = new Date().Format('yyyy-MM-dd hh:mm:ss');

            var order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '10',
                createData: createData
            }

            doc.orderList.push(order);
            doc.save(function(err1, doc1) {
                if (err1) {
                    res.json({ 'status': "1", msg: err.message, result: '' })
                } else {
                    res.json({ 'status': "0", msg: '', result: { orderId: order.orderId, orderTotal: orderTotal } })
                }
            })
        }
    })
})
router.get("/orderDetail", function(req, res, next) {
    var userId = req.cookies.userId,
        orderId = req.param("orderId");
    User.findOne({ userId: userId }, function(err, userInfo) {
        if (err) {
            res.json({ 'status': "1", msg: err.message, result: '' })
        } else {
            var orderList = userInfo.orderList;
            if (orderList.length > 0) {
                var orderTotal = 0;
                orderList.forEach((item) => {
                    if (item.orderId == orderId) {
                        orderTotal = item.orderTotal;
                    }
                })
                if (orderTotal > 0) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            orderId: orderId,
                            orderTotal: orderTotal
                        }
                    })
                }
            } else {
                res.json({ status: '1010', msg: "当前用户未创建订单", result: '' })
            }
        }
    })
})
router.post('/findpassword', function(req, res, next) {
    var info={};
    var result=null;
    res.send({
        code:404,
        message:"接口未开放，请联系管理员"
    })
});
router.post('/updateinfo', function(req, res, next) {
    var imgData = req.body.imgData;
    // 构建图片名
    var fileName = req.body.userid + '.png';
    // 构建图片路径
    var filePath = './img/' + fileName;
    //过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filePath, dataBuffer, function(err) {
        if(err){
            res.end(JSON.stringify({status:'102',msg:'文件写入失败'}));
        }else{
            //生成上传
            var putPolicy = new qiniu.rs.PutPolicy(bucket+":" + fileName);
            var token = putPolicy.token();
            var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(token, fileName, filePath, extra, function(err, ret) {
                if(!err) {
                    // 上传成功， 处理返回值
                    // ret.key 是图片的名字
                    var imageSrc = 'http://ovre0qmr5.bkt.clouddn.com/' + ret.key;
                    res.end(JSON.stringify({status:'100',msg:'上传成功',imageUrl:imageSrc}));
                } else {
                    // 上传失败， 处理返回代码
                    res.end(JSON.stringify({status:'101',msg:'上传失败',error:ret}));
                }
                // 上传之后删除本地文件
                fs.unlinkSync(filePath);
            });
        }
    });
});
router.post('/lookinfo', function(req, res, next) {
    if(req.body.id) {
      res.send({
          code:3009,
          message:"未输入id"
      })
        return;
    }
    mongoDB.CON(function (err,db) {
        DBMan.selectData(db,"users",function (collection) {
            var whereStr = {_id:req.body.id};
            collection.find(whereStr).toArray(function(err, result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                console.log(result);
                if (!result.length){
                    info={
                        code:3007,
                        message:"没有传入id"
                    }
                }
                else {
                    info.code=200;
                    info.message="登录成功";
                    info.data=result[0];

                }
                res.send(info);
            });
        })
    })

});
router.get('/smscode',function(req, res, next){
    var code=parseInt(Math.random()*10)+""+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10)+parseInt(Math.random()*10);
    console.log(code);
    var info = req.query.phone?{
        code:200,
        message:"验证码发送成功",
        data:{code:code}
    }: {
        code: 3011,
        message: "手机号为空",
    }

    if(req.query.phone){
        console.log(req.query.phone)
        console.log("发送的验证码为："+code);
        alidayu.smsSend({
            sms_free_sign_name: '我的小秘书',
            sms_param: {"code": code, "product": "ST"},
            rec_num:req.query.phone,
            sms_template_code: 'SMS_60420032'
        },function () {
            console.log(arguments);
            res.send(info);
        });

    }

});
module.exports = router;
