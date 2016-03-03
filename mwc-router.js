mwcRouter = {
  properties:{
    mwcRoute:{
      type:Object,
      value:{}
    }
  },

  observers:[
    "__mwc_setRouteName(mwcRoute.route)",
    "__mwc_setParams(mwcRoute.params.*)",
    "__mwc_setQueryParams(mwcRoute.queryParams.*)"
  ],

  __mwc_setParams:function(param){
    if((param.path.match(/\./g) || []).length == 2){
      var key = param.path.split('.').pop();
      var p = {};
      p[key] = param.value;
      FlowRouter.setParams(p);
    }
  },
  __mwc_setQueryParams:function(param){
    if((param.path.match(/\./g) || []).length == 2){
      var key = param.path.split('.').pop();
      var p = {};
      p[key] = param.value;
      FlowRouter.setQueryParams(p);

    }
  },
  __mwc_routerGo:function(){
    var rName = this.mwcRoute.route,
      p = this.mwcRoute.params,
      q = this.mwcRoute.queryParams;
    if(rName !=undefined)
      FlowRouter.go(rName,p,q);
  },
  __mwc_setRouteName:function(param){
    this.__mwc_routerGo();
  },
  __mwc_setRoute:function(data){
    this.set('mwcRoute',data);
  },

  attached:function(){
    var self = this;

    var current = FlowRouter.current();
    var mwcR = self.mwcRoute || {};
    var p = _.extend(current.params,mwcR.params);
    var q = _.extend(current.queryParams,mwcR.queryParams);

    self.set('mwcRoute',{
      route:current.route.name,
      params:p,
      queryParams:q
    });
    self.__mwc_RouteDep = new Tracker.Dependency();
    self.__mwc_RouteFirstRun = true;
    Tracker.autorun(function(computation) {
      self.__mwc_RouteComp = computation;
      self.__mwc_RouteDep.depend();
      mwcRouteUpdate(self,current);
    });


  },
  detatched:function(){
    if (this.__mwc_RouteComp) {
      this.__mwc_RouteComp.stop();
      this.__mwc_RouteComp = null;
    }

  }
}

function mwcRouteUpdate(element,current) {
  var p = _.extend(element.mwcRoute.params,current.params);
  var q = _.extend(element.mwcRoute.queryParams,current.queryParams);
  var rName = FlowRouter.getRouteName();
  var mwcRoute = {route:rName,params:{},queryParams:{}};

  _.each(p,function(v,k){

    mwcRoute.params[k] = FlowRouter.getParam(k);
  });
  _.each(q,function(v,k){
    mwcRoute.queryParams[k] = FlowRouter.getQueryParam(k);
  });

  if (element.__mwc_RouteFirstRun) {
    element.__mwc_RouteFirstRun = false;
    element.__mwc_setRoute(mwcRoute);
    return;
  }

  Tracker.afterFlush(function() {
    element.__mwc_setRoute(mwcRoute);
  });
}
