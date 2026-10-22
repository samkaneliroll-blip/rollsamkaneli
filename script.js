/* =====================================================================
   SAMKANELI · script.js
   Menú · revelado · carrusel · lightbox · pestañas · filtros
   contacto · copiar color · video · formulario · valores corporativos
   ===================================================================== */
   (function () {
    "use strict";

    var $ = function (s, c) {
        return (c || document).querySelector(s);
    };

    var $$ = function (s, c) {
        return Array.prototype.slice.call(
            (c || document).querySelectorAll(s)
        );
    };

    var reduce = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Menú ---------- */
    var toggle = $(".nav-toggle");
    var nav = $("#menu");

    function setNav(open) {
        if (!toggle || !nav) return;

        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open);
        toggle.setAttribute(
            "aria-label",
            open ? "Cerrar menú" : "Abrir menú"
        );
        document.body.classList.toggle("nav-open", open);
    }

    if (toggle) {
        toggle.addEventListener("click", function () {
            setNav(!nav.classList.contains("open"));
        });

        $$("#menu a").forEach(function (a) {
            a.addEventListener("click", function () {
                setNav(false);
            });
        });
    }

    function closeSubs(except) {
        $$(".has-sub").forEach(function (li) {
            if (li !== except) {
                li.classList.remove("open");
                var b = $(".sub-btn", li);
                if (b) b.setAttribute("aria-expanded", "false");
            }
        });
    }

    $$(".sub-btn").forEach(function (b) {
        b.addEventListener("click", function (e) {
            e.stopPropagation();

            var li = b.parentNode;
            var open = !li.classList.contains("open");

            closeSubs(li);
            li.classList.toggle("open", open);
            b.setAttribute("aria-expanded", open);
        });
    });

    document.addEventListener("click", function (e) {
        if (!e.target.closest(".has-sub")) closeSubs();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            var lbOpen = $(".lb.open");
            if (lbOpen) return;

            if (nav && nav.classList.contains("open")) {
                setNav(false);
                if (toggle) toggle.focus();
            }

            closeSubs();
        }
    });

    if (window.matchMedia) {
        var mediaDesktop = window.matchMedia("(min-width:1181px)");

        if (mediaDesktop.addEventListener) {
            mediaDesktop.addEventListener("change", function () {
                setNav(false);
            });
        } else if (mediaDesktop.addListener) {
            mediaDesktop.addListener(function () {
                setNav(false);
            });
        }
    }

    /* ---------- Revelado al desplazarse ---------- */
    var rv = $$(".reveal");

    if ("IntersectionObserver" in window && !reduce) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -5% 0px"
        });

        rv.forEach(function (el) {
            io.observe(el);
        });
    } else {
        rv.forEach(function (el) {
            el.classList.add("in");
        });
    }

    /* ---------- Carrusel ---------- */
    $$("[data-carousel]").forEach(function (c) {
        var track = $(".car-track", c);
        var slides = $$(".car-slide", c);

        if (!track || !slides.length) return;

        var n = slides.length;
        var idx = 0;
        var count = $(".car-count", c);
        var dotsBox = $(".car-dots", c);
        var autoBtn = $(".car-auto", c);
        var timer = null;
        var dots = [];

        if (dotsBox) {
            dots = slides.map(function (_, i) {
                var d = document.createElement("button");
                d.type = "button";
                d.className = "car-dot";
                d.setAttribute(
                    "aria-label",
                    "Ir a la diapositiva " + (i + 1)
                );

                d.addEventListener("click", function () {
                    go(i);
                });

                dotsBox.appendChild(d);
                return d;
            });
        }

        function paint() {
            if (count) count.textContent = (idx + 1) + " / " + n;

            dots.forEach(function (d, i) {
                d.setAttribute("aria-current", i === idx ? "true" : "false");
            });
        }

        function go(i) {
            idx = (i + n) % n;

            track.scrollTo({
                left: slides[idx].offsetLeft - track.offsetLeft,
                behavior: reduce ? "auto" : "smooth"
            });

            paint();
        }

        function current() {
            var best = 0;
            var min = Infinity;

            slides.forEach(function (s, i) {
                var d = Math.abs(
                    s.offsetLeft - track.offsetLeft - track.scrollLeft
                );

                if (d < min) {
                    min = d;
                    best = i;
                }
            });

            return best;
        }

        var st;

        track.addEventListener("scroll", function () {
            clearTimeout(st);

            st = setTimeout(function () {
                idx = current();
                paint();
            }, 60);
        }, { passive: true });

        var prev = $(".car-prev", c);
        var next = $(".car-next", c);

        if (prev) {
            prev.addEventListener("click", function () {
                go(idx - 1);
            });
        }

        if (next) {
            next.addEventListener("click", function () {
                go(idx + 1);
            });
        }

        track.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight") {
                e.preventDefault();
                go(idx + 1);
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault();
                go(idx - 1);
            }
        });

        /* Arrastre con ratón */
        var down = false;
        var sx = 0;
        var sl = 0;
        var moved = false;

        track.addEventListener("pointerdown", function (e) {
            if (e.pointerType !== "mouse") return;

            down = true;
            moved = false;
            sx = e.clientX;
            sl = track.scrollLeft;
        });

        window.addEventListener("pointermove", function (e) {
            if (!down) return;

            var dx = e.clientX - sx;

            if (Math.abs(dx) > 5) {
                moved = true;
                track.classList.add("dragging");
            }

            if (moved) track.scrollLeft = sl - dx;
        });

        window.addEventListener("pointerup", function () {
            if (!down) return;

            down = false;

            if (moved) {
                track.classList.remove("dragging");
                go(current());
            }
        });

        track.addEventListener("click", function (e) {
            if (moved) {
                e.stopPropagation();
                e.preventDefault();
                moved = false;
            }
        }, true);

        /* Avance automático opcional */
        function stop() {
            clearInterval(timer);
            timer = null;

            if (autoBtn) {
                autoBtn.setAttribute("aria-pressed", "false");
                autoBtn.textContent = "▶ Auto";
                autoBtn.setAttribute(
                    "aria-label",
                    "Activar avance automático"
                );
            }
        }

        function start() {
            if (reduce || !autoBtn) return;

            timer = setInterval(function () {
                go(idx + 1);
            }, 6000);

            autoBtn.setAttribute("aria-pressed", "true");
            autoBtn.textContent = "❚❚ Pausa";
            autoBtn.setAttribute(
                "aria-label",
                "Pausar avance automático"
            );
        }

        if (autoBtn) {
            autoBtn.addEventListener("click", function () {
                if (timer) {
                    stop();
                } else {
                    start();
                }
            });

            ["pointerdown", "focusin", "mouseenter"].forEach(function (ev) {
                c.addEventListener(ev, function () {
                    if (timer) stop();
                });
            });
        }

        paint();
    });

    /* ---------- Lightbox de imágenes ---------- */
    var lb = null;
    var lbItems = [];
    var lbI = 0;
    var lastFocus = null;

    function buildLb() {
        lb = document.createElement("div");
        lb.className = "lb";
        lb.setAttribute("role", "dialog");
        lb.setAttribute("aria-modal", "true");
        lb.setAttribute("aria-label", "Vista ampliada de imagen");

        lb.innerHTML =
            '<div class="lb-top">' +
                '<span class="lb-count" aria-live="polite"></span>' +
                '<button type="button" class="lb-btn lb-close" ' +
                    'aria-label="Cerrar vista ampliada">✕</button>' +
            '</div>' +
            '<button type="button" class="lb-btn lb-nav lb-prev" ' +
                'aria-label="Imagen anterior">‹</button>' +
            '<figure class="lb-fig">' +
                '<img alt="">' +
                '<figcaption class="lb-cap"></figcaption>' +
            '</figure>' +
            '<button type="button" class="lb-btn lb-nav lb-next" ' +
                'aria-label="Imagen siguiente">›</button>';

        document.body.appendChild(lb);

        $(".lb-close", lb).addEventListener("click", closeLb);

        $(".lb-prev", lb).addEventListener("click", function () {
            showLb(lbI - 1);
        });

        $(".lb-next", lb).addEventListener("click", function () {
            showLb(lbI + 1);
        });

        lb.addEventListener("click", function (e) {
            if (e.target === lb || e.target.classList.contains("lb-top")) {
                closeLb();
            }
        });

        var tx = null;

        lb.addEventListener("touchstart", function (e) {
            tx = e.touches[0].clientX;
        }, { passive: true });

        lb.addEventListener("touchend", function (e) {
            if (tx === null) return;

            var dx = e.changedTouches[0].clientX - tx;

            if (Math.abs(dx) > 50) {
                showLb(lbI + (dx < 0 ? 1 : -1));
            }

            tx = null;
        }, { passive: true });
    }

    function showLb(i) {
        if (!lbItems.length || !lb) return;

        lbI = (i + lbItems.length) % lbItems.length;

        var el = lbItems[lbI];
        var im = $("img", lb);

        im.src = el.currentSrc || el.src;
        im.alt = el.alt;

        $(".lb-cap", lb).textContent =
            el.getAttribute("data-caption") || el.alt;

        $(".lb-count", lb).textContent =
            lbItems.length > 1 ? (lbI + 1) + " / " + lbItems.length : "";

        var multi = lbItems.length > 1;

        $(".lb-prev", lb).style.display = multi ? "" : "none";
        $(".lb-next", lb).style.display = multi ? "" : "none";
    }

    function openLb(el) {
        if (!lb) buildLb();

        var g = el.getAttribute("data-group");

        lbItems = $$('img[data-lightbox][data-group="' + g + '"]');
        lastFocus = document.activeElement;

        lb.classList.add("open");
        document.body.style.overflow = "hidden";

        showLb(lbItems.indexOf(el));
        $(".lb-close", lb).focus();
    }

    function closeLb() {
        if (!lb) return;

        lb.classList.remove("open");
        document.body.style.overflow = "";

        if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
        var t = e.target;

        if (t.matches && t.matches("img[data-lightbox]")) {
            e.preventDefault();
            openLb(t);
        }
    });

    document.addEventListener("keydown", function (e) {
        if (!lb || !lb.classList.contains("open")) return;

        if (e.key === "Escape") {
            closeLb();
        } else if (e.key === "ArrowRight") {
            showLb(lbI + 1);
        } else if (e.key === "ArrowLeft") {
            showLb(lbI - 1);
        } else if (e.key === "Tab") {
            var f = $$("button", lb).filter(function (b) {
                return b.offsetParent !== null;
            });

            var first = f[0];
            var last = f[f.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    /* ---------- Pestañas ---------- */
    $$("[data-tabs]").forEach(function (box) {
        var tabs = $$('[role="tab"]', box);
        var panels = $$('[role="tabpanel"]', box);

        if (!tabs.length) return;

        function sel(t, focus) {
            tabs.forEach(function (x) {
                var on = x === t;

                x.setAttribute("aria-selected", on ? "true" : "false");
                x.tabIndex = on ? 0 : -1;
            });

            panels.forEach(function (p) {
                p.hidden = p.id !== t.getAttribute("aria-controls");
            });

            if (focus) t.focus();
        }

        tabs.forEach(function (t, i) {
            t.addEventListener("click", function () {
                sel(t);
            });

            t.addEventListener("keydown", function (e) {
                if (e.key === "ArrowRight") {
                    sel(tabs[(i + 1) % tabs.length], true);
                } else if (e.key === "ArrowLeft") {
                    sel(tabs[(i - 1 + tabs.length) % tabs.length], true);
                } else if (e.key === "Home") {
                    sel(tabs[0], true);
                } else if (e.key === "End") {
                    sel(tabs[tabs.length - 1], true);
                }
            });
        });

        sel(tabs[0]);
    });

    /* ---------- Filtros ---------- */
    $$("[data-filter-group]").forEach(function (g) {
        var target = $(g.getAttribute("data-filter-group"));

        if (!target) return;

        var btns = $$("button", g);
        var items = $$("[data-cat]", target);
        var out = $("[data-filter-count]");

        btns.forEach(function (b) {
            b.addEventListener("click", function () {
                var f = b.getAttribute("data-filter");
                var n = 0;

                btns.forEach(function (x) {
                    x.setAttribute(
                        "aria-pressed",
                        x === b ? "true" : "false"
                    );
                });

                items.forEach(function (it) {
                    var cat = (it.getAttribute("data-cat") || "").split(" ");
                    var show = f === "todas" || cat.indexOf(f) > -1;

                    it.hidden = !show;
                    if (show) n++;
                });

                if (out) {
                    out.textContent =
                        n + (n === 1 ? " aplicación" : " aplicaciones");
                }
            });
        });
    });

    /* ---------- Contacto desde config.js ---------- */
    var C = window.SAMKANELI_CONFIG || {};

    function ok(v) {
        return typeof v === "string" && v.trim() !== "";
    }

    $$("[data-contact]").forEach(function (a) {
        var k = a.getAttribute("data-contact");
        var v = C[k];
        var href = null;

        if (!ok(v)) return;

        if (k === "whatsapp") {
            href = "https://wa.me/" + v.replace(/\D/g, "") +
                "?text=" + encodeURIComponent(C.mensajeWhatsapp || "");
        } else if (k === "email") {
            href = "mailto:" + v;
        } else {
            href = v;
        }

        a.setAttribute("href", href);

        if (k !== "email") {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
        }

        a.classList.add("is-active");
    });

    $$("[data-contact-text]").forEach(function (el) {
        var k = el.getAttribute("data-contact-text");
        var v = C[k];

        if (ok(v)) {
            el.textContent = v;
            el.classList.remove("pending");
        }
    });

    $$("[data-contact-status]").forEach(function (el) {
        var k = el.getAttribute("data-contact-status");

        el.hidden = !(
            ok(C[k]) === (el.getAttribute("data-when") === "set")
        );
    });

    /* ---------- Copiar color ---------- */
    $$("[data-copy]").forEach(function (b) {
        b.addEventListener("click", function () {
            var t = b.getAttribute("data-copy");
            var lab = b.getAttribute("data-label") || b.textContent;

            function done() {
                b.textContent = "¡Copiado!";
                setTimeout(function () {
                    b.textContent = lab;
                }, 1400);
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(t).then(done, function () {
                    b.textContent = t;
                });
            } else {
                var ta = document.createElement("textarea");
                ta.value = t;
                document.body.appendChild(ta);
                ta.select();

                try {
                    document.execCommand("copy");
                    done();
                } catch (_) {
                    b.textContent = t;
                }

                document.body.removeChild(ta);
            }
        });
    });

    /* ---------- Video opcional ---------- */
    $$("[data-video-slot]").forEach(function (box) {
        var btn = $(".video-play", box);
        var note = $(".video-note", box);
        var src = box.getAttribute("data-video-slot");

        if (!btn) return;

        btn.addEventListener("click", function () {
            var stage = $(".video-stage", box);

            if (!stage) return;

            var v = document.createElement("video");
            v.controls = true;
            v.playsInline = true;
            v.preload = "metadata";
            v.className = "video-el";

            v.setAttribute(
                "aria-label",
                "Video de presentación de SAMKANELI"
            );

            v.addEventListener("error", function () {
                v.remove();
                btn.hidden = false;

                if (note) note.hidden = false;
            }, { once: true });

            v.src = src;
            stage.appendChild(v);
            btn.hidden = true;

            if (note) note.hidden = true;

            var p = v.play();
            if (p && p.catch) p.catch(function () {});
        });
    });

    /* ---------- Formulario de contacto: demostración local ---------- */
    $$("form[data-demo-form]").forEach(function (f) {
        var msg = $(".form-msg", f);

        f.addEventListener("submit", function (e) {
            e.preventDefault();

            var bad = null;

            $$("[required]", f).forEach(function (i) {
                var err = i.id ? $("#" + i.id + "-err") : null;

                var v = !i.value.trim() ||
                    (i.type === "email" && i.value &&
                        !/^\S+@\S+\.\S+$/.test(i.value));

                i.setAttribute("aria-invalid", v ? "true" : "false");

                if (err) err.hidden = !v;
                if (v && !bad) bad = i;
            });

            if (bad) {
                if (msg) {
                    msg.textContent = "Revisa los campos marcados.";
                    msg.className = "form-msg err";
                }

                bad.focus();
                return;
            }

            if (msg) {
                msg.textContent =
                    "Demostración visual: tu mensaje NO se envió a ningún servidor. " +
                    "Para recibir consultas reales, activa un canal en config.js.";

                msg.className = "form-msg ok";
            }

            f.reset();
        });
    });

    /* ---------- Valores corporativos SAMKANELI ---------- */
    var valoresBox = $("#valores-corporativos");

    if (valoresBox) {
        var opcionesValor = $$(".sk-valor-opcion", valoresBox);
        var panelValor = $(".sk-valor-detalle", valoresBox);
        var fotoValor = $("#sk-valor-foto", valoresBox);
        var numeroValor = $("#sk-valor-numero", valoresBox);
        var tituloValor = $("#sk-valor-titulo", valoresBox);
        var descripcionValor = $("#sk-valor-descripcion", valoresBox);
        var fraseValor = $("#sk-valor-frase", valoresBox);
        var progresoValor = $("#sk-valor-progreso", valoresBox);
        var anteriorValor = $("#sk-valor-anterior", valoresBox);
        var siguienteValor = $("#sk-valor-siguiente", valoresBox);

        var datosValores = [
            {
                titulo: "Calidad",
                imagen: "../img/originales/Certificado de Calidad Samkaneli Tropical.png",
                alt: "Rollos de canela de SAMKANELI",
                descripcion:
                    "Cuidamos cada detalle para ofrecer productos deliciosos, " +
                    "con una presentación especial y una experiencia que invite a compartir.",
                frase: "Cada detalle cuenta; cada sabor deja una huella."
            },
            {
                titulo: "Responsabilidad",
                imagen: "../img/mockups/Rollos de canela tropicales al horno.png",
                alt: "Producto inspirado en los sabores de la Selva Central",
                descripcion:
                    "Trabajamos con cuidado y responsabilidad en cada etapa " +
                    "de la preparación, presentación y atención a nuestros clientes.",
                frase: "La confianza se construye con acciones responsables."
            },
            {
                titulo: "Respeto",
                imagen: "../img/originales/Entrega dulce en Samkaneli.png",
                alt: "Rollo de canela con cobertura frutal",
                descripcion:
                    "Valoramos a las personas, escuchamos sus ideas y reconocemos " +
                    "la riqueza cultural y gastronómica de nuestra región.",
                frase: "El respeto nos acerca y nos ayuda a crecer juntos."
            },
            {
                titulo: "Compromiso",
                imagen: "../img/mockups/fondo-aplicaciones.png",
                alt: "Productos artesanales de SAMKANELI",
                descripcion:
                    "Nos esforzamos por cumplir nuestros compromisos y ofrecer " +
                    "una experiencia agradable desde el pedido hasta la entrega.",
                frase: "Ponemos dedicación en cada producto y cada encuentro."
            },
            {
                titulo: "Innovación",
                imagen: "../img/mockups/envultura.jpeg",
                alt: "Sabores frutales de SAMKANELI",
                ajuste: "contain",         /* imagen completa */
                posicion: "left center",   /* pegada a la izquierda */
                descripcion:
                    "Creamos combinaciones y presentaciones inspiradas en frutas " +
                    "de nuestra Selva Central para ofrecer experiencias diferentes.",
                frase: "La creatividad convierte nuestros sabores en experiencias."
            }
        ];

        if (
            opcionesValor.length &&
            panelValor &&
            fotoValor &&
            numeroValor &&
            tituloValor &&
            descripcionValor &&
            fraseValor &&
            progresoValor &&
            anteriorValor &&
            siguienteValor
        ) {
            var indiceValorActual = 0;

            var cambiarValor = function (indice) {
                indiceValorActual =
                    (indice + datosValores.length) % datosValores.length;

                var dato = datosValores[indiceValorActual];

                opcionesValor.forEach(function (boton, i) {
                    var seleccionado = i === indiceValorActual;

                    boton.classList.toggle("activa", seleccionado);
                    boton.setAttribute(
                        "aria-pressed",
                        seleccionado ? "true" : "false"
                    );
                });

                numeroValor.textContent =
                    String(indiceValorActual + 1).padStart(2, "0");

                tituloValor.textContent = dato.titulo;
                descripcionValor.textContent = dato.descripcion;
                fraseValor.textContent = dato.frase;

                progresoValor.textContent =
                    String(indiceValorActual + 1).padStart(2, "0") +
                    " / " +
                    String(datosValores.length).padStart(2, "0");

                fotoValor.onerror = function () {
                    console.error(
                        "No se pudo cargar la fotografía:",
                        dato.imagen
                    );
                };

                fotoValor.src = dato.imagen;
                fotoValor.alt = dato.alt;

                /* Ajuste propio de cada imagen (si no lo tiene, vuelve al estilo del CSS) */
                fotoValor.style.objectFit = dato.ajuste || "";
                fotoValor.style.objectPosition = dato.posicion || "";

                panelValor.classList.remove("cambiando");
                void panelValor.offsetWidth;
                panelValor.classList.add("cambiando");
            };

            opcionesValor.forEach(function (boton, indice) {
                boton.addEventListener("click", function () {
                    cambiarValor(indice);
                });
            });

            anteriorValor.addEventListener("click", function () {
                cambiarValor(indiceValorActual - 1);
            });

            siguienteValor.addEventListener("click", function () {
                cambiarValor(indiceValorActual + 1);
            });

            cambiarValor(0);
        } else {
            console.warn(
                "Valores SAMKANELI: faltan elementos del HTML interactivo."
            );
        }
    }

})();