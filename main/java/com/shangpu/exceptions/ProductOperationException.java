package com.shangpu.exceptions;

public class ProductOperationException extends RuntimeException{
    private static final long serialVersionUID = 2361568954822298905L;
    public ProductOperationException(String msg) {
        super(msg);
    }
}