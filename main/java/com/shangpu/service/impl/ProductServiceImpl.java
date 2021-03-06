package com.shangpu.service.impl;

import com.shangpu.dao.ProductDao;
import com.shangpu.dao.ProductImgDao;
import com.shangpu.dto.ImageHolder;
import com.shangpu.dto.ProductExecution;
import com.shangpu.entity.Product;
import com.shangpu.entity.ProductImg;
import com.shangpu.enums.ProductStateEnum;
import com.shangpu.exceptions.ProductOperationException;
import com.shangpu.service.ProductService;
import com.shangpu.util.ImageUtil;
import com.shangpu.util.PageCalculator;
import com.shangpu.util.PathUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private ProductImgDao productImgDao;

    /**
     * 查询商品列表并分页，可输入的条件有︰商品名（模糊），商品状态，店铺Id,商品类别
     *
     * @param productCondition
     * @param pageIndex
     * @param pageSize
     * @return
     */
    @Override
    public ProductExecution getProductList(Product productCondition, int pageIndex, int pageSize) {
        //页码转换成数据库的行码，并调用dao层取回指定页码的商品列表
        int rowIndex = PageCalculator.calculateRowIndex(pageIndex, pageSize);
        List<Product> productList = productDao.queryProductList(productCondition, rowIndex, pageSize);
        //基于同样的查询条件返回该查询条件下的商品总数
        int count = productDao.queryProductCount(productCondition);
        ProductExecution pe = new ProductExecution();
        pe.setProductList(productList);
        pe.setCount(count);
        return pe;

    }

    @Override
    @Transactional
    //处理缩略图，获取缩略图相对路径并赋值给product
    //往tb_product写入商品信息，获取productId
    //结合productId批量处理商品详情图
    //将商品详情图列表批量插入tb_product_img中
    public ProductExecution addProduct(Product product, ImageHolder thumbnail, List<ImageHolder> productImgHolderList)
            throws ProductOperationException {
        //空值判断
        if (product != null && product.getShop() != null && product.getShop().getShopId() != null) {
            //给商品设置上默认属性
            product.setCreateTime(new Date());
            product.setLastEditTime(new Date());
            //默认为上架的状态
            product.setEnableStatus(1);
            //若商品缩略图不为空则添加
            if (thumbnail != null) {
                addThumbnail(product, thumbnail);
            }
            try {
                //创建商品信息
                int effectedNum = productDao.insertProduct(product);
                if (effectedNum <= 0) {
                    throw new ProductOperationException("创建商品失败");
                }
            } catch (Exception e) {
                throw new ProductOperationException("创建商品失败:" + e.toString());
            }
            //若商品详情图不为空则添加
            if (productImgHolderList != null && productImgHolderList.size() > 0) {
                addProductImgList(product, productImgHolderList);
            }
            return new ProductExecution(ProductStateEnum.SUCCESS, product);
        } else {
            //传参为空则返回空值错误信息
            return new ProductExecution(ProductStateEnum.EMPTY);
        }

    }

    /**
     * 通过商品id查询唯一的商品信息
     *
     * @param productId
     * @return
     */
    @Override
    public Product getProductById(Long productId) {
        return productDao.queryProductById(productId);
    }

    /**
     * 修改商品信息及图片处理
     *
     * @param product
     * @param thumbnail
     * @param productImgHolderList
     * @return
     * @throws ProductOperationException
     */
    @Override
    @Transactional
    //若缩略图参数有值，则处理缩略图，
    //若原先存在缩略图则先删除再添加新图，之后获取缩略图相对路径并赋值给product
    //若商品详情图列表参数有值，对商品详情图片列表进行同样的操作
    //将tb_product_img下面的该商品原先的商品详情图记录全部清除
    //更新tb_product的信息
    public ProductExecution modifyProduct(Product product, ImageHolder thumbnail, List<ImageHolder> productImgHolderList)
            throws ProductOperationException {
        //空值判断
        if (product != null && product.getShop() != null && product.getShop().getShopId() != null) {
            //给商品设置上默认属性
            product.setLastEditTime(new Date());
            //如商品缩略图不为空且新的缩略图不为空，则删除原有缩略图并添加
            if (thumbnail != null) {
                //先遍历商品信息，因为原有信息里有旧的图片信息
                Product tempProduct = productDao.queryProductById(product.getProductId());
                if (tempProduct.getImgAddr() != null) {
                    //删除原有的图片文件
                    ImageUtil.deleteFileOrPath(tempProduct.getImgAddr());
                }
                addThumbnail(product,thumbnail);
            }
            //如果有新的商品详情图传入，则删除原来的添加新的
            if (productImgHolderList != null && productImgHolderList.size() > 0) {
                //删除数据库原有的图片地址
                deleteProductImgList(product.getProductId());
                addProductImgList(product, productImgHolderList);
            }
            try {
                //更新商品信息
                int effectedNum = productDao.updateProduct(product);
                if (effectedNum <= 0) {
                    throw new ProductOperationException("更新商品信息失败");
                }
                return new ProductExecution(ProductStateEnum.SUCCESS, product);
            } catch (Exception e) {
                throw new ProductOperationException("更新商品信息失败:" + e.toString());
            }
        } else {
            return new ProductExecution(ProductStateEnum.EMPTY);
        }
    }

    /**
     * 添加缩略图
     *
     * @param product
     * @param thumbnail
     */
    private void addThumbnail(Product product, ImageHolder thumbnail) {
        String dest = PathUtil.getShopImagePath(product.getShop().getShopId());
        String thumbnailAddr = ImageUtil.generateThumbnail(thumbnail, dest);
        product.setImgAddr(thumbnailAddr);
    }

    /**
     * 批量添加图片
     *
     * @param product
     * @param productImgHolderList
     */
    private void addProductImgList(Product product, List<ImageHolder> productImgHolderList) {
        //获取图片存储路径，这里直接存放到相应店铺的文件夹底下
        String dest = PathUtil.getShopImagePath(product.getShop().getShopId());
        List<ProductImg> productImgList = new ArrayList<ProductImg>();
        //遍历图片一次去处理，并添加进productImg实体类里
        for (ImageHolder productImgHolder : productImgHolderList) {
            String imgAddr = ImageUtil.generateNormalImg(productImgHolder, dest);
            ProductImg productImg = new ProductImg();
            productImg.setImgAddr(imgAddr);
            productImg.setProductId(product.getProductId());
            productImg.setCreateTime(new Date());
            productImgList.add(productImg);
        }
        //如果确实是有图片需要添加的，就执行批量添加操作if(productImgListlsize() > 0){
        try {
            int effectedNum = productImgDao.batchInsertProductImg(productImgList);
            if (effectedNum <= 0) {
                throw new ProductOperationException("创建商品详情图片失败");
            }
        } catch (Exception e) {
            throw new ProductOperationException("创建商品详情图片失败:" + e.toString());
        }
    }
    private void deleteProductImgList(long productId) {
        //根据productId获取原来的图片
        List<ProductImg> productImgList = productImgDao.queryProductImgList(productId);
        //干掉原来的图片
        for (ProductImg productImg : productImgList) {
        ImageUtil.deleteFileOrPath(productImg.getImgAddr());}
        //删除数据库里原有图片的信息
        productImgDao.deleteProductImgByProductId(productId);
        }
}




