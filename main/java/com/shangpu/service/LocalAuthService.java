package com.shangpu.service;

import com.shangpu.entity.LocalAuth;

public interface LocalAuthService {
    /**
     * 登录时查询本地账户名密码
     * @param userName
     * @param password
     * @return
     */
    LocalAuth queryLocalAuthByUserNameAndPwd(String userName, String password);

    /**
     * 查询用户是否已注册
     * @param userName
     * @return
     */
    int queryLocalUserName(String userName);

    /**
     * 注册成功
     * @param localAuth
     * @return
     */
    int insertLocalAuth(LocalAuth localAuth);

    /**
     * 用户改密码
     * @param userName
     * @param password
     * @return
     */
    int updateLocalAuth(String userName, String password);
}
