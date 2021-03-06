package com.shangpu.service.impl;

import com.shangpu.dao.ShopDao;
import com.shangpu.dto.ImageHolder;
import com.shangpu.dto.ShopExecution;
import com.shangpu.entity.Shop;
import com.shangpu.enums.ShopStateEnum;
import com.shangpu.exceptions.ShopOperationException;
import com.shangpu.service.ShopService;
import com.shangpu.util.ImageUtil;
import com.shangpu.util.PageCalculator;
import com.shangpu.util.PathUtil;
import org.apache.ibatis.javassist.bytecode.stackmap.BasicBlock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

@Service
public class ShopServiceImpl implements ShopService {
    @Autowired
    private ShopDao shopDao;

    @Override
    public ShopExecution getShopList(Shop shopCondition, int pageIndex, int pageSize) {
        int rowIndex = PageCalculator.calculateRowIndex(pageIndex, pageSize);
        List<Shop> shopList = shopDao.queryShopList(shopCondition, rowIndex, pageSize);
        int count = shopDao.queryShopCount(shopCondition);
        ShopExecution se = new ShopExecution();
        if ( shopList != null){
            se.setShopList(shopList);
            se.setCount(count);
        }else {
            se.setState(ShopStateEnum.INNER_ERROR.getState());
        }
        return se;
    }
    @Override
    public Shop getByShopId(long shopId) {
        return shopDao.queryByShopId(shopId);
    }

    @Override
    public ShopExecution modifyShop(Shop shop, ImageHolder thumbnail) throws ShopOperationException {
        if (shop == null || shop.getShopId() == null) {
            return new ShopExecution(ShopStateEnum.NULL_SHOP);
        } else {
            try {
            //1.判断是否需要处理图片
            if (thumbnail.getImageName() != null && thumbnail.getImage() != null && !"".equals(thumbnail.getImageName())) {
                Shop tempShop = shopDao.queryByShopId(shop.getShopId());
                if (tempShop.getShopImg() != null) {
                    ImageUtil.deleteFileOrPath(tempShop.getShopImg());
                }
                addShopImg(shop, thumbnail);
            }
            //⒉.更新店铺信息
            shop.setLastEditTime(new Date());
            int effectedNum = shopDao.updateShop(shop);
            if (effectedNum <= 0) {
                return new ShopExecution(ShopStateEnum.INNER_ERROR);
            } else {
                shop = shopDao.queryByShopId(shop.getShopId());
                return new ShopExecution(ShopStateEnum.SUCCESS, shop);
            }}catch (Exception e){
                throw new ShopOperationException("modifyShop error:" + e.getMessage());
            }
        }
    }

    @Override
    @Transactional
    public ShopExecution addShop(Shop shop, ImageHolder thumbnail) throws ShopOperationException {
        //空值判断
        if (shop == null) {
            return new ShopExecution(ShopStateEnum.NULL_SHOP);
        }
            try {
                //给店铺信息赋值初始值
                shop.setEnableStatus(1);
                shop.setCreateTime(new Date());
                shop.setLastEditTime(new Date());
                //添加
                int effectedNum = shopDao.insertShop(shop);
                if (effectedNum <= 0) {
                    throw new ShopOperationException("店铺创建失败");
                } else {
                    if (thumbnail.getImage() != null) {
                        //存储图片
                        try {
                            addShopImg(shop,thumbnail);
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

    private void addShopImg(Shop shop, ImageHolder thumbnail) {
        //获取图片路径的相对值路径
        String dest = PathUtil.getShopImagePath(shop.getShopId());
        String shopImgAddr = ImageUtil.generateThumbnail(thumbnail,dest);
        shop.setShopImg(shopImgAddr);
    }

}
