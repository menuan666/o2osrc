package com.shangpu.service.impl;

import com.shangpu.dao.RunnerDao;
import com.shangpu.entity.Runner;
import com.shangpu.service.RunnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RunnerServiceImpl implements RunnerService {
    @Autowired
    private RunnerDao runnerDao;
    /**
     * 查询跑腿订单
     *
     * @param userId
     * @param getUserId
     * @return
     */
    @Override
    public List<Runner> selectrunner(Long userId, Long getUserId,Long runner) {
        return runnerDao.selectrunner(userId,getUserId,runner);
    }

    /**
     * 插入跑腿订单
     *
     * @param runner
     * @return
     */
    @Override
    public int insertRunner(Runner runner) {
        return runnerDao.insertRunner(runner);
    }

    /**
     * 修改订单状态
     *
     * @param runner
     * @return
     */
    @Override
    public int updaterunnerstatus(Runner runner) {
        return runnerDao.updaterunnerstatus(runner);
    }
}
