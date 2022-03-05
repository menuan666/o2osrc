package com.shangpu.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Date;
/**
 * @author menuan
 * 区域
 */
@Data
@Accessors(chain = true)
public class Area {
    //ID
    private Integer areaId;
    //名字
    private String areaName;
    //权重
    private Integer priority;
    //创建时间
    private Date createTime;
    //最后更改时间
    private Date lastEditTime;
}
