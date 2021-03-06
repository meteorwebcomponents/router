mwcRouter = {
  properties:{
    mwcRoute:{
      type:Object,
      value:{}
    }
  },

  observers:[
    "__mwc_setRouteName(mwcRoute.name)",
    "__mwc_setParams(mwcRoute.params.*)",
    "__mwc_setQueryParams(mwcRoute.queryParams.*)"
  ],

  __mwc_setParams:function(param){
    //avoids initializing of mwcRoute.params and mwcRoute.queryParams
    if((param.path.match(/\./g) || []).length == 2){
      var key = param.path.split('.').pop();
      var p = {};
      p[key] = param.value;
      if(FlowRouter.getParam(key) != param.value)
        FlowRouter.setParams(p);
    }
  },
  __mwc_setQueryParams:function(param){
    //queryParams can be objects
    //avoids initializing of mwcRoute.params and mwcRoute.queryParams
    if((param.path.match(/\./g) || []).length >= 2){
      //param.path is like mwcRoute,queryParams.qp1.a.b.c where qp1 is the queryparam name
      var key = param.path.split('.')[2];
      var p = _.pick(this.mwcRoute.queryParams,key);
      if(!_.isEqual(FlowRouter.getQueryParam(key),p[key]))
        FlowRouter.setQueryParams(p);
    }
  },
  __mwc_routerGo:function(){
    var rName = this.mwcRoute.name,
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
      name:current.route.name,
      params:p,
      queryParams:q
    });
    self.__mwc_RouteDep = new Tracker.Dependency();
    self.__mwc_RouteFirstRun = true;
    Tracker.autorun(function(computation) {
      self.__mwc_RouteComp = computation;
      self.__mwc_RouteDep.depend();
      mwcRouteUpdate(self);
    });


  },
  detatched:function(){
    if (this.__mwc_RouteComp) {
      this.__mwc_RouteComp.stop();
      this.__mwc_RouteComp = null;
    }

  }
}

function mwcRouteUpdate(element) {

  //to rerun on every param/queryParam change, since flowrouter current is not reactive.
  FlowRouter.watchPathChange();
  var current = FlowRouter.current();
  var p = current.params;
  var q = current.queryParams;
  var rName = current.route.name;
  var mwcRoute = {name:rName,params:p,queryParams:q};

  if (element.__mwc_RouteFirstRun) {
    element.__mwc_RouteFirstRun = false;
    element.__mwc_setRoute(mwcRoute);
    return;
  }

  Tracker.afterFlush(function() {
    element.__mwc_setRoute(mwcRoute);
  });
}

