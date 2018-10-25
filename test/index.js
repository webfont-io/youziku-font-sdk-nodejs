const youziku = require('../src/index.js');

const youzikuFontClient = new youziku.youzikuFontClient("xxx", "http://localhost:8092");


//1.审核字体
/*
youzikuFontClient.auditFont({Url:"xxx"}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
})

*/
//2.根据唯一URL或font-family获取AccessKey
/*
youzikuFontClient.getAccessKey({
    //标识使用唯一的font-family获取AccessKey
    IsFontfamily: true,
    //对应条件的值
    Value: "xxx"
}).then(r => {
    var result = r.Result;
    if (result != null) {
        console.log(result.FontName);
        console.log(result.AccessKey);
        console.log(result.SourceUrl);
        console.log(result.FontId);
        console.log(result.FontUrlSha1);
    }
}, error => {
    console.log(error);
})
*/

//3.根据页容量获取已审核的字体的总页数
/*
const pageSize=5;
youzikuFontClient.getFontListPageCount(pageSize).then(a=>{
    console.log(a);
},error=>{
    console.log(error);
});
*/
//4.获取已审核的字体总条数
/*
youzikuFontClient.getFontListCount().then(a=>{
    console.log(a);
},error=>{
    console.log(error);
});
*/

//5.根据页码分页查询已审核通过的字体列表
/*
const pageSize = 5;
youzikuFontClient.getFontListPageCount(pageSize).then(a => {
    //总页数
    var pageCount=a.Count;
    console.log("共有" + pageCount + "页数据!");

    let pager = function (pageIndex) {
        if(pageIndex>pageCount){return;}
        console.log("\t第" + pageIndex + "页列表:");
        const jsonObj = {
            //当前页码
            PageIndex: pageIndex,
            //页容量
            PageSize: pageSize,
            //标识分页为将序和升序
            Desc:true
        }

        youzikuFontClient.getFontList(jsonObj).then(result => {
            console.log(result);
            console.log("\r\n");
            pager(++pageIndex);
        }, error => {
            console.log(error);
        });
    }

    pager(1);

}, error => {
    console.log(error);
});
*/

//6.字体打包
/*
youzikuFontClient.getFontPackage({AccessKey:'xxx'}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
});
*/

//7.删除字体
/*
youzikuFontClient.deleteFont({AccessKey:'  xxx '}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
});
*/

//8.更新字体(需求：AccessKey不变，字体变更)
/*
youzikuFontClient.updateFont({AccessKey:'xxx ',Url:'xxx'}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
});
*/
