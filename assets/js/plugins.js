/*! rosariosis 2022-07-19 */

!(function (n) {
    "function" == typeof define && define.amd
        ? define(["jquery"], n)
        : "object" == typeof module && module.exports
            ? (module.exports = function (e, t) {
                return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), n(t), t;
            })
            : n(jQuery);
})(function (M) {
    "use strict";
    var h = /\r?\n/g,
        g = {};
    (g.fileapi = void 0 !== M('<input type="file">').get(0).files), (g.formdata = void 0 !== window.FormData);
    var N = !!M.fn.prop;
    function i(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), M(e.target).closest("form").ajaxSubmit(t));
    }
    function o(e) {
        var t = e.target,
            n = M(t);
        if (!n.is("[type=submit],[type=image]")) {
            var a = n.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0];
        }
        var r = t.form;
        "image" === (r.clk = t).type &&
        (void 0 !== e.offsetX
            ? ((r.clk_x = e.offsetX), (r.clk_y = e.offsetY))
            : "function" == typeof M.fn.offset
                ? ((n = n.offset()), (r.clk_x = e.pageX - n.left), (r.clk_y = e.pageY - n.top))
                : ((r.clk_x = e.pageX - t.offsetLeft), (r.clk_y = e.pageY - t.offsetTop))),
            setTimeout(function () {
                r.clk = r.clk_x = r.clk_y = null;
            }, 100);
    }
    function O() {
        var e;
        M.fn.ajaxSubmit.debug && ((e = "[jquery.form] " + Array.prototype.join.call(arguments, "")), window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e));
    }
    (M.fn.attr2 = function () {
        if (!N) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return (e && e.jquery) || "string" == typeof e ? e : this.attr.apply(this, arguments);
    }),
        (M.fn.ajaxSubmit = function (_, e, t, n) {
            if (!this.length) return O("ajaxSubmit: skipping submit process - no element selected"), this;
            var T,
                S = this;
            "function" == typeof _ ? (_ = { success: _ }) : "string" == typeof _ || (!1 === _ && 0 < arguments.length) ? ((_ = { url: _, data: e, dataType: t }), "function" == typeof n && (_.success = n)) : void 0 === _ && (_ = {}),
                (T = _.method || _.type || this.attr2("method")),
                (n = (n = (n = "string" == typeof (t = _.url || this.attr2("action")) ? M.trim(t) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1]),
                (_ = M.extend(!0, { url: n, success: M.ajaxSettings.success, type: T || M.ajaxSettings.type, iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank" }, _));
            t = {};
            if ((this.trigger("form-pre-serialize", [this, _, t]), t.veto)) return O("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
            if (_.beforeSerialize && !1 === _.beforeSerialize(this, _)) return O("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
            n = _.traditional;
            void 0 === n && (n = M.ajaxSettings.traditional);
            var B = [],
                a = this.formToArray(_.semantic, B, _.filtering);
            if ((_.data && ((u = M.isFunction(_.data) ? _.data(a) : _.data), (_.extraData = u), (u = M.param(u, n))), _.beforeSubmit && !1 === _.beforeSubmit(a, this, _)))
                return O("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
            if ((this.trigger("form-submit-validate", [a, this, _, t]), t.veto)) return O("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
            t = M.param(a, n);
            u && (t = t ? t + "&" + u : u), "GET" === _.type.toUpperCase() ? ((_.url += (0 <= _.url.indexOf("?") ? "&" : "?") + t), (_.data = null)) : (_.data = t);
            var i,
                r,
                o,
                s = [];
            _.resetForm &&
            s.push(function () {
                S.resetForm();
            }),
            _.clearForm &&
            s.push(function () {
                S.clearForm(_.includeHidden);
            }),
                !_.dataType && _.target
                    ? ((i = _.success || function () {}),
                        s.push(function (e, t, n) {
                            var a = arguments,
                                r = _.replaceTarget ? "replaceWith" : "html";
                            M(_.target)
                                [r](e)
                                .each(function () {
                                    i.apply(this, a);
                                });
                        }))
                    : _.success && (M.isArray(_.success) ? M.merge(s, _.success) : s.push(_.success)),
                (_.success = function (e, t, n) {
                    for (var a = _.context || this, r = 0, i = s.length; r < i; r++) s[r].apply(a, [e, t, n || S, S]);
                }),
            _.error &&
            ((r = _.error),
                (_.error = function (e, t, n) {
                    var a = _.context || this;
                    r.apply(a, [e, t, n, S]);
                })),
            _.complete &&
            ((o = _.complete),
                (_.complete = function (e, t) {
                    var n = _.context || this;
                    o.apply(n, [e, t, S]);
                }));
            var l,
                n =
                    0 <
                    M("input[type=file]:enabled", this).filter(function () {
                        return "" !== M(this).val();
                    }).length,
                u = "multipart/form-data",
                t = S.attr("enctype") === u || S.attr("encoding") === u,
                u = g.fileapi && g.formdata;
            O("fileAPI :" + u),
                !1 !== _.iframe && (_.iframe || ((n || t) && !u))
                    ? _.closeKeepAlive
                        ? M.get(_.closeKeepAlive, function () {
                            l = d(a);
                        })
                        : (l = d(a))
                    : (l =
                        (n || t) && u
                            ? (function (e) {
                                for (var n = new FormData(), t = 0; t < e.length; t++) n.append(e[t].name, e[t].value);
                                if (_.extraData) {
                                    var a = (function (e) {
                                        var t,
                                            n,
                                            a = M.param(e, _.traditional).split("&"),
                                            r = a.length,
                                            i = [];
                                        for (t = 0; t < r; t++) (a[t] = a[t].replace(/\+/g, " ")), (n = a[t].split("=")), i.push([decodeURIComponent(n[0]), decodeURIComponent(n[1])]);
                                        return i;
                                    })(_.extraData);
                                    for (t = 0; t < a.length; t++) a[t] && n.append(a[t][0], a[t][1]);
                                }
                                _.data = null;
                                var r = M.extend(!0, {}, M.ajaxSettings, _, { contentType: !1, processData: !1, cache: !1, type: T || "POST" });
                                _.uploadProgress &&
                                (r.xhr = function () {
                                    var e = M.ajaxSettings.xhr();
                                    return (
                                        e.upload &&
                                        e.upload.addEventListener(
                                            "progress",
                                            function (e) {
                                                var t = 0,
                                                    n = e.loaded || e.position,
                                                    a = e.total;
                                                e.lengthComputable && (t = Math.ceil((n / a) * 100)), _.uploadProgress(e, n, a, t);
                                            },
                                            !1
                                        ),
                                            e
                                    );
                                });
                                r.data = null;
                                var i = r.beforeSend;
                                return (
                                    (r.beforeSend = function (e, t) {
                                        _.formData ? (t.data = _.formData) : (t.data = n), i && i.call(this, e, t);
                                    }),
                                        M.ajax(r)
                                );
                            })(a)
                            : M.ajax(_)),
                S.removeData("jqxhr").data("jqxhr", l);
            for (var c = 0; c < B.length; c++) B[c] = null;
            return this.trigger("form-submit-notify", [this, _]), this;
            function d(e) {
                var t,
                    n,
                    u,
                    c,
                    d,
                    h,
                    p,
                    f,
                    m,
                    i = S[0],
                    g = M.Deferred();
                if (
                    ((g.abort = function (e) {
                        p.abort(e);
                    }),
                        e)
                )
                    for (n = 0; n < B.length; n++) (t = M(B[n])), N ? t.prop("disabled", !1) : t.removeAttr("disabled");
                (u = M.extend(!0, {}, M.ajaxSettings, _)).context = u.context || u;
                var o = "jqFormIO" + new Date().getTime(),
                    s = i.ownerDocument,
                    l = S.closest("body");
                if (
                    (u.iframeTarget
                        ? (a = (d = M(u.iframeTarget, s)).attr2("name"))
                            ? (o = a)
                            : d.attr2("name", o)
                        : (d = M('<iframe name="' + o + '" src="' + u.iframeSrc + '" />', s)).css({ position: "absolute", top: "-1000px", left: "-1000px" }),
                        (h = d[0]),
                        (p = {
                            aborted: 0,
                            responseText: null,
                            responseXML: null,
                            status: 0,
                            statusText: "n/a",
                            getAllResponseHeaders: function () {},
                            getResponseHeader: function () {},
                            setRequestHeader: function () {},
                            abort: function (e) {
                                var t = "timeout" === e ? "timeout" : "aborted";
                                O("aborting upload... " + t), (this.aborted = 1);
                                try {
                                    h.contentWindow.document.execCommand && h.contentWindow.document.execCommand("Stop");
                                } catch (e) {}
                                d.attr("src", u.iframeSrc), (p.error = t), u.error && u.error.call(u.context, p, t, e), c && M.event.trigger("ajaxError", [p, u, t]), u.complete && u.complete.call(u.context, p, t);
                            },
                        }),
                    (c = u.global) && 0 == M.active++ && M.event.trigger("ajaxStart"),
                    c && M.event.trigger("ajaxSend", [p, u]),
                    u.beforeSend && !1 === u.beforeSend.call(u.context, p, u))
                )
                    return u.global && M.active--, g.reject(), g;
                if (p.aborted) return g.reject(), g;
                (e = i.clk) && (a = e.name) && !e.disabled && ((u.extraData = u.extraData || {}), (u.extraData[a] = e.value), "image" === e.type && ((u.extraData[a + ".x"] = i.clk_x), (u.extraData[a + ".y"] = i.clk_y)));
                var D = 1,
                    v = 2;
                function C(t) {
                    var n = null;
                    try {
                        t.contentWindow && (n = t.contentWindow.document);
                    } catch (e) {
                        O("cannot get iframe.contentWindow document: " + e);
                    }
                    if (n) return n;
                    try {
                        n = t.contentDocument || t.document;
                    } catch (e) {
                        O("cannot get iframe.contentDocument: " + e), (n = t.document);
                    }
                    return n;
                }
                var e = M("meta[name=csrf-token]").attr("content"),
                    a = M("meta[name=csrf-param]").attr("content");
                function r() {
                    var e = S.attr2("target"),
                        t = S.attr2("action"),
                        n = S.attr("enctype") || S.attr("encoding") || "multipart/form-data";
                    i.setAttribute("target", o),
                    (T && !/post/i.test(T)) || i.setAttribute("method", "POST"),
                    t !== u.url && i.setAttribute("action", u.url),
                    u.skipEncodingOverride || (T && !/post/i.test(T)) || S.attr({ encoding: "multipart/form-data", enctype: "multipart/form-data" }),
                    u.timeout &&
                    (m = setTimeout(function () {
                        (f = !0), k(D);
                    }, u.timeout));
                    var a = [];
                    try {
                        if (u.extraData)
                            for (var r in u.extraData)
                                u.extraData.hasOwnProperty(r) &&
                                (M.isPlainObject(u.extraData[r]) && u.extraData[r].hasOwnProperty("name") && u.extraData[r].hasOwnProperty("value")
                                    ? a.push(
                                        M('<input type="hidden" name="' + u.extraData[r].name + '">', s)
                                            .val(u.extraData[r].value)
                                            .appendTo(i)[0]
                                    )
                                    : a.push(
                                        M('<input type="hidden" name="' + r + '">', s)
                                            .val(u.extraData[r])
                                            .appendTo(i)[0]
                                    ));
                        u.iframeTarget || d.appendTo(l),
                            h.attachEvent ? h.attachEvent("onload", k) : h.addEventListener("load", k, !1),
                            setTimeout(function e() {
                                try {
                                    var t = C(h).readyState;
                                    O("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50);
                                } catch (e) {
                                    O("Server abort: ", e, " (", e.name, ")"), k(v), m && clearTimeout(m), (m = void 0);
                                }
                            }, 15);
                        try {
                            i.submit();
                        } catch (e) {
                            document.createElement("form").submit.apply(i);
                        }
                    } finally {
                        i.setAttribute("action", t), i.setAttribute("enctype", n), e ? i.setAttribute("target", e) : S.removeAttr("target"), M(a).remove();
                    }
                }
                a && e && ((u.extraData = u.extraData || {}), (u.extraData[a] = e)), u.forceSync ? r() : setTimeout(r, 10);
                var y,
                    b,
                    x,
                    w = 50;
                function k(t) {
                    if (!p.aborted && !x) {
                        if (((b = C(h)) || (O("cannot access response document"), (t = v)), t === D && p)) return p.abort("timeout"), void g.reject(p, "timeout");
                        if (t === v && p) return p.abort("server abort"), void g.reject(p, "error", "server abort");
                        if ((b && b.location.href !== u.iframeSrc) || f) {
                            h.detachEvent ? h.detachEvent("onload", k) : h.removeEventListener("load", k, !1);
                            var n,
                                t = "success";
                            try {
                                if (f) throw "timeout";
                                var e = "xml" === u.dataType || b.XMLDocument || M.isXMLDoc(b);
                                if ((O("isXml=" + e), !e && window.opera && (null === b.body || !b.body.innerHTML) && --w)) return O("requeing onLoad callback, DOM not available"), void setTimeout(k, 250);
                                var a = b.body || b.documentElement;
                                (p.responseText = a ? a.innerHTML : null),
                                    (p.responseXML = b.XMLDocument || b),
                                e && (u.dataType = "xml"),
                                    (p.getResponseHeader = function (e) {
                                        return { "content-type": u.dataType }[e.toLowerCase()];
                                    }),
                                a && ((p.status = Number(a.getAttribute("status")) || p.status), (p.statusText = a.getAttribute("statusText") || p.statusText));
                                var r,
                                    i,
                                    o,
                                    s = (u.dataType || "").toLowerCase(),
                                    l = /(json|script|text)/.test(s);
                                l || u.textarea
                                    ? (r = b.getElementsByTagName("textarea")[0])
                                        ? ((p.responseText = r.value), (p.status = Number(r.getAttribute("status")) || p.status), (p.statusText = r.getAttribute("statusText") || p.statusText))
                                        : l && ((i = b.getElementsByTagName("pre")[0]), (o = b.getElementsByTagName("body")[0]), i ? (p.responseText = i.textContent || i.innerText) : o && (p.responseText = o.textContent || o.innerText))
                                    : "xml" === s && !p.responseXML && p.responseText && (p.responseXML = E(p.responseText));
                                try {
                                    y = A(p, s, u);
                                } catch (e) {
                                    (t = "parsererror"), (p.error = n = e || t);
                                }
                            } catch (e) {
                                O("error caught: ", e), (t = "error"), (p.error = n = e || t);
                            }
                            p.aborted && (O("upload aborted"), (t = null)),
                                "success" === (t = p.status ? ((200 <= p.status && p.status < 300) || 304 === p.status ? "success" : "error") : t)
                                    ? (u.success && u.success.call(u.context, y, "success", p), g.resolve(p.responseText, "success", p), c && M.event.trigger("ajaxSuccess", [p, u]))
                                    : t && (void 0 === n && (n = p.statusText), u.error && u.error.call(u.context, p, t, n), g.reject(p, "error", n), c && M.event.trigger("ajaxError", [p, u, n])),
                            c && M.event.trigger("ajaxComplete", [p, u]),
                            c && !--M.active && M.event.trigger("ajaxStop"),
                            u.complete && u.complete.call(u.context, p, t),
                                (x = !0),
                            u.timeout && clearTimeout(m),
                                setTimeout(function () {
                                    u.iframeTarget ? d.attr("src", u.iframeSrc) : d.remove(), (p.responseXML = null);
                                }, 100);
                        }
                    }
                }
                var E =
                        M.parseXML ||
                        function (e, t) {
                            return (
                                window.ActiveXObject ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false"), t.loadXML(e)) : (t = new DOMParser().parseFromString(e, "text/xml")),
                                    t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                            );
                        },
                    F =
                        M.parseJSON ||
                        function (e) {
                            return window.eval("(" + e + ")");
                        },
                    A = function (e, t, n) {
                        var a = e.getResponseHeader("content-type") || "",
                            r = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                            e = r ? e.responseXML : e.responseText;
                        return (
                            r && "parsererror" === e.documentElement.nodeName && M.error && M.error("parsererror"),
                            "string" == typeof (e = n && n.dataFilter ? n.dataFilter(e, t) : e) && (("json" === t || !t) && 0 <= a.indexOf("json") ? (e = F(e)) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && M.globalEval(e)),
                                e
                        );
                    };
                return g;
            }
        }),
        (M.fn.ajaxForm = function (e, t, n, a) {
            if (
                (("string" == typeof e || (!1 === e && 0 < arguments.length)) && ((e = { url: e, data: t, dataType: n }), "function" == typeof a && (e.success = a)),
                    ((e = e || {}).delegation = e.delegation && M.isFunction(M.fn.on)),
                e.delegation || 0 !== this.length)
            )
                return e.delegation
                    ? (M(document).off("submit.form-plugin", this.selector, i).off("click.form-plugin", this.selector, o).on("submit.form-plugin", this.selector, e, i).on("click.form-plugin", this.selector, e, o), this)
                    : this.ajaxFormUnbind().on("submit.form-plugin", e, i).on("click.form-plugin", e, o);
            var r = { s: this.selector, c: this.context };
            return (
                !M.isReady && r.s
                    ? (O("DOM not ready, queuing ajaxForm"),
                        M(function () {
                            M(r.s, r.c).ajaxForm(e);
                        }))
                    : O("terminating; zero elements found by selector" + (M.isReady ? "" : " (DOM not ready)")),
                    this
            );
        }),
        (M.fn.ajaxFormUnbind = function () {
            return this.off("submit.form-plugin click.form-plugin");
        }),
        (M.fn.formToArray = function (e, t, n) {
            var a = [];
            if (0 === this.length) return a;
            var r,
                i,
                o,
                s,
                l,
                u,
                c,
                d,
                h = this[0],
                p = this.attr("id"),
                f = (f = e || void 0 === h.elements ? h.getElementsByTagName("*") : h.elements) && M.makeArray(f);
            if (!(f = p && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (c = M(':input[form="' + p + '"]').get()).length ? (f || []).concat(c) : f) || !f.length) return a;
            for (r = 0, l = (f = M.isFunction(n) ? M.map(f, n) : f).length; r < l; r++)
                if ((d = (s = f[r]).name) && !s.disabled)
                    if (e && h.clk && "image" === s.type) h.clk === s && (a.push({ name: d, value: M(s).val(), type: s.type }), a.push({ name: d + ".x", value: h.clk_x }, { name: d + ".y", value: h.clk_y }));
                    else if ((o = M.fieldValue(s, !0)) && o.constructor === Array) for (t && t.push(s), i = 0, u = o.length; i < u; i++) a.push({ name: d, value: o[i] });
                    else if (g.fileapi && "file" === s.type) {
                        t && t.push(s);
                        var m = s.files;
                        if (m.length) for (i = 0; i < m.length; i++) a.push({ name: d, value: m[i], type: s.type });
                        else a.push({ name: d, value: "", type: s.type });
                    } else null != o && (t && t.push(s), a.push({ name: d, value: o, type: s.type, required: s.required }));
            return e || !h.clk || ((d = (n = (c = M(h.clk))[0]).name) && !n.disabled && "image" === n.type && (a.push({ name: d, value: c.val() }), a.push({ name: d + ".x", value: h.clk_x }, { name: d + ".y", value: h.clk_y }))), a;
        }),
        (M.fn.formSerialize = function (e) {
            return M.param(this.formToArray(e));
        }),
        (M.fn.fieldSerialize = function (r) {
            var i = [];
            return (
                this.each(function () {
                    var e = this.name;
                    if (e) {
                        var t = M.fieldValue(this, r);
                        if (t && t.constructor === Array) for (var n = 0, a = t.length; n < a; n++) i.push({ name: e, value: t[n] });
                        else null != t && i.push({ name: this.name, value: t });
                    }
                }),
                    M.param(i)
            );
        }),
        (M.fn.fieldValue = function (e) {
            for (var t = [], n = 0, a = this.length; n < a; n++) {
                var r = this[n],
                    r = M.fieldValue(r, e);
                null == r || (r.constructor === Array && !r.length) || (r.constructor === Array ? M.merge(t, r) : t.push(r));
            }
            return t;
        }),
        (M.fieldValue = function (e, t) {
            var n = e.name,
                a = e.type,
                r = e.tagName.toLowerCase();
            if (
                (t = void 0 === t ? !0 : t) &&
                (!n || e.disabled || "reset" === a || "button" === a || (("checkbox" === a || "radio" === a) && !e.checked) || (("submit" === a || "image" === a) && e.form && e.form.clk !== e) || ("select" === r && -1 === e.selectedIndex))
            )
                return null;
            if ("select" !== r) return M(e).val().replace(h, "\r\n");
            r = e.selectedIndex;
            if (r < 0) return null;
            for (var i = [], o = e.options, s = "select-one" === a, l = s ? r + 1 : o.length, u = s ? r : 0; u < l; u++) {
                var c = o[u];
                if (c.selected && !c.disabled) {
                    var d = (d = c.value) || (c.attributes && c.attributes.value && !c.attributes.value.specified ? c.text : c.value);
                    if (s) return d;
                    i.push(d);
                }
            }
            return i;
        }),
        (M.fn.clearForm = function (e) {
            return this.each(function () {
                M("input,select,textarea", this).clearFields(e);
            });
        }),
        (M.fn.clearFields = M.fn.clearInputs = function (n) {
            var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
            return this.each(function () {
                var e = this.type,
                    t = this.tagName.toLowerCase();
                a.test(e) || "textarea" === t
                    ? (this.value = "")
                    : "checkbox" === e || "radio" === e
                        ? (this.checked = !1)
                        : "select" === t
                            ? (this.selectedIndex = -1)
                            : "file" === e
                                ? /MSIE/.test(navigator.userAgent)
                                    ? M(this).replaceWith(M(this).clone(!0))
                                    : M(this).val("")
                                : n && ((!0 === n && /hidden/.test(e)) || ("string" == typeof n && M(this).is(n))) && (this.value = "");
            });
        }),
        (M.fn.resetForm = function () {
            return this.each(function () {
                var t = M(this),
                    e = this.tagName.toLowerCase();
                switch (e) {
                    case "input":
                        this.checked = this.defaultChecked;
                    case "textarea":
                        return (this.value = this.defaultValue), !0;
                    case "option":
                    case "optgroup":
                        var n = t.parents("select");
                        return n.length && n[0].multiple ? ("option" === e ? (this.selected = this.defaultSelected) : t.find("option").resetForm()) : n.resetForm(), !0;
                    case "select":
                        return (
                            t.find("option").each(function (e) {
                                if (((this.selected = this.defaultSelected), this.defaultSelected && !t[0].multiple)) return (t[0].selectedIndex = e), !1;
                            }),
                                !0
                        );
                    case "label":
                        var a = M(t.attr("for")),
                            n = t.find("input,select,textarea");
                        return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                    case "form":
                        return ("function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType)) || this.reset(), !0;
                    default:
                        return t.find("form,input,label,select,textarea").resetForm(), !0;
                }
            });
        }),
        (M.fn.enable = function (e) {
            return (
                void 0 === e && (e = !0),
                    this.each(function () {
                        this.disabled = !e;
                    })
            );
        }),
        (M.fn.selected = function (t) {
            return (
                void 0 === t && (t = !0),
                    this.each(function () {
                        var e = this.type;
                        "checkbox" === e || "radio" === e
                            ? (this.checked = t)
                            : "option" === this.tagName.toLowerCase() && ((e = M(this).parent("select")), t && e[0] && "select-one" === e[0].type && e.find("option").selected(!1), (this.selected = t));
                    })
            );
        }),
        (M.fn.ajaxSubmit.debug = !1);
});
var mig = {};
function stm(e) {
    this.onmousemove != mig_mo && (this.onmousemove = mig_mo);
    e = "<TABLE class='widefat'>" + (e[0] ? "<THEAD><TR><TH>" + e[0] + "</TH></TR></THEAD>" : "") + "<TR><TD>" + e[1] + "</TD></TR></TABLE>";
    return (mig.lay.innerHTML = e), (mig.count = 0), (mig.move = 1), (this.onmouseout = htm), (mig.lay.click = htm), !1;
}
function mig_mo(e) {
    if (mig.move) {
        var X = 0,
            Y = 0,
            s_d = [parseInt(window.pageXOffset), parseInt(window.pageYOffset)],
            w_d = [parseInt(document.body.clientWidth), parseInt(document.body.clientHeight)],
            mx = e.pageX,
            my = e.pageY,
            e_d = [parseInt(mig.lay.offsetWidth) + 3, parseInt(mig.lay.offsetHeight) + 5],
            tb = { xpos: 10, ypos: 10 },
            sbw = 0,
            X = mx + tb.xpos,
            Y = my + tb.ypos;
        with ((w_d[0] + s_d[0] < e_d[0] + X + sbw && (X = w_d[0] + s_d[0] - e_d[0] - sbw), w_d[1] + s_d[1] < e_d[1] + Y + sbw && (Y = my - e_d[1]), X < s_d[0] && (X = s_d[0]), mig.lay.style)) (left = X + "px"), (top = Y + "px");
        mig.count++, 1 == mig.count && (mig.lay.style.visibility = "visible");
    }
}
function htm() {
    with (((mig.move = 0), (mig.lay.innerHTML = ""), mig.lay.style)) (visibility = "hidden"), (left = 0), (top = -800 + "px");
    return (this.onmouseout = mig.lay.click = this.onmousemove = null), !1;
}
function mig_init() {
    var e = document.createElement("div");
    (e.id = "tipMsg"), document.body.appendChild(e), (mig.lay = e);
}
function fixedMenu() {
    var n = $("#menu"),
        a = $(window),
        r = $("#body"),
        i = "RTL" === $("html").attr("dir") ? "right" : "left",
        o = !1,
        e = function () {
            var e = a.height(),
                t = r.outerHeight();
            if (!n.is(":visible") || Math.round(n.width()) === window.innerWidth || t <= e || n.height() >= t || a.scrollTop() + e <= n.outerHeight()) return s();
            (e -= n.outerHeight()), (e = { position: "fixed", bottom: (e < 0 ? 0 : e) + "px" });
            (e[i] = "0px"), n.css(e).addClass("fixedmenu-fixed").next().show(), (o = !0);
        },
        s = function () {
            var e;
            o && (((e = { position: "", bottom: "" })[i] = ""), n.css(e).removeClass("fixedmenu-fixed").next().hide(), (o = !1));
        };
    (fixedMenu.init = void 0 === fixedMenu.init), fixedMenu.init && (n.after('<div style="display: none; width: ' + n.outerWidth() + "px; height: " + n.height() + "px; float: " + i + ';"></div>'), a.resize(fixedMenu), a.scroll(e)), e();
}
$(document).ready(mig_init),
    (Calendar = function (e, t, n, a) {
        if (
            ((this.activeDiv = null),
                (this.currentDateEl = null),
                (this.getDateStatus = null),
                (this.timeout = null),
                (this.onSelected = n || null),
                (this.onClose = a || null),
                (this.dragging = !1),
                (this.hidden = !1),
                (this.minYear = 1970),
                (this.maxYear = 2050),
                (this.dateFormat = Calendar._TT.DEF_DATE_FORMAT),
                (this.ttDateFormat = Calendar._TT.TT_DATE_FORMAT),
                (this.isPopup = !0),
                (this.weekNumbers = !0),
                (this.firstDayOfWeek = e),
                (this.showsOtherMonths = !1),
                (this.dateStr = t),
                (this.ar_days = null),
                (this.showsTime = !1),
                (this.time24 = !0),
                (this.yearStep = 2),
                (this.table = null),
                (this.element = null),
                (this.tbody = null),
                (this.firstdayname = null),
                (this.monthsCombo = null),
                (this.yearsCombo = null),
                (this.hilitedMonth = null),
                (this.activeMonth = null),
                (this.hilitedYear = null),
                (this.activeYear = null),
                (this.dateClicked = !1),
            void 0 === Calendar._SDN)
        ) {
            void 0 === Calendar._SDN_len && (Calendar._SDN_len = 3);
            for (var r = new Array(), i = 8; 0 < i; ) r[--i] = Calendar._DN[i].substr(0, Calendar._SDN_len);
            (Calendar._SDN = r), void 0 === Calendar._SMN_len && (Calendar._SMN_len = 3);
            for (r = new Array(), i = 12; 0 < i; ) r[--i] = Calendar._MN[i].substr(0, Calendar._SMN_len);
            Calendar._SMN = r;
        }
    }),
    (Calendar._C = null),
    (Calendar.is_ie = /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)),
    (Calendar.is_ie5 = Calendar.is_ie && /msie 5\.0/i.test(navigator.userAgent)),
    (Calendar.is_opera = /opera/i.test(navigator.userAgent)),
    (Calendar.is_safari = /Safari/i.test(navigator.userAgent)),
    (Calendar.is_khtml = /Konqueror|KHTML|Safari/i.test(navigator.userAgent)),
    (Calendar.getAbsolutePos = function (e) {
        var t = 0,
            n = 0,
            a = /^div$/i.test(e.tagName);
        a && e.scrollLeft && (t = e.scrollLeft), a && e.scrollTop && (n = e.scrollTop);
        n = { x: e.offsetLeft - t, y: e.offsetTop - n };
        return e.offsetParent && ((e = this.getAbsolutePos(e.offsetParent)), (n.x += e.x), (n.y += e.y)), n;
    }),
    (Calendar.isRelated = function (e, t) {
        var n,
            a = t.relatedTarget;
        for (a || ("mouseover" == (n = t.type) ? (a = t.fromElement) : "mouseout" == n && (a = t.toElement)); a; ) {
            if (a == e) return !0;
            a = a.parentNode;
        }
        return !1;
    }),
    (Calendar.removeClass = function (e, t) {
        if (e && e.className) {
            for (var n = e.className.split(" "), a = new Array(), r = n.length; 0 < r; ) n[--r] != t && (a[a.length] = n[r]);
            e.className = a.join(" ");
        }
    }),
    (Calendar.addClass = function (e, t) {
        Calendar.removeClass(e, t), (e.className += " " + t);
    }),
    (Calendar.getElement = function (e) {
        return Calendar.is_ie ? window.event.srcElement : e.currentTarget;
    }),
    (Calendar.getTargetElement = function (e) {
        return Calendar.is_ie ? window.event.srcElement : e.target;
    }),
    (Calendar.stopEvent = function (e) {
        return (e = e || window.event), Calendar.is_ie ? ((e.cancelBubble = !0), (e.returnValue = !1)) : (e.preventDefault(), e.stopPropagation()), !1;
    }),
    (Calendar.addEvent = function (e, t, n) {
        e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener ? e.addEventListener(t, n, !0) : (e["on" + t] = n);
    }),
    (Calendar.removeEvent = function (e, t, n) {
        e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener ? e.removeEventListener(t, n, !0) : (e["on" + t] = null);
    }),
    (Calendar.createElement = function (e, t) {
        var n = null,
            n = document.createElementNS ? document.createElementNS("http://www.w3.org/1999/xhtml", e) : document.createElement(e);
        return void 0 !== t && t.appendChild(n), n;
    }),
    (Calendar._add_evs = function (el) {
        with (Calendar) addEvent(el, "mouseover", dayMouseOver), addEvent(el, "mousedown", dayMouseDown), addEvent(el, "mouseout", dayMouseOut), is_ie && (addEvent(el, "dblclick", dayMouseDblClick), el.setAttribute("unselectable", !0));
    }),
    (Calendar.findMonth = function (e) {
        return void 0 !== e.month ? e : void 0 !== e.parentNode.month ? e.parentNode : null;
    }),
    (Calendar.findYear = function (e) {
        return void 0 !== e.year ? e : void 0 !== e.parentNode.year ? e.parentNode : null;
    }),
    (Calendar.showMonthsCombo = function () {
        var e = Calendar._C;
        if (!e) return !1;
        var t = (e = e).activeDiv,
            n = e.monthsCombo;
        e.hilitedMonth && Calendar.removeClass(e.hilitedMonth, "hilite"), e.activeMonth && Calendar.removeClass(e.activeMonth, "active");
        var a = e.monthsCombo.getElementsByTagName("div")[e.date.getMonth()];
        Calendar.addClass(a, "active"), (e.activeMonth = a);
        a = n.style;
        (a.display = "block"), t.navtype < 0 ? (a.left = t.offsetLeft + "px") : ((n = n.offsetWidth), (a.left = t.offsetLeft + t.offsetWidth - (n = void 0 === n ? 50 : n) + "px")), (a.top = t.offsetTop + t.offsetHeight + "px");
    }),
    (Calendar.showYearsCombo = function (e) {
        var t = Calendar._C;
        if (!t) return !1;
        var n = (t = t).activeDiv,
            a = t.yearsCombo;
        t.hilitedYear && Calendar.removeClass(t.hilitedYear, "hilite"), t.activeYear && Calendar.removeClass(t.activeYear, "active"), (t.activeYear = null);
        for (var r, i = t.date.getFullYear() + (e ? 1 : -1), o = a.firstChild, s = !1, l = 12; 0 < l; --l)
            i >= t.minYear && i <= t.maxYear ? ((o.firstChild.data = i), (o.year = i), (o.style.display = "block"), (s = !0)) : (o.style.display = "none"), (o = o.nextSibling), (i += e ? t.yearStep : -t.yearStep);
        s &&
        (((r = a.style).display = "block"),
            n.navtype < 0 ? (r.left = n.offsetLeft + "px") : ((a = a.offsetWidth), (r.left = n.offsetLeft + n.offsetWidth - (a = void 0 === a ? 50 : a) + "px")),
            (r.top = n.offsetTop + n.offsetHeight + "px"));
    }),
    (Calendar.tableMouseUp = function (ev) {
        var cal = Calendar._C;
        if (!cal) return !1;
        cal.timeout && clearTimeout(cal.timeout);
        var el = cal.activeDiv;
        if (!el) return !1;
        var target = Calendar.getTargetElement(ev);
        (ev = ev || window.event), Calendar.removeClass(el, "active"), (target != el && target.parentNode != el) || Calendar.cellClick(el, ev);
        var mon = Calendar.findMonth(target),
            date = null,
            year;
        with ((mon
            ? ((date = new Date(cal.date)), mon.month != date.getMonth() && (date.setMonth(mon.month), cal.setDate(date), (cal.dateClicked = !1), cal.callHandler()))
            : ((year = Calendar.findYear(target)), year && ((date = new Date(cal.date)), year.year != date.getFullYear() && (date.setFullYear(year.year), cal.setDate(date), (cal.dateClicked = !1), cal.callHandler()))),
            Calendar))
            return removeEvent(document, "mouseup", tableMouseUp), removeEvent(document, "mouseover", tableMouseOver), removeEvent(document, "mousemove", tableMouseOver), cal._hideCombos(), (_C = null), stopEvent(ev);
    }),
    (Calendar.tableMouseOver = function (e) {
        var t = Calendar._C;
        if (t) {
            var n = t.activeDiv,
                a = Calendar.getTargetElement(e);
            if (
                (a == n || a.parentNode == n
                    ? (Calendar.addClass(n, "hilite active"), Calendar.addClass(n.parentNode, "rowhilite"))
                    : ((void 0 === n.navtype || (50 != n.navtype && (0 == n.navtype || 2 < Math.abs(n.navtype)))) && Calendar.removeClass(n, "active"), Calendar.removeClass(n, "hilite"), Calendar.removeClass(n.parentNode, "rowhilite")),
                    (e = e || window.event),
                50 == n.navtype && a != n)
            ) {
                var r = Calendar.getAbsolutePos(n),
                    i = n.offsetWidth,
                    o = e.clientX,
                    s = !0;
                o > r.x + i ? ((h = o - r.x - i), (s = !1)) : (h = r.x - o), h < 0 && (h = 0);
                for (var l = n._range, u = n._current, c = Math.floor(h / 10) % l.length, d = l.length; 0 <= --d && l[d] != u; );
                for (; 0 < c--; ) s ? --d < 0 && (d = l.length - 1) : ++d >= l.length && (d = 0);
                var h = l[d];
                (n.firstChild.data = h), t.onUpdateTime();
            }
            h = Calendar.findMonth(a);
            return (
                h
                    ? h.month != t.date.getMonth()
                        ? (t.hilitedMonth && Calendar.removeClass(t.hilitedMonth, "hilite"), Calendar.addClass(h, "hilite"), (t.hilitedMonth = h))
                        : t.hilitedMonth && Calendar.removeClass(t.hilitedMonth, "hilite")
                    : (t.hilitedMonth && Calendar.removeClass(t.hilitedMonth, "hilite"),
                        (a = Calendar.findYear(a)) && a.year != t.date.getFullYear()
                            ? (t.hilitedYear && Calendar.removeClass(t.hilitedYear, "hilite"), Calendar.addClass(a, "hilite"), (t.hilitedYear = a))
                            : t.hilitedYear && Calendar.removeClass(t.hilitedYear, "hilite")),
                    Calendar.stopEvent(e)
            );
        }
    }),
    (Calendar.tableMouseDown = function (e) {
        if (Calendar.getTargetElement(e) == Calendar.getElement(e)) return Calendar.stopEvent(e);
    }),
    (Calendar.calDragIt = function (e) {
        var t,
            n,
            a = Calendar._C;
        if (!a || !a.dragging) return !1;
        Calendar.is_ie ? ((n = window.event.clientY + document.body.scrollTop), (t = window.event.clientX + document.body.scrollLeft)) : ((t = e.pageX), (n = e.pageY)), a.hideShowCovered();
        var r = a.element.style;
        return (r.left = t - a.xOffs + "px"), (r.top = n - a.yOffs + "px"), Calendar.stopEvent(e);
    }),
    (Calendar.calDragEnd = function (ev) {
        var cal = Calendar._C;
        if (!cal) return !1;
        with (((cal.dragging = !1), Calendar)) removeEvent(document, "mousemove", calDragIt), removeEvent(document, "mouseup", calDragEnd), tableMouseUp(ev);
        cal.hideShowCovered();
    }),
    (Calendar.dayMouseDown = function (ev) {
        var el = Calendar.getElement(ev);
        if (el.disabled) return !1;
        var cal = el.calendar;
        if (((cal.activeDiv = el), (Calendar._C = cal), 300 != el.navtype))
            with (Calendar)
                50 == el.navtype ? ((el._current = el.firstChild.data), addEvent(document, "mousemove", tableMouseOver)) : addEvent(document, Calendar.is_ie5 ? "mousemove" : "mouseover", tableMouseOver),
                    addClass(el, "hilite active"),
                    addEvent(document, "mouseup", tableMouseUp);
        else cal.isPopup && cal._dragStart(ev);
        return (
            -1 == el.navtype || 1 == el.navtype
                ? (cal.timeout && clearTimeout(cal.timeout), (cal.timeout = setTimeout("Calendar.showMonthsCombo()", 250)))
                : -2 == el.navtype || 2 == el.navtype
                    ? (cal.timeout && clearTimeout(cal.timeout), (cal.timeout = setTimeout(0 < el.navtype ? "Calendar.showYearsCombo(true)" : "Calendar.showYearsCombo(false)", 250)))
                    : (cal.timeout = null),
                Calendar.stopEvent(ev)
        );
    }),
    (Calendar.dayMouseDblClick = function (e) {
        Calendar.cellClick(Calendar.getElement(e), e || window.event), Calendar.is_ie && document.selection.empty();
    }),
    (Calendar.dayMouseOver = function (e) {
        var t = Calendar.getElement(e);
        return (
            !(Calendar.isRelated(t, e) || Calendar._C || t.disabled) &&
            (t.ttip && ("_" == t.ttip.substr(0, 1) && (t.ttip = t.caldate.print(t.calendar.ttDateFormat) + t.ttip.substr(1)), (t.calendar.tooltips.firstChild.data = t.ttip)),
            300 != t.navtype && (Calendar.addClass(t, "hilite"), t.caldate && Calendar.addClass(t.parentNode, "rowhilite")),
                Calendar.stopEvent(e))
        );
    }),
    (Calendar.dayMouseOut = function (ev) {
        with (Calendar) {
            var el = getElement(ev);
            return isRelated(el, ev) || _C || el.disabled ? !1 : (removeClass(el, "hilite"), el.caldate && removeClass(el.parentNode, "rowhilite"), (el.calendar.tooltips.firstChild.data = _TT.SEL_DATE), stopEvent(ev));
        }
    }),
    (Calendar.cellClick = function (e, t) {
        var n = e.calendar,
            a = !1,
            r = !1,
            i = null;
        if (void 0 === e.navtype)
            Calendar.removeClass(n.currentDateEl, "selected"),
                Calendar.addClass(e, "selected"),
            (a = n.currentDateEl == e) || (n.currentDateEl = e),
                (n.date = new Date(e.caldate)),
                (i = n.date),
                (r = !0),
            (n.dateClicked = !e.otherMonth) || n._init(n.firstDayOfWeek, i);
        else {
            if (200 == e.navtype) return Calendar.removeClass(e, "hilite"), void n.callCloseHandler();
            (i = 0 == e.navtype ? new Date() : new Date(n.date)), (n.dateClicked = !1);
            var o = i.getFullYear(),
                s = i.getMonth();
            function l(e) {
                var t = i.getDate(),
                    n = i.getMonthDays(e);
                n < t && i.setDate(n), i.setMonth(e);
            }
            switch (e.navtype) {
                case 400:
                    Calendar.removeClass(e, "hilite");
                    var u = Calendar._TT.ABOUT;
                    return (
                        void 0 !== u
                            ? (u += n.showsTime ? Calendar._TT.ABOUT_TIME : "")
                            : (u =
                                'Help and about box text is not translated into this language.\nIf you know this language and you feel generous please update\nthe corresponding file in "lang" subdir to match calendar-en.js\nand send it back to <mishoo@infoiasi.ro> to get it into the distribution  ;-)\n\nThank you!\nhttp://dynarch.com/mishoo/calendar.epl\n'),
                            void alert(u)
                    );
                case -2:
                    o > n.minYear && i.setFullYear(o - 1);
                    break;
                case -1:
                    0 < s ? l(s - 1) : o-- > n.minYear && (i.setFullYear(o), l(11));
                    break;
                case 1:
                    s < 11 ? l(s + 1) : o < n.maxYear && (i.setFullYear(o + 1), l(0));
                    break;
                case 2:
                    o < n.maxYear && i.setFullYear(o + 1);
                    break;
                case 100:
                    return void n.setFirstDayOfWeek(e.fdow);
                case 50:
                    for (var c = e._range, d = e.firstChild.data, h = c.length; 0 <= --h && c[h] != d; );
                    t && t.shiftKey ? --h < 0 && (h = c.length - 1) : ++h >= c.length && (h = 0);
                    u = c[h];
                    return (e.firstChild.data = u), void n.onUpdateTime();
                case 0:
                    if ("function" == typeof n.getDateStatus && n.getDateStatus(i, i.getFullYear(), i.getMonth(), i.getDate())) return !1;
            }
            i.equalsTo(n.date) || (n.setDate(i), (r = !0));
        }
        r && n.callHandler(), a && (Calendar.removeClass(e, "hilite"), n.callCloseHandler());
    }),
    (Calendar.prototype.create = function (e) {
        var t = null;
        e ? ((t = e), (this.isPopup = !1)) : ((t = document.getElementsByTagName("body")[0]), (this.isPopup = !0)), (this.date = this.dateStr ? new Date(this.dateStr) : new Date());
        var n = Calendar.createElement("table");
        ((this.table = n).cellSpacing = 0), (n.cellPadding = 0), (n.calendar = this), Calendar.addEvent(n, "mousedown", Calendar.tableMouseDown);
        var a = Calendar.createElement("div");
        ((this.element = a).className = "calendar"), this.isPopup && ((a.style.position = "absolute"), (a.style.display = "none")), a.appendChild(n);
        function r(e, t, n) {
            return (
                ((u = Calendar.createElement("td", c)).colSpan = t),
                    (u.className = "button"),
                0 != n && Math.abs(n) <= 2 && (u.className += " nav"),
                    Calendar._add_evs(u),
                    (u.calendar = d),
                    (u.navtype = n),
                    "&" != e.substr(0, 1) ? u.appendChild(document.createTextNode(e)) : (u.innerHTML = e),
                    u
            );
        }
        var i = Calendar.createElement("thead", n),
            u = null,
            c = null,
            d = this,
            c = Calendar.createElement("tr", i),
            e = 6;
        this.isPopup && --e,
        this.weekNumbers && ++e,
            (r("?", 1, 400).ttip = Calendar._TT.INFO),
            (this.title = r("", e, 300)),
            (this.title.className = "title"),
        this.isPopup && ((this.title.ttip = Calendar._TT.DRAG_TO_MOVE), (this.title.style.cursor = "move"), (r("&#x00d7;", 1, 200).ttip = Calendar._TT.CLOSE)),
            ((c = Calendar.createElement("tr", i)).className = "headrow"),
            (this._nav_py = r("&#x00ab;", 1, -2)),
            (this._nav_py.ttip = Calendar._TT.PREV_YEAR),
            (this._nav_pm = r("&#x2039;", 1, -1)),
            (this._nav_pm.ttip = Calendar._TT.PREV_MONTH),
            (this._nav_now = r(Calendar._TT.TODAY, this.weekNumbers ? 4 : 3, 0)),
            (this._nav_now.ttip = Calendar._TT.GO_TODAY),
            (this._nav_nm = r("&#x203a;", 1, 1)),
            (this._nav_nm.ttip = Calendar._TT.NEXT_MONTH),
            (this._nav_ny = r("&#x00bb;", 1, 2)),
            (this._nav_ny.ttip = Calendar._TT.NEXT_YEAR),
            ((c = Calendar.createElement("tr", i)).className = "daynames"),
        this.weekNumbers && (((u = Calendar.createElement("td", c)).className = "name wn"), u.appendChild(document.createTextNode(Calendar._TT.WK)));
        for (var o = 7; 0 < o; --o) (u = Calendar.createElement("td", c)).appendChild(document.createTextNode("")), o || ((u.navtype = 100), (u.calendar = this), Calendar._add_evs(u));
        (this.firstdayname = this.weekNumbers ? c.firstChild.nextSibling : c.firstChild), this._displayWeekdays();
        var s = Calendar.createElement("tbody", n);
        for (this.tbody = s, o = 6; 0 < o; --o) {
            (c = Calendar.createElement("tr", s)), this.weekNumbers && (u = Calendar.createElement("td", c)).appendChild(document.createTextNode(""));
            for (var l = 7; 0 < l; --l) (u = Calendar.createElement("td", c)).appendChild(document.createTextNode("")), (u.calendar = this), Calendar._add_evs(u);
        }
        this.showsTime
            ? (((c = Calendar.createElement("tr", s)).className = "time"),
                ((u = Calendar.createElement("td", c)).className = "time"),
                (u.colSpan = 2),
                (u.innerHTML = Calendar._TT.TIME || "&nbsp;"),
                ((u = Calendar.createElement("td", c)).className = "time"),
                (u.colSpan = this.weekNumbers ? 4 : 3),
                (function () {
                    function e(e, t, n, a) {
                        var r = Calendar.createElement("span", u);
                        if (((r.className = e), r.appendChild(document.createTextNode(t)), (r.calendar = d), (r.ttip = Calendar._TT.TIME_PART), (r.navtype = 50), (r._range = []), "number" != typeof n)) r._range = n;
                        else
                            for (var i = n; i <= a; ++i) {
                                var o = i < 10 && 10 <= a ? "0" + i : "" + i;
                                r._range[r._range.length] = o;
                            }
                        return Calendar._add_evs(r), r;
                    }
                    var t = d.date.getHours(),
                        n = d.date.getMinutes(),
                        i = !d.time24,
                        a = 12 < t;
                    i && a && (t -= 12);
                    var o = e("hour", t, i ? 1 : 0, i ? 12 : 23),
                        t = Calendar.createElement("span", u);
                    t.appendChild(document.createTextNode(":")), (t.className = "colon");
                    var s = e("minute", n, 0, 59),
                        l = null;
                    ((u = Calendar.createElement("td", c)).className = "time"),
                        (u.colSpan = 2),
                        i ? (l = e("ampm", a ? "pm" : "am", ["am", "pm"])) : (u.innerHTML = "&nbsp;"),
                        (d.onSetTime = function () {
                            var e = this.date.getHours(),
                                t = this.date.getMinutes(),
                                n = 12 < e;
                            n && i && (e -= 12), (o.firstChild.data = e < 10 ? "0" + e : e), (s.firstChild.data = t < 10 ? "0" + t : t), i && (l.firstChild.data = n ? "pm" : "am");
                        }),
                        (d.onUpdateTime = function () {
                            var e = this.date,
                                t = parseInt(o.firstChild.data, 10);
                            i && (/pm/i.test(l.firstChild.data) && t < 12 ? (t += 12) : /am/i.test(l.firstChild.data) && 12 == t && (t = 0));
                            var n = e.getDate(),
                                a = e.getMonth(),
                                r = e.getFullYear();
                            e.setHours(t), e.setMinutes(parseInt(s.firstChild.data, 10)), e.setFullYear(r), e.setMonth(a), e.setDate(n), (this.dateClicked = !1), this.callHandler();
                        });
                })())
            : (this.onSetTime = this.onUpdateTime = function () {});
        n = Calendar.createElement("tfoot", n);
        for (
            (c = Calendar.createElement("tr", n)).className = "footrow",
                (u = r(Calendar._TT.SEL_DATE, this.weekNumbers ? 8 : 7, 300)).className = "ttip",
            this.isPopup && ((u.ttip = Calendar._TT.DRAG_TO_MOVE), (u.style.cursor = "move")),
                this.tooltips = u,
                a = Calendar.createElement("div", this.element),
                (this.monthsCombo = a).className = "combo",
                o = 0;
            o < Calendar._MN.length;
            ++o
        ) {
            var h = Calendar.createElement("div");
            (h.className = Calendar.is_ie ? "label-IEfix" : "label"), (h.month = o), h.appendChild(document.createTextNode(Calendar._SMN[o])), a.appendChild(h);
        }
        for (a = Calendar.createElement("div", this.element), (this.yearsCombo = a).className = "combo", o = 12; 0 < o; --o) {
            var p = Calendar.createElement("div");
            (p.className = Calendar.is_ie ? "label-IEfix" : "label"), p.appendChild(document.createTextNode("")), a.appendChild(p);
        }
        this._init(this.firstDayOfWeek, this.date), t.appendChild(this.element);
    }),
    (Calendar._keyEvent = function (e) {
        if (!window.calendar) return !1;
        Calendar.is_ie && (e = window.event);
        var t = window.calendar,
            n = Calendar.is_ie || "keypress" == e.type;
        if (e.ctrlKey)
            switch (e.keyCode) {
                case 37:
                    n && Calendar.cellClick(t._nav_pm);
                    break;
                case 38:
                    n && Calendar.cellClick(t._nav_py);
                    break;
                case 39:
                    n && Calendar.cellClick(t._nav_nm);
                    break;
                case 40:
                    n && Calendar.cellClick(t._nav_ny);
                    break;
                default:
                    return !1;
            }
        else
            switch (e.keyCode) {
                case 32:
                    Calendar.cellClick(t._nav_now);
                    break;
                case 27:
                    n && t.callCloseHandler();
                    break;
                case 37:
                case 38:
                case 39:
                case 40:
                    if (n) {
                        var a = t.date.getDate() - 1,
                            r = t.currentDateEl,
                            i = null,
                            o = 37 == e.keyCode || 38 == e.keyCode;
                        switch (e.keyCode) {
                            case 37:
                                0 <= --a && (i = t.ar_days[a]);
                                break;
                            case 38:
                                0 <= (a -= 7) && (i = t.ar_days[a]);
                                break;
                            case 39:
                                ++a < t.ar_days.length && (i = t.ar_days[a]);
                                break;
                            case 40:
                                (a += 7) < t.ar_days.length && (i = t.ar_days[a]);
                        }
                        i || (o ? Calendar.cellClick(t._nav_pm) : Calendar.cellClick(t._nav_nm), (a = o ? t.date.getMonthDays() : 1), (r = t.currentDateEl), (i = t.ar_days[a - 1])),
                            Calendar.removeClass(r, "selected"),
                            Calendar.addClass(i, "selected"),
                            (t.date = new Date(i.caldate)),
                            t.callHandler(),
                            (t.currentDateEl = i);
                    }
                    break;
                case 13:
                    n && (t.callHandler(), t.hide());
                    break;
                default:
                    return !1;
            }
        return Calendar.stopEvent(e);
    }),
    (Calendar.prototype._init = function (e, t) {
        var n = new Date();
        this.table.style.visibility = "hidden";
        var a = t.getFullYear();
        a < this.minYear ? ((a = this.minYear), t.setFullYear(a)) : a > this.maxYear && ((a = this.maxYear), t.setFullYear(a)), (this.firstDayOfWeek = e), (this.date = new Date(t));
        var r = t.getMonth(),
            i = t.getDate();
        t.getMonthDays();
        t.setDate(1);
        e = (t.getDay() - this.firstDayOfWeek) % 7;
        e < 0 && (e += 7), t.setDate(-e), t.setDate(t.getDate() + 1);
        for (var o = this.tbody.firstChild, s = (Calendar._SMN[r], new Array()), l = Calendar._TT.WEEKEND, u = 0; u < 6; ++u, o = o.nextSibling) {
            var c = o.firstChild;
            this.weekNumbers && ((c.className = "day wn"), (c.firstChild.data = t.getWeekNumber()), (c = c.nextSibling));
            for (var d = !(o.className = "daysrow"), h = 0; h < 7; ++h, c = c.nextSibling, t.setDate(t.getDate() + 1)) {
                var p = t.getDate(),
                    f = t.getDay();
                c.className = "day";
                var m,
                    g = t.getMonth() == r;
                if (g) d = !(c.otherMonth = !1);
                else {
                    if (!this.showsOtherMonths) {
                        (c.className = "emptycell"), (c.innerHTML = "&nbsp;"), (c.disabled = !0);
                        continue;
                    }
                    (c.className += " othermonth"), (c.otherMonth = !0);
                }
                (c.disabled = !1),
                    (c.firstChild.data = p),
                "function" == typeof this.getDateStatus && (!0 === (m = this.getDateStatus(t, a, r, p)) ? ((c.className += " disabled"), (c.disabled = !0)) : (/disabled/i.test(m) && (c.disabled = !0), (c.className += " " + m))),
                c.disabled ||
                (((s[s.length] = c).caldate = new Date(t)),
                    (c.ttip = "_"),
                g && p == i && ((c.className += " selected"), (this.currentDateEl = c)),
                t.getFullYear() == n.getFullYear() && t.getMonth() == n.getMonth() && p == n.getDate() && ((c.className += " today"), (c.ttip += Calendar._TT.PART_TODAY)),
                -1 != l.indexOf(f.toString()) && (c.className += c.otherMonth ? " oweekend" : " weekend"));
            }
            d || this.showsOtherMonths || (o.className = "emptyrow");
        }
        (this.ar_days = s), (this.title.firstChild.data = Calendar._MN[r] + ", " + a), this.onSetTime(), (this.table.style.visibility = "visible");
    }),
    (Calendar.prototype.setDate = function (e) {
        e.equalsTo(this.date) || this._init(this.firstDayOfWeek, e);
    }),
    (Calendar.prototype.refresh = function () {
        this._init(this.firstDayOfWeek, this.date);
    }),
    (Calendar.prototype.setFirstDayOfWeek = function (e) {
        this._init(e, this.date), this._displayWeekdays();
    }),
    (Calendar.prototype.setDateStatusHandler = Calendar.prototype.setDisabledHandler = function (e) {
        this.getDateStatus = e;
    }),
    (Calendar.prototype.setRange = function (e, t) {
        (this.minYear = e), (this.maxYear = t);
    }),
    (Calendar.prototype.callHandler = function () {
        this.onSelected && this.onSelected(this, this.date.print(this.dateFormat));
    }),
    (Calendar.prototype.callCloseHandler = function () {
        this.onClose && this.onClose(this), this.hideShowCovered();
    }),
    (Calendar.prototype.destroy = function () {
        this.element.parentNode.removeChild(this.element), (Calendar._C = null), (window.calendar = null);
    }),
    (Calendar.prototype.reparent = function (e) {
        var t = this.element;
        t.parentNode.removeChild(t), e.appendChild(t);
    }),
    (Calendar._checkCalendar = function (e) {
        if (!window.calendar) return !1;
        for (var t = Calendar.is_ie ? Calendar.getElement(e) : Calendar.getTargetElement(e); null != t && t != calendar.element; t = t.parentNode);
        return null == t ? (window.calendar.callCloseHandler(), Calendar.stopEvent(e)) : void 0;
    }),
    (Calendar.prototype.show = function () {
        for (var e = this.table.getElementsByTagName("tr"), t = e.length; 0 < t; ) {
            var n = e[--t];
            Calendar.removeClass(n, "rowhilite");
            for (var a = n.getElementsByTagName("td"), r = a.length; 0 < r; ) {
                var i = a[--r];
                Calendar.removeClass(i, "hilite"), Calendar.removeClass(i, "active");
            }
        }
        (this.element.style.display = "block"),
            (this.hidden = !1),
        this.isPopup &&
        ((window.calendar = this), Calendar.addEvent(document, "keydown", Calendar._keyEvent), Calendar.addEvent(document, "keypress", Calendar._keyEvent), Calendar.addEvent(document, "mousedown", Calendar._checkCalendar)),
            this.hideShowCovered();
    }),
    (Calendar.prototype.hide = function () {
        this.isPopup && (Calendar.removeEvent(document, "keydown", Calendar._keyEvent), Calendar.removeEvent(document, "keypress", Calendar._keyEvent), Calendar.removeEvent(document, "mousedown", Calendar._checkCalendar)),
            (this.element.style.display = "none"),
            (this.hidden = !0),
            this.hideShowCovered();
    }),
    (Calendar.prototype.showAt = function (e, t) {
        var n = this.element.style;
        (n.left = e + "px"), (n.top = t + "px"), this.show();
    }),
    (Calendar.prototype.showAtElement = function (r, i) {
        var o = this,
            s = Calendar.getAbsolutePos(r);
        if (!i || "string" != typeof i) return this.showAt(s.x, s.y + r.offsetHeight), !0;
        (this.element.style.display = "block"),
            (Calendar.continuation_for_the_khtml_browser = function () {
                var e = o.element.offsetWidth,
                    t = o.element.offsetHeight;
                o.element.style.display = "none";
                var n = i.substr(0, 1),
                    a = "l";
                switch ((1 < i.length && (a = i.substr(1, 1)), n)) {
                    case "T":
                        s.y -= t;
                        break;
                    case "B":
                        s.y += r.offsetHeight;
                        break;
                    case "C":
                        s.y += (r.offsetHeight - t) / 2;
                        break;
                    case "t":
                        s.y += r.offsetHeight - t;
                }
                switch (a) {
                    case "L":
                        s.x -= e;
                        break;
                    case "R":
                        s.x += r.offsetWidth;
                        break;
                    case "C":
                        s.x += (r.offsetWidth - e) / 2;
                        break;
                    case "r":
                        s.x += r.offsetWidth - e;
                }
                (s.width = e),
                    (s.height = t + 40),
                    (o.monthsCombo.style.display = "none"),
                    (function (e) {
                        e.x < 0 && (e.x = 0), e.y < 0 && (e.y = 0);
                        var t = document.createElement("div"),
                            n = t.style;
                        (n.position = "absolute"),
                            (n.right = n.bottom = n.width = n.height = "0px"),
                            document.body.appendChild(t),
                            (n = Calendar.getAbsolutePos(t)),
                            document.body.removeChild(t),
                            Calendar.is_ie ? ((n.y += document.body.scrollTop), (n.x += document.body.scrollLeft)) : ((n.y += window.scrollY), (n.x += window.scrollX)),
                        0 < (t = e.x + e.width - n.x) && (e.x -= t),
                        0 < (t = e.y + e.height - n.y) && (e.y -= t);
                    })(s),
                    o.showAt(s.x, s.y);
            }),
            Calendar.is_khtml ? setTimeout("Calendar.continuation_for_the_khtml_browser()", 10) : Calendar.continuation_for_the_khtml_browser();
    }),
    (Calendar.prototype.setDateFormat = function (e) {
        this.dateFormat = e;
    }),
    (Calendar.prototype.setTtDateFormat = function (e) {
        this.ttDateFormat = e;
    }),
    (Calendar.prototype.parseDate = function (e, t) {
        for (var n = 0, a = -1, r = 0, i = e.split(/\W+/), o = (t = t || this.dateFormat).match(/%./g), s = 0, l = 0, u = 0, c = 0, s = 0; s < i.length; ++s)
            if (i[s])
                switch (o[s]) {
                    case "%d":
                    case "%e":
                        r = parseInt(i[s], 10);
                        break;
                    case "%m":
                        a = parseInt(i[s], 10) - 1;
                        break;
                    case "%Y":
                    case "%y":
                        (n = parseInt(i[s], 10)) < 100 && (n += 29 < n ? 1900 : 2e3);
                        break;
                    case "%b":
                    case "%B":
                        for (l = 0; l < 12; ++l)
                            if (Calendar._MN[l].substr(0, i[s].length).toLowerCase() == i[s].toLowerCase()) {
                                a = l;
                                break;
                            }
                        break;
                    case "%H":
                    case "%I":
                    case "%k":
                    case "%l":
                        u = parseInt(i[s], 10);
                        break;
                    case "%P":
                    case "%p":
                        /pm/i.test(i[s]) && u < 12 && (u += 12);
                        break;
                    case "%M":
                        c = parseInt(i[s], 10);
                }
        if (0 == n || -1 == a || 0 == r) {
            for (a = -1, s = r = n = 0; s < i.length; ++s)
                if (-1 != i[s].search(/[a-zA-Z]+/)) {
                    for (var d = -1, l = 0; l < 12; ++l)
                        if (Calendar._MN[l].substr(0, i[s].length).toLowerCase() == i[s].toLowerCase()) {
                            d = l;
                            break;
                        }
                    -1 != d && (-1 != a && (r = a + 1), (a = d));
                } else parseInt(i[s], 10) <= 12 && -1 == a ? (a = i[s] - 1) : 31 < parseInt(i[s], 10) && 0 == n ? (n = parseInt(i[s], 10)) < 100 && (n += 29 < n ? 1900 : 2e3) : 0 == r && (r = i[s]);
            0 == n && (n = new Date().getFullYear()), -1 != a && 0 != r && this.setDate(new Date(n, a, r, u, c, 0));
        } else this.setDate(new Date(n, a, r, u, c, 0));
    }),
    (Calendar.prototype.hideShowCovered = function () {
        var g = this;
        (Calendar.continuation_for_the_khtml_browser = function () {
            function e(e) {
                var t = e.style.visibility;
                return (t =
                    t ||
                    (document.defaultView && "function" == typeof document.defaultView.getComputedStyle
                        ? Calendar.is_khtml
                            ? ""
                            : document.defaultView.getComputedStyle(e, "").getPropertyValue("visibility")
                        : e.currentStyle
                            ? e.currentStyle.visibility
                            : ""));
            }
            for (var t = new Array("applet", "iframe", "select"), n = g.element, a = (d = Calendar.getAbsolutePos(n)).x, r = n.offsetWidth + a, i = d.y, o = n.offsetHeight + i, s = t.length; 0 < s; )
                for (var l = document.getElementsByTagName(t[--s]), u = null, c = l.length; 0 < c; ) {
                    var d,
                        u = l[--c],
                        h = (d = Calendar.getAbsolutePos(u)).x,
                        p = u.offsetWidth + h,
                        f = d.y,
                        m = u.offsetHeight + f;
                    g.hidden || r < h || p < a || o < f || m < i ? (u.__msh_save_visibility || (u.__msh_save_visibility = e(u)), (u.style.visibility = u.__msh_save_visibility)) : u.__msh_save_visibility || (u.__msh_save_visibility = e(u));
                }
        }),
            Calendar.is_khtml ? setTimeout("Calendar.continuation_for_the_khtml_browser()", 10) : Calendar.continuation_for_the_khtml_browser();
    }),
    (Calendar.prototype._displayWeekdays = function () {
        for (var e = this.firstDayOfWeek, t = this.firstdayname, n = Calendar._TT.WEEKEND, a = 0; a < 7; ++a) {
            t.className = "day name";
            var r = (a + e) % 7;
            a && ((t.ttip = Calendar._TT.DAY_FIRST.replace("%s", Calendar._DN[r])), (t.navtype = 100), (t.calendar = this), (t.fdow = r), Calendar._add_evs(t)),
            -1 != n.indexOf(r.toString()) && Calendar.addClass(t, "weekend"),
                (t.firstChild.data = Calendar._SDN[(a + e) % 7]),
                (t = t.nextSibling);
        }
    }),
    (Calendar.prototype._hideCombos = function () {
        (this.monthsCombo.style.display = "none"), (this.yearsCombo.style.display = "none");
    }),
    (Calendar.prototype._dragStart = function (ev) {
        if (!this.dragging) {
            var posX, posY;
            this.dragging = !0;
            var posX = Calendar.is_ie ? ((posY = window.event.clientY + document.body.scrollTop), window.event.clientX + document.body.scrollLeft) : ((posY = ev.clientY + window.scrollY), ev.clientX + window.scrollX),
                st = this.element.style;
            with (((this.xOffs = posX - parseInt(st.left)), (this.yOffs = posY - parseInt(st.top)), Calendar)) addEvent(document, "mousemove", calDragIt), addEvent(document, "mouseup", calDragEnd);
        }
    }),
    (Date._MD = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)),
    (Date.SECOND = 1e3),
    (Date.MINUTE = 60 * Date.SECOND),
    (Date.HOUR = 60 * Date.MINUTE),
    (Date.DAY = 24 * Date.HOUR),
    (Date.WEEK = 7 * Date.DAY),
    (Date.prototype.getMonthDays = function (e) {
        var t = this.getFullYear();
        return void 0 === e && (e = this.getMonth()), 0 != t % 4 || (0 == t % 100 && 0 != t % 400) || 1 != e ? Date._MD[e] : 29;
    }),
    (Date.prototype.getDayOfYear = function () {
        var e = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),
            t = new Date(this.getFullYear(), 0, 0, 0, 0, 0);
        return Math.floor((e - t) / Date.DAY);
    }),
    (Date.prototype.getWeekNumber = function () {
        var e = new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),
            t = e.getDay();
        e.setDate(e.getDate() - ((t + 6) % 7) + 3);
        t = e.valueOf();
        return e.setMonth(0), e.setDate(4), Math.round((t - e.valueOf()) / 6048e5) + 1;
    }),
    (Date.prototype.equalsTo = function (e) {
        return this.getFullYear() == e.getFullYear() && this.getMonth() == e.getMonth() && this.getDate() == e.getDate() && this.getHours() == e.getHours() && this.getMinutes() == e.getMinutes();
    }),
    (Date.prototype.print = function (e) {
        var t = this.getMonth(),
            n = this.getDate(),
            a = this.getFullYear(),
            r = this.getWeekNumber(),
            i = this.getDay(),
            o = {},
            s = this.getHours(),
            l = 12 <= s,
            u = l ? s - 12 : s,
            c = this.getDayOfYear();
        0 == u && (u = 12);
        var d = this.getMinutes(),
            h = this.getSeconds();
        (o["%a"] = Calendar._SDN[i]),
            (o["%A"] = Calendar._DN[i]),
            (o["%b"] = Calendar._SMN[t]),
            (o["%B"] = Calendar._MN[t]),
            (o["%C"] = 1 + Math.floor(a / 100)),
            (o["%d"] = n < 10 ? "0" + n : n),
            (o["%e"] = n),
            (o["%H"] = s < 10 ? "0" + s : s),
            (o["%I"] = u < 10 ? "0" + u : u),
            (o["%j"] = c < 100 ? (c < 10 ? "00" + c : "0" + c) : c),
            (o["%k"] = s),
            (o["%l"] = u),
            (o["%m"] = t < 9 ? "0" + (1 + t) : 1 + t),
            (o["%M"] = d < 10 ? "0" + d : d),
            (o["%n"] = "\n"),
            (o["%p"] = l ? "PM" : "AM"),
            (o["%P"] = l ? "pm" : "am"),
            (o["%s"] = Math.floor(this.getTime() / 1e3)),
            (o["%S"] = h < 10 ? "0" + h : h),
            (o["%t"] = "\t"),
            (o["%U"] = o["%W"] = o["%V"] = r < 10 ? "0" + r : r),
            (o["%u"] = i + 1),
            (o["%w"] = i),
            (o["%y"] = ("" + a).substr(2, 2)),
            (o["%Y"] = a),
            (o["%%"] = "%");
        var p = /%./g;
        if (!Calendar.is_ie5 && !Calendar.is_safari)
            return e.replace(p, function (e) {
                return o[e] || e;
            });
        for (var f = e.match(p), m = 0; m < f.length; m++) {
            var g = o[f[m]];
            g && ((p = new RegExp(f[m], "g")), (e = e.replace(p, g)));
        }
        return e;
    }),
    (Date.prototype.printMonth = function () {
        return this.print("%m");
    }),
    (Date.prototype.printDay = function () {
        return this.print("%d");
    }),
    (Date.prototype.printYear = function () {
        return this.print("%Y");
    }),
    (Date.prototype.__msh_oldSetFullYear = Date.prototype.setFullYear),
    (Date.prototype.setFullYear = function (e) {
        var t = new Date(this);
        t.__msh_oldSetFullYear(e), t.getMonth() != this.getMonth() && this.setDate(28), this.__msh_oldSetFullYear(e);
    }),
    (window.calendar = null),
    (Calendar.setup = function (i) {
        function e(e, t) {
            void 0 === i[e] && (i[e] = t);
        }
        e("monthField", null),
            e("dayField", null),
            e("yearField", null),
            e("displayArea", null),
            e("button", null),
            e("eventName", "click"),
            e("ifFormat", "%Y/%m/%d"),
            e("daFormat", "%Y/%m/%d"),
            e("singleClick", !0),
            e("disableFunc", null),
            e("dateStatusFunc", i.disableFunc),
            e("firstDay", 0),
            e("align", "Br"),
            e("range", [1900, 2999]),
            e("weekNumbers", !0),
            e("flat", null),
            e("flatCallback", null),
            e("onSelect", null),
            e("onClose", null),
            e("onUpdate", null),
            e("date", null),
            e("showsTime", !1),
            e("timeFormat", "24"),
            e("electric", !1),
            e("step", 2),
            e("position", null),
            e("cache", !1),
            e("showOthers", !1);
        var t,
            n = ["dayField", "monthField", "yearField", "displayArea", "button"];
        for (t in n) "string" == typeof i[n[t]] && (i[n[t]] = document.getElementById(i[n[t]]));
        function o(e) {
            var t = e.params,
                n = e.dateClicked || t.electric;
            if (n && t.flat) return "function" == typeof t.flatCallback ? t.flatCallback(e) : alert("No flatCallback given -- doing nothing."), !1;
            if (n && t.monthField) {
                for (var a = 0; a < t.monthField.length; a++)
                    if (t.monthField.options[a].value == e.date.printMonth().toUpperCase()) {
                        t.monthField.options[a].selected = !0;
                        break;
                    }
                for (a = 0; a < t.dayField.length; a++)
                    if (t.dayField.options[a].value == e.date.printDay()) {
                        t.dayField.options[a].selected = !0;
                        break;
                    }
                for (a = 0; a < t.yearField.length; a++)
                    if (t.yearField.options[a].value == e.date.printYear()) {
                        t.yearField.options[a].selected = !0;
                        break;
                    }
                "function" == typeof t.dayField.onchange && t.dayField.onchange();
            }
            n && t.displayArea && (t.displayArea.innerHTML = e.date.print(t.daFormat)), n && t.singleClick && e.dateClicked && e.callCloseHandler(), n && "function" == typeof t.onUpdate && t.onUpdate(e);
        }
        if (null != i.flat) {
            if (("string" == typeof i.flat && (i.flat = document.getElementById(i.flat)), !i.flat)) return alert("Calendar.setup:\n  Flat specified but can't find parent."), !1;
            var a = new Calendar(i.firstDay, i.date, i.onSelect || o);
            return (
                (a.showsTime = i.showsTime), (a.time24 = "24" == i.timeFormat), (a.params = i), (a.weekNumbers = i.weekNumbers), a.setRange(i.range[0], i.range[1]), a.setDateStatusHandler(i.dateStatusFunc), a.create(i.flat), a.show(), !1
            );
        }
        (i.button || i.displayArea || i.dayField)["on" + i.eventName] = function () {
            var e = i.dayField || i.displayArea,
                t = i.dayField ? i.ifFormat : i.daFormat,
                n = !1,
                a = window.calendar,
                r = i.dayField && i.dayField.value && i.monthField && i.monthField.value && i.yearField && i.yearField.value ? i.yearField.value + "-" + i.monthField.value + "-" + i.dayField.value : null;
            return (
                a && i.cache
                    ? a.hide()
                    : ((window.calendar = a = new Calendar(
                        i.firstDay,
                        i.date,
                        i.onSelect || o,
                        i.onClose ||
                        function (e) {
                            e.hide();
                        }
                    )),
                        (a.showsTime = i.showsTime),
                        (a.time24 = "24" == i.timeFormat),
                        (a.weekNumbers = i.weekNumbers),
                        (n = !0)),
                    (a.showsOtherMonths = i.showOthers),
                    (a.yearStep = i.step),
                    a.setRange(i.range[0], i.range[1]),
                    (a.params = i),
                    a.setDateStatusHandler(i.dateStatusFunc),
                    a.setDateFormat(t),
                n && a.create(),
                    a.parseDate(e.value || e.innerHTML),
                    a.refresh(),
                    i.position ? a.showAt(i.position[0], i.position[1]) : a.showAtElement(i.button || i.displayArea || i.dayField, i.align),
                    r || i.date ? a.setDate(new Date(r || i.date)) : a.setDate(new Date()),
                    !1
            );
        };
    }),
    (function (c, i, o) {
        function s(e, t, n) {
            e = i.createElement(e);
            return t && (e.id = ee + t), n && (e.style.cssText = n), c(e);
        }
        function d() {
            return o.innerHeight || c(o).height();
        }
        function l(e, n) {
            n !== Object(n) && (n = {}),
                (this.cache = {}),
                (this.el = e),
                (this.value = function (e) {
                    var t;
                    return void 0 === this.cache[e] && (void 0 !== (t = c(this.el).attr("data-cbox-" + e)) ? (this.cache[e] = t) : void 0 !== n[e] ? (this.cache[e] = n[e]) : void 0 !== Q[e] && (this.cache[e] = Q[e])), this.cache[e];
                }),
                (this.get = function (e) {
                    e = this.value(e);
                    return c.isFunction(e) ? e.call(this.el, this) : e;
                });
        }
        function u(e) {
            var t = A.length,
                e = (P + e) % t;
            return e < 0 ? t + e : e;
        }
        function h(e, t) {
            return Math.round((/%/.test(e) ? ("x" === t ? _.width() : d()) / 100 : 1) * parseInt(e, 10));
        }
        function p(e, t) {
            return e.get("photo") || e.get("photoRegex").test(t);
        }
        function f(e, t) {
            return e.get("retinaUrl") && 1 < o.devicePixelRatio ? t.replace(e.get("photoRegex"), e.get("retinaSuffix")) : t;
        }
        function m(e) {
            "contains" in y[0] && !y[0].contains(e.target) && e.target !== C[0] && (e.stopPropagation(), y.focus());
        }
        function g(e) {
            g.str !== e && (y.add(C).removeClass(g.str).addClass(e), (g.str = e));
        }
        function D(e) {
            c(i).trigger(e), le.triggerHandler(e);
        }
        function r(e) {
            var t, n, a, r;
            X ||
            ((n = c(e).data(J)),
                (I = new l(e, n)),
                (r = I.get("rel")),
                (P = 0),
                r && !1 !== r && "nofollow" !== r
                    ? ((A = c("." + te).filter(function () {
                        return new l(this, c.data(this, J)).get("rel") === r;
                    })),
                    -1 === (P = A.index(I.el)) && ((A = A.add(I.el)), (P = A.length - 1)))
                    : (A = c(I.el)),
            W ||
            ((W = q = !0),
                g(I.get("className")),
                y.css({ visibility: "hidden", display: "block", opacity: "" }),
                (T = s(ue, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden")),
                x.css({ width: "", height: "" }).append(T),
                (z = w.height() + F.height() + x.outerHeight(!0) - x.height()),
                (H = k.width() + E.width() + x.outerWidth(!0) - x.width()),
                (j = T.outerHeight(!0)),
                (Y = T.outerWidth(!0)),
                (t = h(I.get("initialWidth"), "x")),
                (a = h(I.get("initialHeight"), "y")),
                (e = I.get("maxWidth")),
                (n = I.get("maxHeight")),
                (I.w = Math.max((!1 !== e ? Math.min(t, h(e, "x")) : t) - Y - H, 0)),
                (I.h = Math.max((!1 !== n ? Math.min(a, h(n, "y")) : a) - j - z, 0)),
                T.css({ width: "", height: I.h }),
                Z.position(),
                D(ne),
                I.get("onOpen"),
                $.add(M).hide(),
                y.focus(),
            I.get("trapFocus") &&
            i.addEventListener &&
            (i.addEventListener("focus", m, !0),
                le.one(oe, function () {
                    i.removeEventListener("focus", m, !0);
                })),
            I.get("returnFocus") &&
            le.one(oe, function () {
                c(I.el).focus();
            })),
                (a = parseFloat(I.get("opacity"))),
                C.css({ opacity: a == a ? a : "", cursor: I.get("overlayClose") ? "pointer" : "", visibility: "visible" }).show(),
                I.get("closeButton") ? R.html(I.get("close")).appendTo(x) : R.appendTo("<div/>"),
                (function () {
                    var e,
                        t,
                        n,
                        a = Z.prep,
                        r = ++ce;
                    {
                        var i;
                        (U = !(q = !0)),
                            D(se),
                            D(ae),
                            I.get("onLoad"),
                            (I.h = I.get("height") ? h(I.get("height"), "y") - j - z : I.get("innerHeight") && h(I.get("innerHeight"), "y")),
                            (I.w = I.get("width") ? h(I.get("width"), "x") - Y - H : I.get("innerWidth") && h(I.get("innerWidth"), "x")),
                            (I.mw = I.w),
                            (I.mh = I.h),
                        I.get("maxWidth") && ((I.mw = h(I.get("maxWidth"), "x") - Y - H), (I.mw = I.w && I.w < I.mw ? I.w : I.mw)),
                        I.get("maxHeight") && ((I.mh = h(I.get("maxHeight"), "y") - j - z), (I.mh = I.h && I.h < I.mh ? I.h : I.mh)),
                            (e = I.get("href")),
                            (G = setTimeout(function () {
                                B.show();
                            }, 100)),
                            I.get("inline")
                                ? ((i = c(e)),
                                    (n = c("<div>").hide().insertBefore(i)),
                                    le.one(se, function () {
                                        n.replaceWith(i);
                                    }),
                                    a(i))
                                : I.get("iframe")
                                    ? a(" ")
                                    : I.get("html")
                                        ? a(I.get("html"))
                                        : p(I, e)
                                            ? ((e = f(I, e)),
                                                (U = I.get("createImg")),
                                                c(U)
                                                    .addClass(ee + "Photo")
                                                    .bind("error." + ee, function () {
                                                        a(s(ue, "Error").html(I.get("imgError")));
                                                    })
                                                    .one("load", function () {
                                                        r === ce &&
                                                        setTimeout(function () {
                                                            var e;
                                                            I.get("retinaImage") && 1 < o.devicePixelRatio && ((U.height = U.height / o.devicePixelRatio), (U.width = U.width / o.devicePixelRatio)),
                                                            I.get("scalePhotos") &&
                                                            ((t = function () {
                                                                (U.height -= U.height * e), (U.width -= U.width * e);
                                                            }),
                                                            I.mw && U.width > I.mw && ((e = (U.width - I.mw) / U.width), t()),
                                                            I.mh && U.height > I.mh && ((e = (U.height - I.mh) / U.height), t())),
                                                            I.h && (U.style.marginTop = Math.max(I.mh - U.height, 0) / 2 + "px"),
                                                            A[1] &&
                                                            (I.get("loop") || A[P + 1]) &&
                                                            ((U.style.cursor = "pointer"),
                                                                c(U).bind("click." + ee, function () {
                                                                    Z.next();
                                                                })),
                                                                (U.style.width = U.width + "px"),
                                                                (U.style.height = U.height + "px"),
                                                                a(U);
                                                        }, 1);
                                                    }),
                                                (U.src = e))
                                            : e &&
                                            S.load(e, I.get("data"), function (e, t) {
                                                r === ce && a("error" === t ? s(ue, "Error").html(I.get("xhrError")) : c(this).contents());
                                            });
                    }
                })());
        }
        function v() {
            y ||
            ((V = !1),
                (_ = c(o)),
                (y = s(ue)
                    .attr({ id: J, class: !1 === c.support.opacity ? ee + "IE" : "", role: "dialog", tabindex: "-1" })
                    .hide()),
                (C = s(ue, "Overlay").hide()),
                (B = c([s(ue, "LoadingOverlay")[0], s(ue, "LoadingGraphic")[0]])),
                (b = s(ue, "Wrapper")),
                (x = s(ue, "Content").append(
                    (M = s(ue, "Title")),
                    (N = s(ue, "Current")),
                    (L = c('<button type="button"/>').attr({ id: ee + "Previous" })),
                    (O = c('<button type="button"/>').attr({ id: ee + "Next" })),
                    (e = s("button", "Slideshow")),
                    B
                )),
                (R = c('<button type="button"/>').attr({ id: ee + "Close" })),
                b
                    .append(
                        s(ue).append(s(ue, "TopLeft"), (w = s(ue, "TopCenter")), s(ue, "TopRight")),
                        s(ue, !1, "clear:left").append((k = s(ue, "MiddleLeft")), x, (E = s(ue, "MiddleRight"))),
                        s(ue, !1, "clear:left").append(s(ue, "BottomLeft"), (F = s(ue, "BottomCenter")), s(ue, "BottomRight"))
                    )
                    .find("div div")
                    .css({ float: "left" }),
                (S = s(ue, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;")),
                ($ = O.add(L).add(N).add(e))),
            i.body && !y.parent().length && c(i.body).append(C, y.append(b, S));
        }
        var C,
            y,
            b,
            x,
            w,
            k,
            E,
            F,
            A,
            _,
            T,
            S,
            B,
            M,
            N,
            e,
            O,
            L,
            R,
            $,
            I,
            z,
            H,
            j,
            Y,
            P,
            U,
            W,
            q,
            X,
            G,
            Z,
            V,
            t,
            n,
            a,
            K,
            Q = {
                html: !1,
                photo: !1,
                iframe: !1,
                inline: !1,
                transition: "elastic",
                speed: 300,
                fadeOut: 300,
                width: !1,
                initialWidth: "600",
                innerWidth: !1,
                maxWidth: !1,
                height: !1,
                initialHeight: "450",
                innerHeight: !1,
                maxHeight: !1,
                scalePhotos: !0,
                scrolling: !0,
                opacity: 0.9,
                preloading: !0,
                className: !1,
                overlayClose: !0,
                escKey: !0,
                arrowKey: !0,
                top: !1,
                bottom: !1,
                left: !1,
                right: !1,
                fixed: !1,
                data: void 0,
                closeButton: !0,
                fastIframe: !0,
                open: !1,
                reposition: !0,
                loop: !0,
                slideshow: !1,
                slideshowAuto: !0,
                slideshowSpeed: 2500,
                slideshowStart: "start slideshow",
                slideshowStop: "stop slideshow",
                photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
                retinaImage: !1,
                retinaUrl: !1,
                retinaSuffix: "@2x.$1",
                current: "image {current} of {total}",
                previous: "previous",
                next: "next",
                close: "close",
                xhrError: "This content failed to load.",
                imgError: "This image failed to load.",
                returnFocus: !0,
                trapFocus: !0,
                onOpen: !1,
                onLoad: !1,
                onComplete: !1,
                onCleanup: !1,
                onClosed: !1,
                rel: function () {
                    return this.rel;
                },
                href: function () {
                    return c(this).attr("href");
                },
                title: function () {
                    return this.title;
                },
                createImg: function () {
                    var n = new Image(),
                        e = c(this).data("cbox-img-attrs");
                    return (
                        "object" == typeof e &&
                        c.each(e, function (e, t) {
                            n[e] = t;
                        }),
                            n
                    );
                },
                createIframe: function () {
                    var n = i.createElement("iframe"),
                        e = c(this).data("cbox-iframe-attrs");
                    return (
                        "object" == typeof e &&
                        c.each(e, function (e, t) {
                            n[e] = t;
                        }),
                        "frameBorder" in n && (n.frameBorder = 0),
                        "allowTransparency" in n && (n.allowTransparency = "true"),
                            (n.name = new Date().getTime()),
                            (n.allowFullscreen = !0),
                            n
                    );
                },
            },
            J = "colorbox",
            ee = "cbox",
            te = ee + "Element",
            ne = ee + "_open",
            ae = ee + "_load",
            re = ee + "_complete",
            ie = ee + "_cleanup",
            oe = ee + "_closed",
            se = ee + "_purge",
            le = c("<a/>"),
            ue = "div",
            ce = 0,
            de = {},
            he =
                ((a = ee + "Slideshow_"),
                    (K = "click." + ee),
                    function () {
                        t ? I.get("slideshow") || (le.unbind(ie, De), De()) : I.get("slideshow") && A[1] && ((t = !0), le.one(ie, De), (I.get("slideshowAuto") ? me : ge)(), e.show());
                    });
        function pe() {
            clearTimeout(n);
        }
        function fe() {
            (I.get("loop") || A[P + 1]) && (pe(), (n = setTimeout(Z.next, I.get("slideshowSpeed"))));
        }
        function me() {
            e.html(I.get("slideshowStop")).unbind(K).one(K, ge), le.bind(re, fe).bind(ae, pe), y.removeClass(a + "off").addClass(a + "on");
        }
        function ge() {
            pe(),
                le.unbind(re, fe).unbind(ae, pe),
                e
                    .html(I.get("slideshowStart"))
                    .unbind(K)
                    .one(K, function () {
                        Z.next(), me();
                    }),
                y.removeClass(a + "on").addClass(a + "off");
        }
        function De() {
            (t = !1), e.hide(), pe(), le.unbind(re, fe).unbind(ae, pe), y.removeClass(a + "off " + a + "on");
        }
        c[J] ||
        (c(v),
            ((Z = c.fn[J] = c[J] = function (t, e) {
                var n = this;
                return (
                    (t = t || {}),
                    c.isFunction(n) && ((n = c("<a/>")), (t.open = !0)),
                    n[0] &&
                    (v(),
                    y &&
                    (V ||
                    ((V = !0),
                        O.click(function () {
                            Z.next();
                        }),
                        L.click(function () {
                            Z.prev();
                        }),
                        R.click(function () {
                            Z.close();
                        }),
                        C.click(function () {
                            I.get("overlayClose") && Z.close();
                        }),
                        c(i).bind("keydown." + ee, function (e) {
                            var t = e.keyCode;
                            W && I.get("escKey") && 27 === t && (e.preventDefault(), Z.close()),
                            W && I.get("arrowKey") && A[1] && !e.altKey && (37 === t ? (e.preventDefault(), L.click()) : 39 === t && (e.preventDefault(), O.click()));
                        }),
                        c.isFunction(c.fn.on) ? c(i).on("click." + ee, "." + te, a) : c("." + te).live("click." + ee, a)),
                        1) &&
                    (e && (t.onComplete = e),
                        n
                            .each(function () {
                                var e = c.data(this, J) || {};
                                c.data(this, J, c.extend(e, t));
                            })
                            .addClass(te),
                    new l(n[0], t).get("open") && r(n[0]))),
                        n
                );
                function a(e) {
                    1 < e.which || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey || (e.preventDefault(), r(this));
                }
            }).position = function (t, e) {
                function n() {
                    (w[0].style.width = F[0].style.width = x[0].style.width = parseInt(y[0].style.width, 10) - H + "px"), (x[0].style.height = k[0].style.height = E[0].style.height = parseInt(y[0].style.height, 10) - z + "px");
                }
                var a,
                    r,
                    i,
                    o,
                    s = 0,
                    l = 0,
                    u = y.offset();
                _.unbind("resize." + ee),
                    y.css({ top: -9e4, left: -9e4 }),
                    (r = _.scrollTop()),
                    (i = _.scrollLeft()),
                    I.get("fixed") ? ((u.top -= r), (u.left -= i), y.css({ position: "fixed" })) : ((s = r), (l = i), y.css({ position: "absolute" })),
                    (l += !1 !== I.get("right") ? Math.max(_.width() - I.w - Y - H - h(I.get("right"), "x"), 0) : !1 !== I.get("left") ? h(I.get("left"), "x") : Math.round(Math.max(_.width() - I.w - Y - H, 0) / 2)),
                    (s += !1 !== I.get("bottom") ? Math.max(d() - I.h - j - z - h(I.get("bottom"), "y"), 0) : !1 !== I.get("top") ? h(I.get("top"), "y") : Math.round(Math.max(d() - I.h - j - z, 0) / 2)),
                    y.css({ top: u.top, left: u.left, visibility: "visible" }),
                    (b[0].style.width = b[0].style.height = "9999px"),
                    (a = { width: I.w + Y + H, height: I.h + j + z, top: s, left: l }),
                t &&
                ((o = 0),
                    c.each(a, function (e) {
                        return a[e] !== de[e] ? void (o = t) : void 0;
                    }),
                    (t = o)),
                    (de = a),
                t || y.css(a),
                    y.dequeue().animate(a, {
                        duration: t || 0,
                        complete: function () {
                            n(),
                                (q = !1),
                                (b[0].style.width = I.w + Y + H + "px"),
                                (b[0].style.height = I.h + j + z + "px"),
                            I.get("reposition") &&
                            setTimeout(function () {
                                _.bind("resize." + ee, Z.position);
                            }, 1),
                            c.isFunction(e) && e();
                        },
                        step: n,
                    });
            }),
            (Z.resize = function (e) {
                var t;
                W &&
                ((e = e || {}).width && (I.w = h(e.width, "x") - Y - H),
                e.innerWidth && (I.w = h(e.innerWidth, "x")),
                    T.css({ width: I.w }),
                e.height && (I.h = h(e.height, "y") - j - z),
                e.innerHeight && (I.h = h(e.innerHeight, "y")),
                e.innerHeight || e.height || ((t = T.scrollTop()), T.css({ height: "auto" }), (I.h = T.height())),
                    T.css({ height: I.h }),
                t && T.scrollTop(t),
                    Z.position("none" === I.get("transition") ? 0 : I.get("speed")));
            }),
            (Z.prep = function (e) {
                var t, r;
                W &&
                ((r = "none" === I.get("transition") ? 0 : I.get("speed")),
                    T.remove(),
                    (T = s(ue, "LoadedContent").append(e))
                        .hide()
                        .appendTo(S.show())
                        .css({ width: ((I.w = I.w || T.width()), (I.w = I.mw && I.mw < I.w ? I.mw : I.w), I.w), overflow: I.get("scrolling") ? "auto" : "hidden" })
                        .css({ height: ((I.h = I.h || T.height()), (I.h = I.mh && I.mh < I.h ? I.mh : I.h), I.h) })
                        .prependTo(x),
                    S.hide(),
                    c(U).css({ float: "none" }),
                    g(I.get("className")),
                    (t = function () {
                        function e() {
                            !1 === c.support.opacity && y[0].style.removeAttribute("filter");
                        }
                        var t,
                            n,
                            a = A.length;
                        W &&
                        ((n = function () {
                            clearTimeout(G), B.hide(), D(re), I.get("onComplete");
                        }),
                            M.html(I.get("title")).show(),
                            T.show(),
                            1 < a
                                ? ("string" == typeof I.get("current") &&
                                N.html(
                                    I.get("current")
                                        .replace("{current}", P + 1)
                                        .replace("{total}", a)
                                ).show(),
                                    O[I.get("loop") || P < a - 1 ? "show" : "hide"]().html(I.get("next")),
                                    L[I.get("loop") || P ? "show" : "hide"]().html(I.get("previous")),
                                    he(),
                                I.get("preloading") &&
                                c.each([u(-1), u(1)], function () {
                                    var e = A[this],
                                        t = new l(e, c.data(e, J)),
                                        e = t.get("href");
                                    e && p(t, e) && ((e = f(t, e)), (i.createElement("img").src = e));
                                }))
                                : $.hide(),
                            I.get("iframe")
                                ? ((t = I.get("createIframe")),
                                I.get("scrolling") || (t.scrolling = "no"),
                                    c(t)
                                        .attr({ src: I.get("href"), class: ee + "Iframe" })
                                        .one("load", n)
                                        .appendTo(T),
                                    le.one(se, function () {
                                        t.src = "//about:blank";
                                    }),
                                I.get("fastIframe") && c(t).trigger("load"))
                                : n(),
                            "fade" === I.get("transition") ? y.fadeTo(r, 1, e) : e());
                    }),
                    "fade" === I.get("transition")
                        ? y.fadeTo(r, 0, function () {
                            Z.position(0, t);
                        })
                        : Z.position(r, t));
            }),
            (Z.next = function () {
                !q && A[1] && (I.get("loop") || A[P + 1]) && ((P = u(1)), r(A[P]));
            }),
            (Z.prev = function () {
                !q && A[1] && (I.get("loop") || P) && ((P = u(-1)), r(A[P]));
            }),
            (Z.close = function () {
                W &&
                !X &&
                ((W = !(X = !0)),
                    D(ie),
                    I.get("onCleanup"),
                    _.unbind("." + ee),
                    C.fadeTo(I.get("fadeOut") || 0, 0),
                    y.stop().fadeTo(I.get("fadeOut") || 0, 0, function () {
                        y.hide(),
                            C.hide(),
                            D(se),
                            T.remove(),
                            setTimeout(function () {
                                (X = !1), D(oe), I.get("onClosed");
                            }, 1);
                    }));
            }),
            (Z.remove = function () {
                y &&
                (y.stop(),
                    c[J].close(),
                    y.stop(!1, !0).remove(),
                    C.remove(),
                    (X = !1),
                    (y = null),
                    c("." + te)
                        .removeData(J)
                        .removeClass(te),
                    c(i)
                        .unbind("click." + ee)
                        .unbind("keydown." + ee));
            }),
            (Z.element = function () {
                return c(I.el);
            }),
            (Z.settings = Q));
    })(jQuery, document, window),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(((e = "undefined" != typeof globalThis ? globalThis : e || self).marked = {}));
    })(this, function (r) {
        "use strict";
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1), (a.configurable = !0), "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
            }
        }
        function o(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, a = new Array(t); n < t; n++) a[n] = e[n];
            return a;
        }
        function x(e, t) {
            var n,
                a = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
            if (a) return (a = a.call(e)).next.bind(a);
            if (
                Array.isArray(e) ||
                (a = (function (e) {
                    if (e) {
                        if ("string" == typeof e) return o(e, void 0);
                        var t = Object.prototype.toString.call(e).slice(8, -1);
                        return "Map" === (t = "Object" === t && e.constructor ? e.constructor.name : t) || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? o(e, void 0) : void 0;
                    }
                })(e)) ||
                (t && e && "number" == typeof e.length)
            )
                return (
                    a && (e = a),
                        (n = 0),
                        function () {
                            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
                        }
                );
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function e() {
            return {
                baseUrl: null,
                breaks: !1,
                extensions: null,
                gfm: !0,
                headerIds: !0,
                headerPrefix: "",
                highlight: null,
                langPrefix: "language-",
                mangle: !0,
                pedantic: !1,
                renderer: null,
                sanitize: !1,
                sanitizer: null,
                silent: !1,
                smartLists: !1,
                smartypants: !1,
                tokenizer: null,
                walkTokens: null,
                xhtml: !1,
            };
        }
        function n(e) {
            return t[e];
        }
        r.defaults = e();
        var a = /[&<>"']/,
            s = /[&<>"']/g,
            l = /[<>"']|&(?!#?\w+;)/,
            u = /[<>"']|&(?!#?\w+;)/g,
            t = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        function c(e, t) {
            if (t) {
                if (a.test(e)) return e.replace(s, n);
            } else if (l.test(e)) return e.replace(u, n);
            return e;
        }
        var d = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
        function w(e) {
            return e.replace(d, function (e, t) {
                return "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? ("x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1))) : "";
            });
        }
        var h = /(^|[^\[])\^/g;
        function p(n, e) {
            (n = "string" == typeof n ? n : n.source), (e = e || "");
            var a = {
                replace: function (e, t) {
                    return (t = (t = t.source || t).replace(h, "$1")), (n = n.replace(e, t)), a;
                },
                getRegex: function () {
                    return new RegExp(n, e);
                },
            };
            return a;
        }
        var f = /[^\w:]/g,
            m = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
        function g(e, t, n) {
            if (e) {
                try {
                    a = decodeURIComponent(w(n)).replace(f, "").toLowerCase();
                } catch (e) {
                    return null;
                }
                if (0 === a.indexOf("javascript:") || 0 === a.indexOf("vbscript:") || 0 === a.indexOf("data:")) return null;
            }
            var a;
            t &&
            !m.test(n) &&
            ((e = n),
            D[" " + (a = t)] || (v.test(a) ? (D[" " + a] = a + "/") : (D[" " + a] = F(a, "/", !0))),
                (t = -1 === (a = D[" " + a]).indexOf(":")),
                (n = "//" === e.substring(0, 2) ? (t ? e : a.replace(C, "$1") + e) : "/" === e.charAt(0) ? (t ? e : a.replace(y, "$1") + e) : a + e));
            try {
                n = encodeURI(n).replace(/%25/g, "%");
            } catch (e) {
                return null;
            }
            return n;
        }
        var D = {},
            v = /^[^:]+:\/*[^/]*$/,
            C = /^([^:]+:)[\s\S]*$/,
            y = /^([^:]+:\/*[^/]*)[\s\S]*$/,
            b = { exec: function () {} };
        function k(e) {
            for (var t, n, a = 1; a < arguments.length; a++) for (n in (t = arguments[a])) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
        }
        function E(e, t) {
            var n = e
                    .replace(/\|/g, function (e, t, n) {
                        for (var a = !1, r = t; 0 <= --r && "\\" === n[r]; ) a = !a;
                        return a ? "|" : " |";
                    })
                    .split(/ \|/),
                a = 0;
            if ((n[0].trim() || n.shift(), 0 < n.length && !n[n.length - 1].trim() && n.pop(), n.length > t)) n.splice(t);
            else for (; n.length < t; ) n.push("");
            for (; a < n.length; a++) n[a] = n[a].trim().replace(/\\\|/g, "|");
            return n;
        }
        function F(e, t, n) {
            var a = e.length;
            if (0 === a) return "";
            for (var r = 0; r < a; ) {
                var i = e.charAt(a - r - 1);
                if (i !== t || n) {
                    if (i === t || !n) break;
                    r++;
                } else r++;
            }
            return e.slice(0, a - r);
        }
        function A(e) {
            e &&
            e.sanitize &&
            !e.silent &&
            console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
        }
        function _(e, t) {
            if (t < 1) return "";
            for (var n = ""; 1 < t; ) 1 & t && (n += e), (t >>= 1), (e += e);
            return n + e;
        }
        function T(e, t, n, a) {
            var r = t.href,
                t = t.title ? c(t.title) : null,
                i = e[1].replace(/\\([\[\]])/g, "$1");
            return "!" !== e[0].charAt(0)
                ? ((a.state.inLink = !0), (e = { type: "link", raw: n, href: r, title: t, text: i, tokens: a.inlineTokens(i, []) }), (a.state.inLink = !1), e)
                : { type: "image", raw: n, href: r, title: t, text: c(i) };
        }
        var S =
                (((G = N.prototype).space = function (e) {
                    if ((e = this.rules.block.newline.exec(e)) && 0 < e[0].length) return { type: "space", raw: e[0] };
                }),
                    (G.code = function (e) {
                        var t;
                        if ((e = this.rules.block.code.exec(e))) return (t = e[0].replace(/^ {1,4}/gm, "")), { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? t : F(t, "\n") };
                    }),
                    (G.fences = function (e) {
                        var t, n;
                        if ((e = this.rules.block.fences.exec(e)))
                            return (
                                (n = (function (e, t) {
                                    if (null === (e = e.match(/^(\s+)(?:```)/))) return t;
                                    var n = e[1];
                                    return t
                                        .split("\n")
                                        .map(function (e) {
                                            var t = e.match(/^\s+/);
                                            return null !== t && t[0].length >= n.length ? e.slice(n.length) : e;
                                        })
                                        .join("\n");
                                })((t = e[0]), e[3] || "")),
                                    { type: "code", raw: t, lang: e[2] && e[2].trim(), text: n }
                            );
                    }),
                    (G.heading = function (e) {
                        var t, n;
                        if ((e = this.rules.block.heading.exec(e)))
                            return (
                                (t = e[2].trim()),
                                /#$/.test(t) && ((n = F(t, "#")), (!this.options.pedantic && n && !/ $/.test(n)) || (t = n.trim())),
                                    (n = { type: "heading", raw: e[0], depth: e[1].length, text: t, tokens: [] }),
                                    this.lexer.inline(n.text, n.tokens),
                                    n
                            );
                    }),
                    (G.hr = function (e) {
                        if ((e = this.rules.block.hr.exec(e))) return { type: "hr", raw: e[0] };
                    }),
                    (G.blockquote = function (e) {
                        var t;
                        if ((e = this.rules.block.blockquote.exec(e))) return (t = e[0].replace(/^ *>[ \t]?/gm, "")), { type: "blockquote", raw: e[0], tokens: this.lexer.blockTokens(t, []), text: t };
                    }),
                    (G.list = function (e) {
                        var t = this.rules.block.list.exec(e);
                        if (t) {
                            var n,
                                a,
                                r,
                                i,
                                o,
                                s,
                                l,
                                u,
                                c,
                                d,
                                h,
                                p = 1 < (m = t[1].trim()).length,
                                f = { type: "list", raw: "", ordered: p, start: p ? +m.slice(0, -1) : "", loose: !1, items: [] },
                                m = p ? "\\d{1,9}\\" + m.slice(-1) : "\\" + m;
                            this.options.pedantic && (m = p ? m : "[*+-]");
                            for (var g = new RegExp("^( {0,3}" + m + ")((?:[\t ][^\\n]*)?(?:\\n|$))"); e && ((h = !1), (t = g.exec(e))) && !this.rules.block.hr.test(e); ) {
                                if (
                                    ((n = t[0]),
                                        (e = e.substring(n.length)),
                                        (l = t[2].split("\n", 1)[0]),
                                        (u = e.split("\n", 1)[0]),
                                        this.options.pedantic ? ((i = 2), (d = l.trimLeft())) : ((i = t[2].search(/[^ ]/)), (d = l.slice((i = 4 < i ? 1 : i))), (i += t[1].length)),
                                        (o = !1),
                                    !l && /^ *$/.test(u) && ((n += u + "\n"), (e = e.substring(u.length + 1)), (h = !0)),
                                        !h)
                                )
                                    for (
                                        var D = new RegExp("^ {0," + Math.min(3, i - 1) + "}(?:[*+-]|\\d{1,9}[.)])");
                                        e && ((l = c = e.split("\n", 1)[0]), this.options.pedantic && (l = l.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), !D.test(l));

                                    ) {
                                        if (l.search(/[^ ]/) >= i || !l.trim()) d += "\n" + l.slice(i);
                                        else {
                                            if (o) break;
                                            d += "\n" + l;
                                        }
                                        o || l.trim() || (o = !0), (n += c + "\n"), (e = e.substring(c.length + 1));
                                    }
                                f.loose || (s ? (f.loose = !0) : /\n *\n *$/.test(n) && (s = !0)),
                                this.options.gfm && (a = /^\[[ xX]\] /.exec(d)) && ((r = "[ ] " !== a[0]), (d = d.replace(/^\[[ xX]\] +/, ""))),
                                    f.items.push({ type: "list_item", raw: n, task: !!a, checked: r, loose: !1, text: d }),
                                    (f.raw += n);
                            }
                            (f.items[f.items.length - 1].raw = n.trimRight()), (f.items[f.items.length - 1].text = d.trimRight()), (f.raw = f.raw.trimRight());
                            for (var v = f.items.length, C = 0; C < v; C++) {
                                (this.lexer.state.top = !1), (f.items[C].tokens = this.lexer.blockTokens(f.items[C].text, []));
                                var y = f.items[C].tokens.filter(function (e) {
                                        return "space" === e.type;
                                    }),
                                    b = y.every(function (e) {
                                        for (var t, n = 0, a = x(e.raw.split("")); !(t = a()).done; ) if (("\n" === t.value && (n += 1), 1 < n)) return !0;
                                        return !1;
                                    });
                                !f.loose && y.length && b && ((f.loose = !0), (f.items[C].loose = !0));
                            }
                            return f;
                        }
                    }),
                    (G.html = function (e) {
                        var t;
                        if ((e = this.rules.block.html.exec(e)))
                            return (
                                (t = { type: "html", raw: e[0], pre: !this.options.sanitizer && ("pre" === e[1] || "script" === e[1] || "style" === e[1]), text: e[0] }),
                                this.options.sanitize && ((t.type = "paragraph"), (t.text = this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0])), (t.tokens = []), this.lexer.inline(t.text, t.tokens)),
                                    t
                            );
                    }),
                    (G.def = function (e) {
                        if ((e = this.rules.block.def.exec(e))) return e[3] && (e[3] = e[3].substring(1, e[3].length - 1)), { type: "def", tag: e[1].toLowerCase().replace(/\s+/g, " "), raw: e[0], href: e[2], title: e[3] };
                    }),
                    (G.table = function (e) {
                        if ((e = this.rules.block.table.exec(e))) {
                            var t = {
                                type: "table",
                                header: E(e[1]).map(function (e) {
                                    return { text: e };
                                }),
                                align: e[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                                rows: e[3] && e[3].trim() ? e[3].replace(/\n[ \t]*$/, "").split("\n") : [],
                            };
                            if (t.header.length === t.align.length) {
                                t.raw = e[0];
                                for (var n, a, r, i = t.align.length, o = 0; o < i; o++)
                                    /^ *-+: *$/.test(t.align[o]) ? (t.align[o] = "right") : /^ *:-+: *$/.test(t.align[o]) ? (t.align[o] = "center") : /^ *:-+ *$/.test(t.align[o]) ? (t.align[o] = "left") : (t.align[o] = null);
                                for (i = t.rows.length, o = 0; o < i; o++)
                                    t.rows[o] = E(t.rows[o], t.header.length).map(function (e) {
                                        return { text: e };
                                    });
                                for (i = t.header.length, n = 0; n < i; n++) (t.header[n].tokens = []), this.lexer.inlineTokens(t.header[n].text, t.header[n].tokens);
                                for (i = t.rows.length, n = 0; n < i; n++) for (r = t.rows[n], a = 0; a < r.length; a++) (r[a].tokens = []), this.lexer.inlineTokens(r[a].text, r[a].tokens);
                                return t;
                            }
                        }
                    }),
                    (G.lheading = function (e) {
                        if ((e = this.rules.block.lheading.exec(e))) return (e = { type: "heading", raw: e[0], depth: "=" === e[2].charAt(0) ? 1 : 2, text: e[1], tokens: [] }), this.lexer.inline(e.text, e.tokens), e;
                    }),
                    (G.paragraph = function (e) {
                        if ((e = this.rules.block.paragraph.exec(e))) return (e = { type: "paragraph", raw: e[0], text: "\n" === e[1].charAt(e[1].length - 1) ? e[1].slice(0, -1) : e[1], tokens: [] }), this.lexer.inline(e.text, e.tokens), e;
                    }),
                    (G.text = function (e) {
                        if ((e = this.rules.block.text.exec(e))) return (e = { type: "text", raw: e[0], text: e[0], tokens: [] }), this.lexer.inline(e.text, e.tokens), e;
                    }),
                    (G.escape = function (e) {
                        if ((e = this.rules.inline.escape.exec(e))) return { type: "escape", raw: e[0], text: c(e[1]) };
                    }),
                    (G.tag = function (e) {
                        if ((e = this.rules.inline.tag.exec(e)))
                            return (
                                !this.lexer.state.inLink && /^<a /i.test(e[0]) ? (this.lexer.state.inLink = !0) : this.lexer.state.inLink && /^<\/a>/i.test(e[0]) && (this.lexer.state.inLink = !1),
                                    !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0])
                                        ? (this.lexer.state.inRawBlock = !0)
                                        : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) && (this.lexer.state.inRawBlock = !1),
                                    {
                                        type: this.options.sanitize ? "text" : "html",
                                        raw: e[0],
                                        inLink: this.lexer.state.inLink,
                                        inRawBlock: this.lexer.state.inRawBlock,
                                        text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0])) : e[0],
                                    }
                            );
                    }),
                    (G.link = function (e) {
                        if ((e = this.rules.inline.link.exec(e))) {
                            var t = e[2].trim();
                            if (!this.options.pedantic && /^</.test(t)) {
                                if (!/>$/.test(t)) return;
                                var n = F(t.slice(0, -1), "\\");
                                if ((t.length - n.length) % 2 == 0) return;
                            } else
                                -1 <
                                (n = (function (e) {
                                    if (-1 === e.indexOf("()"[1])) return -1;
                                    for (var t = e.length, n = 0, a = 0; a < t; a++)
                                        if ("\\" === e[a]) a++;
                                        else if (e[a] === "()"[0]) n++;
                                        else if (e[a] === "()"[1] && --n < 0) return a;
                                    return -1;
                                })(e[2])) && ((r = (0 === e[0].indexOf("!") ? 5 : 4) + e[1].length + n), (e[2] = e[2].substring(0, n)), (e[0] = e[0].substring(0, r).trim()), (e[3] = ""));
                            var a,
                                n = e[2],
                                r = "";
                            return (
                                this.options.pedantic ? (a = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n)) && ((n = a[1]), (r = a[3])) : (r = e[3] ? e[3].slice(1, -1) : ""),
                                    (n = n.trim()),
                                    T(
                                        e,
                                        {
                                            href: (n = /^</.test(n) ? (this.options.pedantic && !/>$/.test(t) ? n.slice(1) : n.slice(1, -1)) : n) && n.replace(this.rules.inline._escapes, "$1"),
                                            title: r && r.replace(this.rules.inline._escapes, "$1"),
                                        },
                                        e[0],
                                        this.lexer
                                    )
                            );
                        }
                    }),
                    (G.reflink = function (e, t) {
                        var n;
                        if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e)))
                            return (e = t[(e = (n[2] || n[1]).replace(/\s+/g, " ")).toLowerCase()]) && e.href ? T(n, e, n[0], this.lexer) : { type: "text", raw: (t = n[0].charAt(0)), text: t };
                    }),
                    (G.emStrong = function (e, t, n) {
                        void 0 === n && (n = "");
                        var a = this.rules.inline.emStrong.lDelim.exec(e);
                        if (
                            a &&
                            (!a[3] ||
                                !n.match(
                                    /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/
                                )) &&
                            (!(a[1] || a[2] || "") || "" === n || this.rules.inline.punctuation.exec(n))
                        ) {
                            var r = a[0].length - 1,
                                i = r,
                                o = 0,
                                s = "*" === a[0][0] ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
                            for (s.lastIndex = 0, t = t.slice(-1 * e.length + r); null != (a = s.exec(t)); )
                                if ((l = a[1] || a[2] || a[3] || a[4] || a[5] || a[6]))
                                    if (((l = l.length), a[3] || a[4])) i += l;
                                    else if ((a[5] || a[6]) && r % 3 && !((r + l) % 3)) o += l;
                                    else if (!(0 < (i -= l))) {
                                        var l = Math.min(l, l + i + o);
                                        if (Math.min(r, l) % 2) return (u = e.slice(1, r + a.index + l)), { type: "em", raw: e.slice(0, r + a.index + l + 1), text: u, tokens: this.lexer.inlineTokens(u, []) };
                                        var u = e.slice(2, r + a.index + l - 1);
                                        return { type: "strong", raw: e.slice(0, r + a.index + l + 1), text: u, tokens: this.lexer.inlineTokens(u, []) };
                                    }
                        }
                    }),
                    (G.codespan = function (e) {
                        var t, n, a;
                        if ((e = this.rules.inline.code.exec(e)))
                            return (a = e[2].replace(/\n/g, " ")), (t = /[^ ]/.test(a)), (n = /^ /.test(a) && / $/.test(a)), (a = c((a = t && n ? a.substring(1, a.length - 1) : a), !0)), { type: "codespan", raw: e[0], text: a };
                    }),
                    (G.br = function (e) {
                        if ((e = this.rules.inline.br.exec(e))) return { type: "br", raw: e[0] };
                    }),
                    (G.del = function (e) {
                        if ((e = this.rules.inline.del.exec(e))) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2], []) };
                    }),
                    (G.autolink = function (e, t) {
                        var n;
                        if ((e = this.rules.inline.autolink.exec(e)))
                            return (t = "@" === e[2] ? "mailto:" + (n = c(this.options.mangle ? t(e[1]) : e[1])) : (n = c(e[1]))), { type: "link", raw: e[0], text: n, href: t, tokens: [{ type: "text", raw: n, text: n }] };
                    }),
                    (G.url = function (e, t) {
                        var n, a, r, i;
                        if ((n = this.rules.inline.url.exec(e))) {
                            if ("@" === n[2]) r = "mailto:" + (a = c(this.options.mangle ? t(n[0]) : n[0]));
                            else {
                                for (; (i = n[0]), (n[0] = this.rules.inline._backpedal.exec(n[0])[0]), i !== n[0]; );
                                (a = c(n[0])), (r = "www." === n[1] ? "http://" + a : a);
                            }
                            return { type: "link", raw: n[0], text: a, href: r, tokens: [{ type: "text", raw: a, text: a }] };
                        }
                    }),
                    (G.inlineText = function (e, t) {
                        if ((e = this.rules.inline.text.exec(e)))
                            return (
                                (t = this.lexer.state.inRawBlock ? (this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(e[0]) : c(e[0])) : e[0]) : c(this.options.smartypants ? t(e[0]) : e[0])),
                                    { type: "text", raw: e[0], text: t }
                            );
                    }),
                    N),
            B = {
                newline: /^(?: *(?:\n|$))+/,
                code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
                fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
                hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
                heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
                blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
                list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
                html:
                    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
                def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
                table: b,
                lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
                _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
                text: /^[^\n]+/,
                _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
                _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
            },
            M =
                ((B.def = p(B.def).replace("label", B._label).replace("title", B._title).getRegex()),
                    (B.bullet = /(?:[*+-]|\d{1,9}[.)])/),
                    (B.listItemStart = p(/^( *)(bull) */)
                        .replace("bull", B.bullet)
                        .getRegex()),
                    (B.list = p(B.list)
                        .replace(/bull/g, B.bullet)
                        .replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))")
                        .replace("def", "\\n+(?=" + B.def.source + ")")
                        .getRegex()),
                    (B._tag =
                        "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
                    (B._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
                    (B.html = p(B.html, "i")
                        .replace("comment", B._comment)
                        .replace("tag", B._tag)
                        .replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
                        .getRegex()),
                    (B.paragraph = p(B._paragraph)
                        .replace("hr", B.hr)
                        .replace("heading", " {0,3}#{1,6} ")
                        .replace("|lheading", "")
                        .replace("|table", "")
                        .replace("blockquote", " {0,3}>")
                        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
                        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                        .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
                        .replace("tag", B._tag)
                        .getRegex()),
                    (B.blockquote = p(B.blockquote).replace("paragraph", B.paragraph).getRegex()),
                    (B.normal = k({}, B)),
                    (B.gfm = k({}, B.normal, { table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)" })),
                    (B.gfm.table = p(B.gfm.table)
                        .replace("hr", B.hr)
                        .replace("heading", " {0,3}#{1,6} ")
                        .replace("blockquote", " {0,3}>")
                        .replace("code", " {4}[^\\n]")
                        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
                        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                        .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
                        .replace("tag", B._tag)
                        .getRegex()),
                    (B.gfm.paragraph = p(B._paragraph)
                        .replace("hr", B.hr)
                        .replace("heading", " {0,3}#{1,6} ")
                        .replace("|lheading", "")
                        .replace("table", B.gfm.table)
                        .replace("blockquote", " {0,3}>")
                        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
                        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                        .replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)")
                        .replace("tag", B._tag)
                        .getRegex()),
                    (B.pedantic = k({}, B.normal, {
                        html: p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))")
                            .replace("comment", B._comment)
                            .replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b")
                            .getRegex(),
                        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                        heading: /^(#{1,6})(.*)(?:\n+|$)/,
                        fences: b,
                        paragraph: p(B.normal._paragraph)
                            .replace("hr", B.hr)
                            .replace("heading", " *#{1,6} *[^\n]")
                            .replace("lheading", B.lheading)
                            .replace("blockquote", " {0,3}>")
                            .replace("|fences", "")
                            .replace("|list", "")
                            .replace("|html", "")
                            .getRegex(),
                    })),
                    {
                        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
                        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
                        url: b,
                        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
                        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
                        reflink: /^!?\[(label)\]\[(ref)\]/,
                        nolink: /^!?\[(ref)\](?:\[\])?/,
                        reflinkSearch: "reflink|nolink(?!\\()",
                        emStrong: {
                            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
                            rDelimAst: /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
                            rDelimUnd: /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
                        },
                        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
                        br: /^( {2,}|\\)\n(?!\s*$)/,
                        del: b,
                        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
                        punctuation: /^([\spunctuation])/,
                    });
        function N(e) {
            this.options = e || r.defaults;
        }
        function O(e) {
            return e
                .replace(/---/g, "—")
                .replace(/--/g, "–")
                .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
                .replace(/'/g, "’")
                .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
                .replace(/"/g, "”")
                .replace(/\.{3}/g, "…");
        }
        function L(e) {
            for (var t, n = "", a = e.length, r = 0; r < a; r++) (t = e.charCodeAt(r)), (n += "&#" + (t = 0.5 < Math.random() ? "x" + t.toString(16) : t) + ";");
            return n;
        }
        (M._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
            (M.punctuation = p(M.punctuation)
                .replace(/punctuation/g, M._punctuation)
                .getRegex()),
            (M.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
            (M.escapedEmSt = /\\\*|\\_/g),
            (M._comment = p(B._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
            (M.emStrong.lDelim = p(M.emStrong.lDelim).replace(/punct/g, M._punctuation).getRegex()),
            (M.emStrong.rDelimAst = p(M.emStrong.rDelimAst, "g").replace(/punct/g, M._punctuation).getRegex()),
            (M.emStrong.rDelimUnd = p(M.emStrong.rDelimUnd, "g").replace(/punct/g, M._punctuation).getRegex()),
            (M._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
            (M._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
            (M._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
            (M.autolink = p(M.autolink).replace("scheme", M._scheme).replace("email", M._email).getRegex()),
            (M._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
            (M.tag = p(M.tag).replace("comment", M._comment).replace("attribute", M._attribute).getRegex()),
            (M._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
            (M._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
            (M._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
            (M.link = p(M.link).replace("label", M._label).replace("href", M._href).replace("title", M._title).getRegex()),
            (M.reflink = p(M.reflink).replace("label", M._label).replace("ref", B._label).getRegex()),
            (M.nolink = p(M.nolink).replace("ref", B._label).getRegex()),
            (M.reflinkSearch = p(M.reflinkSearch, "g").replace("reflink", M.reflink).replace("nolink", M.nolink).getRegex()),
            (M.normal = k({}, M)),
            (M.pedantic = k({}, M.normal, {
                strong: { start: /^__|\*\*/, middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, endAst: /\*\*(?!\*)/g, endUnd: /__(?!_)/g },
                em: { start: /^_|\*/, middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/, endAst: /\*(?!\*)/g, endUnd: /_(?!_)/g },
                link: p(/^!?\[(label)\]\((.*?)\)/)
                    .replace("label", M._label)
                    .getRegex(),
                reflink: p(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                    .replace("label", M._label)
                    .getRegex(),
            })),
            (M.gfm = k({}, M.normal, {
                escape: p(M.escape).replace("])", "~|])").getRegex(),
                _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
                del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
                text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
            })),
            (M.gfm.url = p(M.gfm.url, "i").replace("email", M.gfm._extended_email).getRegex()),
            (M.breaks = k({}, M.gfm, {
                br: p(M.br).replace("{2,}", "*").getRegex(),
                text: p(M.gfm.text)
                    .replace("\\b_", "\\b_| {2,}\\n")
                    .replace(/\{2,\}/g, "*")
                    .getRegex(),
            }));
        var R = (function () {
                function n(e) {
                    (this.tokens = []),
                        (this.tokens.links = Object.create(null)),
                        (this.options = e || r.defaults),
                        (this.options.tokenizer = this.options.tokenizer || new S()),
                        (this.tokenizer = this.options.tokenizer),
                        (this.tokenizer.options = this.options),
                        ((this.tokenizer.lexer = this).inlineQueue = []),
                        (this.state = { inLink: !1, inRawBlock: !1, top: !0 }),
                        (e = { block: B.normal, inline: M.normal }),
                        this.options.pedantic ? ((e.block = B.pedantic), (e.inline = M.pedantic)) : this.options.gfm && ((e.block = B.gfm), this.options.breaks ? (e.inline = M.breaks) : (e.inline = M.gfm)),
                        (this.tokenizer.rules = e);
                }
                (n.lex = function (e, t) {
                    return new n(t).lex(e);
                }),
                    (n.lexInline = function (e, t) {
                        return new n(t).inlineTokens(e);
                    });
                var e,
                    t,
                    a = n.prototype;
                return (
                    (a.lex = function (e) {
                        var t;
                        for (e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens); (t = this.inlineQueue.shift()); ) this.inlineTokens(t.src, t.tokens);
                        return this.tokens;
                    }),
                        (a.blockTokens = function (r, t) {
                            var n,
                                e,
                                i,
                                a,
                                o = this;
                            for (
                                void 0 === t && (t = []),
                                    r = this.options.pedantic
                                        ? r.replace(/\t/g, "    ").replace(/^ +$/gm, "")
                                        : r.replace(/^( *)(\t+)/gm, function (e, t, n) {
                                            return t + "    ".repeat(n.length);
                                        });
                                r;

                            )
                                if (
                                    !(
                                        this.options.extensions &&
                                        this.options.extensions.block &&
                                        this.options.extensions.block.some(function (e) {
                                            return !!(n = e.call({ lexer: o }, r, t)) && ((r = r.substring(n.raw.length)), t.push(n), !0);
                                        })
                                    )
                                )
                                    if ((n = this.tokenizer.space(r))) (r = r.substring(n.raw.length)), 1 === n.raw.length && 0 < t.length ? (t[t.length - 1].raw += "\n") : t.push(n);
                                    else if ((n = this.tokenizer.code(r)))
                                        (r = r.substring(n.raw.length)),
                                            !(e = t[t.length - 1]) || ("paragraph" !== e.type && "text" !== e.type)
                                                ? t.push(n)
                                                : ((e.raw += "\n" + n.raw), (e.text += "\n" + n.text), (this.inlineQueue[this.inlineQueue.length - 1].src = e.text));
                                    else if ((n = this.tokenizer.fences(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.heading(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.hr(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.blockquote(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.list(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.html(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.def(r)))
                                        (r = r.substring(n.raw.length)),
                                            !(e = t[t.length - 1]) || ("paragraph" !== e.type && "text" !== e.type)
                                                ? this.tokens.links[n.tag] || (this.tokens.links[n.tag] = { href: n.href, title: n.title })
                                                : ((e.raw += "\n" + n.raw), (e.text += "\n" + n.raw), (this.inlineQueue[this.inlineQueue.length - 1].src = e.text));
                                    else if ((n = this.tokenizer.table(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.lheading(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if (
                                        ((i = r),
                                        this.options.extensions &&
                                        this.options.extensions.startBlock &&
                                        (function () {
                                            var t,
                                                n = 1 / 0,
                                                a = r.slice(1);
                                            o.options.extensions.startBlock.forEach(function (e) {
                                                "number" == typeof (t = e.call({ lexer: this }, a)) && 0 <= t && (n = Math.min(n, t));
                                            }),
                                            n < 1 / 0 && 0 <= n && (i = r.substring(0, n + 1));
                                        })(),
                                        this.state.top && (n = this.tokenizer.paragraph(i)))
                                    )
                                        (e = t[t.length - 1]),
                                            a && "paragraph" === e.type ? ((e.raw += "\n" + n.raw), (e.text += "\n" + n.text), this.inlineQueue.pop(), (this.inlineQueue[this.inlineQueue.length - 1].src = e.text)) : t.push(n),
                                            (a = i.length !== r.length),
                                            (r = r.substring(n.raw.length));
                                    else if ((n = this.tokenizer.text(r)))
                                        (r = r.substring(n.raw.length)),
                                            (e = t[t.length - 1]) && "text" === e.type ? ((e.raw += "\n" + n.raw), (e.text += "\n" + n.text), this.inlineQueue.pop(), (this.inlineQueue[this.inlineQueue.length - 1].src = e.text)) : t.push(n);
                                    else if (r) {
                                        var s = "Infinite loop on byte: " + r.charCodeAt(0);
                                        if (this.options.silent) {
                                            console.error(s);
                                            break;
                                        }
                                        throw new Error(s);
                                    }
                            return (this.state.top = !0), t;
                        }),
                        (a.inline = function (e, t) {
                            this.inlineQueue.push({ src: e, tokens: t });
                        }),
                        (a.inlineTokens = function (r, t) {
                            var n,
                                e,
                                i,
                                a,
                                o,
                                s,
                                l = this,
                                u = (void 0 === t && (t = []), r);
                            if (this.tokens.links) {
                                var c = Object.keys(this.tokens.links);
                                if (0 < c.length)
                                    for (; null != (a = this.tokenizer.rules.inline.reflinkSearch.exec(u)); )
                                        c.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (u = u.slice(0, a.index) + "[" + _("a", a[0].length - 2) + "]" + u.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
                            }
                            for (; null != (a = this.tokenizer.rules.inline.blockSkip.exec(u)); ) u = u.slice(0, a.index) + "[" + _("a", a[0].length - 2) + "]" + u.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                            for (; null != (a = this.tokenizer.rules.inline.escapedEmSt.exec(u)); ) u = u.slice(0, a.index) + "++" + u.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
                            for (; r; )
                                if (
                                    (o || (s = ""),
                                        (o = !1),
                                        !(
                                            this.options.extensions &&
                                            this.options.extensions.inline &&
                                            this.options.extensions.inline.some(function (e) {
                                                return !!(n = e.call({ lexer: l }, r, t)) && ((r = r.substring(n.raw.length)), t.push(n), !0);
                                            })
                                        ))
                                )
                                    if ((n = this.tokenizer.escape(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.tag(r))) (r = r.substring(n.raw.length)), (e = t[t.length - 1]) && "text" === n.type && "text" === e.type ? ((e.raw += n.raw), (e.text += n.text)) : t.push(n);
                                    else if ((n = this.tokenizer.link(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.reflink(r, this.tokens.links)))
                                        (r = r.substring(n.raw.length)), (e = t[t.length - 1]) && "text" === n.type && "text" === e.type ? ((e.raw += n.raw), (e.text += n.text)) : t.push(n);
                                    else if ((n = this.tokenizer.emStrong(r, u, s))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.codespan(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.br(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.del(r))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if ((n = this.tokenizer.autolink(r, L))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if (!this.state.inLink && (n = this.tokenizer.url(r, L))) (r = r.substring(n.raw.length)), t.push(n);
                                    else if (
                                        ((i = r),
                                        this.options.extensions &&
                                        this.options.extensions.startInline &&
                                        (function () {
                                            var t,
                                                n = 1 / 0,
                                                a = r.slice(1);
                                            l.options.extensions.startInline.forEach(function (e) {
                                                "number" == typeof (t = e.call({ lexer: this }, a)) && 0 <= t && (n = Math.min(n, t));
                                            }),
                                            n < 1 / 0 && 0 <= n && (i = r.substring(0, n + 1));
                                        })(),
                                            (n = this.tokenizer.inlineText(i, O)))
                                    )
                                        (r = r.substring(n.raw.length)), "_" !== n.raw.slice(-1) && (s = n.raw.slice(-1)), (o = !0), (e = t[t.length - 1]) && "text" === e.type ? ((e.raw += n.raw), (e.text += n.text)) : t.push(n);
                                    else if (r) {
                                        var d = "Infinite loop on byte: " + r.charCodeAt(0);
                                        if (this.options.silent) {
                                            console.error(d);
                                            break;
                                        }
                                        throw new Error(d);
                                    }
                            return t;
                        }),
                        (a = n),
                        (t = [
                            {
                                key: "rules",
                                get: function () {
                                    return { block: B, inline: M };
                                },
                            },
                        ]),
                    (e = null) && i(a.prototype, e),
                        i(a, t),
                        Object.defineProperty(a, "prototype", { writable: !1 }),
                        n
                );
            })(),
            $ =
                (((Z = P.prototype).code = function (e, t, n) {
                    var a,
                        t = (t || "").match(/\S*/)[0];
                    return (
                        this.options.highlight && null != (a = this.options.highlight(e, t)) && a !== e && ((n = !0), (e = a)),
                            (e = e.replace(/\n$/, "") + "\n"),
                            t ? '<pre><code class="' + this.options.langPrefix + c(t, !0) + '">' + (n ? e : c(e, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? e : c(e, !0)) + "</code></pre>\n"
                    );
                }),
                    (Z.blockquote = function (e) {
                        return "<blockquote>\n" + e + "</blockquote>\n";
                    }),
                    (Z.html = function (e) {
                        return e;
                    }),
                    (Z.heading = function (e, t, n, a) {
                        return this.options.headerIds ? "<h" + t + ' id="' + (this.options.headerPrefix + a.slug(n)) + '">' + e + "</h" + t + ">\n" : "<h" + t + ">" + e + "</h" + t + ">\n";
                    }),
                    (Z.hr = function () {
                        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
                    }),
                    (Z.list = function (e, t, n) {
                        var a = t ? "ol" : "ul";
                        return "<" + a + (t && 1 !== n ? ' start="' + n + '"' : "") + ">\n" + e + "</" + a + ">\n";
                    }),
                    (Z.listitem = function (e) {
                        return "<li>" + e + "</li>\n";
                    }),
                    (Z.checkbox = function (e) {
                        return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
                    }),
                    (Z.paragraph = function (e) {
                        return "<p>" + e + "</p>\n";
                    }),
                    (Z.table = function (e, t) {
                        return "<table>\n<thead>\n" + e + "</thead>\n" + (t && "<tbody>" + t + "</tbody>") + "</table>\n";
                    }),
                    (Z.tablerow = function (e) {
                        return "<tr>\n" + e + "</tr>\n";
                    }),
                    (Z.tablecell = function (e, t) {
                        var n = t.header ? "th" : "td";
                        return (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") + e + "</" + n + ">\n";
                    }),
                    (Z.strong = function (e) {
                        return "<strong>" + e + "</strong>";
                    }),
                    (Z.em = function (e) {
                        return "<em>" + e + "</em>";
                    }),
                    (Z.codespan = function (e) {
                        return "<code>" + e + "</code>";
                    }),
                    (Z.br = function () {
                        return this.options.xhtml ? "<br/>" : "<br>";
                    }),
                    (Z.del = function (e) {
                        return "<del>" + e + "</del>";
                    }),
                    (Z.link = function (e, t, n) {
                        return null === (e = g(this.options.sanitize, this.options.baseUrl, e)) ? n : ((e = '<a href="' + c(e) + '"'), t && (e += ' title="' + t + '"'), e + ">" + n + "</a>");
                    }),
                    (Z.image = function (e, t, n) {
                        return null === (e = g(this.options.sanitize, this.options.baseUrl, e)) ? n : ((e = '<img src="' + e + '" alt="' + n + '"'), t && (e += ' title="' + t + '"'), e + (this.options.xhtml ? "/>" : ">"));
                    }),
                    (Z.text = function (e) {
                        return e;
                    }),
                    P),
            I =
                (((V = Y.prototype).strong = function (e) {
                    return e;
                }),
                    (V.em = function (e) {
                        return e;
                    }),
                    (V.codespan = function (e) {
                        return e;
                    }),
                    (V.del = function (e) {
                        return e;
                    }),
                    (V.html = function (e) {
                        return e;
                    }),
                    (V.text = function (e) {
                        return e;
                    }),
                    (V.link = function (e, t, n) {
                        return "" + n;
                    }),
                    (V.image = function (e, t, n) {
                        return "" + n;
                    }),
                    (V.br = function () {
                        return "";
                    }),
                    Y),
            z =
                (((K = j.prototype).serialize = function (e) {
                    return e
                        .toLowerCase()
                        .trim()
                        .replace(/<[!\/a-z].*?>/gi, "")
                        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "")
                        .replace(/\s/g, "-");
                }),
                    (K.getNextSafeSlug = function (e, t) {
                        var n = e,
                            a = 0;
                        if (this.seen.hasOwnProperty(n)) for (a = this.seen[e]; (n = e + "-" + ++a), this.seen.hasOwnProperty(n); );
                        return t || ((this.seen[e] = a), (this.seen[n] = 0)), n;
                    }),
                    (K.slug = function (e, t) {
                        return void 0 === t && (t = {}), (e = this.serialize(e)), this.getNextSafeSlug(e, t.dryrun);
                    }),
                    j),
            H = (function () {
                function n(e) {
                    (this.options = e || r.defaults),
                        (this.options.renderer = this.options.renderer || new $()),
                        (this.renderer = this.options.renderer),
                        (this.renderer.options = this.options),
                        (this.textRenderer = new I()),
                        (this.slugger = new z());
                }
                (n.parse = function (e, t) {
                    return new n(t).parse(e);
                }),
                    (n.parseInline = function (e, t) {
                        return new n(t).parseInline(e);
                    });
                var e = n.prototype;
                return (
                    (e.parse = function (e, t) {
                        void 0 === t && (t = !0);
                        for (var n, a, r, i, o, s, l, u, c, d, h, p, f, m, g, D, v = "", C = e.length, y = 0; y < C; y++)
                            if (
                                ((u = e[y]),
                                this.options.extensions &&
                                this.options.extensions.renderers &&
                                this.options.extensions.renderers[u.type] &&
                                (!1 !== (D = this.options.extensions.renderers[u.type].call({ parser: this }, u)) || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(u.type)))
                            )
                                v += D || "";
                            else
                                switch (u.type) {
                                    case "space":
                                        continue;
                                    case "hr":
                                        v += this.renderer.hr();
                                        continue;
                                    case "heading":
                                        v += this.renderer.heading(this.parseInline(u.tokens), u.depth, w(this.parseInline(u.tokens, this.textRenderer)), this.slugger);
                                        continue;
                                    case "code":
                                        v += this.renderer.code(u.text, u.lang, u.escaped);
                                        continue;
                                    case "table":
                                        for (s = c = "", r = u.header.length, n = 0; n < r; n++) s += this.renderer.tablecell(this.parseInline(u.header[n].tokens), { header: !0, align: u.align[n] });
                                        for (c += this.renderer.tablerow(s), l = "", r = u.rows.length, n = 0; n < r; n++) {
                                            for (s = "", i = (o = u.rows[n]).length, a = 0; a < i; a++) s += this.renderer.tablecell(this.parseInline(o[a].tokens), { header: !1, align: u.align[a] });
                                            l += this.renderer.tablerow(s);
                                        }
                                        v += this.renderer.table(c, l);
                                        continue;
                                    case "blockquote":
                                        (l = this.parse(u.tokens)), (v += this.renderer.blockquote(l));
                                        continue;
                                    case "list":
                                        for (c = u.ordered, b = u.start, d = u.loose, r = u.items.length, l = "", n = 0; n < r; n++)
                                            (f = (p = u.items[n]).checked),
                                                (m = p.task),
                                                (h = ""),
                                            p.task &&
                                            ((g = this.renderer.checkbox(f)),
                                                d
                                                    ? 0 < p.tokens.length && "paragraph" === p.tokens[0].type
                                                        ? ((p.tokens[0].text = g + " " + p.tokens[0].text),
                                                        p.tokens[0].tokens && 0 < p.tokens[0].tokens.length && "text" === p.tokens[0].tokens[0].type && (p.tokens[0].tokens[0].text = g + " " + p.tokens[0].tokens[0].text))
                                                        : p.tokens.unshift({ type: "text", text: g })
                                                    : (h += g)),
                                                (h += this.parse(p.tokens, d)),
                                                (l += this.renderer.listitem(h, m, f));
                                        v += this.renderer.list(l, c, b);
                                        continue;
                                    case "html":
                                        v += this.renderer.html(u.text);
                                        continue;
                                    case "paragraph":
                                        v += this.renderer.paragraph(this.parseInline(u.tokens));
                                        continue;
                                    case "text":
                                        for (l = u.tokens ? this.parseInline(u.tokens) : u.text; y + 1 < C && "text" === e[y + 1].type; ) l += "\n" + ((u = e[++y]).tokens ? this.parseInline(u.tokens) : u.text);
                                        v += t ? this.renderer.paragraph(l) : l;
                                        continue;
                                    default:
                                        var b = 'Token with "' + u.type + '" type was not found.';
                                        if (this.options.silent) return void console.error(b);
                                        throw new Error(b);
                                }
                        return v;
                    }),
                        (e.parseInline = function (e, t) {
                            t = t || this.renderer;
                            for (var n, a, r = "", i = e.length, o = 0; o < i; o++)
                                if (
                                    ((n = e[o]),
                                    this.options.extensions &&
                                    this.options.extensions.renderers &&
                                    this.options.extensions.renderers[n.type] &&
                                    (!1 !== (a = this.options.extensions.renderers[n.type].call({ parser: this }, n)) || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(n.type)))
                                )
                                    r += a || "";
                                else
                                    switch (n.type) {
                                        case "escape":
                                            r += t.text(n.text);
                                            break;
                                        case "html":
                                            r += t.html(n.text);
                                            break;
                                        case "link":
                                            r += t.link(n.href, n.title, this.parseInline(n.tokens, t));
                                            break;
                                        case "image":
                                            r += t.image(n.href, n.title, n.text);
                                            break;
                                        case "strong":
                                            r += t.strong(this.parseInline(n.tokens, t));
                                            break;
                                        case "em":
                                            r += t.em(this.parseInline(n.tokens, t));
                                            break;
                                        case "codespan":
                                            r += t.codespan(n.text);
                                            break;
                                        case "br":
                                            r += t.br();
                                            break;
                                        case "del":
                                            r += t.del(this.parseInline(n.tokens, t));
                                            break;
                                        case "text":
                                            r += t.text(n.text);
                                            break;
                                        default:
                                            var s = 'Token with "' + n.type + '" type was not found.';
                                            if (this.options.silent) return void console.error(s);
                                            throw new Error(s);
                                    }
                            return r;
                        }),
                        n
                );
            })();
        function j() {
            this.seen = {};
        }
        function Y() {}
        function P(e) {
            this.options = e || r.defaults;
        }
        function U(e, n, a) {
            if (null == e) throw new Error("marked(): input parameter is undefined or null");
            if ("string" != typeof e) throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
            if (("function" == typeof n && ((a = n), (n = null)), A((n = k({}, U.defaults, n || {}))), a)) {
                var r,
                    i = n.highlight;
                try {
                    r = R.lex(e, n);
                } catch (e) {
                    return a(e);
                }
                var o = function (e) {
                    var t;
                    if (!e)
                        try {
                            n.walkTokens && U.walkTokens(r, n.walkTokens), (t = H.parse(r, n));
                        } catch (t) {
                            e = t;
                        }
                    return (n.highlight = i), e ? a(e) : a(null, t);
                };
                if (!i || i.length < 3) return o();
                if ((delete n.highlight, !r.length)) return o();
                var s = 0;
                return (
                    U.walkTokens(r, function (n) {
                        "code" === n.type &&
                        (s++,
                            setTimeout(function () {
                                i(n.text, n.lang, function (e, t) {
                                    return e ? o(e) : (null != t && t !== n.text && ((n.text = t), (n.escaped = !0)), void (0 == --s && o()));
                                });
                            }, 0));
                    }),
                        void (0 === s && o())
                );
            }
            try {
                var t = R.lex(e, n);
                return n.walkTokens && U.walkTokens(t, n.walkTokens), H.parse(t, n);
            } catch (e) {
                if (((e.message += "\nPlease report this to https://github.com/markedjs/marked."), n.silent)) return "<p>An error occurred:</p><pre>" + c(e.message + "", !0) + "</pre>";
                throw e;
            }
        }
        (U.options = U.setOptions = function (e) {
            return k(U.defaults, e), (e = U.defaults), (r.defaults = e), U;
        }),
            (U.getDefaults = e),
            (U.defaults = r.defaults),
            (U.use = function () {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                var a,
                    r = k.apply(void 0, [{}].concat(t)),
                    u = U.defaults.extensions || { renderers: {}, childTokens: {} };
                t.forEach(function (o) {
                    if (
                        (o.extensions &&
                        ((a = !0),
                            o.extensions.forEach(function (r) {
                                if (!r.name) throw new Error("extension name required");
                                var i;
                                if (
                                    (r.renderer &&
                                    ((i = u.renderers ? u.renderers[r.name] : null),
                                        (u.renderers[r.name] = i
                                            ? function () {
                                                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                                var a = r.renderer.apply(this, t);
                                                return !1 === a ? i.apply(this, t) : a;
                                            }
                                            : r.renderer)),
                                        r.tokenizer)
                                ) {
                                    if (!r.level || ("block" !== r.level && "inline" !== r.level)) throw new Error("extension level must be 'block' or 'inline'");
                                    u[r.level] ? u[r.level].unshift(r.tokenizer) : (u[r.level] = [r.tokenizer]),
                                    r.start &&
                                    ("block" === r.level
                                        ? u.startBlock
                                            ? u.startBlock.push(r.start)
                                            : (u.startBlock = [r.start])
                                        : "inline" === r.level && (u.startInline ? u.startInline.push(r.start) : (u.startInline = [r.start])));
                                }
                                r.childTokens && (u.childTokens[r.name] = r.childTokens);
                            })),
                            o.renderer)
                    ) {
                        var e,
                            s = U.defaults.renderer || new $();
                        for (e in o.renderer)
                            !(function (r) {
                                var i = s[r];
                                s[r] = function () {
                                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                    var a = o.renderer[r].apply(s, t);
                                    return !1 === a ? i.apply(s, t) : a;
                                };
                            })(e);
                        r.renderer = s;
                    }
                    if (o.tokenizer) {
                        var t,
                            l = U.defaults.tokenizer || new S();
                        for (t in o.tokenizer)
                            !(function (r) {
                                var i = l[r];
                                l[r] = function () {
                                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                                    var a = o.tokenizer[r].apply(l, t);
                                    return !1 === a ? i.apply(l, t) : a;
                                };
                            })(t);
                        r.tokenizer = l;
                    }
                    var n;
                    o.walkTokens &&
                    ((n = U.defaults.walkTokens),
                        (r.walkTokens = function (e) {
                            o.walkTokens.call(this, e), n && n.call(this, e);
                        })),
                    a && (r.extensions = u),
                        U.setOptions(r);
                });
            }),
            (U.walkTokens = function (e, s) {
                for (var l, t = x(e); !(l = t()).done; )
                    !(function () {
                        var t = l.value;
                        switch ((s.call(U, t), t.type)) {
                            case "table":
                                for (var e = x(t.header); !(n = e()).done; ) {
                                    var n = n.value;
                                    U.walkTokens(n.tokens, s);
                                }
                                for (var a, r = x(t.rows); !(a = r()).done; )
                                    for (var i = x(a.value); !(o = i()).done; ) {
                                        var o = o.value;
                                        U.walkTokens(o.tokens, s);
                                    }
                                break;
                            case "list":
                                U.walkTokens(t.items, s);
                                break;
                            default:
                                U.defaults.extensions && U.defaults.extensions.childTokens && U.defaults.extensions.childTokens[t.type]
                                    ? U.defaults.extensions.childTokens[t.type].forEach(function (e) {
                                        U.walkTokens(t[e], s);
                                    })
                                    : t.tokens && U.walkTokens(t.tokens, s);
                        }
                    })();
            }),
            (U.parseInline = function (e, t) {
                if (null == e) throw new Error("marked.parseInline(): input parameter is undefined or null");
                if ("string" != typeof e) throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected");
                A((t = k({}, U.defaults, t || {})));
                try {
                    var n = R.lexInline(e, t);
                    return t.walkTokens && U.walkTokens(n, t.walkTokens), H.parseInline(n, t);
                } catch (e) {
                    if (((e.message += "\nPlease report this to https://github.com/markedjs/marked."), t.silent)) return "<p>An error occurred:</p><pre>" + c(e.message + "", !0) + "</pre>";
                    throw e;
                }
            }),
            (U.Parser = H),
            (U.parser = H.parse),
            (U.Renderer = $),
            (U.TextRenderer = I),
            (U.Lexer = R),
            (U.lexer = R.lex),
            (U.Tokenizer = S),
            (U.Slugger = z);
        var b = (U.parse = U).options,
            W = U.setOptions,
            q = U.use,
            X = U.walkTokens,
            G = U.parseInline,
            Z = U,
            V = H.parse,
            K = R.lex;
        (r.Lexer = R),
            (r.Parser = H),
            (r.Renderer = $),
            (r.Slugger = z),
            (r.TextRenderer = I),
            (r.Tokenizer = S),
            (r.getDefaults = e),
            (r.lexer = K),
            (r.marked = U),
            (r.options = b),
            (r.parse = Z),
            (r.parseInline = G),
            (r.parser = V),
            (r.setOptions = W),
            (r.use = q),
            (r.walkTokens = X),
            Object.defineProperty(r, "__esModule", { value: !0 });
    }),
    (function (e, t) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = e || self).DOMPurify = t());
    })(this, function () {
        "use strict";
        var a,
            r = Object.hasOwnProperty,
            i = Object.setPrototypeOf,
            o = Object.isFrozen,
            s = Object.getPrototypeOf,
            l = Object.getOwnPropertyDescriptor,
            Oe = Object.freeze,
            e = Object.seal,
            u = Object.create,
            t = "undefined" != typeof Reflect && Reflect,
            c =
                (c = t.apply) ||
                function (e, t, n) {
                    return e.apply(t, n);
                },
            Oe =
                Oe ||
                function (e) {
                    return e;
                },
            e =
                e ||
                function (e) {
                    return e;
                },
            d =
                (d = t.construct) ||
                function (e, t) {
                    return new (Function.prototype.bind.apply(
                        e,
                        [null].concat(
                            (function (e) {
                                if (Array.isArray(e)) {
                                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                    return n;
                                }
                                return Array.from(e);
                            })(t)
                        )
                    ))();
                },
            Le = h(Array.prototype.forEach),
            Re = h(Array.prototype.pop),
            $e = h(Array.prototype.push),
            Ie = h(String.prototype.toLowerCase),
            ze = h(String.prototype.match),
            He = h(String.prototype.replace),
            je = h(String.prototype.indexOf),
            Ye = h(String.prototype.trim),
            Pe = h(RegExp.prototype.test),
            Ue =
                ((a = TypeError),
                    function () {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                        return d(a, t);
                    });
        function h(r) {
            return function (e) {
                for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
                return c(r, e, n);
            };
        }
        function We(e, t) {
            i && i(e, null);
            for (var n = t.length; n--; ) {
                var a,
                    r = t[n];
                "string" != typeof r || ((a = Ie(r)) !== r && (o(t) || (t[n] = a), (r = a))), (e[r] = !0);
            }
            return e;
        }
        function qe(e) {
            var t = u(null),
                n = void 0;
            for (n in e) c(r, e, [n]) && (t[n] = e[n]);
            return t;
        }
        function Xe(e, t) {
            for (; null !== e; ) {
                var n = l(e, t);
                if (n) {
                    if (n.get) return h(n.get);
                    if ("function" == typeof n.value) return h(n.value);
                }
                e = s(e);
            }
            return function (e) {
                return console.warn("fallback value for", e), null;
            };
        }
        var Ge = Oe([
                "a",
                "abbr",
                "acronym",
                "address",
                "area",
                "article",
                "aside",
                "audio",
                "b",
                "bdi",
                "bdo",
                "big",
                "blink",
                "blockquote",
                "body",
                "br",
                "button",
                "canvas",
                "caption",
                "center",
                "cite",
                "code",
                "col",
                "colgroup",
                "content",
                "data",
                "datalist",
                "dd",
                "decorator",
                "del",
                "details",
                "dfn",
                "dialog",
                "dir",
                "div",
                "dl",
                "dt",
                "element",
                "em",
                "fieldset",
                "figcaption",
                "figure",
                "font",
                "footer",
                "form",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "head",
                "header",
                "hgroup",
                "hr",
                "html",
                "i",
                "img",
                "input",
                "ins",
                "kbd",
                "label",
                "legend",
                "li",
                "main",
                "map",
                "mark",
                "marquee",
                "menu",
                "menuitem",
                "meter",
                "nav",
                "nobr",
                "ol",
                "optgroup",
                "option",
                "output",
                "p",
                "picture",
                "pre",
                "progress",
                "q",
                "rp",
                "rt",
                "ruby",
                "s",
                "samp",
                "section",
                "select",
                "shadow",
                "small",
                "source",
                "spacer",
                "span",
                "strike",
                "strong",
                "style",
                "sub",
                "summary",
                "sup",
                "table",
                "tbody",
                "td",
                "template",
                "textarea",
                "tfoot",
                "th",
                "thead",
                "time",
                "tr",
                "track",
                "tt",
                "u",
                "ul",
                "var",
                "video",
                "wbr",
            ]),
            Ze = Oe([
                "svg",
                "a",
                "altglyph",
                "altglyphdef",
                "altglyphitem",
                "animatecolor",
                "animatemotion",
                "animatetransform",
                "circle",
                "clippath",
                "defs",
                "desc",
                "ellipse",
                "filter",
                "font",
                "g",
                "glyph",
                "glyphref",
                "hkern",
                "image",
                "line",
                "lineargradient",
                "marker",
                "mask",
                "metadata",
                "mpath",
                "path",
                "pattern",
                "polygon",
                "polyline",
                "radialgradient",
                "rect",
                "stop",
                "style",
                "switch",
                "symbol",
                "text",
                "textpath",
                "title",
                "tref",
                "tspan",
                "view",
                "vkern",
            ]),
            Ve = Oe([
                "feBlend",
                "feColorMatrix",
                "feComponentTransfer",
                "feComposite",
                "feConvolveMatrix",
                "feDiffuseLighting",
                "feDisplacementMap",
                "feDistantLight",
                "feFlood",
                "feFuncA",
                "feFuncB",
                "feFuncG",
                "feFuncR",
                "feGaussianBlur",
                "feImage",
                "feMerge",
                "feMergeNode",
                "feMorphology",
                "feOffset",
                "fePointLight",
                "feSpecularLighting",
                "feSpotLight",
                "feTile",
                "feTurbulence",
            ]),
            Ke = Oe([
                "animate",
                "color-profile",
                "cursor",
                "discard",
                "fedropshadow",
                "font-face",
                "font-face-format",
                "font-face-name",
                "font-face-src",
                "font-face-uri",
                "foreignobject",
                "hatch",
                "hatchpath",
                "mesh",
                "meshgradient",
                "meshpatch",
                "meshrow",
                "missing-glyph",
                "script",
                "set",
                "solidcolor",
                "unknown",
                "use",
            ]),
            Qe = Oe([
                "math",
                "menclose",
                "merror",
                "mfenced",
                "mfrac",
                "mglyph",
                "mi",
                "mlabeledtr",
                "mmultiscripts",
                "mn",
                "mo",
                "mover",
                "mpadded",
                "mphantom",
                "mroot",
                "mrow",
                "ms",
                "mspace",
                "msqrt",
                "mstyle",
                "msub",
                "msup",
                "msubsup",
                "mtable",
                "mtd",
                "mtext",
                "mtr",
                "munder",
                "munderover",
            ]),
            Je = Oe(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
            et = Oe(["#text"]),
            tt = Oe([
                "accept",
                "action",
                "align",
                "alt",
                "autocapitalize",
                "autocomplete",
                "autopictureinpicture",
                "autoplay",
                "background",
                "bgcolor",
                "border",
                "capture",
                "cellpadding",
                "cellspacing",
                "checked",
                "cite",
                "class",
                "clear",
                "color",
                "cols",
                "colspan",
                "controls",
                "controlslist",
                "coords",
                "crossorigin",
                "datetime",
                "decoding",
                "default",
                "dir",
                "disabled",
                "disablepictureinpicture",
                "disableremoteplayback",
                "download",
                "draggable",
                "enctype",
                "enterkeyhint",
                "face",
                "for",
                "headers",
                "height",
                "hidden",
                "high",
                "href",
                "hreflang",
                "id",
                "inputmode",
                "integrity",
                "ismap",
                "kind",
                "label",
                "lang",
                "list",
                "loading",
                "loop",
                "low",
                "max",
                "maxlength",
                "media",
                "method",
                "min",
                "minlength",
                "multiple",
                "muted",
                "name",
                "nonce",
                "noshade",
                "novalidate",
                "nowrap",
                "open",
                "optimum",
                "pattern",
                "placeholder",
                "playsinline",
                "poster",
                "preload",
                "pubdate",
                "radiogroup",
                "readonly",
                "rel",
                "required",
                "rev",
                "reversed",
                "role",
                "rows",
                "rowspan",
                "spellcheck",
                "scope",
                "selected",
                "shape",
                "size",
                "sizes",
                "span",
                "srclang",
                "start",
                "src",
                "srcset",
                "step",
                "style",
                "summary",
                "tabindex",
                "title",
                "translate",
                "type",
                "usemap",
                "valign",
                "value",
                "width",
                "xmlns",
                "slot",
            ]),
            nt = Oe([
                "accent-height",
                "accumulate",
                "additive",
                "alignment-baseline",
                "ascent",
                "attributename",
                "attributetype",
                "azimuth",
                "basefrequency",
                "baseline-shift",
                "begin",
                "bias",
                "by",
                "class",
                "clip",
                "clippathunits",
                "clip-path",
                "clip-rule",
                "color",
                "color-interpolation",
                "color-interpolation-filters",
                "color-profile",
                "color-rendering",
                "cx",
                "cy",
                "d",
                "dx",
                "dy",
                "diffuseconstant",
                "direction",
                "display",
                "divisor",
                "dur",
                "edgemode",
                "elevation",
                "end",
                "fill",
                "fill-opacity",
                "fill-rule",
                "filter",
                "filterunits",
                "flood-color",
                "flood-opacity",
                "font-family",
                "font-size",
                "font-size-adjust",
                "font-stretch",
                "font-style",
                "font-variant",
                "font-weight",
                "fx",
                "fy",
                "g1",
                "g2",
                "glyph-name",
                "glyphref",
                "gradientunits",
                "gradienttransform",
                "height",
                "href",
                "id",
                "image-rendering",
                "in",
                "in2",
                "k",
                "k1",
                "k2",
                "k3",
                "k4",
                "kerning",
                "keypoints",
                "keysplines",
                "keytimes",
                "lang",
                "lengthadjust",
                "letter-spacing",
                "kernelmatrix",
                "kernelunitlength",
                "lighting-color",
                "local",
                "marker-end",
                "marker-mid",
                "marker-start",
                "markerheight",
                "markerunits",
                "markerwidth",
                "maskcontentunits",
                "maskunits",
                "max",
                "mask",
                "media",
                "method",
                "mode",
                "min",
                "name",
                "numoctaves",
                "offset",
                "operator",
                "opacity",
                "order",
                "orient",
                "orientation",
                "origin",
                "overflow",
                "paint-order",
                "path",
                "pathlength",
                "patterncontentunits",
                "patterntransform",
                "patternunits",
                "points",
                "preservealpha",
                "preserveaspectratio",
                "primitiveunits",
                "r",
                "rx",
                "ry",
                "radius",
                "refx",
                "refy",
                "repeatcount",
                "repeatdur",
                "restart",
                "result",
                "rotate",
                "scale",
                "seed",
                "shape-rendering",
                "specularconstant",
                "specularexponent",
                "spreadmethod",
                "startoffset",
                "stddeviation",
                "stitchtiles",
                "stop-color",
                "stop-opacity",
                "stroke-dasharray",
                "stroke-dashoffset",
                "stroke-linecap",
                "stroke-linejoin",
                "stroke-miterlimit",
                "stroke-opacity",
                "stroke",
                "stroke-width",
                "style",
                "surfacescale",
                "systemlanguage",
                "tabindex",
                "targetx",
                "targety",
                "transform",
                "transform-origin",
                "text-anchor",
                "text-decoration",
                "text-rendering",
                "textlength",
                "type",
                "u1",
                "u2",
                "unicode",
                "values",
                "viewbox",
                "visibility",
                "version",
                "vert-adv-y",
                "vert-origin-x",
                "vert-origin-y",
                "width",
                "word-spacing",
                "wrap",
                "writing-mode",
                "xchannelselector",
                "ychannelselector",
                "x",
                "x1",
                "x2",
                "xmlns",
                "y",
                "y1",
                "y2",
                "z",
                "zoomandpan",
            ]),
            at = Oe([
                "accent",
                "accentunder",
                "align",
                "bevelled",
                "close",
                "columnsalign",
                "columnlines",
                "columnspan",
                "denomalign",
                "depth",
                "dir",
                "display",
                "displaystyle",
                "encoding",
                "fence",
                "frame",
                "height",
                "href",
                "id",
                "largeop",
                "length",
                "linethickness",
                "lspace",
                "lquote",
                "mathbackground",
                "mathcolor",
                "mathsize",
                "mathvariant",
                "maxsize",
                "minsize",
                "movablelimits",
                "notation",
                "numalign",
                "open",
                "rowalign",
                "rowlines",
                "rowspacing",
                "rowspan",
                "rspace",
                "rquote",
                "scriptlevel",
                "scriptminsize",
                "scriptsizemultiplier",
                "selection",
                "separator",
                "separators",
                "stretchy",
                "subscriptshift",
                "supscriptshift",
                "symmetric",
                "voffset",
                "width",
                "xmlns",
            ]),
            rt = Oe(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
            it = e(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
            ot = e(/<%[\s\S]*|[\s\S]*%>/gm),
            st = e(/^data-[\-\w.\u00B7-\uFFFF]/),
            lt = e(/^aria-[\-\w]+$/),
            ut = e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
            ct = e(/^(?:\w+script|data):/i),
            dt = e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
            ht = e(/^html$/i),
            pt =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                    ? function (e) {
                        return typeof e;
                    }
                    : function (e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    };
        function ft(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n;
            }
            return Array.from(e);
        }
        return (function t() {
            function u(e) {
                return t(e);
            }
            var l = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "undefined" == typeof window ? null : window;
            if (((u.version = "2.3.6"), (u.removed = []), !l || !l.document || 9 !== l.document.nodeType)) return (u.isSupported = !1), u;
            var c = l.document,
                r = l.document,
                d = l.DocumentFragment,
                e = l.HTMLTemplateElement,
                h = l.Node,
                o = l.Element,
                n = l.NodeFilter,
                a = l.NamedNodeMap,
                s = void 0 === a ? l.NamedNodeMap || l.MozNamedAttrMap : a,
                p = l.HTMLFormElement,
                i = l.DOMParser,
                f = l.trustedTypes,
                a = o.prototype,
                m = Xe(a, "cloneNode"),
                g = Xe(a, "nextSibling"),
                D = Xe(a, "childNodes"),
                v = Xe(a, "parentNode");
            "function" != typeof e || ((e = r.createElement("template")).content && e.content.ownerDocument && (r = e.content.ownerDocument));
            var C = (function (e, t) {
                    if ("object" !== (void 0 === e ? "undefined" : pt(e)) || "function" != typeof e.createPolicy) return null;
                    var n = null,
                        a = "data-tt-policy-suffix",
                        n = "dompurify" + ((n = t.currentScript && t.currentScript.hasAttribute(a) ? t.currentScript.getAttribute(a) : n) ? "#" + n : "");
                    try {
                        return e.createPolicy(n, {
                            createHTML: function (e) {
                                return e;
                            },
                        });
                    } catch (e) {
                        return console.warn("TrustedTypes policy " + n + " could not be created."), null;
                    }
                })(f, c),
                y = C ? C.createHTML("") : "",
                f = r,
                b = f.implementation,
                x = f.createNodeIterator,
                w = f.createDocumentFragment,
                k = f.getElementsByTagName,
                E = c.importNode,
                f = {};
            try {
                f = qe(r).documentMode ? r.documentMode : {};
            } catch (t) {}
            var F = {};
            u.isSupported = "function" == typeof v && b && void 0 !== b.createHTMLDocument && 9 !== f;
            function A(e) {
                return e instanceof RegExp || e instanceof Function;
            }
            function _(e) {
                (De && De === e) ||
                ((e = qe((e = !e || "object" !== (void 0 === e ? "undefined" : pt(e)) ? {} : e))),
                    ($ = "ALLOWED_TAGS" in e ? We({}, e.ALLOWED_TAGS) : I),
                    (z = "ALLOWED_ATTR" in e ? We({}, e.ALLOWED_ATTR) : H),
                    (se = "ADD_URI_SAFE_ATTR" in e ? We(qe(le), e.ADD_URI_SAFE_ATTR) : le),
                    (ie = "ADD_DATA_URI_TAGS" in e ? We(qe(oe), e.ADD_DATA_URI_TAGS) : oe),
                    (ae = "FORBID_CONTENTS" in e ? We({}, e.FORBID_CONTENTS) : re),
                    (Y = "FORBID_TAGS" in e ? We({}, e.FORBID_TAGS) : {}),
                    (P = "FORBID_ATTR" in e ? We({}, e.FORBID_ATTR) : {}),
                    (T = "USE_PROFILES" in e && e.USE_PROFILES),
                    (U = !1 !== e.ALLOW_ARIA_ATTR),
                    (W = !1 !== e.ALLOW_DATA_ATTR),
                    (q = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
                    (X = e.SAFE_FOR_TEMPLATES || !1),
                    (G = e.WHOLE_DOCUMENT || !1),
                    (K = e.RETURN_DOM || !1),
                    (Q = e.RETURN_DOM_FRAGMENT || !1),
                    (J = e.RETURN_TRUSTED_TYPE || !1),
                    (V = e.FORCE_BODY || !1),
                    (ee = !1 !== e.SANITIZE_DOM),
                    (te = !1 !== e.KEEP_CONTENT),
                    (ne = e.IN_PLACE || !1),
                    (R = e.ALLOWED_URI_REGEXP || R),
                    (he = e.NAMESPACE || de),
                e.CUSTOM_ELEMENT_HANDLING && A(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (j.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
                e.CUSTOM_ELEMENT_HANDLING && A(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (j.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
                e.CUSTOM_ELEMENT_HANDLING && "boolean" == typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (j.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
                    (fe = -1 === me.indexOf(e.PARSER_MEDIA_TYPE) ? "text/html" : e.PARSER_MEDIA_TYPE),
                    (ge =
                        "application/xhtml+xml" === fe
                            ? function (e) {
                                return e;
                            }
                            : Ie),
                X && (W = !1),
                Q && (K = !0),
                T &&
                (($ = We({}, [].concat(ft(et)))),
                    (z = []),
                !0 === T.html && (We($, Ge), We(z, tt)),
                !0 === T.svg && (We($, Ze), We(z, nt), We(z, rt)),
                !0 === T.svgFilters && (We($, Ve), We(z, nt), We(z, rt)),
                !0 === T.mathMl && (We($, Qe), We(z, at), We(z, rt))),
                e.ADD_TAGS && We(($ = $ === I ? qe($) : $), e.ADD_TAGS),
                e.ADD_ATTR && We((z = z === H ? qe(z) : z), e.ADD_ATTR),
                e.ADD_URI_SAFE_ATTR && We(se, e.ADD_URI_SAFE_ATTR),
                e.FORBID_CONTENTS && We((ae = ae === re ? qe(ae) : ae), e.FORBID_CONTENTS),
                te && ($["#text"] = !0),
                G && We($, ["html", "head", "body"]),
                $.table && (We($, ["tbody"]), delete Y.tbody),
                Oe && Oe(e),
                    (De = e));
            }
            var T,
                S = it,
                B = ot,
                M = st,
                N = lt,
                O = ct,
                L = dt,
                R = ut,
                $ = null,
                I = We({}, [].concat(ft(Ge), ft(Ze), ft(Ve), ft(Qe), ft(et))),
                z = null,
                H = We({}, [].concat(ft(tt), ft(nt), ft(at), ft(rt))),
                j = Object.seal(
                    Object.create(null, {
                        tagNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null },
                        attributeNameCheck: { writable: !0, configurable: !1, enumerable: !0, value: null },
                        allowCustomizedBuiltInElements: { writable: !0, configurable: !1, enumerable: !0, value: !1 },
                    })
                ),
                Y = null,
                P = null,
                U = !0,
                W = !0,
                q = !1,
                X = !1,
                G = !1,
                Z = !1,
                V = !1,
                K = !1,
                Q = !1,
                J = !1,
                ee = !0,
                te = !0,
                ne = !1,
                ae = null,
                re = We({}, [
                    "annotation-xml",
                    "audio",
                    "colgroup",
                    "desc",
                    "foreignobject",
                    "head",
                    "iframe",
                    "math",
                    "mi",
                    "mn",
                    "mo",
                    "ms",
                    "mtext",
                    "noembed",
                    "noframes",
                    "noscript",
                    "plaintext",
                    "script",
                    "style",
                    "svg",
                    "template",
                    "thead",
                    "title",
                    "video",
                    "xmp",
                ]),
                ie = null,
                oe = We({}, ["audio", "video", "img", "source", "image", "track"]),
                se = null,
                le = We({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
                ue = "http://www.w3.org/1998/Math/MathML",
                ce = "http://www.w3.org/2000/svg",
                de = "http://www.w3.org/1999/xhtml",
                he = de,
                pe = !1,
                fe = void 0,
                me = ["application/xhtml+xml", "text/html"],
                ge = void 0,
                De = null,
                ve = r.createElement("form"),
                Ce = We({}, ["mi", "mo", "mn", "ms", "mtext"]),
                ye = We({}, ["foreignobject", "desc", "title", "annotation-xml"]),
                be = We({}, Ze);
            We(be, Ve), We(be, Ke);
            var xe = We({}, Qe);
            We(xe, Je);
            function we(t) {
                $e(u.removed, { element: t });
                try {
                    t.parentNode.removeChild(t);
                } catch (e) {
                    try {
                        t.outerHTML = y;
                    } catch (e) {
                        t.remove();
                    }
                }
            }
            function ke(e, t) {
                try {
                    $e(u.removed, { attribute: t.getAttributeNode(e), from: t });
                } catch (e) {
                    $e(u.removed, { attribute: null, from: t });
                }
                if ((t.removeAttribute(e), "is" === e && !z[e]))
                    if (K || Q)
                        try {
                            we(t);
                        } catch (e) {}
                    else
                        try {
                            t.setAttribute(e, "");
                        } catch (e) {}
            }
            function Ee(e) {
                var t = void 0,
                    n = void 0;
                V ? (e = "<remove></remove>" + e) : (n = (a = ze(e, /^[\r\n\t ]+/)) && a[0]), "application/xhtml+xml" === fe && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
                var a = C ? C.createHTML(e) : e;
                if (he === de)
                    try {
                        t = new i().parseFromString(a, fe);
                    } catch (e) {}
                if (!t || !t.documentElement) {
                    t = b.createDocument(he, "template", null);
                    try {
                        t.documentElement.innerHTML = pe ? "" : a;
                    } catch (e) {}
                }
                return (a = t.body || t.documentElement), e && n && a.insertBefore(r.createTextNode(n), a.childNodes[0] || null), he === de ? k.call(t, G ? "html" : "body")[0] : G ? t.documentElement : a;
            }
            function Fe(e) {
                return x.call(e.ownerDocument || e, e, n.SHOW_ELEMENT | n.SHOW_COMMENT | n.SHOW_TEXT, null, !1);
            }
            function Ae(e) {
                return "object" === (void 0 === h ? "undefined" : pt(h)) ? e instanceof h : e && "object" === (void 0 === e ? "undefined" : pt(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName;
            }
            function _e(e, t, n) {
                F[e] &&
                Le(F[e], function (e) {
                    e.call(u, t, n, De);
                });
            }
            function Te(e) {
                var t;
                if (
                    (_e("beforeSanitizeElements", e, null),
                    (n = e) instanceof p &&
                    ("string" != typeof n.nodeName ||
                        "string" != typeof n.textContent ||
                        "function" != typeof n.removeChild ||
                        !(n.attributes instanceof s) ||
                        "function" != typeof n.removeAttribute ||
                        "function" != typeof n.setAttribute ||
                        "string" != typeof n.namespaceURI ||
                        "function" != typeof n.insertBefore))
                )
                    return we(e), 1;
                if (ze(e.nodeName, /[\u0080-\uFFFF]/)) return we(e), 1;
                var n = ge(e.nodeName);
                if ((_e("uponSanitizeElement", e, { tagName: n, allowedTags: $ }), !Ae(e.firstElementChild) && (!Ae(e.content) || !Ae(e.content.firstElementChild)) && Pe(/<[/\w]/g, e.innerHTML) && Pe(/<[/\w]/g, e.textContent)))
                    return we(e), 1;
                if ("select" === n && Pe(/<template/i, e.innerHTML)) return we(e), 1;
                if ($[n] && !Y[n])
                    return (!(e instanceof o) ||
                        (function (e) {
                            var t = v(e);
                            (t && t.tagName) || (t = { namespaceURI: de, tagName: "template" });
                            var n = Ie(e.tagName),
                                a = Ie(t.tagName);
                            if (e.namespaceURI === ce) return t.namespaceURI === de ? "svg" === n : t.namespaceURI === ue ? "svg" === n && ("annotation-xml" === a || Ce[a]) : Boolean(be[n]);
                            if (e.namespaceURI === ue) return t.namespaceURI === de ? "math" === n : t.namespaceURI === ce ? "math" === n && ye[a] : Boolean(xe[n]);
                            if (e.namespaceURI !== de) return !1;
                            if (t.namespaceURI === ce && !ye[a]) return !1;
                            if (t.namespaceURI === ue && !Ce[a]) return !1;
                            a = We({}, ["title", "style", "font", "a", "script"]);
                            return !xe[n] && (a[n] || !be[n]);
                        })(e)) &&
                    (("noscript" !== n && "noembed" !== n) || !Pe(/<\/no(script|embed)/i, e.innerHTML))
                        ? (X && 3 === e.nodeType && ((t = e.textContent), (t = He(t, S, " ")), (t = He(t, B, " ")), e.textContent !== t && ($e(u.removed, { element: e.cloneNode() }), (e.textContent = t))),
                            _e("afterSanitizeElements", e, null),
                            !1)
                        : (we(e), !0);
                if (!Y[n] && Ne(n)) {
                    if (j.tagNameCheck instanceof RegExp && Pe(j.tagNameCheck, n)) return;
                    if (j.tagNameCheck instanceof Function && j.tagNameCheck(n)) return;
                }
                if (te && !ae[n]) {
                    var a = v(e) || e.parentNode,
                        r = D(e) || e.childNodes;
                    if (r && a) for (var i = r.length - 1; 0 <= i; --i) a.insertBefore(m(r[i], !0), g(e));
                }
                return we(e), 1;
            }
            function Se(e, t, n) {
                if (ee && ("id" === t || "name" === t) && (n in r || n in ve)) return !1;
                if ((!W || P[t] || !Pe(M, t)) && (!U || !Pe(N, t)))
                    if (!z[t] || P[t]) {
                        if (
                            !(
                                (Ne(e) &&
                                    ((j.tagNameCheck instanceof RegExp && Pe(j.tagNameCheck, e)) || (j.tagNameCheck instanceof Function && j.tagNameCheck(e))) &&
                                    ((j.attributeNameCheck instanceof RegExp && Pe(j.attributeNameCheck, t)) || (j.attributeNameCheck instanceof Function && j.attributeNameCheck(t)))) ||
                                ("is" === t && j.allowCustomizedBuiltInElements && ((j.tagNameCheck instanceof RegExp && Pe(j.tagNameCheck, n)) || (j.tagNameCheck instanceof Function && j.tagNameCheck(n))))
                            )
                        )
                            return !1;
                    } else if (!se[t] && !Pe(R, He(n, L, "")) && (("src" !== t && "xlink:href" !== t && "href" !== t) || "script" === e || 0 !== je(n, "data:") || !ie[e]) && (!q || Pe(O, He(n, L, ""))) && n) return !1;
                return !0;
            }
            function Be(e) {
                var t = void 0,
                    n = void 0;
                _e("beforeSanitizeAttributes", e, null);
                var a = e.attributes;
                if (a) {
                    for (var r = { attrName: "", attrValue: "", keepAttr: !0, allowedAttributes: z }, n = a.length; n--; ) {
                        l = a[n];
                        var i = l.name,
                            o = l.namespaceURI,
                            t = Ye(l.value),
                            s = ge(i);
                        if (((r.attrName = s), (r.attrValue = t), (r.keepAttr = !0), (r.forceKeepAttr = void 0), _e("uponSanitizeAttribute", e, r), (t = r.attrValue), !r.forceKeepAttr && (ke(i, e), r.keepAttr)))
                            if (Pe(/\/>/i, t)) ke(i, e);
                            else {
                                X && ((t = He(t, S, " ")), (t = He(t, B, " ")));
                                var l = ge(e.nodeName);
                                if (Se(l, s, t))
                                    try {
                                        o ? e.setAttributeNS(o, i, t) : e.setAttribute(i, t), Re(u.removed);
                                    } catch (e) {}
                            }
                    }
                    _e("afterSanitizeAttributes", e, null);
                }
            }
            function Me(e) {
                var t,
                    n = Fe(e);
                for (_e("beforeSanitizeShadowDOM", e, null); (t = n.nextNode()); ) _e("uponSanitizeShadowNode", t, null), Te(t) || (t.content instanceof d && Me(t.content), Be(t));
                _e("afterSanitizeShadowDOM", e, null);
            }
            var Ne = function (e) {
                return 0 < e.indexOf("-");
            };
            return (
                (u.sanitize = function (e, t) {
                    var n,
                        a,
                        r = void 0,
                        i = void 0,
                        o = void 0;
                    if ("string" != typeof (e = (pe = !e) ? "\x3c!--\x3e" : e) && !Ae(e)) {
                        if ("function" != typeof e.toString) throw Ue("toString is not a function");
                        if ("string" != typeof (e = e.toString())) throw Ue("dirty is not a string, aborting");
                    }
                    if (!u.isSupported) {
                        if ("object" === pt(l.toStaticHTML) || "function" == typeof l.toStaticHTML) {
                            if ("string" == typeof e) return l.toStaticHTML(e);
                            if (Ae(e)) return l.toStaticHTML(e.outerHTML);
                        }
                        return e;
                    }
                    if ((Z || _(t), (u.removed = []), (ne = "string" == typeof e ? !1 : ne))) {
                        if (e.nodeName) {
                            t = ge(e.nodeName);
                            if (!$[t] || Y[t]) throw Ue("root node is forbidden and cannot be sanitized in-place");
                        }
                    } else if (e instanceof h) (1 === (n = (r = Ee("\x3c!----\x3e")).ownerDocument.importNode(e, !0)).nodeType && "BODY" === n.nodeName) || "HTML" === n.nodeName ? (r = n) : r.appendChild(n);
                    else {
                        if (!K && !X && !G && -1 === e.indexOf("<")) return C && J ? C.createHTML(e) : e;
                        if (!(r = Ee(e))) return K ? null : J ? y : "";
                    }
                    r && V && we(r.firstChild);
                    for (var s = Fe(ne ? e : r); (a = s.nextNode()); ) (3 === a.nodeType && a === i) || Te(a) || (a.content instanceof d && Me(a.content), Be(a), (i = a));
                    if (((i = null), ne)) return e;
                    if (K) {
                        if (Q) for (o = w.call(r.ownerDocument); r.firstChild; ) o.appendChild(r.firstChild);
                        else o = r;
                        return (o = z.shadowroot ? E.call(c, o, !0) : o);
                    }
                    e = G ? r.outerHTML : r.innerHTML;
                    return (
                        G && $["!doctype"] && r.ownerDocument && r.ownerDocument.doctype && r.ownerDocument.doctype.name && Pe(ht, r.ownerDocument.doctype.name) && (e = "<!DOCTYPE " + r.ownerDocument.doctype.name + ">\n" + e),
                        X && ((e = He(e, S, " ")), (e = He(e, B, " "))),
                            C && J ? C.createHTML(e) : e
                    );
                }),
                    (u.setConfig = function (e) {
                        _(e), (Z = !0);
                    }),
                    (u.clearConfig = function () {
                        (De = null), (Z = !1);
                    }),
                    (u.isValidAttribute = function (e, t, n) {
                        De || _({});
                        (e = ge(e)), (t = ge(t));
                        return Se(e, t, n);
                    }),
                    (u.addHook = function (e, t) {
                        "function" == typeof t && ((F[e] = F[e] || []), $e(F[e], t));
                    }),
                    (u.removeHook = function (e) {
                        F[e] && Re(F[e]);
                    }),
                    (u.removeHooks = function (e) {
                        F[e] && (F[e] = []);
                    }),
                    (u.removeAllHooks = function () {
                        F = {};
                    }),
                    u
            );
        })();
    });
var captcha = function (n) {
    var a = function () {
            var e = Math.floor(11 * Math.random()),
                t = Math.floor(11 * Math.random());
            return $("#" + n + "-n1").html(e), $("#" + n + "-n2").html(t), (e + t).toString();
        },
        r = function (e) {
            var t = $("#" + n + "-input");
            return console.log(t.val(), e), t.val() !== e ? (t.val("").focus(), !1) : ($("#" + n + "-answer").val(e), !0);
        };
    !(function () {
        var e = $(".captcha");
        if (!e.length || !n) return;
        var t = a();
        !1 !== t &&
        e.closest("form").submit(function () {
            return r(t);
        });
    })();
};
$.fn.passwordStrength = function (e, t) {
    function n() {
        var n = o.val(),
            a = zxcvbn(n).score;
        return (
            o
                .nextAll(".password-strength-bars")
                .children("span")
                .each(function (e, t) {
                    e = "" !== n && e <= a ? "visible" : "hidden";
                    $(t).css("visibility", e);
                }),
            e <= a
        );
    }
    function a(e) {
        "" === o.val() || n() ? o[0].setCustomValidity("") : ((t = t || "Password must be stronger."), o.focus(), o[0].setCustomValidity(t));
    }
    function r() {
        (o[0].type = $(this).hasClass("password-show") ? "text" : "password"), o.nextAll(".password-toggle").toggle();
    }
    function i() {
        e && (o.keyup(n), o.on("input propertychange", a));
    }
    var o = this;
    !(function () {
        if (o.length)
            0 < e && "undefined" == typeof zxcvbn
                ? $.getScript("assets/js/zxcvbn/zxcvbn.js", function () {
                    i();
                })
                : i(),
                o.nextAll(".password-toggle").bind("click", r);
    })();
};
var addHTML = function (e, t, n) {
        t = document.getElementById(t);
        n ? $(t).html(e) : $(t).append(e);
    },
    checkAll = function (e, t, n) {
        for (var a = 0, r = e.elements.length; a < r; a++) {
            var i = e.elements[a];
            "checkbox" == i.type && i.name.substr(0, n.length) == n && (i.checked = t);
        }
    },
    switchMenu = function (e) {
        $(e).toggleClass("switched").nextAll("table").first().toggle();
    },
    popups = new popups();
function popups() {
    (this.childs = []),
        (this.open = function (e, t) {
            (t = t || "scrollbars=yes,resizable=yes,width=1200,height=450"), this.childs.push(window.open(e, "", t));
        }),
        (this.closeAll = function () {
            for (var e = 0, t = this.childs.length; e < t; e++) {
                var n = this.childs[e];
                n.closed || n.close();
            }
        });
}
function isTouchDevice() {
    try {
        return document.createEvent("TouchEvent"), !0;
    } catch (e) {
        return !1;
    }
}
function isMobileMenu() {
    return Math.round($("#menu").width()) === window.innerWidth;
}
isTouchDevice() || (document.documentElement.className += " no-touch");
var ColorBox = function () {
        var e = 640,
            t = 390;
        screen.width < 768 && ((e = 300), (t = 183)),
            $(".rt2colorBox").before(function (e) {
                if (this.id) {
                    var t = $(this);
                    if (36 < t.text().length || t.children().height() > t.parent().height()) return '<div class="link2colorBox"><a class="colorboxinline" href="#' + this.id + '"></a></div>';
                }
            }),
            $(".colorbox").colorbox(),
            $(".colorboxiframe").colorbox({ iframe: !0, innerWidth: e, innerHeight: t }),
            $(".colorboxinline").colorbox({ inline: !0, maxWidth: "95%", maxHeight: "85%", scrolling: !0 });
    },
    GetMDConverter = function () {
        return (
            void 0 === GetMDConverter.marked &&
            (GetMDConverter.marked = function (e) {
                var t = new marked.Renderer();
                (t.link = function (e, t, n) {
                    return marked.Renderer.prototype.link.call(this, e, t, n).replace("<a", "<a target='_blank' ");
                }),
                    marked.setOptions({ breaks: !0, gfm: !0, headerIds: !1, renderer: t });
                e = marked.parse(e);
                return DOMPurify.sanitize(e);
            }),
                GetMDConverter.marked
        );
    },
    MarkDownInputPreview = function (e) {
        var t = $("#" + e),
            n = t.val(),
            a = $("#divMDPreview" + e);
        a.is(":visible") || ((e = GetMDConverter()), a.html(e(n)), a.css("height", t.css("height"))), a.toggle(), t.toggle(), t.next("br").toggle(), a.siblings(".tab").toggleClass("disabled");
    },
    MarkDownToHTML = function () {
        $(".markdown-to-html").html(function (e, t) {
            var n = GetMDConverter()(t.replace(/&gt;/g, ">"));
            return "<p>" + t + "</p>" == n.trim() ? t : n;
        });
    },
    JSCalendarSetup = function () {
        $(".button.cal").each(function (e, t) {
            var n = t.id.replace("trigger", "");
            Calendar.setup({ monthField: "monthSelect" + n, dayField: "daySelect" + n, yearField: "yearSelect" + n, ifFormat: "%d-%b-%y", button: t.id, align: "Tl", singleClick: !0, cache: !0 });
        });
    },
    ajaxOptions = function (r, i, o) {
        return {
            beforeSend: function (e) {
                $(".ajax-error").hide(), $(".loading").css("visibility", "visible");
            },
            success: function (e, t, n) {
                var a,
                    n = n.getResponseHeader("X-Redirect-Url");
                n
                    ? (i = n)
                    : o &&
                    "get" == o.method &&
                    ((a = []),
                        (a =
                            "search" == o.name
                                ? ((n = $(o).formToArray()),
                                    $(n).each(function (e, t) {
                                        "" !== t.value && a.push(t.name + "=" + t.value);
                                    }),
                                    a.join("&"))
                                : $(o).formSerialize()),
                        (i += (-1 != i.indexOf("?") ? "&" : "?") + a)),
                    ajaxSuccess(e, r, i);
            },
            error: function (e, t, n) {
                ajaxError(e, t, n, i, r, o);
            },
            complete: function () {
                $(".loading").css("visibility", "hidden"), hideHelp();
            },
        };
    },
    ajaxError = function (e, t, n, a, r, i) {
        var o = e.status,
            e = "AJAX error. " + o + " ";
        if ((void 0 === ajaxError.num && (ajaxError.num = 0), ajaxError.num++, 0 === o)) {
            if (((e += "Check your Network"), a && 1 === ajaxError.num))
                return void window.setTimeout(function () {
                    $.ajax(a, ajaxOptions(r, a, i));
                }, 1e3);
        } else e += "parsererror" == t ? "JSON parse failed" : "timeout" == t ? "Request Timeout" : "abort" == t ? "Request Aborted" : n;
        (e += ". " + a), (ajaxError.num = 0), $(".ajax-error").html(e).fadeIn();
    },
    ajaxLink = function (e) {
        var t, n;
        if (
            ("string" == typeof e ? ((n = "body"), "Side.php" == (t = e) ? (n = "menu") : "Side.php?sidefunc=update" == t ? (n = "menu-top") : 0 === t.indexOf("Bottom.php") && (n = "footer")) : ((t = e.href), (n = e.target)),
            -1 != t.indexOf("#") || "_blank" == n || "_top" == n)
        )
            return !0;
        if (!n) {
            if (-1 == t.indexOf("Modules.php")) return !0;
            n = "body";
        }
        return $.ajax(t, ajaxOptions(n, t, !1)), !1;
    },
    ajaxPostForm = function (e, t) {
        var n = e.target || "body";
        if (-1 != e.action.indexOf("_ROSARIO_PDF")) return (e.target = "_blank"), (e.method = "post"), !0;
        if ("_top" == n) return !0;
        "multipart/form-data" !== e.enctype || $(e).has('input[type="file"]').length || (e.enctype = "application/x-www-form-urlencoded");
        n = ajaxOptions(n, e.action, e);
        return t ? $(e).ajaxSubmit(n) : $(e).ajaxForm(n), !1;
    },
    ajaxSuccess = function (e, t, n) {
        "body" == t && $("html").focus(), $("#" + t).html(e);
        e = document;
        history.pushState && "body" == t && e.URL != n && history.pushState(null, e.title, n), ajaxPrepare("#" + t);
    },
    ajaxPrepare = function (e) {
        $(e + " form").each(function () {
            ajaxPostForm(this, !1);
        }),
        "#menu" == e && (window.modname && openMenu(modname), isMobileMenu() || submenuOffset());
        var t = $("#body h3.title").first().text(),
            n = $("#body h2").first().text();
        (document.title = n && t ? n + " | " + t : n + t),
        ("#body" != e && "body" != e) ||
        (openMenu(),
        isMobileMenu() && ($("#menu").addClass("hide"), $("body").css("overflow", "")),
            document.body.scrollIntoView(),
            $("#body").scrollTop(0),
            popups.closeAll(),
            MarkDownToHTML(),
            ColorBox(),
            JSCalendarSetup(),
            repeatListTHead($("table.list")));
    };
$(document)
    .ajaxStart(function () {
        $('input[type="submit"],input[type="button"],a').css("pointer-events", "none");
    })
    .ajaxStop(function () {
        $('input[type="submit"],input[type="button"],a').css("pointer-events", "");
    }),
    (window.onload = function () {
        $.ajaxPrefilter("script", function (e) {
            e.cache = !0;
        }),
        isTouchDevice() &&
        $(".adminmenu .menu-top").on("click touch", function (e) {
            return (
                e.preventDefault(),
                    $("#selectedModuleLink").attr("id", ""),
                    $(this).attr("id", "selectedModuleLink"),
                $(this).offset().top < this.scrollHeight && $("#menu").scrollTop($("#menu")[0].scrollTop - Math.abs($(this).offset().top) - this.scrollHeight),
                    !1
            );
        }),
            $(document).on("click", "a", function (e) {
                return "none" == $(this).css("pointer-events") ? e.preventDefault() : ajaxLink(this);
            }),
        isMobileMenu() || (fixedMenu(), submenuOffset()),
            $(window).resize(function () {
                isMobileMenu() || ($("body").css("overflow", ""), fixedMenu());
            }),
            ajaxPrepare("body"),
        history.pushState && window.setTimeout(ajaxPopState(), 1);
    });
var ajaxPopState = function () {
    window.addEventListener(
        "popstate",
        function (e) {
            ajaxLink(document.URL);
        },
        !1
    );
};
window.onunload = function () {};
var LOSearch = function (e, t, n) {
        if ("click" === e.type || 13 == e.keyCode) return e.preventDefault(), ajaxLink(n + (t ? "&LO_search=" + encodeURIComponent(t) : ""));
    },
    repeatListTHead = function (e) {
        e.length &&
        e.each(function (e, t) {
            var n = $(t).children("thead,tbody").children("tr"),
                a = n.length;
            if (20 < a) {
                for (var t = n[0], r = 40 < a ? 20 : a - 1, i = []; r < a; r += 20) {
                    var o = n[r];
                    i.push(o);
                }
                $(t).clone().addClass("thead-repeat").insertAfter(i);
            }
        });
    },
    openMenu = function () {
        $("#selectedMenuLink,#selectedModuleLink").attr("id", ""),
        window.modname &&
        modname &&
        "misc/Portal.php" != modname &&
        ($('.wp-submenu a[href$="' + modname + '"]')
            .first()
            .attr("id", "selectedMenuLink"),
            $("#selectedMenuLink").parents(".menu-module").children(".menu-top").attr("id", "selectedModuleLink"));
    };
function submenuOffset() {
    $(".adminmenu .menu-top").on("mouseover focus", function () {
        var e = $(this).next(".wp-submenu"),
            t = $("#footer").offset().top;
        "0px" != $("#footer").css("bottom") && ((t += window.innerHeight), $(this).parent()[0].getBoundingClientRect().top < window.innerHeight - 2 * $(this).parent().outerHeight() && (t -= e.children("li").first().outerHeight())),
            (moveup = t - $(this).offset().top - e.outerHeight()),
            e.css("margin-top", (moveup < 0 ? moveup : 0) + "px");
    });
}
var toggleHelp = function () {
        ("block" !== $("#footerhelp").css("display") ? showHelp : hideHelp)();
    },
    showHelp = function () {
        var t = $("#footerhelp"),
            n = $("#footerhelp .footerhelp-content");
        modname !== showHelp.tmp
            ? ($(".loading").css("visibility", "visible"),
                $.get("Bottom.php?bottomfunc=help&modname=" + encodeURIComponent(modname), function (e) {
                    (showHelp.tmpdata = e), n.html(e), t.scrollTop(0);
                })
                    .fail(ajaxError)
                    .always(function () {
                        $(".loading").css("visibility", "hidden");
                    }),
                (showHelp.tmp = modname))
            : showHelp.tmpdata && !t.html() && n.html(showHelp.tmpdata),
            t.show();
    },
    hideHelp = function () {
        $("#footerhelp").hide();
    },
    expandMenu = function () {
        $("#menu").toggleClass("hide"), $("body").css("overflow", ""), isMobileMenu() && !$("#menu").hasClass("hide") && $("body").css("overflow", "hidden");
    },
    fileInputSizeValidate = function (e, t) {
        for (var n = 0, a = 0; a < e.files.length; a++) n += e.files[a].size / 1024 / 1024;
        t < n && (alert(e.title), $(e).val(""));
    };
//# sourceMappingURL=plugins.min.js.map