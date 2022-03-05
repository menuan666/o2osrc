package com.shangpu.entity;

import lombok.Data;

import java.util.Date;

/**
 * @author menuan
 * 图片描述
 */
@Data
public class ProductImg {
    //图片ID
    private Long productImgId;
    //图片地址
    private String imgAddr;
    //图片描述
    private String imgDesc;
    //权重
    private Integer priority;
    //创建时间
    private Date createTime;
    //商品ID
    private Long productId;

}
