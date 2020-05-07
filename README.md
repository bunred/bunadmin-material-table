##bunadmin material-table
Add rxdb to fix the fixed column field's value

###How to use
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
