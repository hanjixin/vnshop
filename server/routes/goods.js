
var router = require("express");
var express = require('express');
var router = express.Router();
var User = require("../model/users");
var Goods = require("../model/goods")
var  MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://local' +
    'host:27017/shop';
var mongoose = require('mongoose');
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

var insertData = function(db, callback)
    {
//连接到表site
        var collection = db.collection('goods');
//插入数据
        var data = [{"_id":{"oid":"58c284b13a1bb9aa7033801b"},"productId":"201710003","productName":"平衡车","salePrice":1999,"productImage":"pingheng.jpg","productUrl":""},
            {"_id":{"oid":"58c284d7117a2e6599abef5e"},"productId":"201710004","productName":"头戴式耳机-3","salePrice":80,"productImage":"2.jpg","productUrl":""},
            {"_id":{"oid":"58c284e6117a2e6599abef5f"},"productId":"201710005","productName":"小米笔记本","salePrice":3549,"productImage":"note.jpg","productUrl":""},
            {"_id":{"oid":"58c284f4117a2e6599abef60"},"productId":"201710006","productName":"小米6","salePrice":2499,"productImage":"mi6.jpg","productUrl":""},
            {"_id":{"oid":"58e704ef98dab115d336b3f1"},"productId":"201710002","productName":"智能插线板","salePrice":59,"productImage":"6.jpg","productUrl":""},
            {"_id":{"oid":"58e7050398dab115d336b3f2"},"productId":"201710007","productName":"自拍杆","salePrice":39,"productImage":"zipai.jpg","productUrl":""},
            {"_id":{"oid":"58e7050c98dab115d336b3f3"},"productId":"201710008","productName":"小米净水器","salePrice":1999,"productImage":"8.jpg","productUrl":""},
            {"_id":{"oid":"58e7051698dab115d336b3f4"},"productId":"201710009","productName":"IH 电饭煲","salePrice":999,"productImage":"9.jpg","productUrl":""},
            {"_id":{"oid":"58e7052198dab115d336b3f5"},"productId":"201710010","productName":"小米电视4A","salePrice":2099,"productImage":"10.jpg","productUrl":""},
            {"_id":{"oid":"58e7052a98dab115d336b3f6"},"productId":"201710011","productName":"Ear1000","salePrice":1000,"productImage":"11.jpg","productUrl":""},
            {"_id":{"oid":"58e7053298dab115d336b3f7"},"productId":"201710012","productName":"Ear1100","salePrice":1100,"productImage":"12.jpg","productUrl":""},
            {"_id":{"oid":"58e7053c98dab115d336b3f8"},"productId":"201710013","productName":"Ear2000","salePrice":2000,"productImage":"13.jpg","productUrl":""},
            {"_id":{"oid":"58e7054798dab115d336b3f9"},"productId":"201710014","productName":"Ear1600","salePrice":1600,"productImage":"14.jpg","productUrl":""},
            {"_id":{"oid":"58e7055198dab115d336b3fa"},"productId":"201710015","productName":"Ear1200","salePrice":1200,"productImage":"15.jpg","productUrl":""},
            {"_id":{"oid":"58e7057798dab115d336b3fb"},"productId":"201710016","productName":"Ear700","salePrice":700,"productImage":"16.jpg","productUrl":""},
            {"_id":{"oid":"58e7058498dab115d336b3fc"},"productId":"201710017","productName":"小钢炮蓝牙音箱","salePrice":129,"productImage":"1.jpg","productUrl":""},
            {"_id":{"oid":"58e7058d98dab115d336b3fd"},"productId":"201710018","productName":"智能摄像机","salePrice":389,"productImage":"photo.jpg","productUrl":""}
        ];
        collection.insert(data,
            function(err,
                     result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                callback(result);
            });}

var selectData = function(db, callback,vlaue)
        {
//连接到表
        var collection = db.collection('goods');
           console.log(vlaue.query.sort)
    if(isNaN(parseInt(vlaue.query.sort))&&!vlaue.query.level){
               console.log(55555);
        let currentPage = (parseInt(vlaue.query.page) > 0) ? parseInt(vlaue.query.page) : 1; //第几页
        let pagesize = (parseInt(vlaue.query.pagesize) > 0) ? parseInt(vlaue.query.pagesize) : 8; //每页显示多少条

        let skip = (currentPage - 1) * pagesize;

        // 数据库一共有17条数据 每页显示8条 第二页 从第九条开始 limit 从第9条起数8条为止 这个8就是limit
        //
        // let goodModel = Goods.find(param).sort({ 'salePrice': sort }).skip(skip).limit(pagesize);
        collection.find().skip(skip).limit(pagesize).toArray(function(err, result)
{
    if(err)
    {
        console.log('Error:'+
            err);
        return;
    }
    callback(result);
    return;
})
    }
    else if(vlaue.query.level){
        let  arr=[[0,100],[100,500],[500,1000],[1000,5000]]
        collection.find({salePrice : {$gte : arr[vlaue.query.level][0],$lte : arr[vlaue.query.level][1]}}).toArray(function(err, result)
        {
            if(err)
            {
                console.log('Error:'+
                    err);
                return;
            }
            callback(result);
            return;
        })
    }
  else {
//查询数据
            var whereStr = {};
            collection.find().sort({salePrice:parseInt(vlaue.query.sort)}).toArray(function(err, result)
            {
                if(err)
                {
                    console.log('Error:'+
                        err);
                    return;
                }
                callback(result);
            });}
}

