package com.shangpu.service;

import com.shangpu.entity.PersonInfo;

public interface PersonInfoService {
    /**
     * 注册时插入信息
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
}
