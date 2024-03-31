<script setup>
const paramString = ref('')

const initAddParamManager = {
  confirmed: false,
  canceded: false,
  confirmCallback: null,
  cancelCallback: null,
};

var addParamManager = {
  ...initAddParamManager,
};

const info = [
  "shortcutName: shortcut名称",
  "canAddParam: 控制参数是否可以添加键参数",
  "key: 参数的键",
  "value: 参数的值",
  "params: 参数的参数",
  "type: 控制参数的控件类型。input: 输入框;select: 选择器;switch: 开关",
];

const showAddDialog = ref(false);

function showAddDialogFunc() {
  showAddDialog.value = true;
}

function closeDialog() {
  addParamManager = {
    ...initAddParamManager,
  };
  paramString.value = "";
  showAddDialog.value = false;
}

function addParm() {
  addParamManager.confirmed = true;
  addParamManager.confirmCallback(paramString.value);
  closeDialog();
}

function cancelAddParm() {
  paramString.value = "";
  addParamManager.canceded = true;
  addParamManager.cancelCallback();
  closeDialog();
}

</script>
<template>
    <el-dialog
    title="添加参数"
    v-model="showAddDialog"
    style="border-radius: 1rem"
    :width="'var(--dialogWidth)'"
    @close="closeDialog"
  >
    <section>
      <el-input
        v-model="paramString"
        placeholder="请输入参数的json字符串"
        type="textarea"
      ></el-input>
      <div class="w-full mt-2 pl-2 text-xs txtDark_Basic">
        <p>参数说明:</p>
        <div class="pl-2 flex w-full flex-wrap">
          <p
            v-for="item in info"
            :key="item"
            class="w-full overflow-hidden flex-shrink-0"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </section>
    <template #footer>
      <div class="w-full flex">
        <el-button class="w-full" type="primary" @click="addParm"
          >确定</el-button
        >
        <el-button class="w-full" type="danger" @click="cancelAddParm"
          >取消</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>