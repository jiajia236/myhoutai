<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">添加新角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" width="100" type="expand">
        <template v-slot="scope"> 
          <el-row v-for="(elem1,i) of scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag closable type="success">{{elem1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(elem2,i) of elem1.children" :key="i">
                <el-col :span="4"><el-tag closable>{{elem2.authName}}</el-tag></el-col>
                <el-col :span="20"><el-tag @close="handleClose" type="warning" closable style="margin-right:0.5rem;" v-for="(elem3,i) of elem2.children" :key="i">{{elem3.authName}}</el-tag></el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色ID" width="100">
        <template v-slot="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名" width="220">
        <template v-slot="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色描述">
        <template v-slot="scope">
          {{ scope.row.roleDesc}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改权限</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.name" placeholder="请输入角色名"/>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      rolesList:[],
      dialogVisible:false,
      dialogType: 'new',
      role: ""
    }
  },
  methods:{
    handleClose(e) {
        // this.rolesList.splice(this.roleList.indexOf(tag), 1);
        // console.log(e);
        // e.target.parentNode.remove();
      },
    handleAddRole(){
      this.dialogVisible=true;
    },
    handleedit(){},
    handleDelete(){}
  },
  created(){
    // this.axios.get("/userrole").then(result=>{
    //   console.log(result.data);
    // });
    this.axios.get("quanxian.json").then(result=>{
      console.log(result.data.data);
      this.rolesList=result.data.data;
    });
  },
}
</script>