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
}
