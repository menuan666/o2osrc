package com.shangpu.service.impl;

import com.shangpu.dao.ProductCategoryDao;
import com.shangpu.dto.ProductCategoryExecution;
import com.shangpu.entity.ProductCategory;
import com.shangpu.enums.ProductCategoryStateEnum;
import com.shangpu.exceptions.ProductCategoryOperationException;
import com.shangpu.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    @Autowired
    private ProductCategoryDao productCategoryDao;

    @Override
    public List<ProductCategory> getProductCategoryList(long shopId) {
        return productCategoryDao.queryProductCategoryList(shopId);

    }
    @Override
    @Transactional
    public ProductCategoryExecution batchAddProductCategory(List<ProductCategory> productCategoryList)
                                                            throws ProductCategoryOperationException {
        if (productCategoryList != null && productCategoryList.size() > 0){
            try {
                int effectedNum = productCategoryDao.batchInsertProductCategory(productCategoryList);
                if (effectedNum <=0) {
                    throw new ProductCategoryOperationException("店铺类别创建失败");
                }else {
                    return new ProductCategoryExecution(ProductCategoryStateEnum.SUCCESS);
                }
                } catch (Exception e) {
                throw new ProductCategoryOperationException("batchAddProductCategory error: " + e.getMessage());
            }
                }else{
                    return new ProductCategoryExecution(ProductCategoryStateEnum.EMPTY_LIST);
                }
            }
                }