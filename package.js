Package.describe({
  name: 'herrhelms:meteor-gridforms',
  summary: 'Gridforms by @kumailht ported to meteor',
  version: '1.0.0',
  git: 'https://github.com/herrhelms/meteor-gridforms.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.use(['templating','spacebars','underscore','momentjs:moment','mrt:underscore-string-latest@2.3.3'],'client');
  api.addFiles(['meteor-gridforms.css','meteor-gridforms.html','meteor-gridforms.js'],'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('herrhelms:meteor-gridforms');
});