# 一、介绍

## 1．SDK适用语言<br/>
SDK适用于在Nodejs中调用有字库独立部署系统中的字体管理服务

## 2.特性<br/>　　
字体数据源彻底独立

## 3.功能<br/>　　
1.审核字体 <br/>
2.删除字体 <br/>
3.更新字体 <br/>
4.分页查看已审核的字体列表<br/>
5.根据字体文件URL或font-family查询AccessKey<br/>
6.查看字体列表总条数 <br/>

# 二、引用
## npm安装
``` npm
npm install youziku-font
```

# 三、Sample
## 1.初始化youzikuFontClient
### 1.1 按期授权
``` node
var youziku =require("youziku-font");
var youzikuFontClient = new youziku.youzikuFontClient("你的apiKey","http://localhost:8092");
```
### 1.2 终身授权
``` node
var youziku =require("youziku-font");
var youzikuFontClient = new youziku.youzikuFontClient("disconnect","http://localhost:8092");
```

## 2.调用接口

### 2.1审核字体
``` node
youzikuFontClient.auditFont({Url:"xxx.ttf"}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
})

```

### 2.2删除字体
``` node
youzikuFontClient.deleteFont({AccessKey:'  xxx '}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
});

```

### 2.3更新字体（可以是当前AccessKey对应的字体文件URL或一个从来没有被审核过的全新文件）
``` node
youzikuFontClient.updateFont({AccessKey:'xxx ',Url:'xxx.ttf'}).then(result=>{
    console.log(result);
},error=>{
    console.log(error);
});
 
```

### 2.4分页查看已审核的字体列表
``` node 
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

```
### 2.5根据字体文件URL或font-family查询AccessKey
``` node

youzikuFontClient.getAccessKey({
    //标识使用唯一的font-family获取AccessKey
    //IsFontfamily=true表示使用font-family查询
    //IsFontfamily=false表示使用字体文件URL查询
    IsFontfamily:true,
    //对应条件的值
    Value:" 你的font-family"
}).then(r=>{
 var result=r.Result;
if(result!=null){
    console.log(result.FontName);
    console.log(result.AccessKey);
    console.log(result.SourceUrl);
    console.log(result.FontId);
    console.log(result.FontUrlSha1);
}
},error=>{
    console.log(error);
})

```

### 2.6查看字体列表总条数
``` node 
youzikuFontClient.getFontListCount().then(a=>{
    console.log(a);
},error=>{
    console.log(error);
});

```
