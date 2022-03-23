package com.shangpu.web.personinfo;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("personinfo")
public class PersoninfoAdminController {

    @RequestMapping(value = "/personinfo", method = RequestMethod.GET)
    public String personInfo() {
        //首页轮播
        return "personinfo/personinfo";
    }
    @RequestMapping(value = "/modifyperson", method = RequestMethod.GET)
    public String modifyPersonInfo() {
        //首页轮播
        return "personinfo/modifypersoninfo";
    }
    @RequestMapping(value = "/modifyBalance", method = RequestMethod.GET)
    public String modifybalance() {
        //首页轮播
        return "personinfo/modifybalance";
    }
    @RequestMapping(value = "/modifypas", method = RequestMethod.GET)
    public String modifyPas() {
        //首页轮播
        return "personinfo/modifypas";
    }


}
