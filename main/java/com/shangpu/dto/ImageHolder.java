package com.shangpu.dto;

import lombok.Data;

import java.io.InputStream;

/**
 * dto是封装把查询的字段封装好返回给前端  让前端解析
 */

@Data
public class ImageHolder {
    private String imageName;
    private InputStream image;
    public ImageHolder(String imageName, InputStream image){
        this.imageName = imageName;
        this.image = image;
    }
}
