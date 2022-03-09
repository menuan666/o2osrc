package com.shangpu.service;

import com.shangpu.dto.ProductCategoryExecution;
import com.shangpu.entity.ProductCategory;

import com.shangpu.exceptions.ProductCategoryOperationException;

import java.util.List;

public interface ProductCategoryService {
    /**
     * 查询指定店铺下的所有商品类别信息
     * @param shopId
     * @return
     */
    List<ProductCategory> getProductCategoryList(long shopId);

    ProductCategoryExecution batchAddProductCategory(List<ProductCategory> productCategoryList)
throws ProductCategoryOperationException;

}
