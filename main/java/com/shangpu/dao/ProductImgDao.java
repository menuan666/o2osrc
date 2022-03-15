package com.shangpu.dao;

import com.shangpu.entity.ProductImg;

import java.util.List;

public interface ProductImgDao {
    /**
     * 查询商品下的详情图片
     * @param productId
     * @return
     */
    List<ProductImg> queryProductImgList(long productId);

    /**
     * 批量添加商品详情图片
     * @param productImgList
     * @return
     */
    int batchInsertProductImg(List<ProductImg> productImgList);

    /**
     * 删除指定商品下的所有详情图
     * @param productId
     * @return
     */
    int deleteProductImgByProductId(long productId);


}
