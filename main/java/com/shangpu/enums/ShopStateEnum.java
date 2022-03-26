package com.shangpu.enums;

import lombok.Getter;

@Getter
public enum ShopStateEnum {
    CHECK(1, "审核中"), OEFLINME(-1, "非法店铺"), SUCCESS(0, "操作成功"),
    PASS(2, "通过认证"), INNER_ERROR(-1001, "内部系统错误"),NULL_SHOPID(-1002,"ShopId为空")
    ,NULL_SHOP(-1003,"shop信息为空");
    private int state;
    private String stateInfo;

    private ShopStateEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    /**
     * 依据传入的state返回相应的enum值
     */
    public static ShopStateEnum stateOf(int state) {
        for (ShopStateEnum stateEnum : values()) {
            if (stateEnum.getState() == state) {
                return stateEnum;
            }
        }
        return null;
    }


 }
