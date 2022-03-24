package com.shangpu.service;

import com.shangpu.entity.Runner;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RunnerService {
    /**
     * 查询跑腿订单
     * @param userId
     * @param getUserId
     * @return
     */
    List<Runner> selectrunner(@Param("userId") Long userId, @Param("getUserId") Long getUserId);

    /**
     * 插入跑腿订单
     * @param runner
     * @return
     */
    int insertRunner(Runner runner);
}
