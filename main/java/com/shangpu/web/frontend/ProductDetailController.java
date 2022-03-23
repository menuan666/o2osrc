package com.shangpu.web.frontend;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mchange.v2.lock.ExactReentrantSharedUseExclusiveUseLock;
import com.mysql.cj.x.protobuf.MysqlxCrud;
import com.shangpu.entity.Order;
import com.shangpu.entity.PersonInfo;
import com.shangpu.entity.Product;
import com.shangpu.entity.Shop;
import com.shangpu.service.LocalAuthService;
import com.shangpu.service.OrderService;
import com.shangpu.service.PersonInfoService;
import com.shangpu.service.ProductService;
import com.shangpu.util.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/frontend")
public class ProductDetailController {
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private PersonInfoService personInfoService;

    /**
     * 根据商品Id获取商品详情
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/listproductdetailpageinfo", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> listProductDetailPageInfo(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        // 获取前台传递过来的productId
        long productId = HttpServletRequestUtil.getLong(request, "productId");
        Product product = null;
        // 空值判断
        if (productId != -1) {
            // 根据productId获取商品信息，包含商品详情图列表
            product = productService.getProductById(productId);
            modelMap.put("product", product);
            modelMap.put("success", true);
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "empty productId");
        }
        return modelMap;
    }
    @RequestMapping(value = "/checkbalance", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> checkBalance(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        int price = HttpServletRequestUtil.getInt(request, "price");
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        int i = pe.getBalance().intValue();
        System.out.println(price+"  "+i);
        if(i>price){
            modelMap.put("success", true);
        }else {
            modelMap.put("success", false);
        }
        return modelMap;
    }
    @RequestMapping(value = "/productorder", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> productOrder(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String orderStr = HttpServletRequestUtil.getString(request, "orderStr");
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        int i = pe.getBalance().intValue();
        System.out.println("jiage"+i);
        ObjectMapper mapper = new ObjectMapper();
        Order shop = null;
        try {
            shop = mapper.readValue(orderStr, Order.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", "转换错误");
            return modelMap;
        }
        int j = Integer.parseInt(shop.getPrice());
        BigDecimal newbla = BigDecimal.valueOf(i-j);
        PersonInfo p = new PersonInfo();
        p.setUserId(pe.getUserId());
        pe.setBalance(newbla);
        p.setBalance(newbla);
        int aa = personInfoService.updatePersonInfo(p);
        request.getSession().setAttribute("user", pe);
        System.out.println(aa);
        if (aa == 1){
            shop.setPersonInfo(pe);
            System.out.println(shop);
            int count = orderService.insertorder(shop);
            if (count == 1){
                modelMap.put("success", true);
               // modelMap.put("errMsg", "");
                return modelMap;
            }else {
                modelMap.put("success", false);
                modelMap.put("errMsg", "更新order失败");
                return modelMap;
            }
        }else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "更新余额失败");
            return modelMap;
        }
    }

}