// MongoClient.connect(DB_CONN_STR,
//     function(err, db)
//     {
//         console.log("连接成功！");
//         insertData(db, function(result)
//         {
//             console.log(result);
//         });
//         selectData(db,function (result) {
//             console.log(result);
//
//         })
//     });
router.get('/list', function(req, res, next) {
     console.log(req.query)
    MongoClient.connect(DB_CONN_STR,
        function(err, db)
        {
            console.log("连接成功！");
            // insertData(db, function(result)
            // {
            //     console.log(result);
            // });
            selectData(db,function (result) {
                // console.log(result);
                res.json({status:200,data:result})
            },req)
        })
});
router.post("/addCart",function (req,res,next) {
    let userId =req.body.userId;
    let productId = req.body.productId;


      console.log(productId);

        User.findOne({userId:"100000077"},function(err, userDoc) {                 //console.log( userDoc.cartList);
            if(err)
            {console.log('Error:'+ rr);
                return;
            }
            let goodItem = '';

            userDoc.cartList.forEach(function(item) {
                if (item.productId == productId) {
                    // 此时表示在购物车列表存在这个商品
                    goodItem = item;
                    item.productNum++;
                }
            })

            // 如果不是第一次加入购物车
            if (goodItem) {
                console.log("成功")
                userDoc.save(function(err3, doc3) {
                    if (err3) {
                        res.json({ status: "1", msg: err3.message })
                    } else {
                        res.json({ status: 0, msg: '', result: '商品数量添加成功！' })
                    }
                })
            }else{
                Goods.findOne({productId:productId},function (err, docresult) {
                // console.log(docresult)
                docresult.productNum = 1;
                userDoc.cartList.push(docresult);
                console.log(userDoc.cartList);
               userDoc.save(function(err2,doc2) {
                    if (err2) {
                        res.json({ status: 1, msg: err2.message })
                    } else {
                        res.json({ status: 0, msg: '', result: "加入购物车成功" })
                    }
                })
            });


            }
        });

    })
router.post("/addAddress",function (req,res,next) {
    let userId =req.body.userId;
    let name=req.body.name;
    let streetName= req.body.streetName;
    let tel = req.body.tel;
    let postCode = req.body.postCode;
    let isDefault = req.body.isDefault;
    if(!userId||!name||!tel||!postCode||!isDefault||!streetName){
        res.send({
            status:1,
            msg:"参数缺失"
        })
        return;
    }
    User.findOne({userId:userId},function(err, userDoc) {
        //console.log( userDoc.cartList);
        // if(err)
        // {console.log('Error:'+ rr);
        //     return;
        // }

        let addrItem = '';
        if(isDefault){
        userDoc.addressList.forEach(function(item) {
                // 此时表示在清除默认标记
               item.isDefault=false;
        })
        }
        var obj={};
        // let userId =req.body.userId;
        // let name=req.body.name;
        // let streetName= req.body.streetName;
        // let tel = req.body.tel;
        // let postCode = req.body.postCode;
        // let isDefault = req.body.isDefault;
        obj.addressId = "10000"+(userDoc.addressList.length+2)
        obj.name=name;
        obj.streetName = streetName;
        obj.tel= tel;
        obj.postCode = postCode;
        obj.isDefault = isDefault;
        userDoc.addressList.push(obj);
        userDoc.save(function (err,result) {
            if (err) {
                res.json({ status: "1", msg: err3.message })
            } else {
                res.json({ status: 0, msg: '添加地址成功！', result:userDoc.orderList})
            }
        })



    });

})
router.post("/addOrder",function (req,res,next) {
    let userId =req.body.userId;

    User.findOne({userId:"100000077"},function(err, userDoc) {
        //console.log( userDoc.cartList);
        // if(err)
        // {console.log('Error:'+ rr);
        //     return;
        // }
        if (err) {
            res.json({ status: "1", msg: err3.message })
        } else {
            res.json({ status: 0, msg: '获取订单列表成功！', result:userDoc.orderList})
        }


    });

})//todo
router.get("/lookCart",function (req,res,next) {
    let userIds =req.cookies.userId;
    console.log(userIds)
    User.findOne({'userId':userIds},function(err, userDoc) {
        //console.log( userDoc.cartList);
        // if(err)
        // {console.log('Error:'+ rr);
        //     return;
        // }
        // console.log(userDoc)
        if (err) {
            res.json({ status: "1", msg: err3.message })
        } else {
            res.json({ status: 0, msg: '获取购物车列表成功！', result:userDoc.cartList })
        }


    });

})
router.get("/lookAddress",function (req,res,next) {
    let userIds =req.cookies.userId;
    console.log(userIds)
    User.findOne({userId:userIds},function(err, userDoc) {
        //console.log( userDoc.cartList);
        // if(err)
        // {console.log('Error:'+ rr);
        //     return;
        // }
        console.log(userDoc.addressList)
        if (err) {
            res.json({ status: "1", msg: err.message })
        } else {
            res.json({ status: 0, msg: '获取收货地址列表成功！', result:userDoc.addressList})
        }


    });

})
router.get("/lookOrder",function (req,res,next) {
    let userIds =req.cookies.userId;

    User.findOne({userId:userId},function(err, userDoc) {
        //console.log( userDoc.cartList);
        // if(err)
        // {console.log('Error:'+ rr);
        //     return;
        // }
        if (err) {
            res.json({ status: "1", msg: err3.message })
        } else {
            res.json({ status: 0, msg: '获取订单列表成功！', result:userDoc.orderList})
        }


    });

})//todo
module.exports=router;