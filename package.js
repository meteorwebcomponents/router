Package.describe({
  name: 'mwc:router',
  version: '1.0.6',
  summary: 'Reactive Routing For Meteor + Polymer using flowrouter',
  git: "https://github.com/meteorwebcomponents/router.git",
  documentation: "README.md"
});

Package.on_use(function(api) {
  api.versionsFrom("1.0");

  api.addFiles("mwc-router.js", ["client"]);
  api.use('underscore@1.0.4',["client"]);
  api.use('kadira:flow-router@2.11.0',["client"]);
  api.export("mwcRouter");
});


