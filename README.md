# Router Mixin.


## What is mwc Router?

mwcRouter is a reactive meteor routing solution for polymer elements. Objective is to sync the reactive flowrouter params and queryparams from inside the polymer elements



## How to use it ?



Add `mwc:router` package to your Meteor App 


```sh
    $ meteor add mwc:router
```
Add mwcRouter behavior.

```js
     Polymer({
        is: "custom-elements",
        properties: {
          mwcRoute:{
           route:"post-view",
           
           params:{},

           queryParams:{"main-view":"home"}
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
// Using mwc:layout is optional. Not a dependency

Polymer({
    is: "post-view",
    behaviors:[mwcRouter], /***** IMPORTANT *****/
    properties:{
     mwcRoute:{
           route:"post-view",

           queryParams:{"view":"home"}
          }
    },
    changeView:function(){
    this.$.mainView.selected = "edit";
    }
   });

```

post-view element

```html
....

    <paper-tabs attr-for-selected="name" selected="{{mwcRoute.queryParams.view}}" >
      <paper-tab name="home">Home</paper-tab>
      <paper-tab name="edit">Edit</paper-tab>
    </paper-tabs>
    
     <iron-pages id="mainView" selected="{{mwcRoute.queryParams.view}}" attr-for-selected="name">

        <post-item name="home">
         [[mwcRoute.params._id]]
        </post-item>

        <post-item name="edit">
         [[mwcRoute.params._id]]
        </post-item>


      </iron-pages>

      <paper-button on-click="changeView">Edit post</paper-button>
....

```

Now go to the browser console and check FlowRouter.setQueryParams({"view":"home"});


## Todo


- [ ] URL string to property type change
- [ ] Option to add preprocessing functions for set and get

##Related Projects

[mwc router demo](https://github.com/meteorwebcomponents/demo-router) - mwc:router demo

[MWC Compiler](https://github.com/meteorwebcomponents/compiler) - Compiler for polymer/webcomponents in meteor.

[MWC Mixin](https://github.com/meteorwebcomponents/mixin) - Mixin for polymer/webcomponents in meteor.

[MWC Layout](https://github.com/meteorwebcomponents/layout) - polymer layout renderer









