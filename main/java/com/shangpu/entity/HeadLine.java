package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 首页轮播图
 */
@Data
public class HeadLine {
    //id
    private Long lineId;
    //名字
    private String lineName;
    //链接：指向某一个页面
    private String lineLink;
    //轮播图
    private String lineImg;
    //权重
    private Integer priority;
    //0.不可用1.可用
    private Integer enableStatus;
    //创建时间
    private Date createTime;
    //最后修改时间
    private Date lastEditTime;
}
