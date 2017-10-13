var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/shop'; //# 数据库为 runoob



// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     insertData(db, function(result) {
//         console.log(result);
//         // db.close();
//     });
// });
//insertData(db,function (res) {
// console.log(res)
// })
// delData(db,function (result) {
//     // console.log(result);
// })
// selectData(db,
//     function(result)
//     {
//         console.log(result);
//         db.close();
//     });
/**
 * insertData(db,function (res) {
                console.log(res)
            })
 // delData(db,function (result) {
            //     // console.log(result);
            // })
 selectData(db,
 function(result)
 {
     console.log(result);
     db.close();
 });s
 */

MongoClient.CON=function (callback) {
    MongoClient.connect(DB_CONN_STR,
        function(err, db) {
            console.log("连接成功！");
            callback(err, db);

        });
}
module.exports=MongoClient;