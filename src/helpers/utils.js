"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function imageFilter(file) {
    if (file.mimetype !== 'image/png'
        && file.mimetype !== 'image/jpg'
        && file.mimetype !== 'image/jpeg') {
        return "invalid_content_type";
    }
    else {
        return file.filename;
    }
}
exports.imageFilter = imageFilter;
;
