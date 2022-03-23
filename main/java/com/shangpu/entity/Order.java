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
    private String price;
    //商品名
    private int orderType;
    //商品名
    private String productName;
    //个人信息
    private PersonInfo personInfo;
}
