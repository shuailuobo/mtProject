<template>
  <div>
    <div v-if="specs.length != 0">
      <el-button
        type="primary"
        size="mini"
        @click="addType"
        class="mar-t"
      >添加规格</el-button>
      <div
        v-for="(item,index) in specs"
        :key="index"
      >
        <div>
          <!-- <el-button
          @click="adskulist"
          type="primary"
          size="mini"
        >添加商品规格</el-button> -->

          <el-button
            type="primary"
            @click="deleteSpec(index,specs)"
            size="mini"
          >删除规格</el-button>
        </div>
        <div>
          <el-input
            v-model="item.commoditysku"
            placeholder="请输入商品规格"
          ></el-input>
          <el-input
            v-model="item.commodityPrice"
            placeholder="请输入商品价格"
          ></el-input>
          <el-input
            v-model="item.commodityStock"
            placeholder="请输入商品库存"
          ></el-input>
        </div>

        <van-cell-group>
          <van-switch-cell
            v-model="item.checked"
            title="开启拼团"
          />
        </van-cell-group>
        <el-form
          ref="ruleForm"
          class="demo-ruleForm"
          v-if="item.checked"
        >
          <el-form-item
            label="商品规格属性："
            required
          >
            <!-- <el-button
            @click="addNature"
            :disabled="!editType"
            type="success"
          >增加属性</el-button> -->
            <el-button
              @click="addSku(index)"
              type="success"
            >增加团购</el-button>
          </el-form-item>
          <el-form-item>
            <el-table
              :data="item.tableData"
              :fit="false"
            >
              <!-- 自定义部分 -->
              <!-- <el-table-column
                v-for="(col,i ) in item.attr_names"
                :key="i"
                :prop="col.prop"
              >
                <template
                  slot="header"
                  slot-scope="scope"
                >
                  <span
                    class="del"
                    v-on:click="delColumn(scope.$index)"
                    v-if="editType"
                  >X</span>
                  <el-input
                    v-model="col.label"
                    size="mini"
                    class="f-cent"
                    :disabled="!editType"
                  />
                </template>
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row[col.prop]"
                    :disabled="!scope.row['editable']"
                  > </el-input>
                </template>
              </el-table-column> -->

              <!-- 固定写死的部分 -->
              <el-table-column
                prop="cost_price"
                label="拼团人数"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['cost_price']"
                    :disabled="!scope.row['editable']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="拼团价格"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['price']"
                    :disabled="!scope.row['editable']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="库存"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['quantity']"
                    :disabled="!scope.row['editable']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="no"
                label="团长提成"
              >
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row['no']"
                    :disabled="!scope.row['editable']"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, item.tableData)"
                    type="text"
                    size="small"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <el-button
        @click="logData"
        type="primary"
      >打印tableData数据</el-button>
    </div>
  </div>
</template>
<script>
import publish from "../../config/publish";

export default {
  data() {
    return {
      issku: false,
      checked: false,
      // 添加规格参数
      editType: true, //判定商品属性标签是否可编辑
      attr_names: [
        // 为了方便理解用 保留
        // {label: '成本', prop: 'cost_price'},
        // {label: '售价', prop: 'price'},
        // {label: '库存', prop: 'quantity'},
        // {label: '货号', prop: 'no'},
      ],
      tableData: [
        {
          cost_price: "", //成本价
          price: " ", //售价
          quantity: "", //库存
          no: "", //货号
          img: "", //图片
          editable: true //判定SKU是否可编辑
        }
      ],
      specs: [
        {
          type: "颜色",
          commoditysku: "",
          commodityPrice: "",
          commodityStock: "",
          checked: false,
          tableData: [
            {
              cost_price: "", //成本价
              price: " ", //售价
              quantity: "", //库存
              no: "", //货号
              img: "", //图片
              editable: true //判定SKU是否可编辑
            }
          ],
          attr_names: [
            // 为了方便理解用 保留
            // {label: '成本', prop: 'cost_price'},
            // {label: '售价', prop: 'price'},
            // {label: '库存', prop: 'quantity'},
            // {label: '货号', prop: 'no'},
          ]
        }
      ]
    };
  },
  methods: {
    // 删除规格
    deleteSpec(index, spec) {
      window.console.log(spec);
      spec.splice(index, 1);
      // 刷新 mySpecPrices
      // var myDefaultAddPrices = JSON.parse(JSON.stringify(this.defaultAddPrices));
      // this.mySpecPrices(this.specCombinations(), myDefaultAddPrices)
    },
    // 是否添加规格
    addType() {
      // alert()
      var obj = {};
      obj.type = "";
      obj.commoditysku = "";
      obj.checked = false;
      obj.tableData = [
        {
          cost_price: "", //团购售价
          price: " ", //售价
          quantity: "", //库存
          no: "", //货号
          img: "", //图片
          editable: true //判定SKU是否可编辑
        }
      ];
      obj.attr_names = [];
      this.specs.push(obj);
    },
    // 增加商品属性
    // addNature() {
    //   let len = this.attr_names.length;
    //   //新增以 attr_ 开关，也可以自行定义
    //   this.attr_names.push({ label: "商品属性", prop: `attr_${len}` });
    // },
    // 增加商品SKU
    addSku(index) {
      let data = this.specs[index].tableData[0];
      let keys = [];
      for (var key in data) {
        keys.push(key);
      }
      let obj = {};
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "editable") {
          obj[keys[i]] = true;
        } else {
          obj[keys[i]] = "";
        }
      }
      this.specs[index].tableData.push(obj);
    },
    //删除一排   tableData ARR
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //删除SKU列 每次删除最后一列数据
    // delColumn(index) {
    //   let len = this.attr_names.length - 1;
    //   let str = this.attr_names[len].prop;
    //   this.tableData.map(item => {
    //     delete item[str];
    //   });
    //   this.attr_names.pop();
    // },
    // 调试代码信息用
    logData() {
      // window.console.log("this.attr_names", this.attr_names);
      window.console.log(this.specs);
    }
  }
};
</script>
<style lang="less" scoped>
.del {
  cursor: pointer;
  display: none;
  background: red;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  position: absolute;
  top: 7px;
  right: 0px;
  z-index: 9;
  border-radius: 3px;
}
.cell:hover .del {
  display: inline;
}

.el-form-item__label {
  width: 100%;
  display: block;
  text-align: left;
  float: none !important;
}

.mar-t {
  margin-bottom: 20px;
}
</style>
