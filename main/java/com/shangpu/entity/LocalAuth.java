package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 本地账号
 */
@Data
public class LocalAuth {
    //本地账号
    private Long localAuthId;
    //用户名
    private String username;
    //密码
    private String password;
    //创建时间
    private Date createTime;
    //修改时间
    private Date lastEditTime;
    //个人信息
    private PersonInfo personInfo;

}
