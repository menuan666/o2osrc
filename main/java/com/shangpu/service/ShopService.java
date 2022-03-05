package com.shangpu.service;

import com.shangpu.dto.ShopExecution;
import com.shangpu.entity.Shop;
import com.shangpu.exceptions.ShopOperationException;

import java.io.File;
import java.io.InputStream;

public interface ShopService {
    ShopExecution addShop(Shop shop, InputStream shopImgInputStream,String fileName) throws ShopOperationException;
}
