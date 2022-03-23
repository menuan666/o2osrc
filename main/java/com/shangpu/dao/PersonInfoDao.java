package com.shangpu.dao;

import com.shangpu.entity.LocalAuth;
import com.shangpu.entity.PersonInfo;

public interface PersonInfoDao {
    /**
     * 添加用户信息
     * @param personInfo
     * @return
     */
    int insertPersonInfoname(PersonInfo personInfo);

    /**
     * 用户修改个人信息
     * @param personInfo
     * @return
     */
    int updatePersonInfo(PersonInfo personInfo);

    /**
     * 查询个人信息
     * @param userId
     * @return
     */
    PersonInfo selectpersoninfo(Long userId);
}
