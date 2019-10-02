var loadImage;

! function(o) {
    "use strict";

    function r(t, i, a) {
        var o, n = document.createElement("img");
        return n.onerror = function(e) {
            return r.onerror(n, e, t, i, a)
        }, n.onload = function(e) {
            return r.onload(n, e, t, i, a)
        }, "string" == typeof t ? (r.fetchBlob(t, function(e) {
            e ? o = r.createObjectURL(t = e) : (o = t, a && a.crossOrigin && (n.crossOrigin = a.crossOrigin)), n.src = o
        }, a), n) : r.isInstanceOf("Blob", t) || r.isInstanceOf("File", t) ? (o = n._objectURL = r.createObjectURL(t)) ? (n.src = o, n) : r.readFile(t, function(e) {
            var t = e.target;
            t && t.result ? n.src = t.result : i && i(e)
        }) : void 0
    }
    var t = o.createObjectURL && o || o.URL && URL.revokeObjectURL && URL || o.webkitURL && webkitURL;

    function n(e, t) {
        !e._objectURL || t && t.noRevoke || (r.revokeObjectURL(e._objectURL), delete e._objectURL)
    }
    r.fetchBlob = function(e, t, i) {
        t()
    }, r.isInstanceOf = function(e, t) {
        return Object.prototype.toString.call(t) === "[object " + e + "]"
    }, r.transform = function(e, t, i, a, o) {
        i(e, o)
    }, r.onerror = function(e, t, i, a, o) {
        n(e, o), a && a.call(e, t)
    }, r.onload = function(e, t, i, a, o) {
        n(e, o), a && r.transform(e, o, a, i, {
            originalWidth: e.naturalWidth || e.width,
            originalHeight: e.naturalHeight || e.height
        })
    }, r.createObjectURL = function(e) {
        return !!t && t.createObjectURL(e)
    }, r.revokeObjectURL = function(e) {
        return !!t && t.revokeObjectURL(e)
    }, r.readFile = function(e, t, i) {
        if (o.FileReader) {
            var a = new FileReader;
            if (a.onload = a.onerror = t, a[i = i || "readAsDataURL"]) return a[i](e), a
        }
        return !1
    }, "function" == typeof define && define.amd ? define(function() {
        return r
    }) : "object" == typeof module && module.exports ? module.exports = r : o.loadImage = r

    loadImage = r;
}("undefined" != typeof window && window || this),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
}(function(v) {
    "use strict";
    var n = v.transform;
    v.transform = function(e, t, i, a, o) {
        n.call(v, v.scale(e, t, o), t, i, a, o)
    }, v.transformCoordinates = function() {}, v.getTransformedOptions = function(e, t) {
        var i, a, o, n, r = t.aspectRatio;
        if (!r) return t;
        for (a in i = {}, t) t.hasOwnProperty(a) && (i[a] = t[a]);
        return i.crop = !0, r < (o = e.naturalWidth || e.width) / (n = e.naturalHeight || e.height) ? (i.maxWidth = n * r, i.maxHeight = n) : (i.maxWidth = o, i.maxHeight = o / r), i
    }, v.renderImageToCanvas = function(e, t, i, a, o, n, r, s, l, c) {
        return e.getContext("2d").drawImage(t, i, a, o, n, r, s, l, c), e
    }, v.hasCanvasOption = function(e) {
        return e.canvas || e.crop || !!e.aspectRatio
    }, v.scale = function(e, t, i) {
        t = t || {};
        var a, o, n, r, s, l, c, d, u, f, g, p = document.createElement("canvas"),
            h = e.getContext || v.hasCanvasOption(t) && p.getContext,
            m = e.naturalWidth || e.width,
            S = e.naturalHeight || e.height,
            b = m,
            y = S;

        function x() {
            var e = Math.max((n || b) / b, (r || y) / y);
            1 < e && (b *= e, y *= e)
        }

        function I() {
            var e = Math.min((a || b) / b, (o || y) / y);
            e < 1 && (b *= e, y *= e)
        }
        if (h && (c = (t = v.getTransformedOptions(e, t, i)).left || 0, d = t.top || 0, t.sourceWidth ? (s = t.sourceWidth, void 0 !== t.right && void 0 === t.left && (c = m - s - t.right)) : s = m - c - (t.right || 0), t.sourceHeight ? (l = t.sourceHeight, void 0 !== t.bottom && void 0 === t.top && (d = S - l - t.bottom)) : l = S - d - (t.bottom || 0), b = s, y = l), a = t.maxWidth, o = t.maxHeight, n = t.minWidth, r = t.minHeight, h && a && o && t.crop ? (g = s / l - (b = a) / (y = o)) < 0 ? (l = o * s / a, void 0 === t.top && void 0 === t.bottom && (d = (S - l) / 2)) : 0 < g && (s = a * l / o, void 0 === t.left && void 0 === t.right && (c = (m - s) / 2)) : ((t.contain || t.cover) && (n = a = a || n, r = o = o || r), t.cover ? (I(), x()) : (x(), I())), h) {
            if (1 < (u = t.pixelRatio) && (p.style.width = b + "px", p.style.height = y + "px", b *= u, y *= u, p.getContext("2d").scale(u, u)), 0 < (f = t.downsamplingRatio) && f < 1 && b < s && y < l)
                for (; b < s * f;) p.width = s * f, p.height = l * f, v.renderImageToCanvas(p, e, c, d, s, l, 0, 0, p.width, p.height), d = c = 0, s = p.width, l = p.height, (e = document.createElement("canvas")).width = s, e.height = l, v.renderImageToCanvas(e, p, 0, 0, s, l, 0, 0, s, l);
            return p.width = b, p.height = y, v.transformCoordinates(p, t), v.renderImageToCanvas(p, e, c, d, s, l, 0, 0, b, y)
        }
        return e.width = b, e.height = y, e
    }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image"], e) : "object" == typeof module && module.exports ? e(require("./load-image")) : e(window.loadImage)
}(function(p) {
    "use strict";
    var e = "undefined" != typeof Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    p.blobSlice = e && function() {
        return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
    }, p.metaDataParsers = {
        jpeg: {
            65505: [],
            65517: []
        }
    }, p.parseMetaData = function(e, d, u, f) {
        f = f || {};
        var g = this,
            t = (u = u || {}).maxMetaDataSize || 262144;
        !!("undefined" != typeof DataView && e && 12 <= e.size && "image/jpeg" === e.type && p.blobSlice) && p.readFile(p.blobSlice.call(e, 0, t), function(e) {
            if (e.target.error) return console.log(e.target.error), void d(f);
            var t, i, a, o, n = e.target.result,
                r = new DataView(n),
                s = 2,
                l = r.byteLength - 4,
                c = s;
            if (65496 === r.getUint16(0)) {
                for (; s < l && (65504 <= (t = r.getUint16(s)) && t <= 65519 || 65534 === t);) {
                    if (s + (i = r.getUint16(s + 2) + 2) > r.byteLength) {
                        console.log("Invalid meta data: Invalid segment size.");
                        break
                    }
                    if (a = p.metaDataParsers.jpeg[t])
                        for (o = 0; o < a.length; o += 1) a[o].call(g, r, s, i, f, u);
                    c = s += i
                }!u.disableImageHead && 6 < c && (n.slice ? f.imageHead = n.slice(0, c) : f.imageHead = new Uint8Array(n).subarray(0, c))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            d(f)
        }, "readAsArrayBuffer") || d(f)
    }, p.hasMetaOption = function(e) {
        return e && e.meta
    };
    var n = p.transform;
    p.transform = function(t, i, a, o, e) {
        p.hasMetaOption(i) ? p.parseMetaData(o, function(e) {
            n.call(p, t, i, a, o, e)
        }, i, e) : n.apply(p, arguments)
    }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function(a) {
    "use strict";
    "undefined" != typeof fetch && "undefined" != typeof Request && (a.fetchBlob = function(e, t, i) {
        if (a.hasMetaOption(i)) return fetch(new Request(e, i)).then(function(e) {
            return e.blob()
        }).then(t).catch(function(e) {
            console.log(e), t()
        });
        t()
    })
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-scale", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-scale"), require("./load-image-meta")) : e(window.loadImage)
}(function(l) {
    "use strict";
    var t = l.hasCanvasOption,
        i = l.hasMetaOption,
        c = l.transformCoordinates,
        s = l.getTransformedOptions;
    l.hasCanvasOption = function(e) {
        return !!e.orientation || t.call(l, e)
    }, l.hasMetaOption = function(e) {
        return e && !0 === e.orientation || i.call(l, e)
    }, l.transformCoordinates = function(e, t) {
        c.call(l, e, t);
        var i = e.getContext("2d"),
            a = e.width,
            o = e.height,
            n = e.style.width,
            r = e.style.height,
            s = t.orientation;
        if (s && !(8 < s)) switch (4 < s && (e.width = o, e.height = a, e.style.width = r, e.style.height = n), s) {
            case 2:
                i.translate(a, 0), i.scale(-1, 1);
                break;
            case 3:
                i.translate(a, o), i.rotate(Math.PI);
                break;
            case 4:
                i.translate(0, o), i.scale(1, -1);
                break;
            case 5:
                i.rotate(.5 * Math.PI), i.scale(1, -1);
                break;
            case 6:
                i.rotate(.5 * Math.PI), i.translate(0, -o);
                break;
            case 7:
                i.rotate(.5 * Math.PI), i.translate(a, -o), i.scale(-1, 1);
                break;
            case 8:
                i.rotate(-.5 * Math.PI), i.translate(-a, 0)
        }
    }, l.getTransformedOptions = function(e, t, i) {
        var a, o, n = s.call(l, e, t),
            r = n.orientation;
        if (!0 === r && i && i.exif && (r = i.exif.get("Orientation")), !r || 8 < r || 1 === r) return n;
        for (o in a = {}, n) n.hasOwnProperty(o) && (a[o] = n[o]);
        switch (a.orientation = r) {
            case 2:
                a.left = n.right, a.right = n.left;
                break;
            case 3:
                a.left = n.right, a.top = n.bottom, a.right = n.left, a.bottom = n.top;
                break;
            case 4:
                a.top = n.bottom, a.bottom = n.top;
                break;
            case 5:
                a.left = n.top, a.top = n.left, a.right = n.bottom, a.bottom = n.right;
                break;
            case 6:
                a.left = n.top, a.top = n.right, a.right = n.bottom, a.bottom = n.left;
                break;
            case 7:
                a.left = n.bottom, a.top = n.right, a.right = n.top, a.bottom = n.left;
                break;
            case 8:
                a.left = n.bottom, a.top = n.left, a.right = n.top, a.bottom = n.right
        }
        return 4 < a.orientation && (a.maxWidth = n.maxHeight, a.maxHeight = n.maxWidth, a.minWidth = n.minHeight, a.minHeight = n.minWidth, a.sourceWidth = n.sourceHeight, a.sourceHeight = n.sourceWidth), a
    }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function(g) {
    "use strict";
    g.ExifMap = function() {
        return this
    }, g.ExifMap.prototype.map = {
        Orientation: 274
    }, g.ExifMap.prototype.get = function(e) {
        return this[e] || this[this.map[e]]
    }, g.getExifThumbnail = function(e, t, i) {
        if (i && !(t + i > e.byteLength)) return g.createObjectURL(new Blob([e.buffer.slice(t, t + i)]));
        console.log("Invalid Exif data: Invalid thumbnail data.")
    }, g.exifTagTypes = {
        1: {
            getValue: function(e, t) {
                return e.getUint8(t)
            },
            size: 1
        },
        2: {
            getValue: function(e, t) {
                return String.fromCharCode(e.getUint8(t))
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function(e, t, i) {
                return e.getUint16(t, i)
            },
            size: 2
        },
        4: {
            getValue: function(e, t, i) {
                return e.getUint32(t, i)
            },
            size: 4
        },
        5: {
            getValue: function(e, t, i) {
                return e.getUint32(t, i) / e.getUint32(t + 4, i)
            },
            size: 8
        },
        9: {
            getValue: function(e, t, i) {
                return e.getInt32(t, i)
            },
            size: 4
        },
        10: {
            getValue: function(e, t, i) {
                return e.getInt32(t, i) / e.getInt32(t + 4, i)
            },
            size: 8
        }
    }, g.exifTagTypes[7] = g.exifTagTypes[1], g.getExifValue = function(e, t, i, a, o, n) {
        var r, s, l, c, d, u, f = g.exifTagTypes[a];
        if (f) {
            if (!((s = 4 < (r = f.size * o) ? t + e.getUint32(i + 8, n) : i + 8) + r > e.byteLength)) {
                if (1 === o) return f.getValue(e, s, n);
                for (l = [], c = 0; c < o; c += 1) l[c] = f.getValue(e, s + c * f.size, n);
                if (f.ascii) {
                    for (d = "", c = 0; c < l.length && "\0" !== (u = l[c]); c += 1) d += u;
                    return d
                }
                return l
            }
            console.log("Invalid Exif data: Invalid data offset.")
        } else console.log("Invalid Exif data: Invalid tag type.")
    }, g.parseExifTag = function(e, t, i, a, o) {
        var n = e.getUint16(i, a);
        o.exif[n] = g.getExifValue(e, t, i, e.getUint16(i + 2, a), e.getUint32(i + 4, a), a)
    }, g.parseExifTags = function(e, t, i, a, o) {
        var n, r, s;
        if (i + 6 > e.byteLength) console.log("Invalid Exif data: Invalid directory offset.");
        else {
            if (!((r = i + 2 + 12 * (n = e.getUint16(i, a))) + 4 > e.byteLength)) {
                for (s = 0; s < n; s += 1) this.parseExifTag(e, t, i + 2 + 12 * s, a, o);
                return e.getUint32(r, a)
            }
            console.log("Invalid Exif data: Invalid directory size.")
        }
    }, g.parseExifData = function(e, t, i, a, o) {
        if (!o.disableExif) {
            var n, r, s, l = t + 10;
            if (1165519206 === e.getUint32(t + 4))
                if (l + 8 > e.byteLength) console.log("Invalid Exif data: Invalid segment size.");
                else if (0 === e.getUint16(t + 8)) {
                switch (e.getUint16(l)) {
                    case 18761:
                        n = !0;
                        break;
                    case 19789:
                        n = !1;
                        break;
                    default:
                        return void console.log("Invalid Exif data: Invalid byte alignment marker.")
                }
                42 === e.getUint16(l + 2, n) ? (r = e.getUint32(l + 4, n), a.exif = new g.ExifMap, (r = g.parseExifTags(e, l, l + r, n, a)) && !o.disableExifThumbnail && (s = {
                    exif: {}
                }, r = g.parseExifTags(e, l, l + r, n, s), s.exif[513] && (a.exif.Thumbnail = g.getExifThumbnail(e, l + s.exif[513], s.exif[514]))), a.exif[34665] && !o.disableExifSub && g.parseExifTags(e, l, l + a.exif[34665], n, a), a.exif[34853] && !o.disableExifGps && g.parseExifTags(e, l, l + a.exif[34853], n, a)) : console.log("Invalid Exif data: Missing TIFF marker.")
            } else console.log("Invalid Exif data: Missing byte alignment offset.")
        }
    }, g.metaDataParsers.jpeg[65505].push(g.parseExifData)
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-exif"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-exif")) : e(window.loadImage)
}(function(e) {
    "use strict";
    e.ExifMap.prototype.tags = {
            256: "ImageWidth",
            257: "ImageHeight",
            34665: "ExifIFDPointer",
            34853: "GPSInfoIFDPointer",
            40965: "InteroperabilityIFDPointer",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            274: "Orientation",
            277: "SamplesPerPixel",
            284: "PlanarConfiguration",
            530: "YCbCrSubSampling",
            531: "YCbCrPositioning",
            282: "XResolution",
            283: "YResolution",
            296: "ResolutionUnit",
            273: "StripOffsets",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            301: "TransferFunction",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            529: "YCbCrCoefficients",
            532: "ReferenceBlackWhite",
            306: "DateTime",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            305: "Software",
            315: "Artist",
            33432: "Copyright",
            36864: "ExifVersion",
            40960: "FlashpixVersion",
            40961: "ColorSpace",
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            42240: "Gamma",
            37121: "ComponentsConfiguration",
            37122: "CompressedBitsPerPixel",
            37500: "MakerNote",
            37510: "UserComment",
            40964: "RelatedSoundFile",
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37520: "SubSecTime",
            37521: "SubSecTimeOriginal",
            37522: "SubSecTimeDigitized",
            33434: "ExposureTime",
            33437: "FNumber",
            34850: "ExposureProgram",
            34852: "SpectralSensitivity",
            34855: "PhotographicSensitivity",
            34856: "OECF",
            34864: "SensitivityType",
            34865: "StandardOutputSensitivity",
            34866: "RecommendedExposureIndex",
            34867: "ISOSpeed",
            34868: "ISOSpeedLatitudeyyy",
            34869: "ISOSpeedLatitudezzz",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBias",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: "MeteringMode",
            37384: "LightSource",
            37385: "Flash",
            37396: "SubjectArea",
            37386: "FocalLength",
            41483: "FlashEnergy",
            41484: "SpatialFrequencyResponse",
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: "FocalPlaneResolutionUnit",
            41492: "SubjectLocation",
            41493: "ExposureIndex",
            41495: "SensingMethod",
            41728: "FileSource",
            41729: "SceneType",
            41730: "CFAPattern",
            41985: "CustomRendered",
            41986: "ExposureMode",
            41987: "WhiteBalance",
            41988: "DigitalZoomRatio",
            41989: "FocalLengthIn35mmFilm",
            41990: "SceneCaptureType",
            41991: "GainControl",
            41992: "Contrast",
            41993: "Saturation",
            41994: "Sharpness",
            41995: "DeviceSettingDescription",
            41996: "SubjectDistanceRange",
            42016: "ImageUniqueID",
            42032: "CameraOwnerName",
            42033: "BodySerialNumber",
            42034: "LensSpecification",
            42035: "LensMake",
            42036: "LensModel",
            42037: "LensSerialNumber",
            0: "GPSVersionID",
            1: "GPSLatitudeRef",
            2: "GPSLatitude",
            3: "GPSLongitudeRef",
            4: "GPSLongitude",
            5: "GPSAltitudeRef",
            6: "GPSAltitude",
            7: "GPSTimeStamp",
            8: "GPSSatellites",
            9: "GPSStatus",
            10: "GPSMeasureMode",
            11: "GPSDOP",
            12: "GPSSpeedRef",
            13: "GPSSpeed",
            14: "GPSTrackRef",
            15: "GPSTrack",
            16: "GPSImgDirectionRef",
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: "GPSDestLatitudeRef",
            20: "GPSDestLatitude",
            21: "GPSDestLongitudeRef",
            22: "GPSDestLongitude",
            23: "GPSDestBearingRef",
            24: "GPSDestBearing",
            25: "GPSDestDistanceRef",
            26: "GPSDestDistance",
            27: "GPSProcessingMethod",
            28: "GPSAreaInformation",
            29: "GPSDateStamp",
            30: "GPSDifferential",
            31: "GPSHPositioningError"
        }, e.ExifMap.prototype.stringValues = {
            ExposureProgram: {
                0: "Undefined",
                1: "Manual",
                2: "Normal program",
                3: "Aperture priority",
                4: "Shutter priority",
                5: "Creative program",
                6: "Action program",
                7: "Portrait mode",
                8: "Landscape mode"
            },
            MeteringMode: {
                0: "Unknown",
                1: "Average",
                2: "CenterWeightedAverage",
                3: "Spot",
                4: "MultiSpot",
                5: "Pattern",
                6: "Partial",
                255: "Other"
            },
            LightSource: {
                0: "Unknown",
                1: "Daylight",
                2: "Fluorescent",
                3: "Tungsten (incandescent light)",
                4: "Flash",
                9: "Fine weather",
                10: "Cloudy weather",
                11: "Shade",
                12: "Daylight fluorescent (D 5700 - 7100K)",
                13: "Day white fluorescent (N 4600 - 5400K)",
                14: "Cool white fluorescent (W 3900 - 4500K)",
                15: "White fluorescent (WW 3200 - 3700K)",
                17: "Standard light A",
                18: "Standard light B",
                19: "Standard light C",
                20: "D55",
                21: "D65",
                22: "D75",
                23: "D50",
                24: "ISO studio tungsten",
                255: "Other"
            },
            Flash: {
                0: "Flash did not fire",
                1: "Flash fired",
                5: "Strobe return light not detected",
                7: "Strobe return light detected",
                9: "Flash fired, compulsory flash mode",
                13: "Flash fired, compulsory flash mode, return light not detected",
                15: "Flash fired, compulsory flash mode, return light detected",
                16: "Flash did not fire, compulsory flash mode",
                24: "Flash did not fire, auto mode",
                25: "Flash fired, auto mode",
                29: "Flash fired, auto mode, return light not detected",
                31: "Flash fired, auto mode, return light detected",
                32: "No flash function",
                65: "Flash fired, red-eye reduction mode",
                69: "Flash fired, red-eye reduction mode, return light not detected",
                71: "Flash fired, red-eye reduction mode, return light detected",
                73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                89: "Flash fired, auto mode, red-eye reduction mode",
                93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
            },
            SensingMethod: {
                1: "Undefined",
                2: "One-chip color area sensor",
                3: "Two-chip color area sensor",
                4: "Three-chip color area sensor",
                5: "Color sequential area sensor",
                7: "Trilinear sensor",
                8: "Color sequential linear sensor"
            },
            SceneCaptureType: {
                0: "Standard",
                1: "Landscape",
                2: "Portrait",
                3: "Night scene"
            },
            SceneType: {
                1: "Directly photographed"
            },
            CustomRendered: {
                0: "Normal process",
                1: "Custom process"
            },
            WhiteBalance: {
                0: "Auto white balance",
                1: "Manual white balance"
            },
            GainControl: {
                0: "None",
                1: "Low gain up",
                2: "High gain up",
                3: "Low gain down",
                4: "High gain down"
            },
            Contrast: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            Saturation: {
                0: "Normal",
                1: "Low saturation",
                2: "High saturation"
            },
            Sharpness: {
                0: "Normal",
                1: "Soft",
                2: "Hard"
            },
            SubjectDistanceRange: {
                0: "Unknown",
                1: "Macro",
                2: "Close view",
                3: "Distant view"
            },
            FileSource: {
                3: "DSC"
            },
            ComponentsConfiguration: {
                0: "",
                1: "Y",
                2: "Cb",
                3: "Cr",
                4: "R",
                5: "G",
                6: "B"
            },
            Orientation: {
                1: "top-left",
                2: "top-right",
                3: "bottom-right",
                4: "bottom-left",
                5: "left-top",
                6: "right-top",
                7: "right-bottom",
                8: "left-bottom"
            }
        }, e.ExifMap.prototype.getText = function(e) {
            var t = this.get(e);
            switch (e) {
                case "LightSource":
                case "Flash":
                case "MeteringMode":
                case "ExposureProgram":
                case "SensingMethod":
                case "SceneCaptureType":
                case "SceneType":
                case "CustomRendered":
                case "WhiteBalance":
                case "GainControl":
                case "Contrast":
                case "Saturation":
                case "Sharpness":
                case "SubjectDistanceRange":
                case "FileSource":
                case "Orientation":
                    return this.stringValues[e][t];
                case "ExifVersion":
                case "FlashpixVersion":
                    if (!t) return;
                    return String.fromCharCode(t[0], t[1], t[2], t[3]);
                case "ComponentsConfiguration":
                    if (!t) return;
                    return this.stringValues[e][t[0]] + this.stringValues[e][t[1]] + this.stringValues[e][t[2]] + this.stringValues[e][t[3]];
                case "GPSVersionID":
                    if (!t) return;
                    return t[0] + "." + t[1] + "." + t[2] + "." + t[3]
            }
            return String(t)
        },
        function(e) {
            var t, i = e.tags,
                a = e.map;
            for (t in i) i.hasOwnProperty(t) && (a[i[t]] = t)
        }(e.ExifMap.prototype), e.ExifMap.prototype.getAll = function() {
            var e, t, i = {};
            for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (i[t] = this.getText(t));
            return i
        }
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-meta"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-meta")) : e(window.loadImage)
}(function(u) {
    "use strict";
    u.IptcMap = function() {
        return this
    }, u.IptcMap.prototype.map = {
        ObjectName: 5
    }, u.IptcMap.prototype.get = function(e) {
        return this[e] || this[this.map[e]]
    }, u.parseIptcTags = function(e, t, i, a) {
        function o(e, t, i) {
            for (var a = "", o = t; o < t + i; o++) a += String.fromCharCode(e.getUint8(o));
            return a
        }
        for (var n, r, s, l = t; l < t + i;) 28 === e.getUint8(l) && 2 === e.getUint8(l + 1) && (s = e.getUint8(l + 2)) in a.iptc.tags && (r = e.getInt16(l + 3), n = o(e, l + 5, r), a.iptc.hasOwnProperty(s) ? a.iptc[s] instanceof Array ? a.iptc[s].push(n) : a.iptc[s] = [a.iptc[s], n] : a.iptc[s] = n), l++
    }, u.parseIptcData = function(e, t, i, a, o) {
        if (!o.disableIptc) {
            for (var n, r, s = t + i; t + 8 < s;) {
                if (r = t, 943868237 === (n = e).getUint32(r) && 1028 === n.getUint16(r + 4)) {
                    var l = e.getUint8(t + 7);
                    l % 2 != 0 && (l += 1), 0 === l && (l = 4);
                    var c = t + 8 + l;
                    if (s < c) {
                        console.log("Invalid IPTC data: Invalid segment offset.");
                        break
                    }
                    var d = e.getUint16(t + 6 + l);
                    if (s < t + d) {
                        console.log("Invalid IPTC data: Invalid segment size.");
                        break
                    }
                    return a.iptc = new u.IptcMap, u.parseIptcTags(e, c, d, a)
                }
                t++
            }
            console.log("No IPTC data at this offset - could be XMP")
        }
    }, u.metaDataParsers.jpeg[65517].push(u.parseIptcData)
}),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./load-image", "./load-image-iptc"], e) : "object" == typeof module && module.exports ? e(require("./load-image"), require("./load-image-iptc")) : e(window.loadImage)
}(function(e) {
    "use strict";
    e.IptcMap.prototype.tags = {
            3: "ObjectType",
            4: "ObjectAttribute",
            5: "ObjectName",
            7: "EditStatus",
            8: "EditorialUpdate",
            10: "Urgency",
            12: "SubjectRef",
            15: "Category",
            20: "SupplCategory",
            22: "FixtureID",
            25: "Keywords",
            26: "ContentLocCode",
            27: "ContentLocName",
            30: "ReleaseDate",
            35: "ReleaseTime",
            37: "ExpirationDate",
            38: "ExpirationTime",
            40: "SpecialInstructions",
            42: "ActionAdvised",
            45: "RefService",
            47: "RefDate",
            50: "RefNumber",
            55: "DateCreated",
            60: "TimeCreated",
            62: "DigitalCreationDate",
            63: "DigitalCreationTime",
            65: "OriginatingProgram",
            70: "ProgramVersion",
            75: "ObjectCycle",
            80: "Byline",
            85: "BylineTitle",
            90: "City",
            92: "Sublocation",
            95: "State",
            100: "CountryCode",
            101: "CountryName",
            103: "OrigTransRef",
            105: "Headline",
            110: "Credit",
            115: "Source",
            116: "CopyrightNotice",
            118: "Contact",
            120: "Caption",
            122: "WriterEditor",
            130: "ImageType",
            131: "ImageOrientation",
            135: "LanguageID"
        }, e.IptcMap.prototype.getText = function(e) {
            var t = this.get(e);
            return String(t)
        },
        function(e) {
            var t, i = e.tags,
                a = e.map || {};
            for (t in i) i.hasOwnProperty(t) && (a[i[t]] = t)
        }(e.IptcMap.prototype), e.IptcMap.prototype.getAll = function() {
            var e, t, i = {};
            for (e in this) this.hasOwnProperty(e) && (t = this.tags[e]) && (i[t] = this.getText(t));
            return i
        }

});


export default function imageInfo(url, mime) {
  console.log(mime);

  return new Promise(function(resolve, reject) {

    loadImage(url, function(img, data) {

      resolve({
        data: img.toDataURL(mime),
        width: img.width,
        height: img.height,
        ratio: img.width / img.height
      });

    }, {
      orientation: true,
      maxWidth: 1200
    });

  });
}
