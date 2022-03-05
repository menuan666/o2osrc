package com.shangpu.dao;

import com.shangpu.entity.Area;

import java.util.List;

/**
 * @author menuan
 */
public interface AreaDao {
    /**
     *列出区域列表
     * @return
     */
    List<Area> queryArea();
}
