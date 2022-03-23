package com.shangpu.service.impl;

import com.shangpu.dao.LocalAuthDao;
import com.shangpu.dao.PersonInfoDao;
import com.shangpu.entity.PersonInfo;
import com.shangpu.service.PersonInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonInfoServiceImpl implements PersonInfoService {
    @Autowired
    private PersonInfoDao personInfodao;
    /**
     * 注册时插入信息
     *
     * @param personInfo
     * @return
     */
    @Override
    public int insertPersonInfoname(PersonInfo personInfo) {
        return personInfodao.insertPersonInfoname(personInfo);
    }

    /**
     * 用户修改个人信息
     *
     * @param personInfo
     * @return
     */
    @Override
    public int updatePersonInfo(PersonInfo personInfo) {
        return personInfodao.updatePersonInfo(personInfo);
    }
}
