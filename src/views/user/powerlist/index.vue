<template>
<div>
  <el-table
    :data="powerList"
    style="width: 100%"
    fit
    highlight-current-row
    border>
    <el-table-column
      fixed
      prop="upid"
      label="编号"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      fixed
      prop="upname"
      label="权限名"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="uppath"
      label="权限路径">
    </el-table-column>
    <el-table-column
      prop="uplevel"
      label="权限等级"
      width="400"
      align="center"
      >
      <template v-slot="scope">
          <el-tag v-if="scope.row.uplevel==0">一级权限</el-tag>
          <el-tag type="success" v-else-if="scope.row.uplevel==1">二级权限</el-tag>
          <el-tag type="warning" v-else>三级权限</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
export default {
  data(){
    return {
      powerList:[]
    }
  },
  created(){
    this.axios.get("/powerlist").then(result=>{
      console.log(result.data);
      this.powerList=result.data;
    });
  },
}
</script>