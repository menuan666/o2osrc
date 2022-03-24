package com.shangpu.entity;

import lombok.Data;

import java.util.Date;
@Data
public class Order {
    //订单编号
    private Long orderId;
    //创建时间
    private Date createTime;
    //价格
    private double price;
    //取货码
    private String code;
    //商品名
    private int orderType;
    //商品名
    private String productName;
    //是否完成 0未完成 1已完成
    private int  status;
    //个人信息
    private PersonInfo personInfo;
}
