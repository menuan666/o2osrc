package com.shangpu.interceptor;

import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest,
                             HttpServletResponse httpServletResponse, Object o) throws Exception {
        //URL带login 放行
        if (httpServletRequest.getRequestURI().contains("login")) {
            return true;
        }
        HttpSession session = httpServletRequest.getSession();
        Object oo = session.getAttribute("user");
        System.out.println(oo);
        // 如果用户已登陆也放行
        if(oo != null) {
            System.out.println(1);
            return true;
        }

        // 用户没有登陆跳转到登陆页面
        System.out.println(2);
        httpServletRequest.getRequestDispatcher("/frontend/login").
                forward(httpServletRequest, httpServletResponse);
        return false;
    }
//        System.out.println("登陆判断");
//        System.out.println(httpServletRequest.getSession().getAttribute("user"));
//        if (httpServletRequest.getSession().getAttribute("user") == null) {
//            System.out.println("登陆不为空");
//            return true;
//        }
//        httpServletResponse.sendRedirect("/frontend/login");
//        return false;}
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        System.out.println("afterCompletion");
    }
}
