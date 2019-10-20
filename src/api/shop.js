/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const shop = {
  // 新闻列表    
  getShopInitInfo() {
    return axios.get(`${base.getShopInitInfo}`);
  },
  // 新闻详情,演示    
  articleDetail(id, params) {
    return axios.get(`${base.sq}`, {
      params: params
    });
  },
  // post提交    
  login(params) {
    return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
  }
  // 其他接口…………
}

export default shop;