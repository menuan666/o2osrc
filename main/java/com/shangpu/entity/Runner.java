package com.shangpu.entity;

import lombok.Data;

import java.util.Date;
@Data
public class Runner {
    //跑腿编号
    private Long runnerId;
    //创建时间
    private Date createTime;
    //跑腿名字
    private String runnerName;
    //联系方式
    private String phone;
    //跑腿描述
    private String runnerDesc;
    //价格
    private double price;
    //是否完成 0未完成 1进行中 2已完成
    private int status;
    //个人信息
    private Long userId;
    //接单人信息
    private Long getUserId;
}
