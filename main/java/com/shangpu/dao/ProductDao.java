package com.shangpu.dao;

import com.shangpu.entity.Product;

public interface ProductDao {
    /**
     * 插入商品
     *
     * @param product
     * @retlrn
     */
    int insertProduct(Product product);

}
