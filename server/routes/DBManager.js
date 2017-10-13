function DBManager() {

}
DBManager.insertData = function(db, callback) {
    //连接到表 site

    callback();
}
DBManager.delData = function(db, callback) {
//连接到表
        var collection = db.collection('goods');
//删除数据
        var
            whereStr =
                {"name":'菜鸟教程'};
        collection.remove(whereStr,
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
DBManager.selectData = function(db ,tablename,callback) {
//连接到表
        var collection = db.collection(tablename);
//查询数据
         callback(collection);
        }
module.exports=DBManager;