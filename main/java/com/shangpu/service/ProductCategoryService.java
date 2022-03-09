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

    /**
     * 批量添加商品类别
     * @param productCategoryList
     * @return
     * @throws ProductCategoryOperationException
     */
    ProductCategoryExecution batchAddProductCategory(List<ProductCategory> productCategoryList)
throws ProductCategoryOperationException;

    /**
     * 将此类别下的商品的类别id置为空，再删除掉该商品类别
     * @param productCategoryId
     * @param shopId
     * @return
     * @throws ProductCategoryOperationException
     */
    ProductCategoryExecution deleteProductCategory(long productCategoryId,long shopId)
            throws ProductCategoryOperationException;



}
