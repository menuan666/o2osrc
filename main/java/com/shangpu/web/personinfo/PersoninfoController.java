package com.shangpu.web.personinfo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shangpu.dto.ImageHolder;
import com.shangpu.entity.LocalAuth;
import com.shangpu.entity.PersonInfo;
import com.shangpu.service.LocalAuthService;
import com.shangpu.service.PersonInfoService;
import com.shangpu.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Controller
@RequestMapping(value = "/personinfo", method = {RequestMethod.GET, RequestMethod.POST})
public class PersoninfoController {
    @Autowired
    private PersonInfoService personInfoService;
    @Autowired
    private LocalAuthService localAuthService;

    @RequestMapping(value = "/getpersoninfo", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> getShopManagementInfo(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        String username = (String) request.getSession().getAttribute("username");
        PersonInfo per = personInfoService.selectpersoninfo(pe.getUserId());
        System.out.println(username);
        modelMap.put("success", true);
        modelMap.put("user", per);
        modelMap.put("username", username);
        return modelMap;
    }
    @RequestMapping(value = "/modifypersoninfo", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> modifyPersonInfo(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        PersonInfo per = personInfoService.selectpersoninfo(pe.getUserId());
        if (!CodeUtil.checkVerifyCode(request)) {
            modelMap.put("success", false);
            modelMap.put("errMsg", "输入了错误的验证码");
            return modelMap;
        }
        //1.接收并转化相应的参数，包括店铺信息以及图片信息
        String personStr = HttpServletRequestUtil.getString(request, "personStr");
        System.out.println("qianduanshuju" + personStr);
        ObjectMapper mapper = new ObjectMapper();
        PersonInfo shop = null;
        try {
            shop = mapper.readValue(personStr, PersonInfo.class);
        } catch (Exception e) {
            modelMap.put("success", false);
            modelMap.put("errMsg", e.getMessage());
            return modelMap;
        }
        CommonsMultipartFile profileImg = null;
        CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver(
                request.getSession().getServletContext());
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        profileImg = (CommonsMultipartFile) multipartHttpServletRequest.getFile("profileImg");

        //2.注册店铺
        if (shop != null) {
            shop.setUserId(per.getUserId());
            //File profileImg1 = new File(PathUtil.getImgBasePath() + ImageUtil.getRandomFileName());
            ImageHolder imageHolder = null;
            if (profileImg != null) {
                try {
                    imageHolder = new ImageHolder(profileImg.getOriginalFilename(), profileImg.getInputStream());
                } catch (IOException e) {
                    e.printStackTrace();
                }
                addpersonImg(shop, imageHolder);
            }
            shop.setLastEditTime(new Date());
            System.out.println(personInfoService.updatePersonInfo(shop));
            modelMap.put("success", true);
            return modelMap;
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "请输入店铺信息");
            return modelMap;
        }
    }

    private void addpersonImg(PersonInfo personInfo, ImageHolder thumbnail) {
        String dest = PathUtil.getUserImagePath(personInfo.getUserId());
        String thumbnailAddr = ImageUtil.generateThumbnail(thumbnail, dest);
        personInfo.setProfileImg(thumbnailAddr);
    }

    @RequestMapping(value = "/modifybal", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> modifyBal(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        PersonInfo per = personInfoService.selectpersoninfo(pe.getUserId());
        String addbal = HttpServletRequestUtil.getString(request, "addbal");
        BigDecimal bigDecimalValue = new BigDecimal(addbal);
        System.out.println("211" + bigDecimalValue);
        per.setBalance(bigDecimalValue.add(per.getBalance()));
        request.getSession().setAttribute("user", per);
        int count = personInfoService.updatePersonInfo(per);
        if (count == 1) {
            modelMap.put("success", true);
        } else {
            modelMap.put("success", false);
        }
        return modelMap;
    }

    @RequestMapping(value = "/modifypassword", method = RequestMethod.POST)
    @ResponseBody
    private Map<String, Object> modifyPassword(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        String oldpas = HttpServletRequestUtil.getString(request, "oldpas");
        String newpas = HttpServletRequestUtil.getString(request, "newpas");
        PersonInfo pe = (PersonInfo) request.getSession().getAttribute("user");
        String username = (String) request.getSession().getAttribute("username");
        LocalAuth localAuth = localAuthService.queryLocalAuthByUserNameAndPwd(username, MD5.getMd5(oldpas));
        System.out.println(username+"-"+oldpas+"--"+newpas+"--"+localAuth);
        if (localAuth!=null){
            int count = localAuthService.updateLocalAuth(username,MD5.getMd5(newpas));
            if (count == 1) {
                modelMap.put("success", true);
            } else {
                modelMap.put("success", false);
            }
        }else {
            modelMap.put("success", false);
        }
        return modelMap;
    }
    @RequestMapping(value = "/returnlog", method = RequestMethod.GET)
    @ResponseBody
    private Map<String, Object> returnlog(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        request.getSession().removeAttribute("user");
        HttpSession session = request.getSession();
        Object oo = session.getAttribute("user");
        System.out.println(oo);
        // 如果用户已登陆也放行
        if(oo == null) {
           modelMap.put("success",true);
        }else {
            modelMap.put("success",false);
        }
        return modelMap;
    }
}
