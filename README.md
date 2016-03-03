# Router Mixin.


## What is mwc Router mixin?

mwcRouter is a reactive meteor routing solution for polymer elements. Objective is to sync the reactive flowrouter params and queryparams from inside the polymer elements



## How to use it ?



Add `mwc:router` package to your Meteor App 


```sh
    $ meteor add mwc:router
```
Add mwcMixin behavior.

```js
     Polymer({
        is: "custom-elements",
        properties: {
          mwcRoute:{
           route:"post-view",
           
           params:{},

           queryParams:{main-view":"home"}
          }
        }
        },
        behaviors:[mwcRouter]
      })
```

`this.mwcRoute` contains route (name of the current route), params and queryparams which are reactive. Use it as
`{{mwcRouter.queryParams.paramName}}`

### With FlowRouter and `mwc:layout`

```js
//Router
FlowRouter.route("/post/:_id", {
    name: 'post-view',
    action: function(params, queryParams) {
        mwcLayout.render('main', {
            "main": "post-view"
        });
    }
});

// Inside post-view element

Polymer({
    is: "post-view",
    behaviors:[mwcRouter], /***** IMPORTANT *****/
    properties:{
     mwcRoute:{
           route:"post-view",
           
           params:{},

           queryParams:{"view":"home"}
          }
    },
    changeView:function(){
    this.mwcRoute.queryParams["view"] = "edit";
    }
   });

```

post-view element

```html
....
     <iron-pages selected="{{mwcRoute.queryParams.view}}" attr-for-selected="name">

        <post-item name="home">
          contents
        </post-item>

        <post-item name="edit">
         Contents
        </post-item>


      </iron-pages>

      <paper-button on-click="changeView">Edit post</paper-button>
....

```

Now go to the browser console and check FlowRouter.setQueryParams({"view":"home"});


##Related Projects


[MWC Compiler](https://github.com/meteorwebcomponents/compiler) - Compiler for polymer/webcomponents in meteor.

[MWC Mixin](https://github.com/meteorwebcomponents/mixin) - Mixin for polymer/webcomponents in meteor.

[MWC Layout](https://github.com/meteorwebcomponents/layout) - polymer layout renderer

[mwc flowrouter demo](https://github.com/meteorwebcomponents/demo-flowrouter) - mwc demo with flowrouter as the default router







