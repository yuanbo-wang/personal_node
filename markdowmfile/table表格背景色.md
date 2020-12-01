# table 设置某行的背景色
```
<el-table :data="tableData"  :row-style="showRow" ></el-table>
 
methods: {
    showRow({row, rowIndwx}) {
       let styleJson = {}     
       if (row.show) {
            styleJson = {
                'display': 'block'
            }
       } else {
            styleJson = {
                'display': 'none'
            }
       }
       return styleJson  // 返回对象
    }
}  
```