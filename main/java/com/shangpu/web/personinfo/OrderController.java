package com.shangpu.web.personinfo;

import com.shangpu.dao.OrderDao;
import com.shangpu.entity.Order;
import com.shangpu.entity.PersonInfo;
import com.shangpu.service.OrderService;
import com.shangpu.service.PersonInfoService;
import com.shangpu.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/personinfo", method = {RequestMethod.GET, RequestMethod.POST})
public class OrderController {
    @Autowired
    private PersonInfoService personInfoService;
    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/getorderlist", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> getOrderList(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        List<Order> orderList = orderService.queryorder(pe.getUserId());
        modelMap.put("orderlist",orderList);
        modelMap.put("success", true);
        return modelMap;
    }
    @RequestMapping(value = "/updatestatus", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> updateStatus(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        Long orderId = HttpServletRequestUtil.getLong(request, "orderId");
        Order order = new Order();
        order.setOrderId(orderId);
        order.setPersonInfo(pe);
        order.setStatus(1);
        int count = orderService.updateorder(order);
        if (count == 1){
            modelMap.put("success", true);
        }else{
            modelMap.put("success", false);
        }
        return modelMap;
    }
}
