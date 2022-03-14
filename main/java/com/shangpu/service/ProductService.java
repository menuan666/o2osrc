package com.shangpu.service;

import com.shangpu.dto.ImageHolder;
import com.shangpu.dto.ProductExecution;
import com.shangpu.entity.Product;
import com.shangpu.exceptions.ProductOperationException;

import java.io.InputStream;
import java.util.List;

public interface ProductService {
    /**
     * 添加商品信息以及图片处理
     * @param product
     * @param thumbnail
     * @param productImgHolderList
     * @return
     * @throws ProductOperationException
     */
    ProductExecution addProduct(Product product, ImageHolder thumbnail,
                                List<ImageHolder> productImgHolderList
    ) throws ProductOperationException;
}