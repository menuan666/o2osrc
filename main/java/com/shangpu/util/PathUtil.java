package com.shangpu.util;

import java.util.Locale;

public class PathUtil {
    private static String seperator = System.getProperty("file.separator");

    public static String getImgBasePath() {

        String os = System.getProperty("os.name");
        String basePath = "";
        if (os.toLowerCase().startsWith("win")) {
            basePath = "E:/bishe/image/";
        } else {
            basePath = "/home/bishe/image/";
        }
        basePath = basePath.replace("/", seperator);
        return basePath;
    }
        public static String getShopImagePath ( long shopId){
            String imagePath = "upload/item/shop/" + shopId + "/";
            return imagePath.replace(" /", seperator);
        }

    }

