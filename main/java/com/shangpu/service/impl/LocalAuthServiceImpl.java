package com.shangpu.service.impl;


import com.shangpu.dao.LocalAuthDao;
import com.shangpu.entity.LocalAuth;
import com.shangpu.service.LocalAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalAuthServiceImpl implements LocalAuthService {

    @Autowired
    private LocalAuthDao localAuthDao;

    @Override
    public LocalAuth queryLocalAuthByUserNameAndPwd(String userName, String password) {
        return localAuthDao.queryLocalByUserNameAndPwd(userName, password);
    }

    @Override
    public int queryLocalUserName(String userName) {
        return localAuthDao.queryUserName(userName);
    }

    /**
     * 注册成功插入信息
     *
     * @param localAuth
     * @return
     */
    @Override
    public int insertLocalAuth(LocalAuth localAuth) {
        return localAuthDao.insertLocalAuth(localAuth);
    }

}

