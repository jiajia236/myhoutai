<template>
  <div class="app-container">
    <el-button @click="addpro" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
      添加
    </el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="商品ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.pid }}
        </template>
      </el-table-column>
      <el-table-column label="商品标题" width="120">
        <template slot-scope="scope">
          {{ scope.row.ptitle }}
        </template>
      </el-table-column>
      <el-table-column label="商品图片" align="center" width="120">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.pimg }}</span> -->
          <img :src="scope.row.pimg" style="max-width:100%;">
        </template>
      </el-table-column>
      <el-table-column label="商品简介" align="center">
        <template slot-scope="scope">
          {{ scope.row.pintro }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="商品数量" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pnumber }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="商品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.pstatus ? 'success' : 'danger'">
            {{ scope.row.pstatus | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="商品价格" width="120">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time" /> -->
          <span>￥{{ scope.row.pprice.toFixed(2) }}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row.pid)">
            编辑 
          </el-button>
          <el-button v-if="!row.pstatus" size="mini" type="success" @click="handleModifyStatus(row,1)">
            上架
          </el-button>
          <el-button v-if="row.pstatus" size="mini" @click="handleModifyStatus(row,0)">
            下架
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,row.pid)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList({page:listQuery.page,limit:listQuery.limit})" />
    </template>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components:{Pagination},
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '已下架',
        1: '已上架',
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total:32,
      listQuery: {
        page: 1,
        limit: 10,
      },
    }
  },
  created() {
    this.fetchData(1,10);
  },
  methods: {
    addpro(){
      
    },
    getList(data){
      //  console.log(data);
       this.fetchData(data.page,data.limit);
    },
    fetchData(page,limit) {
      this.listLoading = true
      this.axios.get("/list",{
        params:{
          page,
          limit
        }
      }).then(result=>{
        // console.log(result.data);
        this.list=result.data;
        // this.total=result.data.length;
        this.listLoading = false;
      });
    },
    handleUpdate(pid) {
      console.log(pid);
      this.$router.push(`/editproduct/index/${pid}`)
    },
    handleDelete(row, index) {
      console.log(row.pid);
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.list.splice(index-1, 1);
          this.axios.post("/deletepro",`pid=${row.pid}`).then(result=>{
            console.log(result.data);
          });
        }).catch(() => {
        });
      },
     handleModifyStatus(row, status) {
      if(row.pnumber==0){
        this.$message({
          message: '操作失败，该商品已无货',
          type:'danger'
        })
      }else{
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.pstatus = status
        let obj={
          pid:row.pid,
          pstatus:status
        }
        this.axios.post("/updatepro",this.qs.stringify(obj)).then(result=>{
          console.log(result.data);
        })
      }
      
    },
  }
}
</script>
