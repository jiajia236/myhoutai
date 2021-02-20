<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="商品图片">
        <!-- <el-input v-model="form.ptitle" /> -->
        <img :src="form.pimg" alt="" style="width:10rem;">
      </el-form-item>
      <el-form-item label="商品编号">
        <el-input v-model="form.pid" readonly />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.ptitle" maxlength="15" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="form.pnumber" maxlength="5" />
      </el-form-item>
      <!-- <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item> -->
      <el-form-item label="商品简介">
        <el-input v-model="form.pintro" type="textarea"/>
      </el-form-item>
      <!-- <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item label="商品价格">
        <el-input v-model="form.pprice" maxlength="8"/>
      </el-form-item>
      <!-- <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:["pid"],
  data() {
    return {
      ptitle: '',
      pnumber: 0,
      pintro:'',
      pprice:0,
      form:{
        ptitle:this.ptitle,
        pnumber:this.pnumber,
        pintro:this.pintro,
        pprice:this.pprice,
        pid:this.pid
      }
    }
  },
  created(){
    this.axios.get("/details",{
      params:{
        pid:this.pid
      }
    }).then(result=>{
      // console.log(result.data);
      [this.form]=result.data;
    })
  },
  methods: {
    onSubmit() {
      // console.log(this.form);
      // this.$message('submit!')
      this.axios.post("/updatepro",this.qs.stringify(this.form)).then(result=>{
        console.log(result.data);
        if(result.data.code==200){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push("/example/product");
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

