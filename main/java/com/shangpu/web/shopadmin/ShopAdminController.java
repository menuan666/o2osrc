package com.shangpu.web.shopadmin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="shopadmin", method={RequestMethod.GET})
public class ShopAdminController {

    @RequestMapping(value = "/shopoperation")
    public String shopOperation() {
        //店铺编辑注册修改
        return "/shop/shopoperation";
    }

    @RequestMapping(value = "/shoplist")
    public String shopList() {
        //店铺列表
        return "/shop/shoplist";
    }
    @RequestMapping(value = "/shopmanagement")
    public String shopManagement(){
        //店铺管理页面
        return "shop/shopmanagement";
    }
    @RequestMapping(value = "/productcategorymanagement")
    public String productCategoryManage(){
        //类别管理页面
        return "shop/productcategorymanagement";
    }
    @RequestMapping(value = "/productoperation")
    public String productOperation(){
        //商品添加编辑
        return "shop/productoperation";
    }
    @RequestMapping(value = "/productmanagement")
    public String productManagement(){
        //商品列表
        return "shop/productmanagement";
    }

}
