package com.shangpu.web.personinfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shangpu.entity.Order;
import com.shangpu.entity.PersonInfo;
import com.shangpu.entity.Runner;
import com.shangpu.service.OrderService;
import com.shangpu.service.PersonInfoService;
import com.shangpu.service.RunnerService;
import com.shangpu.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/personinfo", method = {RequestMethod.GET, RequestMethod.POST})
public class RunnerController {
    @Autowired
    private RunnerService runnerService;
    @Autowired
    private PersonInfoService personInfoService;
    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/insterrunner")
    @ResponseBody
    private Map<String, Object> insterRunner(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        //1.接收并转化相应的参数，
        String runnerStr = HttpServletRequestUtil.getString(request, "runnerStr");
        System.out.println(runnerStr);
        ObjectMapper mapper = new ObjectMapper();
        Runner runner = null;
        try {
            runner = mapper.readValue(runnerStr, Runner.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
            return modelMap;
        }
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        double balance = pe.getBalance();
        System.out.println(balance);
        double price= runner.getPrice();
        System.out.println(balance+"--"+price);
        double res = balance-price;
        if (res>0){
            System.out.println("大于零");
            pe.setBalance(res);
            System.out.println("大于零1");
        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "余额不足");
            return modelMap;
        }
        int i = personInfoService.updatePersonInfo(pe);
        if (i == 1){
            runner.setUserId(pe.getUserId());
            System.out.println(runner);
            int count = runnerService.insertRunner(runner);
            if (count == 1){
                modelMap.put("success", true);
            }else {
                modelMap.put("success", false);
            }
        }else{
            modelMap.put("success", false);
            modelMap.put("errMsg", "发布失败");
        }
        return modelMap;
    }
    @RequestMapping(value = "/queryrunnerlist")
    @ResponseBody
    private Map<String, Object> queryRunnerList(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        List<Runner> runnerList = runnerService.selectrunner(null, null);
        if (runnerList != null){
            modelMap.put("runnerlist", runnerList);
            modelMap.put("userId",pe.getUserId());
            modelMap.put("success", true);
        }else {
            modelMap.put("success", false);
        }
        return modelMap;
    }
    @RequestMapping(value = "/modifystatus")
    @ResponseBody
    private Map<String, Object> modifyStatus(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        Long runnerId = HttpServletRequestUtil.getLong(request, "runnerId");
        Runner runner = new Runner();
        runner.setRunnerId(runnerId);
        runner.setStatus(1);
        runner.setGetUserId(pe.getUserId());
        int count = runnerService.updaterunnerstatus(runner);
        if (count == 1){
            modelMap.put("success", true);
        }else{
            modelMap.put("success", false);
        }
        return modelMap;
    }
}


