package com.shangpu.dao;

import com.shangpu.entity.Runner;
import com.shangpu.entity.Shop;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RunnerDao {
    /**
     * 查询订单
     * @param userId
     * @param getUserId
     * @return
     */
    List<Runner> selectrunner(@Param("userId") Long userId, @Param("getUserId") Long getUserId);

    /**
     * 添加订单
     * @param runner
     * @return
     */
    int insertRunner(Runner runner);
}
