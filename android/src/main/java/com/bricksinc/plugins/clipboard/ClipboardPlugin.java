package com.bricksinc.plugins.clipboard;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Clipboard")
public class ClipboardPlugin extends Plugin {

    private Clipboard implementation;

    @Override
    public void load() {
        implementation = new Clipboard(getContext());
    }

    @PluginMethod
    public void write(PluginCall call) {
        String textVal = call.getString("text");
        String htmlVal = call.getString("html");
        String imageVal = call.getString("image");
        String urlVal = call.getString("url");
        String label = call.getString("label");

        ClipboardWriteResponse response;

        if (htmlVal != null) {
            response = implementation.writeHtml(label, textVal != null ? textVal : "", htmlVal);
        } else if (textVal != null) {
            response = implementation.writeText(label, textVal);
        } else if (imageVal != null) {
            response = implementation.writeText(label, imageVal);
        } else if (urlVal != null) {
            response = implementation.writeText(label, urlVal);
        } else {
            call.reject("No data provided");
            return;
        }

        if (response.isSuccess()) {
            call.resolve();
        } else {
            call.reject(response.getErrorMessage());
        }
    }

    @PluginMethod
    public void read(PluginCall call) {
        ClipboardData result = implementation.read();

        if (result == null) {
            call.reject("Unable to read clipboard from the given Context");
        } else if (result.getValue() == null) {
            call.reject("There is no data on the clipboard");
        } else {
            JSObject resultJS = new JSObject();
            resultJS.put("value", result.getValue());
            resultJS.put("type", result.getType());

            call.resolve(resultJS);
        }
    }
}