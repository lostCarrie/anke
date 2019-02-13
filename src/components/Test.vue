<template>
<div>
    <el-row span="22" offset="1">
        <el-col>

<div style="margin: 20px;"></div>
<el-form label-position="left" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
</el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name:'',
    data() {
      return {
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
    
}
</script>