package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 微信账号
 */
@Data
public class WechatAuth {
    //id
    private Long wechatAuthId;
    //openid
    private String openId;
    //创建时间
    private Date createTime;
    //个人信息
    private PersonInfo personInfo;
}
