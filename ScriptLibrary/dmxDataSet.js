/*
HTML5 Data Bindings
Version: 1.6.3
(c) 2014 DMXzone.com
@build 2014-07-29 13:08:00
*/
!function(a){function b(){console&&console.error&&console.error.apply(console,arguments)}function c(b,e,f){if(e=e||d.globalScope,"string"==typeof b){var g;return(g=/\{\{(.+?)\}\}/.exec(b))&&g[0]==b?(e.watch(b,f),d.$parse(b,e)):d.$parseTemplate(b,e,f)}if(a.isPlainObject(b)||a.isArray(b))for(var h in b)b[h]=c(b[h],e,f);return b}if(!a.dmxDataBindings)return alert("DMXzone Data Bindings is required!"),void 0;var d=a.dmxDataBindings,e=function(c){return c?c.id?this instanceof e?(this.cfg=a.extend({preventInitialLoad:!1,callback:null},c),this.id=c.id,this.data={},this.state="loading",this.init(),void 0):new e(c):(b("ID for dataset is required!"),!1):(b("No options are set for dataset!",this,c),!1)};a.extend(e,{get:function(a){return e.dataSets[a]}}),e.dataSets={},e.prototype={init:function(){var b=this;e.dataSets[this.id]=this,this.fixCallbacks(),this.cfg.dataSet&&this.set(this.cfg.dataSet),this.cfg.url&&(this.cfg.data=c(this.cfg.data,d.globalScope,function(){b.load()}),-1!=this.cfg.url.indexOf("{{")&&(this.cfg._url=this.cfg.url,this.cfg.url=d.$parseTemplate(this.cfg._url,d.globalScope,function(){b.load(!0)},"dataset:"+this.id),this.cfg.preventInitialLoad=!0),a.dmxSecurityProvider&&"database"==this.cfg.dataSourceType?d.globalScope.watch("$SECURITY",function(){b.load(!0)},"dataset:"+this.id,!0):this.cfg.preventInitialLoad||this.load())},fixCallbacks:function(){var b=this;a.each(["beforeSend","complete","error","unauthorized","forbidden","success","update","callback"],function(a,c){var d=b.cfg[c];"string"==typeof d&&(b.cfg[c]=function(){return new Function(d).call(),"undefined"!=typeof MM_returnValue&&null!==MM_returnValue?MM_returnValue:void 0})})},setPage:function(a){var b,c,d;if(this.data&&("database"==this.cfg.dataSourceType?(b=this.data.offset,c=this.data.limit,d=this.data.total):(this.data.data?(b=this.data.data.startIndex,c=this.data.data.itemsPerPage,d=this.data.data.totalItems):this.data.feed&&(b=this.data.feed.openSearch$startIndex.$t,c=this.data.feed.openSearch$itemsPerPage.$t,d=this.data.feed.openSearch$totalResults.$t),b&&(b-=1)),null!=b&&null!=c&&null!=d)){if("string"==typeof a)switch(a){case"first":a=0;break;case"prev":a=b-c;break;case"next":a=b+c;break;case"last":a=(Math.ceil(d/c)-1)*c}else a=(a-1)*c;0>a||a>=d||("database"==this.cfg.dataSourceType?this.load({data:{offset:a}}):this.load({data:{"start-index":a+1}}))}},load:function(b){var c=this;b===!0&&(this.cfg.data&&(delete this.cfg.data.offset,delete this.cfg.data["start-index"]),b={}),"string"==typeof b&&(b={url:b}),b&&""===b.url||(b&&b.url&&this.cfg._url&&(this.cfg.data&&(delete this.cfg.data.offset,delete this.cfg.data["start-index"]),d.globalScope.unwatchNS(this.cfg._url,"dataset:"+this.id),delete this.cfg._url),a.extend(!0,this.cfg,b),b&&b.url&&-1!=b.url.indexOf("{{")?(this.cfg._url=b.url,this.cfg.url=d.$parseTemplate(this.cfg._url,d.globalScope,function(){c.load(!0)},"dataset:"+this.id)):this.cfg._url&&(this.cfg.url=d.$parseTemplate(this.cfg._url)),a.ajax(this.cfg).done(function(b){c.cfg.root?c.set(b[c.cfg.root]):c.set(b),a.isFunction(c.cfg.callback)&&c.cfg.callback.call(this)}).fail(function(b){c.state="error",d.globalScope.remove(this.id),401==b.status?a.isFunction(c.cfg.unauthorized)&&c.cfg.unauthorized.call(this):402==b.status?a.isFunction(c.cfg.forbidden)&&c.cfg.forbidden.call(this):a.isFunction(c.cfg.error)&&c.cfg.error.call(this)}))},set:function(b){if("string"==typeof b)try{this.data=a.parseJSON(b),this.state="ready"}catch(c){return this.state="error",a.isFunction(this.cfg.error)&&this.cfg.error.call(this),void 0}else this.data=b,this.state="ready";d.globalScope.add(this.id,this.data),a.isFunction(this.cfg.update)&&this.cfg.update.call(this)}},a.dmxDataSet=e}(jQuery);