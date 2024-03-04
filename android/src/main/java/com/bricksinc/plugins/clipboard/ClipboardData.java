package com.bricksinc.plugins.clipboard;

public class ClipboardData {

    private String value;

    private String text;
    private String type;

    public ClipboardData() {
    }

    public ClipboardData(String value, String type, String text) {
        this.value = value;
        this.type = type;
        this.text = text;
    }

    public String getValue() {
        return value;
    }

    public String getType() {
        return type;
    }

    public String getText() {
        return text;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setText(String text) {
        this.text = text;
    }
}
