<template>
<div>
  <el-table
    :data="tableData"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="uid"
      label="编号"
      width="80">
    </el-table-column>
    <el-table-column
      fixed
      prop="birthday"
      label="生日"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="sex"
      label="性别"
      width="80">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="默认地址">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
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
import Pagination from '@/components/Pagination'
  export default {
    components:{Pagination},
    created(){
      this.getuser(1,10);
    },
    methods:{
      getList(data){
      //  console.log(data);
       this.getuser(data.page,data.limit);
    },
      getuser(page,limit){
        this.axios.get("/userlist",{
          params:{
            page,
            limit
          }
        }).then(result=>{
          console.log(result.data);
            result.data.forEach(elem=>{
              var obj={
                uid: elem.uid,
                birthday:elem.birthday==null?'':this.moment(Number(elem.birthday)).format("Y-MM-DD"),
                nickname: elem.nickname,
                sex:elem.sex==1?'男':'女',
                province:"",
                city:"",
                address:"",
                zip:''
              }
              if(elem.orderinfo==null){
                this.tableData.push(obj);
              }else{
                JSON.parse(elem.orderinfo).forEach(item=>{
                  if(item.isDefault){
                    // console.log(1);
                    obj.province=item.province,
                    obj.city=item.city,
                    obj.address=item.addressDetail,
                    obj.zip=item.postalCode
                  } 
                })
                this.tableData.push(obj);
                console.log(this.tableData);
              }
            })
          // this.tableData.push(result.data.slice(1));
          // this.tableData.
        });
      }
    },
    data() {
      return {
        total:1,
        listQuery:{
          page:1,
          limit:10
        },
        tableData: [],
      }
    }
  }
</script>