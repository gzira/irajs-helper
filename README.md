# irajs-helper
集成常见的 helper 辅助工具



## 功能
- model helper: 统一配置 mongoose
- 
## 快速开始

```
npm i irajs-helper
```

### 示例
```
const {ModelHelper} = require('irajs-helper')
const modelHelper = new ModelHelper(dbs, 'dbName')

const model = modelHelper.build(schema)
```

## 开发

```
git clone https://github.com/gzira/irajs-helper.git

cd irajs-helper

git checkout -b feat#{feat}

# PR
```

## TODO
- [ ] 测试
- [ ] 其它 helper

## LICENSE
MIT