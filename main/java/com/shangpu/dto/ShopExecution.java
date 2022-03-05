package com.shangpu.dto;

import com.shangpu.entity.Shop;
import com.shangpu.enums.ShopStateEnum;
import lombok.Data;

import java.util.List;
@Data
public class ShopExecution {
    //结果状态
    private int state;
    //状态标识
    private String stateInfo;
    //店铺数量
    private int count;
    //操作的shop(增删改店铺的时候用到)
    private Shop shop;
    // shop列表(查询店铺列表的时候使用)
    private List<Shop> shopList;
    public ShopExecution() {
    }

    //店铺操作失败时的构造器
    public ShopExecution(ShopStateEnum stateEnum) {
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
    }

    //店铺操作成功时的构造器
    public ShopExecution(ShopStateEnum stateEnum,Shop shop) {
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.shop = shop;
    }

    //店铺操作成功时的构造器
    public ShopExecution(ShopStateEnum stateEnum, List<Shop> shopList) {
        this.state = stateEnum.getState();
        this.stateInfo = stateEnum.getStateInfo();
        this.shopList = shopList;
    }

}
