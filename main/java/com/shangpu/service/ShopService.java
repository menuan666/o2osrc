package com.shangpu.service;

import com.shangpu.dto.ImageHolder;
import com.shangpu.dto.ShopExecution;
import com.shangpu.entity.Shop;
import com.shangpu.exceptions.ShopOperationException;

import java.io.File;
import java.io.InputStream;

public interface ShopService {
    /**
     * 根据ShopExecution分页返回相应的数据列表
     * @param shopCondition
     * @param pageIndex
     * @param pageSize
     * @return
     */
    public ShopExecution getShopList(Shop shopCondition, int pageIndex, int pageSize);

    /**
     * 通过店铺ID获取店铺信息
     * @param shopId
     * @return
     */
    Shop getByShopId(long shopId);

    /**
     * 更新店铺的信息，包括图片的处理
     * @param shop
     * @return
     * @throws ShopOperationException
     */
    ShopExecution modifyShop(Shop shop, ImageHolder thumbnail) throws ShopOperationException;

    /**
     * 注册店铺信息，包括图片的处理
     * @param shop
     * @return
     * @throws ShopOperationException
     */
    ShopExecution addShop(Shop shop, ImageHolder thumbnail) throws ShopOperationException;

}
