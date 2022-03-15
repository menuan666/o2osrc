package com.shangpu.service;

import com.shangpu.dto.ImageHolder;
import com.shangpu.dto.ProductExecution;
import com.shangpu.entity.Product;
import com.shangpu.exceptions.ProductOperationException;

import java.io.InputStream;
import java.util.List;

public interface ProductService {
    /**
     * 查询商品列表并分页，可输入的条件有︰商品名（模糊），商品状态，店铺Id,商品类别
     * @param product
     * @param pageIndex
     * @param pageSize
     * @return
     */
    ProductExecution getProductList(Product product, int pageIndex, int pageSize);
    /**
     * 添加商品信息以及图片处理
     * @param product
     * @param thumbnail
     * @param productImgHolderList
     * @return
     * @throws ProductOperationException
     */
    ProductExecution addProduct(Product product, ImageHolder thumbnail, List<ImageHolder> productImgHolderList
    ) throws ProductOperationException;

    /**
     * 通过商品id查询唯一的商品信息
     * @param productId
     * @return
     */
    Product getProductById(Long productId);

    /**
     *修改商品信息及图片处理
     * @param product
     * @param thumbnail
     * @return
     * @throws ProductOperationException
     */
    ProductExecution modifyProduct(Product product, ImageHolder thumbnail, List<ImageHolder> productImgHolderList
    ) throws ProductOperationException;
}