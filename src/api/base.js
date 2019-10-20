/**
 * 接口域名的管理
 */
const base = {
  getShopInitInfo: '/o2o/shopAdmin/getShopInitInfo',
  // 注册店铺的URL
  registerShopUrl: "/o2o/shopAdmin/registerShop",
  // 编辑店铺前需要获取店铺信息，这里为获取当前店铺信息的URL
  shopInfoUrl: "/o2o/shopAdmin/getShopById",
  // 编辑店铺信息的URL
  editShopUrl: "/o2o/shopAdmin/modifyShop",
}

export default base;