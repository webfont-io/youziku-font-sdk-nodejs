/**
 *@description Youziku Font SDK -Nodejs
 *@author gaobingbing
 *@description use axios module
 *@lastModifyDate 2018-10-16
 */

exports.youzikuFontClient = youzikuFontClient;

/**
 * @description import modules
 * @author gaobingbing
 */
var axios = require('axios');


/**
* @description youzikuFontClient
* @author gaobingbing
*/
function youzikuFontClient(apiKey, host) {

    //global setting
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    //网络模块
    function NetModuleImpl() {
        /**
         *@description youziku request common method
         *@author gaobingbing 
         */
        this.request = function (path, obj, callback) {

            var rq = axios.post(path, obj).then(function (res) {

                if (callback) {
                    callback(res.data);
                }

            }).catch(function (err) {
                console.log(err);
            })

        }

        /**
         *@description youziku request common method - GET
         *@author gaobingbing 
         */
        this.request_get = function (path, callback) {
            var rq = axios.get(path).then(function (res) {

                if (callback) {
                    callback(res.data);
                }

            }).catch(function (err) {
                console.log(err);
            })
        }
    }

    //核心模块
    function CoreModuleImpl() {


        /**
         *@description 审核字体
         *@author gaobingbing 
         */
        this.auditFont = function (apikey, obj, path, callback) {
            obj["ApiKey"] = apikey;
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }

        /**
         *@description 获取已审核的字体总条数
         *@author gaobingbing 
         */
        this.getFontListCount = function (path, callback) {
            youzikuConfig.NetModule.request_get(path, function (data) {

                callback(data);
            });
        }

        /**
        *@description 根据页容量获取已审核的字体的总页数
        *@author gaobingbing 
        */
        this.getFontListPageCount = function (path, callback) {
            youzikuConfig.NetModule.request_get(path, function (data) {

                callback(data);
            });
        }

        /**
       *@description 根据页码分页查询已审核通过的字体列表
       *@author gaobingbing 
       */
        this.getFontList = function (obj, path, callback) {
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }

        /**
       *@description 根据唯一的URL或font-family查询AccessKey
       *@author gaobingbing 
       */
        this.getAccessKey = function (obj, path, callback) {
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }

        /**
       *@description 字体打包
       *@author gaobingbing 
       */
        this.getFontPackage = function (apiKey, obj, path, callback) {
            obj["ApiKey"] = apiKey;
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }

        /**
            *@description 更新字体信息
            *@author gaobingbing 
            */
        this.updateFont = function (obj, path, callback) {
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }


        /**
           *@description 删除字体
           *@author gaobingbing 
           */
        this.deleteFont = function (obj, path, callback) {
            youzikuConfig.NetModule.request(path, obj, function (data) {

                callback(data);
            });
        }


    }

    //内部模块
    function HandlerModuleImpl() {

        this.getFontListPageCount = function (url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.getFontListPageCount(url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }

        this.getFontListCount = function (url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.getFontListCount(url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }


        this.getFontList = function (jsonObj, url) {

            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.getFontList(jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });

        };

        this.auditFont = function (jsonObj, apiKey, url) {

            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.auditFont(apiKey, jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });

        };

        this.getAccessKey = function (jsonObj, url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.getAccessKey(jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }

        this.getFontPackage = function (jsonObj, apiKey, url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.getFontPackage(apiKey, jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }

        this.updateFont = function (jsonObj, url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.updateFont(jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }

        this.deleteFont = function (jsonObj, url) {
            return new Promise(function (resolve, reject) {

                youzikuConfig.CoreModule.deleteFont(jsonObj, url, function (result) {
                    if (result.Code !== 200)
                        reject(result)
                    else
                        resolve(result);
                });

            });
        }


    }



    //有字库配置项
    let youzikuConfig = {
        CoreModule: new CoreModuleImpl(),
        HandlerModule: new HandlerModuleImpl(),
        NetModule: new NetModuleImpl()
    };

    let client = {
        ApiKey: apiKey,
        /**
         * 审核字体 
         */
        auditFont: function (jsonObj) {
            let url = this.Host + '/api/v1/fontAudit'
            return youzikuConfig.HandlerModule.auditFont(jsonObj, this.ApiKey, url);
        },
        getFontListPageCount: function (pageSize) {
            let url = this.Host + '/api/v1/fontlist?pageSize=' + pageSize;
            return youzikuConfig.HandlerModule.getFontListPageCount(url);
        },
        getFontListCount: function () {
            let url = this.Host + '/api/v1/fontlist';
            return youzikuConfig.HandlerModule.getFontListCount(url);
        },
        getFontList: function (jsonObj) {
            let url = this.Host + '/api/v1/fontlist';
            return youzikuConfig.HandlerModule.getFontList(jsonObj, url);
        },
        getAccessKey: function (jsonObj) {
            let url = this.Host + '/api/v1/fontAccessKey';
            return youzikuConfig.HandlerModule.getAccessKey(jsonObj, url);
        },
        getFontPackage: function (jsonObj) {
            let url = this.Host + '/api/v1/fontPackage';
            return youzikuConfig.HandlerModule.getFontPackage(jsonObj, this.ApiKey, url);
        },
        updateFont: function (jsonObj) {
            let url = this.Host + '/api/v1/fontUpdate';
            return youzikuConfig.HandlerModule.updateFont(jsonObj, url);
        },
        deleteFont: function (jsonObj) {
            let url = this.Host + '/api/v1/fontDelete';
            return youzikuConfig.HandlerModule.deleteFont(jsonObj, url);
        }


    };

    if (host) {
        client.Host = host;
    }
    return client;

}