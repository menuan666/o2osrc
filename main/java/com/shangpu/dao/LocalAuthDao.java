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
}

