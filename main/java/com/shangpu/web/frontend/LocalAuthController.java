package com.shangpu.web.frontend;
import com.shangpu.entity.LocalAuth;
import com.shangpu.entity.PersonInfo;
import com.shangpu.service.LocalAuthService;
import com.shangpu.service.PersonInfoService;
import com.shangpu.util.CodeUtil;
import com.shangpu.util.HttpServletRequestUtil;
import com.shangpu.util.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/frontend", method = {RequestMethod.GET, RequestMethod.POST})
public class LocalAuthController {

    @Autowired
    private LocalAuthService localAuthService;
    @Autowired
    private PersonInfoService personInfoService;

    @RequestMapping("localauthlogincheck")
    @ResponseBody
    public Map<String, Object> localAuthLoginCheck(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();

        // 是否需要校验的标志
        boolean needVerify = HttpServletRequestUtil.getBoolean(request, "needVerify");

        // 验证码校验
        if (needVerify && !CodeUtil.checkVerifyCode(request)) {
            modelMap.put("success", false);
            modelMap.put("errMsg", "验证码不正确,请重新输入");
            return modelMap;
        }
        // 获取用户输入的用户名+密码
        String userName = HttpServletRequestUtil.getString(request, "userName");
        String password = HttpServletRequestUtil.getString(request, "password");
        System.out.println(userName);
        System.out.println(password);
        if (userName != null && password != null) {
            // 数据库中的密码是MD加密的，所以需要先将密码加密，然后再调用后台的接口
            password = MD5.getMd5(password);
            LocalAuth localAuth = localAuthService.queryLocalAuthByUserNameAndPwd(userName, password);
            if (localAuth != null) {
                // 将personInfo写入session中
                request.getSession().setAttribute("user", localAuth.getPersonInfo());
                modelMap.put("success", true);
                modelMap.put("errMsg", "登录成功");
            } else {
                modelMap.put("success", false);
                modelMap.put("errMsg", "用户名或密码不正确");
            }
        } else {
            modelMap.put("success", false);
            modelMap.put("errMsg", "用户名和密码不能为空");
        }
        return modelMap;
    }
    @RequestMapping("localauthregister")
    @ResponseBody
    public Map<String, Object> localAuthRegister(HttpServletRequest request) {
        Map<String, Object> modelMap = new HashMap<String, Object>();
        if (!CodeUtil.checkVerifyCode(request)) {
            modelMap.put("success", false);
            modelMap.put("errMsg", "验证码不正确,请重新输入");
            return modelMap;
        }
        String userName = HttpServletRequestUtil.getString(request, "userName");
        String password = HttpServletRequestUtil.getString(request, "password");
        String name = HttpServletRequestUtil.getString(request, "name");
        System.out.println(userName+"--"+password+"--"+name);
        if (userName != null && password != null && name !=null){
            if (localAuthService.queryLocalUserName(userName)==0){
                PersonInfo pe = new PersonInfo();
                pe.setName(name);
                LocalAuth lo = new LocalAuth();
                password = MD5.getMd5(password);
                lo.setPassword(password);
                lo.setUsername(userName);
                int count = personInfoService.insertPersonInfoname(pe);
                if (count!=1){
                    modelMap.put("success", false);
                    modelMap.put("errMsg", "注册失败，写入信息失败");
                    return modelMap;
                }
                lo.setPersonInfo(pe);
                int a = localAuthService.insertLocalAuth(lo);
                if (a!=1){
                    modelMap.put("success", false);
                    modelMap.put("errMsg", "注册失败，写入本地信息失败");
                    return modelMap;
                }
            }else{
                modelMap.put("success", false);
                modelMap.put("errMsg", "该用户名已存在");
                return modelMap;
            }

        }modelMap.put("success", true);
        modelMap.put("errMsg", "注册成功");
        return modelMap;
    }
}

