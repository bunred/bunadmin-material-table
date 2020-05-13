## bunadmin material-table
Add rxdb to fix the fixed column field's value

[Use in bunadmin](https://github.com/bunred/bunadmin)

### How to use
update package
```
"dependencies": {
...
    "material-table": "npm:bunadmin-table",
...
}
```
usage
```
import { rxMtUpdateField } from "material-table"
...
    await rxMtUpdateField({
      name: string,
      value: value ? string : null
    })
```

### Develop
1.After debugging using `start`, then `build` first, and execute:
```
npm pack
```

2.update `[bunadmin]/package.json`
```
    "material-table": "/Volumes/.../bunadmin-material-table/bunadmin-table-1.1.x.tgz",
```

```
yarn --force
```

3.
Change back after checking
```
    "material-table": "npm:bunadmin-table",
```
