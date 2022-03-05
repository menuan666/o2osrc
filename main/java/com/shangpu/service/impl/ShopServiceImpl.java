package com.shangpu.service.impl;

import com.shangpu.dao.ShopDao;
import com.shangpu.dto.ShopExecution;
import com.shangpu.entity.Shop;
import com.shangpu.enums.ShopStateEnum;
import com.shangpu.exceptions.ShopOperationException;
import com.shangpu.service.ShopService;
import com.shangpu.util.ImageUtil;
import com.shangpu.util.PathUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.InputStream;
import java.util.Date;
@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopDao shopDao;

    @Override
    @Transactional
    public ShopExecution addShop(Shop shop, InputStream shopImgInputStream, String fileName) throws ShopOperationException {
        //空值判断
        if (shop == null) {
            return new ShopExecution(ShopStateEnum.NULL_SHOP);
        }
            try {
                //给店铺信息赋值初始值
                shop.setEnableStatus(0);
                shop.setCreateTime(new Date());
                shop.setLastEditTime(new Date());
                //添加
                int effectedNum = shopDao.insertShop(shop);
                if (effectedNum <= 0) {
                    throw new ShopOperationException("店铺创建失败");
                } else {
                    if (shopImgInputStream != null) {
                        //存储图片
                        try {
                            addShopImg(shop, shopImgInputStream,fileName);
                        } catch (Exception e) {
                            throw new ShopOperationException("addShopImg error:" + e.getMessage());
                        }
                        //更新店铺的图片地址
                        effectedNum = shopDao.updateShop(shop);
                        if (effectedNum <= 0) {
                            throw new ShopOperationException("更新图片地址失败");
                        }
                    }
                }
            } catch (Exception e) {
                throw new ShopOperationException("addShop error:" + e.getMessage());

            }
        return new ShopExecution(ShopStateEnum.CHECK,shop);
    }

    private void addShopImg(Shop shop, InputStream shopImgInputStream,String fileName) {
        //获取图片路径的相对值路径
        String dest = PathUtil.getShopImagePath(shop.getShopId());
        String shopImgAddr = ImageUtil.generateThumbnail(shopImgInputStream,fileName,dest);
        shop.setShopImg(shopImgAddr);
    }

}
