<script setup>
import { ref, computed, onMounted } from "vue";
import { shortcutStore } from "@/store/shortcut";
import { ElMessage } from "element-plus";
import gsap from "gsap";
const store = shortcutStore();
const showDialog = computed(() => store.showDialog);
const addType = computed(() => store.addType);

const emit = defineEmits(["addKeyValue"]); 
const initParam = {
  shortcutName: "",
  canAddParam: true,
  key: "",
  value: true,
  params: [],
  type: "switch",
  options: "",
};

const newParam = ref(JSON.parse(JSON.stringify(initParam)));
 
function closeDialog() {  
  newParam.value = JSON.parse(JSON.stringify(initParam)) 
  store.showDialog = false;  
}

function checkNewParam() { 
  if (addType.value == "shortcut") {
    if (newParam.value.shortcutName === "") {
      ElMessage({
        message: "shortcutName不能为空",
        type: "error",
        grouping: true,
      });
      return false;
    }
  } else {
    if (newParam.value.key === "") {
      ElMessage({
        message: "键名不能为空",
        type: "error",
        grouping: true,
      });
      return false;
    }
    if (newParam.value.type == "select" && newParam.value.options == "") {
      ElMessage({
        message: "选项不能为空",
        type: "error",
        grouping: true,
      });
      return false;
    }
  }

  return true;
}

function addParm() {
  if (!checkNewParam()) {
    return false;
  }
  if (addType.value != "shortcut") {
    delete newParam.value.shortcutName;
  }
  if (!newParam.value.canAddParam) {
    delete newParam.value.params;
  } else {
    delete newParam.value.type;
    delete newParam.value.value;
    
  }
  if (newParam.value.type == "select") {
    newParam.value.options = newParam.value.options.split(" ");
    newParam.value.value = newParam.value.options[0];
  } else {
    delete newParam.value.options;
  }
  console.log(newParam.value);
  store.addParamResolve(newParam.value);
  closeDialog();
}

function cancelAddParm() {  
  closeDialog();
}

function toogleCanAdd() {
  console.log(newParam.value.canAddParam)
  if (newParam.value.canAddParam) {
    // 可以添加参数
    gsap.to("#canAdd", {
      height: "0",
      duration: 0.3,
      // ease: 'power4.out',
    });
  } else {
    // 不可以添加参数
    gsap.to("#canAdd", {
      height: "auto",
      duration: 0.3,
      // ease: 'power4.out',
    });
  }
}
function clearValue(type) { 
  newParam.value.value = ""
}

onMounted( () => {
  newParam.value = { ...initParam };
  console.log(newParam.value);
})
</script>
<template>
  <el-dialog
    :title="addType == 'shortcut' ? '添加shortcut' : '添加param'"
    v-model="showDialog" 
    :width="'var(--dialogWidth)'"
    @close="closeDialog"
  >
    <section class="px-4">
      <div class="paramItem" v-if="addType == 'shortcut'">
        <p class="w-1/3 mr-2 my-6 txtDark_Secondary text-lg">shortcutName:</p>
        <div class="">
          <el-input
            v-model="newParam.shortcutName"
            placeholder="shortcutName"
          ></el-input>
        </div>
      </div>
      <div class="paramItem" v-else>
        <div>
          <p class="w-1/3 mr-2 txtDark_Secondary text-lg">key:</p>
          <div class="">
            <el-input v-model="newParam.key" placeholder="key"></el-input>
          </div>
        </div>
        <div class="paramItem my-2">
          <p class="w-1/3 mr-2 txtDark_Secondary text-lg">canAddParam:</p>
          <div class="">
            <el-switch
              v-model="newParam.canAddParam" 
              @change="toogleCanAdd"
            ></el-switch>
          </div>
        </div>
      </div>

      <div
        id="canAdd"
        :style="{ height: newParam.canAddParam ? '0' : 'auto' }"
        class="w-full flex flex-col justify-around overflow-hidden"
      >
        <div>
          <div class="paramItem">
            <p class="w-1/3 mr-2 txtDark_Secondary text-lg">paramType:</p>
            <div class="">
              <el-select v-model="newParam.type" @change="clearValue">
                <el-option label="select" value="select"></el-option>
                <el-option label="input" value="input"></el-option>
                <el-option label="switch" value="switch"></el-option>
              </el-select>
            </div>
          </div>
          <p class="text-xs txtDark_Basic my-2">
            参数类型:select选择器;input输入框;switch开关
          </p>
        </div>

        <div v-if="newParam.type === 'input'">
          <div class="paramItem">
            <p class="w-1/3 mr-2 txtDark_Secondary text-lg">value:</p>
            <div class="">
              <el-input
                v-model="newParam.value"
                placeholder="参数值"
              ></el-input>
            </div>
          </div>
        </div>
        <div v-if="newParam.type === 'select'">
          <div class="paramItem">
            <p class="w-1/3 mr-2 txtDark_Secondary text-lg">value:</p>
            <div class="">
              <el-input
                v-model="newParam.options"
                placeholder="选项值"
              ></el-input>
            </div>
          </div>
          <p class="text-xs txtDark_Basic my-2">
            选项值以空格为分割， 默认值写在第一个
          </p>
        </div>
        <div v-if="newParam.type === 'switch'">
          <div class="paramItem">
            <p class="w-1/3 mr-2 txtDark_Secondary text-lg">value:</p>
            <div class="">
              <el-switch v-model="newParam.value"></el-switch>
            </div>
          </div>
        </div>
      </div>
    </section>
    <template #footer>
      <div class="w-full flex px-2">
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