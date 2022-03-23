package com.shangpu.dao;


import com.shangpu.entity.Order;

import java.util.List;

public interface OrderDao {
    /**
     * 插入订单
     * @param order
     * @return
     */
    int insertorder(Order order);

    /**
     * 查询所有订单
     * @param userId
     * @return
     */
    List<Order> queryorder(Long userId);
}
