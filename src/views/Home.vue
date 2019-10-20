<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="page-group">
      <div id="page-label-input" class="page">
        <header class="bar bar-nav">
          <a class="button button-link button-nav pull-left back" href="/demos/form">
            <span class="icon icon-left"></span> 返回
          </a>
          <h1 class="title">商店信息</h1>
        </header>
        <div class="content">
          <div class="list-block">
            <ul>
              <!-- Text inputs -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">商铺名称</div>
                    <div class="item-input">
                      <input type="text" id="shop-name" placeholder="商铺名称" v-model="shopName" />
                    </div>
                  </div>
                </div>
              </li>
              <!-- 商铺分类 下拉列表 -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">商铺分类</div>
                    <div class="item-input">
                      <select v-model="selectedCategory" :disabled="categoryDisabled">
                        <option
                          v-for="item in shopCategoryList"
                          :value="item"
                          :key="item.shopCategoryId"
                        >{{item.shopCategoryName}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <!-- 区域分类 下拉列表 -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">所属区域</div>
                    <div class="item-input">
                      <select v-model="selectedArea">
                        <option
                          v-for="item in areaList"
                          :value="item"
                          :key="item.areaId"
                        >{{item.areaName}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
              <!-- 详细地址 text -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">详细地址</div>
                    <div class="item-input">
                      <input type="text" id="shop-addr" placeholder="详细地址" v-model="shopAddr" />
                    </div>
                  </div>
                </div>
              </li>
              <!-- 联系电话 text -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">联系电话</div>
                    <div class="item-input">
                      <input type="text" id="shop-phone" placeholder="联系电话" v-model="shopPhone" />
                    </div>
                  </div>
                </div>
              </li>
              <!-- 缩略图 上传控件 -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">缩略图</div>
                    <div class="item-input">
                      <input type="file" id="shop-img" />
                    </div>
                  </div>
                </div>
              </li>
              <!-- 店铺简介 textarea -->
              <li class="align-top">
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">店铺简介</div>
                    <div class="item-input">
                      <textarea id="shop-desc" placeholder="店铺简介" v-model="shopDesc"></textarea>
                    </div>
                  </div>
                </div>
              </li>
              <!-- 验证码 ka -->
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label">验证码</div>
                    <input type="text" id="j_captcha" placeholder="验证码" v-model="jCaptcha" />
                    <div class="item-input">
                      <img
                        id="captcha_img"
                        alt="点击更换"
                        title="点击更换"
                        @click="changeVerifyCode($event)"
                        src="/o2o/Kaptcha"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="content-block">
            <div class="row">
              <div class="col-50">
                <a
                  href="/o2o/shopadmin/shopmanagement"
                  class="button button-big button-fill button-danger"
                >返回</a>
              </div>
              <div class="col-50">
                <a
                  href="#"
                  class="button button-big button-fill button-success"
                  id="submit"
                  @click="submit()"
                >提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import common from "../js/common/common.js";
import base from "../api/base"; // 导入接口域名列表
import axios from "../utils/http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

export default {
  name: "home",
  data() {
    return {
      shopCategoryList: "",
      selectedCategory: "",
      areaList: "",
      selectedArea: "",
      categoryDisabled: false,
      isEdit: "",
      shopId: "",
      shopName: "",
      shopAddr: "",
      shopPhone: "",
      shopDesc: "",
      jCaptcha: ""
    };
  },
  components: {
    HelloWorld
  },
  methods: {
    changeVerifyCode: common.changeVerifyCode,
    getQueryString: common.getQueryString,
    // 通过店铺Id获取店铺信息
    async getShopInfo(shopId) {
      await this.getShopInitInfo()
      axios.get(`${base.shopInfoUrl}`, { params: { shopId } }).then(result => {
        if (result.data.success) {
          // 若访问成功，则依据后台传递过来的店铺信息为表单元素赋值
          let shop = result.data.shop;
          this.shopName = shop.shopName;
          this.shopAddr = shop.shopAddr;
          this.shopPhone = shop.phone;
          this.shopDesc = shop.shopDesc;
          // 给店铺类别选定原先的店铺类别值
          this.selectedCategory = shop.shopCategory;
          // 不允许选择店铺类别
          this.categoryDisabled = true;
          // 给店铺选定原先的所属的区域
          this.selectedArea = shop.area;
        }
      });
    },
    // 取得所有二级店铺类别以及区域信息，并分别赋值进类别列表以及区域列表
    getShopInitInfo() {
      return axios.get(`${base.getShopInitInfo}`).then(res => {
        if (res.data.success) {
          this.shopCategoryList = res.data.shopCategoryList;
          this.selectedCategory = this.shopCategoryList[0];
          this.areaList = res.data.areaList;
          this.selectedArea = this.areaList[0];
        }
      });
    },
    // 提交按钮的事件响应，分别对店铺注册和编辑操作做不同响应
    submit() {
      // 创建shop对象
      var shop = {};
      if (this.isEdit) {
        // 若属于编辑，则给shopId赋值
        shop.shopId = this.shopId;
      }
      // 获取表单里的数据并填充进对应的店铺属性中
      shop.shopName = this.shopName;
      shop.shopAddr = this.shopAddr;
      shop.phone = this.shopPhone;
      shop.shopDesc = this.shopDesc;
      // 选择选定好的店铺类别
      shop.shopCategory = this.selectedCategory;
      // 选择选定好的区域信息
      shop.area = this.selectedArea;
      // 获取上传的图片文件流
      var shopImg = $("#shop-img")[0].files[0];
      // 生成表单对象，用于接收参数并传递给后台
      var formData = new FormData();
      // 添加图片流进表单对象里
      formData.append("shopImg", shopImg);
      // 将shop json对象转成字符流保存至表单对象key为shopStr的的键值对里
      formData.append("shopStr", JSON.stringify(shop));
      // 获取表单里输入的验证码
      var verifyCodeActual = this.jCaptcha;
      if (!verifyCodeActual) {
        $.toast("请输入验证码！");
        return;
      }
      formData.append("verifyCodeActual", verifyCodeActual);
      // 将数据提交至后台处理相关操作
      axios({
        url: this.isEdit ? base.editShopUrl : base.registerShopUrl,
        method: "post",
        data: formData,
        cache: false
      }).then(res => {
        if (res.data.success) {
          $.toast("提交成功！");
          if (!this.isEdit) {
            // 若为注册操作，成功后返回店铺列表页
            window.location.href = "/o2o/shopAdmin/shoplist";
          }
        } else {
          $.toast("提交失败！" + res.data.errMsg);
        }
        // 点击验证码图片的时候，注册码会改变
        $("#captcha_img").click();
      });
    }
  },
  mounted() {
    // 从URL里获取shopId参数的值
    this.shopId = this.getQueryString("shopId");
    // 由于店铺注册和编辑使用的是同一个页面，
    // 该标识符用来标明本次是添加还是编辑操作
    this.isEdit = this.shopId ? true : false;

    // 判断是编辑操作还是注册操作
    if (!this.isEdit) {
      this.getShopInitInfo();
    } else {
      this.getShopInfo(this.shopId);
    }
  }
};
</script>
