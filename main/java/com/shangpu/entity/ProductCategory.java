package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 商品类别
 */
@Data
public class ProductCategory {
    //商品类别ID
    private Long productCategoryId;
    //店铺 ID
    private Long shopId;
    //商品类别名字
    private String productCategoryName;
    //权重
    private Integer priority;
    //创建时间
    private Date createTime;

}
