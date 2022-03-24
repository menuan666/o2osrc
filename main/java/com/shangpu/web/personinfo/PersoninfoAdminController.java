package com.shangpu.web.personinfo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("personinfo")
public class PersoninfoAdminController {

    @RequestMapping(value = "/personinfo", method = RequestMethod.GET)
    public String personInfo() {
        //我的页面
        return "personinfo/personinfo";
    }
    @RequestMapping(value = "/modifyperson", method = RequestMethod.GET)
    public String modifyPersonInfo() {
        //修改个人信息
        return "personinfo/modifypersoninfo";
    }
    @RequestMapping(value = "/modifyBalance", method = RequestMethod.GET)
    public String modifybalance() {
        //余额充值
        return "personinfo/modifybalance";
    }
    @RequestMapping(value = "/modifypas", method = RequestMethod.GET)
    public String modifyPas() {
        //修改密码
        return "personinfo/modifypas";
    }
    @RequestMapping(value = "/myorder", method = RequestMethod.GET)
    public String myOrder() {
        //我的订单
        return "personinfo/myorder";
    }
    @RequestMapping(value = "/runneroperation", method = RequestMethod.GET)
    public String runnerOperation() {
        //发布跑腿
        return "personinfo/runneroperation";
    }


}
