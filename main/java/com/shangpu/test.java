package com.shangpu;

import com.shangpu.entity.Area;

public class test {
    public static void main(String[] args) {
        Area area = new Area();
        area.setAreaId(1).setAreaName("my").setPriority(1);
        System.out.println(area);
    }

}
