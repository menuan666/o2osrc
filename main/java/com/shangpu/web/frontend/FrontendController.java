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

}
