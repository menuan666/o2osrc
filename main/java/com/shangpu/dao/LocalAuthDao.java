package com.shangpu.dao;

import com.shangpu.entity.LocalAuth;
import org.apache.ibatis.annotations.Param;

public interface LocalAuthDao {

    /**
     *
     *
     * @Title: queryLocalByUserNameAndPwd
     *
     * @Description: 根据用户名和密码查询用户
     *
     * @param userName
     * @param password
     *
     * @return: LocalAuth
     */
    LocalAuth queryLocalByUserNameAndPwd(@Param("userName") String userName, @Param("password") String password);

    /**
     * 查询该用户名是否注册
     * @param userName
     * @return
     */
    int queryUserName(String userName);

    /**
     * 用户注册
     * @param localauth
     * @return
     */
    int insertLocalAuth(LocalAuth localauth);

}

