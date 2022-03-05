package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 个人信息
 */
@Data
public class PersonInfo {
    //ID
    private Long userId;
    //姓名昵称
    private String name;
    //头像
    private String profileImg;
    //邮箱
    private String email;
    //性别
    private String gender;
    //用户状态
    private Integer enableStatus;
    //1.顾客 2.店家 3.超级管理员
    private String userType;
    //创建时间
    private Date createTime;
    // 最后更改时间
    private Date lastEditTime;
}
