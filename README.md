# ecResult
An easy way to format API result

## Install
```shell
npm install ecresult
```

## Use
### Generate Result
```node
const ecresult = require('ecresult');

var result = new ecresult();
result.setResult(1);
result.setMessage('Hello World');
result.setData({content: "Yo"});
```

### Generate Result with error code
```node
const ecresult = require('ecresult');

var result = new ecresult();
result.setErrorCode('10001')
result.setMessage('Something wrong');
```

###  Output Result
```
const ecresult = require('ecresult');

var result = new ecresult();
result.setResult(1);
result.setMessage('Hello World');
result.setData({content: "Yo"});
var data = result.toJSON();
```