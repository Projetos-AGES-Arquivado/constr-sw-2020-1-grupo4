curl -I -X OPTIONS \
  -H "Origin: http://54.211.11.43:3456" \
  -H 'Access-Control-Request-Method: GET' \
  http://54.211.11.43:3456/api/users 2>&1 