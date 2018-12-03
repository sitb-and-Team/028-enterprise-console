const PROFILE_API = {
  development: '',
  beta: 'http://console.spdb.com/api/v1',
  production: 'http://console.spdb.com/api/v1'
};

const AUTH_API = {
  development: '',
  beta: 'http://auth.spdb.com/api/v1',
  production: 'http://auth.spdb.com/api/v1',
};

module.exports = function ({htmlWebpackPlugin}) {
  const {debug, env} = htmlWebpackPlugin.options;
  const {PROFILE = 'development'} = env;

  const api = debug ? `http://' + location.hostname + ':' + location.port + '/api` : PROFILE_API[PROFILE];
  const authApi = AUTH_API[PROFILE];
  return `
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
  <title></title>
  <script>
    window.config = {
      api: '${api}',
      authApi: '${authApi}'
    };
  </script>
</head>
<body>
<noscript>
  您的浏览器需要启用JavaScript才能访问该网页.<br/>
  You need to enable JavaScript to this app.
</noscript>
<div id="application">正在加载...</div>
</body>
</html>
`;
};
