package com.shangpu.service;

import com.shangpu.entity.LocalAuth;

public interface LocalAuthService {
    LocalAuth queryLocalAuthByUserNameAndPwd(String userName, String password);

    int queryLocalUserName(String userName);
}
