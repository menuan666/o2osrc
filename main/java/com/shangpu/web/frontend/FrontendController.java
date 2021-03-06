package com.shangpu.web.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("frontend")
public class FrontendController {

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index() {
        //首页轮播
        return "frontend/index";
    }
    @RequestMapping(value = "/shoplist",method = RequestMethod.GET)
    public String shopList() {
        //首页轮播
        return "frontend/shoplist";
    }
    @RequestMapping(value = "/shopdetail", method = RequestMethod.GET)
    public String shopDetail() {
        return "frontend/shopdetail";
    }
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        //用户登陆
        return "frontend/login";
    }
    @RequestMapping(value = "/regedit", method = RequestMethod.GET)
    public String regedit() {
        //用户注册
        return "frontend/regedit";
    }
    @RequestMapping(value = "/productdetail", method = RequestMethod.GET)
    public String productDetail() {
        //商品详情
        return "frontend/productdetail";
    }

}
