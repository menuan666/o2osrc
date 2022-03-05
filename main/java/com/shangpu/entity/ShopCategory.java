package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 店铺类别
 */
@Data
public class ShopCategory {
    //ID
    private Long shopCategoryId;
    //店铺名字
    private String shopCategoryName;
    //店铺描述
    private String shopCategoryDesc;
    //店铺图片
    private String shopCategoryImg;
    //权重
    private Integer priotity;
    //创建时间
    private Date createTime;
    //最后修改时间
    private Date lastEditTime;
    //上级ID
    private ShopCategory parent;

}
