package com.shangpu.service.impl;

import com.shangpu.dao.OrderDao;
import com.shangpu.entity.Order;
import com.shangpu.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;
    /**
     * 插入订单
     *
     * @param order
     * @return
     */
    @Override
    public int insertorder(Order order) {
        return orderDao.insertorder(order);
    }
    /**
     * 查询所有订单
     *
     * @param userId
     * @return
     */
    @Override
    public List<Order> queryorder(Long userId) {
        return orderDao.queryorder(userId);
    }
}
