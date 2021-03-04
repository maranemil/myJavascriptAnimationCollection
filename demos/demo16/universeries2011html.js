
///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

THREE.Object3D.prototype.computeBoundingBoxes = function () {
    var a;
    if (this.geometry)this.geometry.computeBoundingBox(); 
	else for (var b in this.children)this.children.hasOwnProperty(b) && (a = this.children[b], a.computeBoundingBoxes())
};
Math2 = function () {
};
Math2.rand = function (a, b, c) {
    if (b > a)return Number.NaN;
    a = Math.random() * (a - b) + b;
    c = Math.pow(10, c);
    return~~(c * a + 0.5) / c
};
Math2.truncateVector2 = function (a, b) {
    a.setLength(Math.min(b, a.length()));
    return a
};
Math2.getAngleVector2 = function (a) {
    return Math.atan2(a.y, a.x)
};
Math2.setAngleVector2 = function (a, b) {
    var c = a.length();
    a.x = Math.cos(b) * c;
    a.y = Math.sin(b) * c
};
Math2.setLengthVector2 = function (a, b) {
    var c = Math2.getAngleVector2(a);
    a.x = Math.cos(c) * b;
    a.y = Math.sin(c) * b
};
Math2.floatPrecision = function (a, b) {
    b === void 0 && (b = 100);
    return Math.round(a * b) / b
};
Math2.isEven = function (a) {
    return a % 2 === 0 ? !0 : !1
};
Math2.randomBoolean = function () {
    return Math.round(Math.random()) === 1 ? !0 : !1
};
Math2.degreesToRadians = function (a) {
    return a * 180 / Math.PI
};
Math2.radiansToDegrees = function (a) {
    return a * Math.PI / 180
};
Math2.GOLDEN_RATIO = (Math.sqrt(5) - 1) / 2;
Math2.RADIAN_90 = Math.PI / 2;
ColorUtil = function () {
};
ColorUtil.hexToRgb = function (a) {
    return(a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a)) ? {r: parseInt(a[1], 16), g: parseInt(a[2], 16), b: parseInt(a[3], 16)} : null
};
ColorUtil.rgbToHex = function (a, b, c) {
    return"#" + (16777216 + (a << 16) + (b << 8) + c).toString(16).slice(1)
};

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var ColorManager = function () {
    function a() {
        var b = 0, c = "#6D0025,#57264E,#37536C,#787C5A,#78513F,#5B5B5B,#3B3B3B".split(","), a = "#FFC5DB,#D3A9CF,#D3E5F2,#F0F2D7,#EAD6CE,#EAEAEA,#BABABA".split(",");
        this.allDarkColors = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.textBackgrounds = "#6D0025,#57264E,#37536C,#787C5A,#78513F,#5B5B5B,#3B3B3B".split(",");
        for (var d, g, f, h, i = 0, j = 0, i = 0; i < this.allDarkColors.length; i++) {
            for (j = 0; j < 20; j++)f = ColorUtil.hexToRgb(c[i]), h = ColorUtil.hexToRgb(a[i]), b += 0.0080, d = Math.round(f.r + Math.sin(b) * h.r) / 255,
                g = Math.round(f.g + Math.sin(b) * h.g) / 255, f = Math.round(f.b + Math.sin(b) * h.b) / 255, this.allDarkColors[i].push({r: d, g: g, b: f});
            b = 0
        }
    }

    return a.prototype.constructor = a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Planet = function () {
    function a(b, c, a, d, g) {
        THREE.Object3D.call(this);
        this.id = g;
        this.labelID = "sr_" + g;
        this.index = c;
        this.groupIndex = b;
        this.data = HKI.parser.getShowrunnerById(g);
        this.explodeTimeline = new TimelineMax;
        this.opacityObj = {};
        this.data ? (this.showrunnerName = this.data.t, this.level = this.data.l / 10, this.clickable = this.data.l ? !0 : !1) : (this.showrunnerName = "Error", this.level = 0.5, this.clickable = !1);
        this._backTextColor = d;
        this._colorScheme = a;
        this.ootype = "planet";
        this.radius = this.level * 2 + 0.5;
        this.timeshift =
            Math.random() * 4;
        this.openShowrunnerSignal = new signals.Signal;
        this.mouseFromLeft = this.mouseFromTop = !1;
        this.xOffset = 1;
        this.material = HKI.faceMaterial;
        this.geometry = new THREE.IcosahedronGeometry(this.radius, 0.75);
        b = this.geometry.faces.length;
        for (c = 0; c < b; c++)new THREE.Color(a[c].r, a[c].g, a[c].b), this.geometry.materials.push(new THREE.MeshBasicMaterial({color: 16711680, overdraw: !1})), this.geometry.materials[c].color.setRGB(this._colorScheme[c].r, this._colorScheme[c].g, this._colorScheme[c].b), this.geometry.faces[c].materialIndex =
            c;
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.add(this.mesh);
        this.createTextNode()
    }

    a.prototype = new THREE.Object3D;
    a.prototype.constructor = a;
    a.prototype.createTextNode = function () {
        $("#textsCanvas").append('<div class="visulabel showRunnerName" id="' + this.labelID + '" style="background-color:' + this._backTextColor + ';">' + this.showrunnerName + "</div>")
    };
    a.prototype.moveText = function () {
        var b = $("#" + this.labelID), c = this.matrixWorld.getPosition().clone();
        c.subSelf(new THREE.Vector3(0, 0, 0));
        HKI.projector.projectVector(c,
            HKI.camera);
        c.x = (c.x + 1) * HKI.renderer.domElement.width * 0.5 - b.width() * 0.5;
        c.y = (-c.y + 1) * HKI.renderer.domElement.height * 0.5 + this.xOffset;
        b.css("left", c.x + "px");
        b.css("top", c.y + "px")
    };
    a.prototype.rollOver = function (b) {
        this.selected = !0;
        if (this.opened || this.parent.opened)HKI.soundPlayer.play("s_rolloverPlanet"), this.textRollOver();
        Math2.randomBoolean();
        var c = 0, a = 0, d = 0, a = this.mouseFromLeft ? Math2.rand(Math2.radiansToDegrees(120), Math2.radiansToDegrees(80), 1) : Math2.rand(Math2.radiansToDegrees(-80), Math2.radiansToDegrees(-120),
            1);
        this.mouseFromTop ? (c = Math2.rand(Math2.radiansToDegrees(60), Math2.radiansToDegrees(40), 1), d = Math2.rand(this.rotation.z + 0.7, this.rotation.z + 0.6, 1)) : (c = Math2.rand(Math2.radiansToDegrees(-40), Math2.radiansToDegrees(-60), 1), d = Math2.rand(-0.6, -0.7, 1));
        Math2.rand(this.position.x + 1, this.position.x - 1, 1);
        Math2.rand(this.position.y + 1, this.position.y - 1, 1);
        Math2.rand(this.position.z + 1, this.position.z - 1, 1);
        TweenMax.to(this.rotation, 1, {delay: 0.02 * b, x: c, y: a, z: d, ease: Expo.easeOut});
        TweenMax.to(this.scale, 1, {delay: 0.02 *
            b, x: 1.6, y: 1.6, z: 1.6, ease: Elastic.easeOut})
    };
    a.prototype.rollOut = function () {
        this.selected = !1;
        this.opened || this.textRollOut();
        TweenMax.killTweensOf(this.rotation);
        TweenMax.killTweensOf(this.scale);
        TweenMax.to(this.rotation, 1, {x: 0, y: 0, z: 0, ease: Expo.easeOut});
        TweenMax.to(this.scale, 1, {x: 1, y: 1, z: 1, ease: Expo.easeOut})
    };
    a.prototype.textRollOver = function () {
        var b = $("#" + this.labelID), c = [
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 0, y: 0}
        ];
        this.checkFromWhereIsTheRollOver();
        TweenMax.killTweensOf(b);
        this.mouseFromLeft ? (c[0].x = -70,
            c[1].x = -90, c[2].x = -20) : (c[0].x = 70, c[1].x = 90, c[2].x = 20);
        this.mouseFromTop ? (c[0].y = -40, c[1].y = -10, c[2].y = -6, this.xOffset = -50) : (c[0].y = 0, c[1].y = 30, c[2].y = 10, this.xOffset = 20);
        TweenMax.to(b, 1, {css: {opacity: 1, bezier: {type: "soft", values: c, autoRotate: !1}}, ease: Expo.easeOut})
    };
    a.prototype.textRollOut = function () {
        var b = $("#" + this.labelID);
        TweenMax.to(b, 1, {css: {opacity: 0}, ease: Expo.easeOut})
    };
    a.prototype.checkFromWhereIsTheRollOver = function () {
        if (HKI.mouseDirection) {
            var b = Math2.floatPrecision(HKI.mouseDirection.normalize().x,
                1E3), c = Math2.floatPrecision(HKI.mouseMoveStorage[0].normalize().x, 1E3), a = Math2.floatPrecision(HKI.mouseDirection.normalize().y, 1E3), d = Math2.floatPrecision(HKI.mouseMoveStorage[0].normalize().y, 1E3);
            this.mouseFromTop = a > d ? !0 : !1;
            this.mouseFromLeft = b > c ? !0 : !1
        }
    };
    a.prototype.onOpen = function () {
        this.opened = !0;
        this.rollOver()
    };
    a.prototype.onClose = function () {
        this.opened = !1;
        this.rollOut()
    };
    a.prototype.openShowrunner = function (b) {
        this.selected = this.opened = !0;
        this.explode(b);
        this.openShowrunnerSignal.dispatch(this.id)
    };
    a.prototype.closeShowrunner = function () {
        this.unExplode()
    };
    a.prototype.onRemove = function () {
        $("#" + this.labelID).remove()
    };
    a.prototype.getRelatedPlanetsIds = function () {
        var b = this.data.ww ? this.data.ww.split(",") : [], c = this.data.wf ? this.data.wf.split(",") : [], a = this.data.mw ? this.data.mw.split(",") : [], d = this.data.hi ? this.data.hi.split(",") : [], g = this.data["in"] ? this.data["in"].split(",") : [], f = this.data.ib ? this.data.ib.split(",") : [];
        return b.concat(c).concat(a).concat(d).concat(g).concat(f)
    };
    a.prototype.explode =
        function (b, c) {
            this.exploded = !0;
            this.killFaceTweens();
            this.explodeTimeline = new TimelineMax;
            THREE.GeometryUtils.explode(this.geometry);
            this.mesh.doubleSided = !0;
            var a = this.geometry.faces, d = this.geometry.vertices, g = a.length, f = d.length, h, i, j, c = c || 1;
            this.verticesInit = [];
            for (var k = 0; k < f; k++)this.verticesInit.push(d[k].clone());
            for (k = 0; k < g; k++) {
                f = a[k];
                h = f.normal.clone().multiplyScalar(2);
                i = d[f.a].clone().addSelf(h);
                j = d[f.b].clone().addSelf(h);
                h = d[f.c].clone().addSelf(h);
                var l = 0.0060 * k;
                this.explodeTimeline.insert(TweenMax.to(d[f.a],
                    0.6, {delay: c, x: i.x, y: i.y, z: i.z, ease: Expo.easeInOut}), l);
                this.explodeTimeline.insert(TweenMax.to(d[f.b], 0.6, {delay: c, x: j.x, y: j.y, z: j.z, ease: Expo.easeInOut}), l);
                this.explodeTimeline.insert(TweenMax.to(d[f.c], 0.6, {delay: c, x: h.x, y: h.y, z: h.z, ease: Expo.easeInOut}), l)
            }
        };
    a.prototype.unExplode = function () {
        this.exploded = !1;
        this.explodeTimeline.timeScale = 8;
        this.explodeTimeline.reverse()
    };
    a.prototype.tweenToPosition = function (b, c, a, d) {
        this.killPositionTweening();
        d = d || Expo.easeOut;
        this.initPosition = b;
        TweenMax.to(this.position,
            c, {delay: a || 0, x: b.x, y: b.y, z: b.z, ease: d})
    };
    a.prototype.tweenToOpacity = function (b, c, a) {
        TweenMax.killTweensOf(this.opacityObj);
        this.opacityObj = {opacity: this.mesh.geometry.materials[0].opacity};
        TweenMax.to(this.opacityObj, c, {delay: a || 0, opacity: b, ease: Linear.easeNone, onUpdate: function () {
            for (var b = 0; b < this.mesh.geometry.materials.length; ++b)this.mesh.geometry.materials[b].opacity = this.opacityObj.opacity
        }.bind(this)})
    };
    a.prototype.applyDepthRendering = function () {
        for (var b = (this.position.z + 20) / 40, c = 0; c < this.mesh.geometry.materials.length; ++c)this.mesh.geometry.materials[c].opacity =
            b
    };
    a.prototype.floatInSpace = function (b) {
        this.position.y = this.initPosition.y + Math.cos(b + this.timeshift) * 0.5
    };
    a.prototype.killFaceTweens = function () {
        this.explodeTimeline.timeScale = 1;
        this.explodeTimeline.kill();
        this.explodeTimeline.clear();
        this.explodeTimeline = null
    };
    a.prototype.killPositionTweening = function () {
        TweenMax.killTweensOf(this.position)
    };
    a.prototype.destroy = function () {
        this.openShowrunnerSignal.removeAll();
        $("#" + this.labelID).remove();
        this.tweenOpacity && this.tweenOpacity.stop();
        this.killPositionTweening();
        this.killFaceTweens()
    };
    a.prototype.update = function (b, c) {
        c && this.floatInSpace(b);
        (this.selected && this.parent.opened || this.opened) && this.moveText()
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Galaxy = function () {
    function a(b, c, a, d, g, f, h, i) {
        THREE.Object3D.call(this);
        this.colorIndex = a;
        this.planets = [];
        this.lines = [];
        this.initNbPlanets = d;
        this.nbPlanets = parseInt(d, 10);
        this.interactivePlanets = [];
        this.ootype = "galaxy";
        this.opened = !1;
        this.worldDimensions = g;
        this.worldDimensionsOpened = f;
        this.showLines = this.shown = !0;
        this.familyName = b;
        this.tempOpenedPlanetId = this.openedPlanetId = -1;
        this.openShowrunnerSignal = new signals.Signal;
        this.closeShowrunnerSignal = new signals.Signal;
        this.planetOpenedSignal = new signals.Signal;
        this.toSide = !1;
        this.data = h;
        this.circleRadius = i;
        this.relatedShown = !1;
        this.opacityObj = {};
        this.indexGalaxy = c;
        new THREE.LineBasicMaterial({color: 16711680, lineWidth: 2});
        this.textBackgrounds = HKI.colorManager.textBackgrounds;
        this.colorSchemes = HKI.colorManager.allDarkColors;
        this.colorScheme = this.colorSchemes[a % (this.colorSchemes.length - 1)];
        this.textBackgroundColor = this.textBackgrounds[a % (this.textBackgrounds.length - 1)];
        this.lineMaterial = new THREE.LineBasicMaterial({color: this.colorScheme[0], opacity: 0.5, linewidth: 1});
        this.lineMaterial.color.setRGB(this.colorScheme[0].r, this.colorScheme[0].g, this.colorScheme[0].b);
        for (b = 0; b < this.nbPlanets; b++)this.addPlanet(b);
        this.bboxGeom = new THREE.CubeGeometry(1, 1, 1);
        this.bbox = new THREE.Mesh(this.bboxGeom, new THREE.MeshBasicMaterial({color: 16777215, wireframe: !0}));
        this.add(this.bbox);
        this.bbox.visible = !1;
        this.computeGalaxyBoundingBox();
        if (this.showLines)this.createLinks(), this.line.visible = !1;
        this.createTextNode()
    }

    a.prototype = new THREE.Object3D;
    a.prototype.constructor = a;
    a.prototype.createTextNode =
        function () {
            $("#textsCanvas").append('<div class="visulabel galaxyName" id="galaxy_' + this.indexGalaxy + '" style="background-color:' + this.textBackgroundColor + ';">' + this.familyName + "</div>")
        };
    a.prototype.moveText = function () {
        var b = $("#galaxy_" + this.indexGalaxy), c = this.matrixWorld.getPosition().clone();
        this.nbPlanets === 1 ? c.addSelf(new THREE.Vector3(0, -3, 0)) : c.addSelf(new THREE.Vector3(0, -this.radius - 1, 0));
        HKI.projector.projectVector(c, HKI.camera);
        c.x = (c.x + 1) * HKI.renderer.domElement.width * 0.5 - b.width() *
            0.5;
        c.y = (-c.y + 1) * HKI.renderer.domElement.height * 0.5;
        b.css("left", c.x + "px");
        b.css("top", c.y + "px")
    };
    a.prototype.setWorldSize = function (b, c, a) {
        for (var d = 0; d < this.nbPlanets; d++)this.planets[d].setWorldSize(b, c, a)
    };
    a.prototype.createLinks = function () {
        this.line && this.remove(this.line);
        for (var b = new THREE.Geometry, c = 0; c < this.nbPlanets; c++)b.vertices.push(this.planets[c].position);
        this.line = new THREE.Line(b, this.lineMaterial);
        this.add(this.line);
        this.line.dynamic = !0
    };
    a.prototype.addPlanet = function (b) {
        b = this.data === void 0 ? new Planet(this.indexGalaxy, b, this.colorScheme, this.textBackgroundColor) : new Planet(this.indexGalaxy, b, this.colorScheme, this.textBackgroundColor, this.data[b]);
        this.planets.push(b);
        this.add(b);
        this.interactivePlanets.push(b.mesh);
        this.placeAtRandom(b, 2, 0);
        b.openShowrunnerSignal.add(this.onShowrunnerOpened.bind(this))
    };
    a.prototype.removePlanet = function (b) {
        var c = this.planets[b];
        c.onRemove();
        this.planets.splice(b, 1);
        this.interactivePlanets.splice(b, 1);
        this.remove(c)
    };
    a.prototype.addRelatedPlanet =
        function (b) {
            var c = 5, a = 5, d = HKI.parser.getShowrunnerFamilyById(b);
            if (d)c = d.index, a = parseInt(d.color, 10);
            b = new Planet(c, this.planets.length, this.colorSchemes[a % this.colorSchemes.length], this.textBackgrounds[a % this.textBackgrounds.length], b);
            this.planets.push(b);
            this.add(b);
            this.interactivePlanets.push(b.mesh);
            b.openShowrunnerSignal.add(this.onShowrunnerOpened.bind(this))
        };
    a.prototype.showExtraPlanets = function (b) {
        this.extraPlanets = b;
        this.nbPlanets = parseInt(this.nbPlanets, 10) + parseInt(b, 10);
        for (var c =
            this.planets.length, a = 0; a < b; a++)this.addPlanet(c + a)
    };
    a.prototype.hideExtraPlanets = function () {
        for (var b = this.nbPlanets - 1; b >= this.initNbPlanets; b--)this.removePlanet(b);
        this.nbPlanets = parseInt(this.initNbPlanets, 10);
        this.extraPlanets = 0
    };
    a.prototype.showRelatedPlanets = function (b) {
        this.relatedShown = !0;
        this.tempOpenedPlanetId = this.openedPlanetId;
        for (var c = this.nbPlanets - 1; c >= 0; c--)this.planets[c] !== b && this.removePlanet(c);
        b.index = 0;
        this.openedPlanetId = b.index;
        this.nbPlanets = parseInt(this.planets.length,
            10);
        var a = b.getRelatedPlanetsIds();
        for (c in a)a.hasOwnProperty(c) && this.addRelatedPlanet(a[c]);
        this.nbPlanets = parseInt(this.planets.length, 10);
        this.createLinks();
        this.distributeCircular(b, this.circleRadius, 0, 1, void 0, Expo.easeOut);
        b.tweenToPosition(new THREE.Vector3(0, 0, 3), 0);
        b.rollOver()
    };
    a.prototype.hideRelatedPlanetsAndShowGalaxy = function (b) {
        this.hideRelatedPlanets();
        this.nbPlanets = parseInt(this.initNbPlanets, 10) + parseInt(this.extraPlanets, 10);
        this.openedPlanetId = this.tempOpenedPlanetId;
        var c =
            this.planets[this.openedPlanetId];
        b ? this.distributeRandom() : (this.distributeCircular(c, this.circleRadius, 0, 1, void 0, Expo.easeOut), c.tweenToPosition(new THREE.Vector3(0, 0, 3), 0), c.explode(1, 1), c.openShowrunnerSignal.dispatch(c.id));
        this.createLinks()
    };
    a.prototype.hideRelatedPlanets = function () {
        this.relatedShown = !1;
        for (var b = this.nbPlanets - 1; b >= 0; b--)this.removePlanet(b);
        for (b = 0; b < parseInt(this.initNbPlanets, 10) + parseInt(this.extraPlanets, 10); b++)this.addPlanet(b);
        this.nbPlanets = parseInt(this.planets.length,
            10)
    };
    a.prototype.openPlanet = function (b, c) {
        c = c || 1;
        this.openedPlanetId >= 0 && this.planets[this.openedPlanetId] && this.toSide && this.planets[this.openedPlanetId].closeShowrunner();
        var a = this.planets[parseInt(b, 10)];
        this.distributeCircular(a, this.circleRadius, 0, c);
        a.tweenToPosition(new THREE.Vector3(0, 0, 3), c);
        this.openedPlanetId = b;
        this.toSide = !0;
        this.planetOpenedSignal.dispatch(this)
    };
    a.prototype.distributeCircular = function (b, c, a, d, g, f) {
        var h, i = Math.PI * 2 / this.nbPlanets, j = 0, k = a === void 0 ? 0 : a, d = d === void 0 ? 1 :
            d, f = f || Expo.easeOut, l;
        for (l in this.planets)if (this.planets.hasOwnProperty(l) && (a = this.planets[l], a !== b)) {
            if (a.opened)a.onClose();
            Math.random();
            h = j * i;
            g !== void 0 && a.position.set(Math.sin(h) * g, Math.cos(h) * g, 0);
            a.tweenToPosition(new THREE.Vector3(Math.sin(h) * c, Math.cos(h) * c, 0), d, k * j, f);
            j++
        }
        this.currentDistribution = "circular"
    };
    a.prototype.distributeRandom = function () {
        for (var b in this.planets)if (this.planets.hasOwnProperty(b)) {
            if (this.planets[b].opened)this.planets[b].onClose();
            this.placeAtRandom(this.planets[b],
                1, 0.01 * b, Expo.easeOut)
        }
        this.currentDistribution = "random"
    };
    a.prototype.placeAtRandom = function (b, c, a, d) {
        var d = d || Expo.easeOut, g = this.opened ? this.worldDimensionsOpened : this.worldDimensions, f = new THREE.Vector3;
        f.x = Math.random() * g - g * 0.5;
        f.y = Math.random() * g - g * 0.5;
        f.z = Math.random() * g - g * 0.5;
        b.tweenToPosition(f, c, a, d)
    };
    a.prototype.rollOver = function () {
        this.selected = !0;
        for (var b = 0; b < this.planets.length; b++)this.planets[b].rollOver(b);
        this.line.visible = !0;
        this.createLinks();
        this.textRollOver();
        HKI.soundPlayer.play("s_rolloverGalaxy")
    };
    a.prototype.rollOut = function () {
        this.selected = !1;
        for (var b in this.planets)this.planets[b].selected && this.planets[b].rollOut();
        if (this.line) {
            if (!this.planets[b].selected)this.line.material = this.lineMaterial;
            this.line.visible = !1
        }
        this.textRollOut()
    };
    a.prototype.textRollOver = function () {
        var b = $("#galaxy_" + this.indexGalaxy);
        TweenMax.killTweensOf(b);
        TweenMax.to(b, 0.6, {css: {opacity: 1, bezier: {type: "soft", values: [
            {x: -20, y: -60},
            {x: -10, y: -20}
        ], autoRotate: !1}}, ease: Expo.easeOut})
    };
    a.prototype.textRollOut = function () {
        var b =
            $("#galaxy_" + this.indexGalaxy);
        TweenMax.to(b, 0.4, {css: {opacity: 0.5, bezier: {type: "soft", values: [
            {x: -10, y: -20},
            {x: 0, y: 0}
        ], autoRotate: !1}}, ease: Expo.easeOut})
    };
    a.prototype.disappear = function () {
        this.shown = !1;
        for (var b in this.planets)this.planets.hasOwnProperty(b) && this.planets[b].tweenToOpacity(0, 0.8)
    };
    a.prototype.appear = function () {
        this.shown = !0;
        for (var b in this.planets)this.planets.hasOwnProperty(b) && this.planets[b].tweenToOpacity(1, 0.8)
    };
    a.prototype.onOpen = function () {
        this.rollOut();
        this.opened = !0;
        this.line.visible = !0;
        this.showExtraPlanets(this.data.length - this.initNbPlanets);
        this.createLinks();
        HKI.soundPlayer.play("s_openGalaxy");
        this.data.length === 1 && this.planets[0].textRollOver()
    };
    a.prototype.onClose = function () {
        if (this.data.length === 1)this.planets[0].textRollOut(), this.planets[0].opened = !1;
        for (var b in this.planets)this.planets[b].exploded && this.planets[b].unExplode();
        this.relatedShown && this.hideRelatedPlanetsAndShowGalaxy(!0);
        this.opened = !1;
        this.currentDistribution === "circular" && this.data.length >
            1 && this.distributeRandom();
        this.data.length === 1 && this.planets[0].tweenToPosition(new THREE.Vector3(0, 0, 0), 500, 0);
        this.hideExtraPlanets();
        this.openedPlanetId = -1;
        this.line.visible = !1
    };
    a.prototype.backToCenter = function () {
        this.toSide = !1;
        var b = this.planets[this.openedPlanetId];
        this.relatedShown ? this.hideRelatedPlanetsAndShowGalaxy(!0) : b.closeShowrunner();
        this.onShowrunnerClosed(b.id)
    };
    a.prototype.tweenLineOpacityTo = function (b, c, a) {
        if (this.line)TweenMax.killTweensOf(this.opacityObj), this.opacityObj = {opacity: this.lineMaterial.opacity},
            TweenMax.to(this.opacityObj, c, {delay: a, opacity: b, ease: Linear.easeNone, onComplete: function () {
                this.visible = !1
            }.bind(this), onUpdate: function () {
                this.lineMaterial.opacity = this.opacityObj.opacity
            }.bind(this)})
    };
    a.prototype.onShowrunnerOpened = function (b) {
        this.openShowrunnerSignal.dispatch(b)
    };
    a.prototype.onShowrunnerClosed = function (b) {
        this.closeShowrunnerSignal.dispatch(b)
    };
    a.prototype.getPlanetByShowrunnerId = function (b) {
        for (var c in this.planets)if (parseInt(this.planets[c].id, 10) === b)return this.planets[c];
        return null
    };
    a.prototype.destroy = function () {
        var b = $("#galaxy_" + this.indexGalaxy), c;
        for (c in this.planets)this.planets.hasOwnProperty(c) && (this.planets[c].destroy(), this.remove(this.planets[c]));
        this.openShowrunnerSignal.removeAll();
        this.closeShowrunnerSignal.removeAll();
        this.planetOpenedSignal.removeAll();
        b.remove();
        TweenMax.killTweensOf(b)
    };
    a.prototype.computeGalaxyBoundingBox = function () {
        var b = new THREE.Vector3(0, 0, 0), c = new THREE.Vector3(0, 0, 0);
        if (this.nbPlanets === 1)b.x = this.planets[0].position.x -
            5, b.y = this.planets[0].position.y - 5, b.z = this.planets[0].position.z - 5, c.x = this.planets[0].position.x + 5, c.y = this.planets[0].position.y + 5, c.z = this.planets[0].position.z + 5; else {
            var a, d = new THREE.Vector3(0, 0, 0), g = new THREE.Vector3(0, 0, 0), f;
            for (f in this.planets)if (this.planets.hasOwnProperty(f)) {
                a = this.planets[f];
                if (a.position.x < this.planets[d.x].position.x)d.x = f;
                if (a.position.y < this.planets[d.y].position.y)d.y = f;
                if (a.position.z < this.planets[d.z].position.z)d.z = f;
                if (a.position.x > this.planets[g.x].position.x)g.x =
                    f;
                if (a.position.y > this.planets[g.y].position.y)g.y = f;
                if (a.position.z > this.planets[g.z].position.z)g.z = f
            }
            b.x = this.planets[d.x].position.x;
            b.y = this.planets[d.y].position.y;
            b.z = this.planets[d.z].position.z;
            c.x = this.planets[g.x].position.x;
            c.y = this.planets[g.y].position.y;
            c.z = this.planets[g.z].position.z
        }
        this.galaxyBoundingBox = {min: b, max: c}
    };
    a.prototype.update = function (b) {
        if (this.shown) {
            for (var c = 0; c < this.nbPlanets; c++)this.planets[c].update(b, this.currentDistribution !== "circular");
            if (!this.opened)this.moveText(),
                this.computeGalaxyBoundingBox(), b = this.galaxyBoundingBox, this.bboxGeom.vertices[0].set(b.max.x, b.max.y, b.min.z), this.bboxGeom.vertices[1].set(b.max.x, b.max.y, b.max.z), this.bboxGeom.vertices[2].set(b.max.x, b.min.y, b.min.z), this.bboxGeom.vertices[3].set(b.max.x, b.min.y, b.max.z), this.bboxGeom.vertices[4].set(b.min.x, b.max.y, b.max.z), this.bboxGeom.vertices[5].set(b.min.x, b.max.y, b.min.z), this.bboxGeom.vertices[6].set(b.min.x, b.min.y, b.max.z), this.bboxGeom.vertices[7].set(b.min.x, b.min.y, b.min.z), this.bboxGeom.verticesNeedUpdate = !0, this.bboxGeom.computeBoundingSphere()
        }
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Sky = function () {
    function a() {
        THREE.Object3D.call(this);
        this.createParticleSystem(300)
    }

    a.prototype = new THREE.Object3D;
    a.prototype.constructor = a;
    a.prototype.createParticleSystem = function (b) {
        this.particleZone = new THREE.Vector2(200, 100);
        this.particleMaterial = new THREE.ParticleBasicMaterial({map: new THREE.Texture(this.generateSprite()), blending: THREE.AdditiveBlending});
        this.particles = [];
        for (var c, a, d = 0; d < b; d++) {
            c = new THREE.Particle(this.particleMaterial);
            for (a = Math.random() * this.particleZone.x - this.particleZone.y; a -
                100 < 30 && a - 100 > -30;)a = Math.random() * this.particleZone.x - this.particleZone.y;
            c.position.x = Math.random() * this.particleZone.x - this.particleZone.y;
            c.position.y = Math.random() * this.particleZone.x - this.particleZone.y;
            c.position.z = a;
            c.scale.x = c.scale.y = c.scale.z = 0.05;
            this.add(c);
            this.particles.push(c)
        }
    };
    a.prototype.generateSprite = function () {
        var b = document.createElement("canvas");
        b.width = 16;
        b.height = 16;
        var c = b.getContext("2d"), a = c.createRadialGradient(b.width / 2, b.height / 2, 0, b.width / 2, b.height / 2, b.width / 2);
        a.addColorStop(0, "rgba(255,255,255,1)");
        a.addColorStop(0.2, "rgba(255,255,255,1)");
        a.addColorStop(0.4, "rgba(64,64,64,1)");
        a.addColorStop(1, "rgba(0,0,0,0)");
        c.fillStyle = a;
        c.fillRect(0, 0, b.width, b.height);
        return b
    };
    a.prototype.createSkyBox = function () {
        this.imageTexture = new Image;
        this.imageTexture.onload = this.textureLoaded.bind(this);
        this.imageTexture.src = "textures/stelar.jpg"
    };
    a.prototype.textureLoaded = function () {
        this.skyTexture = new THREE.Texture(this.imageTexture);
        this.skyTexture.wrapS = THREE.RepeatWrapping;
        this.skyTexture.wrapT = THREE.RepeatWrapping;
        this.skyTexture.repeat.x = this.skyTexture.repeat.y = 3;
        this.skyMaterial = new THREE.MeshBasicMaterial({map: this.skyTexture});
        this.skyGeom = new THREE.CubeGeometry(600, 300, 300, 7, 7, 7, [this.skyMaterial, this.skyMaterial, this.skyMaterial, this.skyMaterial, this.skyMaterial, this.skyMaterial]);
        this.skyMesh = new THREE.Mesh(this.skyGeom, new THREE.MeshFaceMaterial);
        this.add(this.skyMesh);
        this.skyMesh.flipSided = !0
    };
    a.prototype.update = function () {
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Visualizer = function () {
    function a(b) {
        this.dom = b;
        this.cameraSpeed = 1;
        this.mouseDirection = new THREE.Vector3(0, 0, 1);
        this.mouseCamera = new THREE.Vector2(0, 0);
        this.cameraPosDest = new THREE.Vector3(0, 0, 100);
        this.cameraCenter = new THREE.Vector3(0, 0, 0);
        this.cameraSphereSize = 100;
        this.interactiveGalaxies = [];
        this.overdraw = this.galaxyOpened = !1;
        this.openShowrunnerSignal = new signals.Signal;
        this.closeShowrunnerSignal = new signals.Signal;
        this.noResultCloseClickedSignal = new signals.Signal;
        this.coeffCameraX = -1;
        this.currentGalaxyIndex =
            0;
        this.isRendering = !0;
        this.createRenderer();
        this.init()
    }

    a.prototype.constructor = a;
    a.prototype.init = function () {
        this.camera = new THREE.PerspectiveCamera(45, this.dom.width / this.dom.height, 1, 2E3);
        this.camera.position.set(0, 0, 100);
        HKI.camera = this.camera;
        this.scene = new THREE.Scene;
        this.scene.add(this.camera);
        HKI.clock = new THREE.Clock;
        HKI.projector = new THREE.Projector;
        HKI.faceMaterial = new THREE.MeshFaceMaterial;
        this.galaxies = [];
        this.interactiveObjects = [];
        this.distanceObj = {};
        HKI.colorManager = new ColorManager;
        this.addGalaxies();
        this.sky = new Sky;
        this.scene.add(this.sky)
    };
    a.prototype.addGalaxies = function () {
        var b = HKI.parser.getGroup(), c;
        for (c in b)b.hasOwnProperty(c) && this.addGalaxy(b[c].n, c, parseInt(b[c].c, 10), b[c].m, b[c].d, b[c].d2, b[c].p, b[c].s, b[c].r)
    };
    a.prototype.instantShowrunnerOpen = function (b) {
        var c = HKI.parser.getShowrunnerGroupById(b).index, a = this.galaxies[c], d;
        for (d in this.galaxies)if (this.galaxies.hasOwnProperty(d)) {
            if (this.galaxyOpened) {
                if (this.galaxies[d].opened)this.galaxies[d].onClose();
                a.appear()
            }
            this.galaxies[d].rollOut()
        }
        this.cameraSphereSize =
            50;
        this.gotoGalaxy(c, 500);
        b = a.getPlanetByShowrunnerId(parseInt(b, 10));
        a.openPlanet(a.planets.indexOf(b), 1);
        this.cameraPosDest.z = this.cameraCenter.z = this.camera.position.z = parseInt(a.position.z, 10) + 15;
        this.cameraToSide(a, 500)
    };
    a.prototype.addGalaxy = function (b, c, a, d, g, f, h, i, j) {
        b = new Galaxy(b, c, a, d, g, f, i, j);
        this.scene.add(b);
        b.position.set(h.x, h.y, h.z);
        this.galaxies.push(b);
        b.computeGalaxyBoundingBox();
        this.interactiveGalaxies.push(b.bbox);
        this.interactiveObjects = this.interactiveGalaxies;
        this.nbGalaxies =
            this.galaxies.length;
        b.openShowrunnerSignal.add(this.onShowrunnerOpened.bind(this));
        b.closeShowrunnerSignal.add(this.onShowrunnerClosed.bind(this));
        b.planetOpenedSignal.add(this.gotoPlanet.bind(this));
        b.planets.length === 1 && (c = (new THREE.Vector3(0, 0, 0)).addSelf(h.clone().multiplyScalar(0.5)), b.position.set(c.x, c.y, c.z), TweenMax.to(b.position, 1, {x: h.x, y: parseInt(h.y, 10) + 5, z: h.z, ease: Expo.easeOut}))
    };
    a.prototype.showNoResultPlanet = function () {
        this.hideNoResultPlanet();
        this.noResultPlanet = new Planet(0,
            0, HKI.colorManager.allDarkColors[5], 0, 0);
        this.noResultPlanet.scale.set(4, 4, 4);
        this.noResultPlanet.position.set(0, 0, -20);
        this.noResultPlanet2 = new Planet(0, 0, HKI.colorManager.allDarkColors[6], 0, 0);
        this.noResultPlanet2.scale.set(2, 2, 2);
        this.scene.add(this.noResultPlanet);
        this.scene.add(this.noResultPlanet2);
        this.noResultPlanet.explode(0.1, 0.1);
        this.noResultPlanet2.explode(0.1, 0.1);
        this.noResultShown = !0
    };
    a.prototype.hideNoResultPlanet = function () {
        if (this.noResultShown)this.scene.remove(this.noResultPlanet),
            this.scene.remove(this.noResultPlanet2), this.noResultPlanet.destroy(), this.noResultPlanet2.destroy(), this.noResultPlanet2 = this.noResultPlanet = null;
        this.noResultShown = !1
    };
    a.prototype.createRenderer = function () {
        this.renderer && this.dom.container.removeChild(this.renderer.domElement);
        this.renderer = new THREE.CanvasRenderer({});
        this.renderer.setSize(this.dom.width, this.dom.height);
        this.dom.container.appendChild(this.renderer.domElement);
        HKI.renderer = this.renderer
    };
    a.prototype.changeOverdraw = function (b) {
        this.overdraw =
            b;
        var c, a, d;
        for (d in this.galaxies)if (this.galaxies.hasOwnProperty(d)) {
            var b = this.galaxies[d], g;
            for (g in b.planets)if (b.planets.hasOwnProperty(g)) {
                c = b.planets[g];
                for (var f in c.geometry.materials)if (c.geometry.materials.hasOwnProperty(f))a = c.geometry.materials[f], a.overdraw = this.overdraw
            }
        }
    };
    a.prototype.onShowrunnerOpened = function (b) {
        this.openShowrunnerSignal.dispatch(b)
    };
    a.prototype.onShowrunnerClosed = function (b) {
        this.closeShowrunnerSignal.dispatch(b)
    };
    a.prototype.onMouseMove = function (b) {
        HKI.mouseMoveStorage.length >
            2 && HKI.mouseMoveStorage.shift();
        HKI.mouseDirection = new THREE.Vector2(b.clientX, b.clientY);
        HKI.mouseMoveStorage.push(HKI.mouseDirection);
        this.mouseX = b.clientX;
        this.mouseY = b.clientY;
        this.mouseDirection.x = b.clientX / this.dom.width * 2 - 1;
        this.mouseDirection.y = -(b.clientY / this.dom.height) * 2 + 1;
        this.mouseDirection.z = 1;
        this.cameraSided ? (this.mouseCamera.x = (b.clientX / this.dom.width - 0.5) * 0.2, this.mouseCamera.y = (b.clientY / this.dom.height - 0.5) * 0.2) : (this.mouseCamera.x = this.coeffCameraX * (b.clientX / this.dom.width) +
            -this.coeffCameraX * 0.5, this.mouseCamera.y = b.clientY / this.dom.height - 0.5);
        this.updateCameraPosition()
    };
    a.prototype.onKeyPressed = function () {
    };
    a.prototype.onClick = function () {
        var b, c;
        if (this.noResultShown)this.noResultCloseClickedSignal.dispatch(); else {
            for (var a in this.galaxies)if (this.galaxies[a].selected) {
                this.gotoGalaxy(a);
                return
            } else if (this.galaxies[a].opened) {
                c = this.galaxies[a];
                for (var d in this.galaxies[a].planets)if (this.galaxies[a].planets[d].selected) {
                    b = c.planets[d].index;
                    b !== this.galaxies[a].openedPlanetId ?
                        c.planets[d].clickable && (this.galaxies[a].openPlanet(parseInt(b, 10)), this.cameraToSide(c)) : c.toSide ? c.relatedShown ? c.hideRelatedPlanetsAndShowGalaxy() : c.showRelatedPlanets(c.planets[b]) : this.cameraToSide(c);
                    return
                }
                break
            }
            this.cameraSided && this.cameraToCenter(c);
            this.goBackToUniverse()
        }
    };
    a.prototype.cameraToSide = function (b, c) {
        b.toSide = !0;
        var a = b.planets[b.openedPlanetId];
        a.openShowrunner(c === void 0 ? 2 : c);
        this.cameraSided = !0;
        this.killCamerasTweens();
        TweenMax.to(this.cameraCenter, 1, {x: b.position.x - 22,
            y: parseInt(b.position.y, 10) + 4, ease: Expo.easeOut, onUpdate: this.updateCameraPosition.bind(this)})
    };
    a.prototype.cameraToCenter = function (b) {
        b && (b.backToCenter(), this.tweenCameraTo(new THREE.Vector3(b.position.x, b.position.y, b.position.z + 15), 50, 2));
        this.cameraSided = !1
    };
    a.prototype.gotoGalaxy = function (b, c) {
        this.coeffCameraX = 1;
        this.galaxyOpened = !0;
        c = c || 0.8;
        this.currentGalaxyIndex = b;
        var a = this.galaxies[b];
        a.onOpen();
        this.tweenCameraTo(new THREE.Vector3(a.position.x, a.position.y, parseInt(a.position.z, 10) +
            15), 50, c);
        for (var d in this.galaxies)this.galaxies[d] !== a && this.galaxies[d].disappear();
        this.interactiveObjects = a.interactivePlanets;
        $(".galaxyName").fadeOut("fast");
        a.data.length === 1 && setTimeout(function () {
            a.openPlanet(0);
            this.cameraToSide(a)
        }.bind(this), c * 100)
    };
    a.prototype.gotoPlanet = function () {
        this.coeffCameraX = -1
    };
    a.prototype.goBackToUniverse = function () {
        this.coeffCameraX = -1;
        this.galaxyOpened = !1;
        this.tweenCameraTo(new THREE.Vector3(0, 0, 0), 100, 2);
        this.interactiveObjects = this.interactiveGalaxies;
        for (var b in this.galaxies)if (this.galaxies.hasOwnProperty(b)) {
            if (this.galaxies[b].opened)this.galaxies[b].onClose();
            this.galaxies[b].shown || this.galaxies[b].appear()
        }
        $(".galaxyName").fadeIn()
    };
    a.prototype.updateCameraPosition = function () {
        this.cameraPosDest.x = this.cameraCenter.x + Math.cos(this.mouseCamera.x - Math.PI * 0.5) * this.cameraSphereSize;
        this.cameraPosDest.y = this.cameraCenter.y + Math.cos(this.mouseCamera.y - Math.PI * 0.5) * this.cameraSphereSize;
        this.cameraPosDest.z = this.cameraCenter.z + (Math.abs(Math.sin(this.mouseCamera.y -
            Math.PI * 0.5) * this.cameraSphereSize) + Math.abs(Math.sin(this.mouseCamera.x - Math.PI * 0.5) * this.cameraSphereSize)) * 0.5
    };
    a.prototype.tweenCameraTo = function (b, c, a) {
        this.killCamerasTweens();
        this.distanceObj = {x: this.cameraSphereSize};
        TweenMax.to(this.cameraCenter, a, {x: b.x, y: b.y, z: b.z, ease: Expo.easeOut, onUpdate: this.updateCameraPosition.bind(this)});
        TweenMax.to(this.distanceObj, a, {x: c, ease: Expo.easeOut, onUpdate: function () {
            this.cameraSphereSize = this.distanceObj.x
        }.bind(this)})
    };
    a.prototype.resize = function () {
        this.renderer.setSize(window.innerWidth,
            window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix()
    };
    a.prototype.killCamerasTweens = function () {
        TweenMax.killTweensOf(this.cameraCenter);
        TweenMax.killTweensOf(this.distanceObj)
    };
    a.prototype.clear = function () {
        for (var b in this.galaxies)this.galaxies.hasOwnProperty(b) && (this.galaxies[b].destroy(), this.scene.remove(this.galaxies[b]));
        this.galaxies = [];
        this.interactiveObjects = [];
        this.interactiveGalaxies = [];
        this.nbGalaxies = 0;
        this.galaxyOpened = !1;
        this.tweenCameraTo(new THREE.Vector3(0, 0, 0), 100, 2)
    };
    a.prototype.getOpenedGalaxy = function () {
        for (var b in this.galaxies)if (this.galaxies[b].opened)return this.galaxies[b];
        return null
    };
    a.prototype.animate = function () {
        requestAnimationFrame(this.animate.bind(this));
        this.isRendering && this.render()
    };
    a.prototype.toggleRender = function () {
        this.isRendering = this.isRendering ? !1 : !0
    };
    a.prototype.pauseRender = function () {
        this.isRendering = !1
    };
    a.prototype.resumeRender = function () {
        this.isRendering = !0
    };
    a.prototype.render =
        function () {
            var b = HKI.clock.getElapsedTime(), c, a = this.mouseDirection.clone();
            HKI.projector.unprojectVector(a, this.camera);
            this.ray = new THREE.Ray(this.camera.position, a.subSelf(this.camera.position).normalize());
            this.intersects = this.ray.intersectObjects(this.interactiveObjects);
            a = this.intersects[0] ? this.intersects[0].object.parent : null;
            this.intersects.length > 0 && typeof a !== "undefined" && a !== null && a.ootype !== "undefined" && a.ootype !== null && (a.ootype === "galaxy" ? (c = a, c.selected || c.rollOver()) : a.ootype === "planet" &&
                (c = a, c.selected || c.rollOver()));
            for (var d, g = 0; g < this.nbGalaxies; g++) {
                a = this.galaxies[g];
                a.update(b);
                !this.galaxyOpened && a.selected && a !== c && a.rollOut();
                for (var f in a.planets)a.planets.hasOwnProperty(f) && (d = a.planets[f], this.galaxyOpened && d.selected && d !== c && d.rollOut())
            }
            this.noResultShown && (c = parseInt($("#closeNoResult").css("left"), 10), b = parseInt($("#closeNoResult").css("top"), 10), c += (this.mouseX - c) * 0.1, b += (this.mouseY - b) * 0.1, $("#closeNoResult").css({top: b + 2, left: c + 2}));
            this.camera.position.x += (this.cameraPosDest.x -
                this.camera.position.x) * 0.05;
            this.camera.position.y += (this.cameraPosDest.y - this.camera.position.y) * 0.05;
            this.camera.position.z += (this.cameraPosDest.z - this.camera.position.z) * 0.05;
            this.camera.lookAt(this.cameraCenter);
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera)
        };
    return a
}();

/*
*
*
*
*
*
*
*
*
*
*
*
*/

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Parser = function () {
    function a() {
        this.data = null;
        this.lang = $lang;
        this.currentIsSearch = !0;
        this.pathToJsonFiles = $base_url;
        this.jsonReadySignal = new signals.Signal;
        this.noResultSignal = new signals.Signal;
        this.init()
    }

    a.prototype.constructor = a;
    a.prototype.init = function () {
        this.parseDataShowrunners(jQuery.parseJSON(HKI.preloader.loader.getResult("j_showrunners").result));
        this.loadFamilies()
    };
    a.prototype.loadFamilies = function () {
        this.currentIsSearch = !1;
        this.parseDataGroups(jQuery.parseJSON(HKI.preloader.loader.getResult("j_families").result));
        this.familiesFr = this.groupsFr;
        this.familiesEn = this.groupsEn
    };
    a.prototype.loadGenres = function () {
        this.currentIsSearch = !1;
        var b = jQuery.parseJSON(HKI.preloader.loader.getResult("j_genres").result), c = 0, a, d, g = -10, f;
        for (c in b.fr)if (b.fr.hasOwnProperty(c))f = c * 2 * Math.PI / 7, g = parseInt(c / 7, 10) * -30, a = 38 - parseInt(c / 7, 10) * 4, d = 0 + a * Math.cos(f), a = -5 + a * Math.sin(f), b.fr[c].p = d + "," + a + "," + g;
        this.parseDataGroups(b)
    };
    a.prototype.loadFormat = function () {
        this.currentIsSearch = !1;
        this.parseDataGroups(jQuery.parseJSON(HKI.preloader.loader.getResult("j_formats").result))
    };
    a.prototype.loadSearchData = function (b) {
        if (b && b !== void 0) {
            this.currentIsSearch = !0;
            var a = 0, e = b.nodes.length > 20 ? 20 : b.nodes.length, d = [], g = 10;
            if (e === 0)this.noResultSignal.dispatch(); else {
                for (var f = [], h = [], a = 0; a < e; a++)$.inArray(b.nodes[a].node.n, f) === -1 && (f.push(b.nodes[a].node.n), h.push(b.nodes[a].node));
                e = h.length;
                for (a = 0; a < e; a++) {
                    HKI.parser.getShowrunnerGroupById(parseInt(h[a].n, 10));
                    var b = HKI.parser.getShowrunnerById(parseInt(h[a].n, 10)), i = a * 2 * Math.PI / 10, j, f = this.getShowrunnerFamilyById(parseInt(b.i,
                        10));
                    a === 0 ? i = j = 0 : (j = 0 + 30 * Math.cos(i), i = 0 + 30 * Math.sin(i));
                    g -= 3;
                    b = {i: b.i, n: b.t, s: "", p: new THREE.Vector3(j, i - 7, g), m: 1, d: 2, d2: 50, r: 15, c: f.color};
                    d.push(b)
                }
                this.groupsFr = d;
                for (a in this.groupsFr)if (this.groupsFr[a].s !== void 0)this.groupsFr[a].s = this.groupsFr[a].s.split(","), this.groupsFr[a].s[0] === "" ? this.groupsFr[a].s[0] = this.groupsFr[a].i : this.groupsFr[a].s.push(this.groupsFr[a].i);
                (this.groupsEn = this.groupsFr) && this.jsonReadySignal.dispatch()
            }
        }
    };
    a.prototype.parseDataGroups = function (b) {
        this.groupsFr =
            b.fr;
        this.groupsEn = b.en;
        for (var a in this.groupsFr)if (this.groupsFr.hasOwnProperty(a))this.groupsFr[a].s = this.groupsFr[a].s.split(","), b = this.groupsFr[a].p.split(","), this.groupsFr[a].p = new THREE.Vector3(b[0], b[1], b[2]);
        for (a in this.groupsEn)if (this.groupsEn.hasOwnProperty(a))this.groupsEn[a].s = this.groupsEn[a].s.split(","), b = this.groupsEn[a].p.split(","), this.groupsEn[a].p = new THREE.Vector3(b[0], b[1], b[2]);
        this.showrunnersFr && this.jsonReadySignal.dispatch()
    };
    a.prototype.parseDataShowrunners = function (b) {
        this.showrunnersFr =
            b.fr;
        this.showrunnersEn = b.en;
        this.groupsFr && this.jsonReadySignal.dispatch()
    };
    a.prototype.passThePositionsForGridImplementation = function () {
        for (var b = 0, a = 0, e = this.groupsFr.length, d = Math.round(e / 16 * 2), g = Math.round(e / d), f = -(g * 8), h = f, i = -(d * 10), b = 0; b < e; b++) {
            var j = new THREE.Vector3(0, 0, 0);
            a >= g && (a = 0, h = f, i += 20);
            j.x = h + 8;
            j.y = i + 4;
            j.z = -1 * d;
            this.groupsFr[b].p = j;
            a++;
            h += 16
        }
    };
    a.prototype.getShowrunnerById = function (b) {
        var a = this.lang === "fr" ? this.showrunnersFr : this.showrunnersEn, e;
        for (e in a)if (parseInt(a[e].i, 10) ===
            parseInt(b, 10))return a[e];
        return null
    };
    a.prototype.getShowrunnerGroupById = function (b) {
        var a = this.lang === "fr" ? this.groupsFr : this.groupsEn, e;
        for (e in a)if (a.hasOwnProperty(e))for (var d in a[e].s)if (parseInt(b, 10) === parseInt(a[e].s[d], 10))return{name: a[e].n, index: e};
        return null
    };
    a.prototype.getShowrunnerFamilyById = function (b) {
        console.log("getShowrunnerFamilyById: " + b);
        var a = this.lang === "fr" ? this.familiesFr : this.familiesEn, e;
        for (e in a)if (console.log(a[e]), a.hasOwnProperty(e))for (var d in a[e].s)if (parseInt(b,
            10) === parseInt(a[e].s[d], 10))return{name: a[e].n, index: e, color: a[e].c};
        return null
    };
    a.prototype.getGroup = function () {
        return this.lang === "fr" ? this.groupsFr : this.groupsEn
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var About = function () {
    function a() {
        this.initEvents();
        this.videoReady = !1
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        if ($("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444")) {
            var b = this.getAboutHeight();
            $("#edito").css("height", b);
            $("#edito .slimScrollDiv, #edito .inner").css({height: b - 120, width: $("#edito").width()});
            $("#edito .inner").css({width: $("#edito").width() - 20});
            $("#edito .inner").slimScroll({scroll: "0px", fixHide: !0});
            this.videoReady && this.resizeVideo()
        }
    };
    a.prototype.transitionIn =
        function () {
            TweenMax.killTweensOf($("#appContent"));
            TweenMax.to($("#appContent"), 1, {css: {opacity: 1}, onComplete: this.resize.bind(this)})
        };
    a.prototype.transitionOut = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 1, {css: {opacity: 0}})
    };
    a.prototype.initEvents = function () {
        ($("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444")) && $(".appFooter #btAbout").addClass("active")
    };
    a.prototype.initVideo = function () {
        this.videoReady = !0;
        _V_("aboutVideo", {}, function () {
        })
    };
    a.prototype.start = function () {
        this.createScrollBar();
        this.initVideo()
    };
    a.prototype.resizeVideo = function () {
        $("#aboutVideo, .video-js").css({width: $("#edito .inner").width() - 10, height: Math.floor($("#edito").width() * 9 / 16)}).attr({width: $("#edito .inner").width() - 10, height: Math.floor($("#edito").width() * 9 / 16)});
        $("#aboutVideo_html5_api").css({width: "100%", height: "100%"})
    };
    a.prototype.onUpdate = function () {
        this.initEvents();
        this.start()
    };
    a.prototype.createScrollBar = function () {
        var b = this.getAboutHeight() -
            120;
        $("#edito .inner").slimScroll({height: b, width: $("#edito").width(), color: "#c9c9c9", railColor: "#333333", railOpacity: "1", railVisible: !0, alwaysVisible: !0, size: "8px", fixHide: !0, callBack: function () {
        }});
        $(".slimScrollBar").css({width: 6, right: 2})
    };
    a.prototype.getAboutHeight = function () {
        return $("#edito").length > 0 ? window.innerHeight - $("#edito").offset().top - (window.innerHeight - $(".appFooter").offset().top) - 30 : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Home = function () {
    function a() {
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
    };
    a.prototype.transitionIn = function () {
        $("body").hasClass("front") && (TweenMax.killTweensOf($("#appContent")), TweenMax.to($("#appContent"), 1, {css: {opacity: 1}}))
    };
    a.prototype.transitionOut = function () {
        $("body").hasClass("front") && (TweenMax.killTweensOf($("#appContent")), TweenMax.to($("#appContent"), 1, {css: {opacity: 0}}))
    };
    a.prototype.initEvents = function () {
        $("body").hasClass("front") && $("#arianeSubnav").html("&nbsp;")
    };
    a.prototype.onUpdate = function () {
        this.initEvents()
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

creditsFiliationsClassName = !1;
jQuery.fn.reverse = [].reverse;

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Fiche = function () {
    function a() {
        this.searchDataReturnedSignal = new signals.Signal;
        this.waitForItScrollBarFiche = !1;
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        if ($("body").hasClass("node-type-showrunner")) {
            var b = this.getFicheHeight();
            $("#showrunnerFrame").css("height", b);
            var a = b - $(".caracteristics").outerHeight(!0) - $("#showrunnerFrame .portrait h2").outerHeight(!0) - 30;
            $("#showrunnerPortraitImage").css("height", a);
            $("#showrunnerPortraitImageContainer").css("height", a);
            var e = Math.round($(".caracteristics").width() / 4 - 20);
            e < 60 && (e = 60);
            $(".seriesphares li, .seriesphares li .title").css({height: Math.floor(e * 143 / 97) - 2, width: e});
            $(".seriesphares li .mask").css({height: $(".seriesphares .serie").height() + 8, width: e + 8});
            $(".seriesphares li .title .inner").each(function () {
                $(this).css("max-width", e - 20).css({marginTop: "-" + $(this).height() / 2 + "px", marginLeft: "-" + $(this).width() / 2 + "px"})
            });
            b -= 85;
            $(".infos .slimScrollDiv").css("height", b);
            $("#showrunnerScrollableInfos").css("height",
                b);
            $("#showrunnerVideoContainer").css({height: $("#showrunnerScrollableInfos").width() * 9 / 16}).attr("height", $("#showrunnerScrollableInfos").width() * 9 / 16);
            $("#filiationsContent, #creditsContent").css("width", parseInt($(".infosCat:first").width(), 10))
        }
    };
    a.prototype.resizeCreditsFiliationsLis = function () {
        var b = $(".foldedContent:visible").width();
        if (b > 0) {
            var a = $(".dropDownContent li:first").width(), e = Math.floor(b / a), d = Math.round((b - e * a) / (e - 1)) - 2;
            d < 0 && (e -= 1, d = Math.round((b - e * a) / (e - 1)) - 2);
            d > 12 && (d = 12);
            d <
                2 && (d = 2);
            $(".dropDownContent ul").css({width: b});
            creditsFiliationsClassName === "" ? $(".dropDownContent li").css("margin", "0 " + d + "px " + d + "px 0") : $(".dropDownContent li." + creditsFiliationsClassName).css("margin", "0 " + d + "px " + d + "px 0");
            Math.round(e * a + d * (e - 1));
            if (e * a + d * (e - 1) < b)if (creditsFiliationsClassName === "")$(".dropDownContent li:nth-child(" + e + "n)").css("margin-right", 0); else {
                b = $(".dropDownContent li." + creditsFiliationsClassName);
                a = e;
                for (d = 0; d < b.length; d++)d === a - 1 && (a += e, $(".dropDownContent li." + creditsFiliationsClassName).eq(d).css({marginRight: 0}))
            }
        }
    };
    a.prototype.transitionIn = function () {
        $("body").hasClass("node-type-showrunner") && (TweenMax.killTweensOf($("#appContent")), TweenMax.to($("#appContent"), 0.6, {css: {opacity: 1}, onComplete: function () {
            $("#showrunnersSubnav a").removeClass("active")
        }}))
    };
    a.prototype.transitionOut = function () {
        HKI.soundPlayer.mute || HKI.soundPlayer.fadeIn();
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 0.6, {css: {opacity: 0}, onComplete: function () {
            HKI.visualizer.resumeRender()
        }})
    };
    a.prototype.openFiche = function (b) {
        var a =
            HKI.parser.getShowrunnerById(b).p, a = $base_path + a.substring(1);
        window.History.pushState({showrunner: b}, "Showrunner | UNIVERSERIES", a)
    };
    a.prototype.closeFiche = function () {
        window.History.pushState(null, $home_page_title, $base_path_localized)
    };
    a.prototype.onUpdate = function () {
        this.initEvents()
    };
    a.prototype.initEvents = function () {
        var b = this;
        if ($("body").hasClass("node-type-showrunner")) {
            b.createScrollBar();
            $("#filiationsContent a").click(function (b) {
                b.preventDefault();
                HKI.visualizer.instantShowrunnerOpen($(this).attr("data-id"))
            });
            $(".foldedContent:first").show();
            $(".foldedContentOpener").off(".fiche").on("click.fiche", function (a) {
                a.preventDefault();
                var c = $(this);
                $(".foldedContentOpener").each(function () {
                    $(this).compare(c) && b.closeFicheTab($(this))
                });
                c.hasClass("opened") ? b.closeFicheTab(c) : b.openFicheTab(c)
            });
            $(".listOpener").off(".fiche").on("click.fiche", function (a) {
                a.preventDefault();
                a = $(this).parent().find("ul.listContent");
                a.hasClass("opened") ? b.closeDropDown(a) : b.openDropDown(a)
            });
            $(".listContent").find("li a:first").addClass("selected");
            $(".dropDownContent").find("li:first").show();
            $(".listContent li a").off(".fiche").on("click.fiche", function (a) {
                a.preventDefault();
                a = $(this).parent().parent();
                b.selectDropDown($(this));
                b.closeDropDown(a)
            });
            $(".seriesphares li").off(".fiche").on("mouseover.fiche",function () {
                var b = $(this), a = b.width(), c = b.height();
                b.find(".mask").css({left: -4, top: -4, width: a + 8, height: c + 8, opacity: 0});
                var f = $(this).find(".title .inner");
                f.css("max-width", a - 20);
                var h = f.width(), i = f.height();
                f.css({marginTop: "-" + i / 2 + "px",
                    marginLeft: "-" + h / 2 + "px"});
                f.css("max-width", a - 20);
                f.css({marginTop: "-" + i / 2 + "px", marginLeft: "-" + h / 2 + "px"});
                b.find(".title").css({scale: 1});
                TweenMax.killTweensOf(b.find(".mask"), b.find(".title"));
                TweenMax.to(b.find(".mask"), 0.2, {css: {left: 0, top: 0, height: c, width: a, opacity: 1}, ease: Expo.easeOut, onComplete: function () {
                    b.find(".mask").css({left: 0, top: 0, height: c, width: a, opacity: 1})
                }});
                TweenMax.to(b.find(".title"), 0.2, {css: {opacity: 1}, ease: Linear.easeNone});
                HKI.soundPlayer.play("s_rollOverInFiche", !1, 0.4, 0)
            }).on("mouseleave.fiche",
                function () {
                    var b = $(this), a = b.width(), c = b.height(), f = b.find(".mask"), b = b.find(".title");
                    f.css({left: 0, top: 0, height: c, width: a, opacity: 1});
                    TweenMax.killTweensOf(f, b);
                    TweenMax.to(f, 0.3, {css: {left: -4, top: -4, height: c + 8, width: a + 8, opacity: 0}, ease: Expo.easeIn});
                    TweenMax.to(b, 0.5, {css: {opacity: 0, scaleX: 0.9, scaleY: 0.9}, ease: Expo.easeOut})
                });
            $(".dropDownContent li:not('.serie-orange')").off(".fiche").on("mouseover.fiche",function () {
                var b = $(this), a = b.width(), c = b.height();
                b.find(".mask").css({left: -4, top: -4, width: a +
                    8, height: c + 8, opacity: 0});
                var f = $(this).find(".title .inner");
                f.css({maxWidth: a - 30, opacity: 1});
                b.find(".title").css({scale: 1, oapcity: 1});
                f.css({marginTop: "-" + f.height() / 2 + "px", marginLeft: "-" + f.width() / 2 + "px"});
                f.css({maxWidth: a - 30, opacity: 1});
                f.css({marginTop: "-" + f.height() / 2 + "px", marginLeft: "-" + f.width() / 2 + "px"});
                TweenMax.killTweensOf(b.find(".mask"), b.find(".title"));
                TweenMax.to(b.find(".mask"), 0.2, {css: {left: 0, top: 0, height: c, width: a, opacity: 1}, ease: Expo.easeOut, onComplete: function () {
                    b.find(".mask").css({left: 0,
                        top: 0, height: c, width: a, opacity: 1})
                }});
                TweenMax.to(b.find(".title"), 0.2, {css: {opacity: 1}, ease: Linear.easeNone});
                HKI.soundPlayer.play("s_rollOverInFiche", !1, 0.4, 0)
            }).on("mouseleave.fiche", function () {
                    var b = $(this), a = b.width(), c = b.height();
                    b.find(".mask").css({left: 0, top: 0, height: c, width: a, opacity: 1});
                    TweenMax.killTweensOf(b.find(".mask"), b.find(".title"));
                    TweenMax.to(b.find(".mask"), 0.3, {css: {left: -4, top: -4, height: c + 8, width: a + 8, opacity: 0}, ease: Expo.easeIn, onComplete: function () {
                        b.find(".mask").css({left: -4,
                            top: -4, height: c + 8, width: a + 8, opacity: 0})
                    }});
                    TweenMax.to(b.find(".title"), 0.5, {css: {opacity: 0, scaleX: 0.9, scaleY: 0.9}, ease: Expo.easeOut})
                });
            $(".dropDownContent li.serie-orange").off(".fiche").on("mouseover.fiche",function () {
                var b = $(this), a = b.width();
                b.height();
                var c = $(this).find(".title .inner");
                c.css("max-width", a - 30);
                var a = c.width(), f = c.height();
                c.css({marginTop: "-" + f / 2 + "px", marginLeft: "-" + a / 2 + "px"});
                b.find(".title").css({scale: 1});
                TweenMax.killTweensOf(b.find(".title"));
                TweenMax.to(b.find(".title"),
                    0.3, {css: {opacity: 1}, ease: Linear.easeNone});
                HKI.soundPlayer.play("s_rollOverInFiche", !1, 0.4, 0)
            }).on("mouseleave.fiche", function () {
                    var b = $(this);
                    b.width();
                    b.height();
                    TweenMax.killTweensOf(b.find(".title"));
                    TweenMax.to(b.find(".title"), 0.3, {css: {opacity: 0, scaleX: 0.9, scaleY: 0.9}, ease: Expo.easeOut})
                });
            $("#filiationsContent, #creditsContent").isotope({itemSelector: ".creditsImageContainer"});
            $(".seriesphares li, #creditsContent li").off("click.fiche").on("click.fiche", function (a) {
                a.preventDefault();
                $(this).css("cursor",
                    "pointer");
                a = $(this).text();
                $("#searchBox").val(String(a));
                $("#searchSubmit").addClass("loading");
                $("#resetSearch").css({opacity: 1});
                window.History.pushState(null, $home_page_title, $base_path_localized);
                $.ajax({url: $base_path_localized + "site-search?keys=" + a, method: "get", dataType: "json", success: function (a) {
                    $("#arianeSubnav").hide(0);
                    b.searchDataReturnedSignal.dispatch(a);
                    $("#searchSubmit").removeClass("loading")
                }})
            });
            HKI.visualizer.resumeRender();
            var a = $("#showrunnerScrollableInfos, #showrunnerPortraitImage").imagesLoaded();
            a.done(function () {
                $("#showrunnerScrollableInfos .loading, #showrunnerPortraitImageContainer .loading").stop(!0, !0).fadeOut(200, function () {
                    $(this).remove()
                })
            });
            a.progress(function (b) {
                var a = this.siblings(".loading");
                b ? a.removeClass("loading").addClass("broken") : a.stop(!0, !0).fadeOut(200, function () {
                    $(this).remove()
                })
            });
            $("#showrunnerScrollableInfos .lexicon-term").on("click", function (b) {
                b.preventDefault()
            })
        }
    };
    a.prototype.closeFicheTab = function (b) {
        var a = b.parent().next(".foldedContent"), e = b.parent().find(".listOpener"),
            d = b.parent().find(".listOpenerEnd"), g = b.parent().find(".listContent");
        b.removeClass("opened");
        a.stop(!0, !0).slideUp(700, "easeInOutExpo");
        e.stop(!0, !0).fadeOut();
        d.stop(!0, !0).fadeOut();
        this.closeDropDown(g)
    };
    a.prototype.openFicheTab = function (b) {
        HKI.soundPlayer.play("s_openTabInFiche", !1, 0.8, 200);
        var a = b.parent().next(".foldedContent"), e = b.parent().find(".listOpener"), d = b.parent().find(".listOpenerEnd");
        if (b.attr("id") === "filiationsOpener") {
            var g = HKI.visualizer.getOpenedGalaxy();
            g.showRelatedPlanets(g.planets[g.openedPlanetId])
        }
        b.addClass("opened");
        $("#filiationsContent, #creditsContent").isotope({filter: "*"});
        a.stop(!0, !0).slideDown(700, "easeInOutExpo", function () {
            var a = null;
            b.parent().parent().find(".foldedContent").attr("id") === "videoContent" ? (_V_("showrunnerVideo", {}, function () {
            }), a = _V_("showrunnerVideo"), a.play(), HKI.soundPlayer.mute || HKI.soundPlayer.fadeOut()) : $("#videoContent").length > 0 && (a = _V_("showrunnerVideo"), a.pause(), HKI.soundPlayer.mute || HKI.soundPlayer.fadeIn());
            $("#filiationsContent, #creditsContent").isotope({filter: "*"});
            setTimeout(function () {
                $(".dropDownContent li .inner").each(function () {
                    var b =
                        $(this);
                    b.css("max-width", b.parent().parent().width() - 40);
                    var b = $(this).width(), a = $(this).height();
                    b > 0 && a > 0 && $(this).css({marginTop: "-" + Math.round(a / 2) + "px", marginLeft: "-" + Math.round(b / 2) + "px"})
                });
                $(".dropDownContent li .inner").each(function () {
                    var b = $(this);
                    b.css("max-width", b.parent().parent().width() - 40);
                    var b = $(this).width(), a = $(this).height();
                    b > 0 && a > 0 && $(this).css({marginTop: "-" + Math.round(a / 2) + "px", marginLeft: "-" + Math.round(b / 2) + "px"})
                })
            }, 100)
        });
        e.stop(!0, !0).fadeIn();
        d.stop(!0, !0).fadeIn()
    };
    a.prototype.closeDropDown = function (b) {
        b.removeClass("opened");
        b.stop(!0, !0).slideUp(300, "easeInOutExpo")
    };
    a.prototype.openDropDown = function (b) {
        b.addClass("opened");
        b.stop(!0, !0).slideDown(300, "easeInOutExpo")
    };
    a.prototype.selectDropDown = function (b) {
        b.parent().siblings().find("a").removeClass("selected");
        b.addClass("selected");
        b.parent().parent().parent().find(".listOpener").html("- " + b.html());
        b.parent().parent().parent().parent().find(".creditsImageContainer");
        b = b.attr("id").replace("opener", "content");
        b.split("-")[1] === "all" ? $("#filiationsContent, #creditsContent").isotope({filter: "*"}) : $("#filiationsContent, #creditsContent").isotope({filter: "." + b})
    };
    a.prototype.createScrollBar = function () {
        var b = this;
        parseInt(b.getFicheHeight() - 60, 10);
        clearInterval(this.waitForItScrollBarFiche);
        this.waitForItScrollBarFiche = setInterval(function () {
                var a = parseInt(b.getFicheHeight() - 60, 10);
                a > 0 && ($("#showrunnerScrollableInfos").slimScroll({color: "#FFFFFF", height: a + "px", railOpacity: 0.05, size: "7px"}), b.resize(), clearInterval(b.waitForItScrollBarFiche))
            },
            100)
    };
    a.prototype.getFicheHeight = function () {
        return $("#showrunnerFrame").length > 0 ? window.innerHeight - $("#showrunnerFrame").offset().top - (window.innerHeight - $(".appFooter").offset().top) - 30 : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Credits = function () {
    function a() {
        this.waitForItResizeCredits = !1;
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        var b = this;
        if ($("body").hasClass("section-cr\u00e9dits") || $("body").hasClass("section-credits"))clearInterval(this.waitForItResizeCredits), this.waitForItResizeCredits = setInterval(function () {
            var a = b.getCreditsHeight();
            if (a > 0) {
                clearInterval(b.waitForItResizeCredits);
                var e = a - $("#credits h1").height() - 2 * parseInt($("#credits h1").css("paddingTop"), 10) - 80;
                $("#credits").css("height",
                    a - 10);
                $("#credits .inner").css({height: e, width: $("#credits").width() - 40});
                $(".slimScrollRail").css({height: e});
                $("#credits .slimScrollDiv").css({height: e, width: $(".inner").width() + 40})
            }
        }, 100)
    };
    a.prototype.transitionIn = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 1, {css: {opacity: 1}})
    };
    a.prototype.transitionOut = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 1, {css: {opacity: 0}})
    };
    a.prototype.initEvents = function () {
        if ($("body").hasClass("section-cr\u00e9dits") ||
            $("body").hasClass("section-credits")) {
            var b = this.getCreditsHeight() - 60;
            $(".appFooter a").removeClass("active");
            $("#btCredits").addClass("active");
            $("#credits .inner").off().slimScroll({height: b - $("#credits h1").outerHeight() - 180, width: $("#credits").width() + 8, color: "#c9c9c9", railColor: "#333333", railOpacity: "1", railVisible: !0, alwaysVisible: !1, size: "8px", fixHide: !0, callback: function () {
            }});
            $("#credits .inner").css({width: $("#credits").width() - 40})
        }
    };
    a.prototype.onUpdate = function () {
        this.initEvents()
    };
    a.prototype.getCreditsHeight = function () {
        return $("#credits").length > 0 ? window.innerHeight - $("#credits").offset().top - (window.innerHeight - $(".appFooter").offset().top) : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Header = function () {
    function a() {
        $("#arianeSubnav").show();
        this.groupChangedSignal = new signals.Signal;
        this.searchDataReturnedSignal = new signals.Signal;
        this.hideNoResultSignal = new signals.Signal;
        this.showrunnerList = new ShowrunnerList;
        this.originalSearchWidth = 0;
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
    };
    a.prototype.initEvents = function () {
        var b = this;
        $("body").hasClass("front") && this.openMenu();
        $("#filters").off(".header").on("click.header", function (a) {
            a.preventDefault();
            $("#filtersSubnav").css("display") === "none" ? b.openMenu() : b.closeMenu()
        });
        $("#searchForm").off(".header").on("submit.header", function (a) {
            b.hideNoResultSignal.dispatch();
            a.preventDefault();
            a = $(this).find("#searchBox").attr("value");
            $("#searchSubmit").addClass("loading");
            HKI.debugMode ? $.ajax({url: $base_path_localized + "site-search?keys=" + a, method: "get", dataType: "json", complete: function () {
                window.History.pushState(null, $home_page_title, $base_path_localized);
                $("#arianeSubnav").hide(0);
                b.searchDataReturnedSignal.dispatch({nodes: []});
                $("#searchSubmit").removeClass("loading")
            }}) : $.ajax({url: $base_path_localized + "site-search?keys=" + a, method: "get", dataType: "json", success: function (a) {
                window.History.pushState(null, $home_page_title, $base_path_localized);
                $("#arianeSubnav").hide(0);
                b.searchDataReturnedSignal.dispatch(a);
                $("#searchSubmit").removeClass("loading")
            }});
            return!1
        });
        this.originalSearchWidth = $("#searchBox").width();
        $("#searchBox").off(".header").on("keyup.header",function () {
            $(this).val() !== "" ? $("#resetSearch").css({opacity: 1}) :
                $("#resetSearch").css({opacity: 0})
        }).on("focus.header",function () {
                $("#navFirstRow, #navSecondRow").stop(!0, !0).animate({width: "+=100"}, 600);
                $("#menu").stop(!0, !0).animate({paddingLeft: 100}, 600);
                $("#searchBox").stop(!0, !0).animate({width: b.originalSearchWidth + 100}, 600)
            }).on("blur.header", function () {
                $("#navFirstRow, #navSecondRow").stop(!0, !0).delay(200).animate({width: "-=100"}, 600);
                $("#menu").stop(!0, !0).delay(200).animate({paddingLeft: 0}, 600);
                $("#searchBox").stop(!0, !0).delay(200).animate({width: b.originalSearchWidth},
                    600)
            });
        $("#resetSearch").off(".header").on("click.header", function (a) {
            a.preventDefault();
            $(this).css({opacity: 0});
            $("#searchBox").val("");
            b.hideNoResultSignal.dispatch();
            b.groupChangedSignal.dispatch("familyFilterLink")
        });
        $(".goupsFilterLink").off(".header").on("click.header", function (a) {
            a.preventDefault();
            b.hideNoResultSignal.dispatch();
            $(".goupsFilterLink").removeClass("active");
            $(this).addClass("active");
            History.pushState(null, $home_page_title, $base_path_localized);
            a = $(this).attr("id");
            b.groupChangedSignal.dispatch(a)
        });
        $("#shareBox").off(".header").on("mouseover.header",function (b) {
            b.preventDefault();
            $(this).find(".share").stop(!0, !0).animate({opacity: 0}, 200);
            $(this).find("#shareLinks").stop(!0, !0).animate({opacity: 1}, 200)
        }).on("mouseout.header", function (b) {
            b.preventDefault();
            b = $(this);
            b.find(".share").stop(!0, !0).delay(200).animate({opacity: 1}, 400);
            b.find("#shareLinks").stop(!0, !0).delay(200).animate({opacity: 0}, 400)
        });
        $("#volume").toggle(function () {
            $(this).addClass("mute");
            HKI.soundPlayer.setMute()
        }, function () {
            $(this).removeClass("mute");
            HKI.soundPlayer.setUnMute()
        })
    };
    a.prototype.openMenu = function () {
        $("#filters").first().hasClass("opened") || $("#filters").first().addClass("opened");
        $("#showrunners").first().removeClass("opened");
        $("#filtersSubnav").fadeIn();
        $("#showrunnersSubnav").hide();
        $("#arianeSubnav").hide(0);
        window.History.pushState(null, $home_page_title, $base_path_localized);
        HKI.visualizer.resumeRender()
    };
    a.prototype.closeMenu = function () {
        $("#filters").first().removeClass("opened");
        $("#filtersSubnav").hide();
        $("#arianeSubnav").fadeIn()
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Footer = function () {
    function a() {
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        $(".links ul").css("margin-left", "-" + $(".links ul").width() / 2 + "px")
    };
    a.prototype.initEvents = function () {
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Glossary = function () {
    function a() {
        this.initEvents();
        this.waitForItResizeGlossary = !1
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        var b = this;
        if ($("body").hasClass("section-lexicon"))clearInterval(this.waitForItResizeGlossary), this.waitForItResizeGlossary = setInterval(function () {
            var a = b.getGlossaryHeight();
            if (a > 0) {
                clearInterval(b.waitForItResizeGlossary);
                var e = a - parseInt($("#lexique").css("paddingLeft"), 10) - $("#lexique h1").height() - 2 * parseInt($("#lexique").css("paddingLeft"), 10);
                $("#lexique").css("height",
                    a);
                $("#lexique .lexicon-list").css({height: e, width: $("#lexique").width() - 1 * parseInt($("#lexique").css("paddingLeft"), 10)});
                $(".slimScrollRail").css({height: e});
                $("#lexique .slimScrollDiv").css({height: e, width: $(".lexicon-list").width() + 40});
                a = $(".lexicon-links li");
                e = Math.round((e - a.length * $(".lexicon-links li:first").height()) / (a.length - 1));
                a.css("margin-bottom", e);
                $("#lexique .lexicon-list").slimScroll({scroll: "0px", fixHide: !0})
            }
        }, 100)
    };
    a.prototype.transitionIn = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 1, {css: {opacity: 1}, onComplete: this.resize.bind(this)})
    };
    a.prototype.transitionOut = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 1, {css: {opacity: 0}})
    };
    a.prototype.initEvents = function () {
        $("body").hasClass("page-lexicon") && (this.createScrollBar(), this.alphabetPicker(), $(".lexicon-links a:first").addClass("selected"), $("#btLexique").addClass("active"), $(".lexicon-term").on("click", function (b) {
            b.preventDefault();
            return!1
        }))
    };
    a.prototype.onUpdate =
        function () {
            this.initEvents()
        };
    a.prototype.createScrollBar = function () {
        var b = this.getGlossaryHeight() - 60;
        $("#lexique .lexicon-list").slimScroll({height: b - parseInt($("#lexique").css("paddingLeft"), 10) - $("#lexique h1").height() + 5, width: $("#lexique").width() + 8, color: "#c9c9c9", railColor: "#333333", railOpacity: "1", railVisible: !0, alwaysVisible: !0, size: "8px", fixHide: !0, callBack: function () {
            var b = "";
            $(".lexicon-letter").each(function (a) {
                var d = $(this).text(), g = $(this).next().height(), f = $(".lexicon-letter").length -
                    1, h = 0, h = a === f - 1 ? $(this).position().top : $(this).position().top + g;
                h > 0 && b === "" && (b = d.toLowerCase())
            });
            $(".lexicon-links a").removeClass("selected");
            $(".lexicon-links a:contains(" + b + ")").addClass("selected")
        }});
        $(".slimScrollBar").css({width: 6, right: 2})
    };
    a.prototype.alphabetPicker = function () {
        $(".lexicon-links .lexicon-item").off(".glossary").on("click.glossary", function (b) {
            b.preventDefault();
            $(".lexicon-links .lexicon-item").removeClass("selected");
            $(this).addClass("selected");
            b = $(this).text();
            b = $("a#letter_" +
                b.toLowerCase()).offset().top - $("#lexique .lexicon-list").offset().top;
            $("#lexique .lexicon-list").slimScroll({scroll: b + "px", fixHide: !0})
        })
    };
    a.prototype.getGlossaryHeight = function () {
        return $("#lexique").length > 0 ? window.innerHeight - $("#lexique").offset().top - (window.innerHeight - $(".appFooter").offset().top) - 30 : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var ShowrunnerList = function () {
    function a() {
        this.waitForItResizeSrList = !1;
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        var b = this;
        if ($("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276"))$("#showrunnerList .list").slimScroll({scroll: 0, fixHide: !0}), b.getShowrunnerListHeight(), clearInterval(this.waitForItResizeSrList), this.waitForItResizeSrList = setInterval(function () {
            var a = b.getShowrunnerListHeight();
            if (a > 0) {
                clearInterval(b.waitForItResizeSrList);
                console.log("ShowrunnerListHeight: " + a);
                $("#showrunnerList .list, ul.isotope, .slimScrollDiv").css("height", a);
                $("#showrunnerList").css("height", window.innerHeight - $("#showrunnerList").offset().top);
                var e = Math.round((a - 66) / 4), d = Math.round(144 * e / 182), g = Math.floor(($("#showrunnerList .list").width() - 10) / d), f = Math.floor(($("#showrunnerList .list").width() - 10 - d * g) / g);
                f <= 5 && (f = Math.floor(($("#showrunnerList .list").width() - 10 - d * (g - 1)) / (g - 1)));
                $("#showrunnerList .list li").css({height: e, marginBottom: 22,
                    marginRight: f, overflow: "hidden", width: d});
                $("#showrunnerList .list li .mask").css({height: e + 8, opacity: 1, width: d + 8});
                $("#showrunnerList .list li .title").css({height: e, width: d});
                $("#showrunnerList .list li .title .inner").each(function () {
                    $(this).css({marginTop: "-" + $(this).height() / 2 + "px", marginLeft: "-" + d * 0.5 / 2 + "px"})
                });
                e = $("#sr-alphabet-links li");
                g = Math.round((a - e.length * 25) / (e.length - 1));
                e.css("margin-bottom", g);
                $("#showrunnerList .list, ul.isotope, .slimScrollDiv").css("height", a);
                $("#showrunnerList ul.columns").isotope("reLayout");
                $("#showrunnerList .list").slimScroll({scroll: 0, fixHide: !0})
            }
        }, 100)
    };
    a.prototype.transitionIn = function () {
        var b = this;
        HKI.visualizer.pauseRender();
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 0.4, {css: {opacity: 1}, onComplete: function () {
            b.initEvents();
            $("#filters").removeClass("active")
        }})
    };
    a.prototype.transitionOut = function () {
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 0.4, {css: {opacity: 0}});
        HKI.visualizer.resumeRender()
    };
    a.prototype.openShowrunnerList =
        function (b) {
            b === !0 && window.History.pushState(null, "Showrunner | UNIVERSERIES", "/showrunner");
            console.log("showrunne list, currentIsSearch", HKI.parser.currentIsSearch);
            HKI.parser.currentIsSearch && HKI.uiInterface.header.groupChangedSignal.dispatch("familyFilterLink");
            $("#showrunners").first().addClass("opened");
            $("#filters").first().removeClass("opened");
            $("#showrunnersSubnav").fadeIn();
            $("#filtersSubnav").hide();
            $("#arianeSubnav").hide()
        };
    a.prototype.closeShowrunnerList = function () {
        $("#showrunners").first().removeClass("opened");
        $("#showrunnersSubnav").hide();
        $("#arianeSubnav").fadeIn()
    };
    a.prototype.onUpdate = function () {
        this.initEvents()
    };
    a.prototype.initEvents = function () {
        if ($("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276")) {
            HKI.visualizer.pauseRender();
            $("#showrunnerList a.usAjax").off(".srList").on("click.srList", function () {
                HKI.visualizer.instantShowrunnerOpen($(this).attr("data-id"))
            });
            this.createScrollBar();
            this.alphabetPicker();
            this.changeOrderList();
            this.openShowrunnerList(!1);
            $("#showrunnerList ul.columns").isotope({itemSelector: "li", getSortData: {name: function (b) {
                return b.text()
            }, latest: function (b) {
                return parseInt(b.attr("data-created"), 10)
            }, updated: function (b) {
                return parseInt(b.attr("data-changed"), 10)
            }, popular: function (b) {
                return parseInt(b.attr("data-views"), 10)
            }}, onLayout: function () {
            }});
            $("#showrunnerList .list li").off().hover(function () {
                $(this).find(".mask").css({width: $(this).width(), height: $(this).height()})
            }, function () {
                $(this).find(".mask").css({width: $(this).width() +
                    8, height: $(this).height() + 8})
            });
            $("#showrunnerList .list li").off(".srlist").on("mouseover.srlist",function () {
                var b = $(this), a = b.find(".title .inner"), d = b.find(".mask"), g = b.width(), f = b.height(), h = a.height();
                a.css({marginTop: "-" + h / 2 + "px", marginLeft: "-" + g * 0.5 / 2 + "px"});
                b.find(".title").css({scale: 1});
                d.css({left: -4, top: -4, height: f + 8, width: g + 8, opacity: 0});
                TweenMax.killTweensOf(b.find(".mask"), b.find(".title"));
                TweenMax.to(b.find(".mask"), 0.2, {css: {left: 0, top: 0, height: f, width: g, opacity: 1}, ease: Expo.easeOut,
                    onComplete: function () {
                        b.find(".mask").css({left: 0, top: 0, height: f, width: g, opacity: 1})
                    }.bind(this)});
                TweenMax.to(b.find(".title"), 0.2, {css: {opacity: 1}, ease: Linear.easeNone});
                HKI.soundPlayer.play("s_rollOverInFiche", !1, 0.4, 0)
            }).on("mouseout.srlist", function () {
                    var b = $(this), a = b.width(), d = b.height();
                    b.find(".mask").css({left: 0, top: 0, height: d, width: a, opacity: 1});
                    TweenMax.killTweensOf(b.find(".mask"), b.find(".title"));
                    TweenMax.to(b.find(".mask"), 0.3, {css: {left: -4, top: -4, height: d + 8, width: a + 8, opacity: 0}, ease: Expo.easeIn,
                        onComplete: function () {
                            b.find(".mask").css({left: -4, top: -4, height: d + 8, width: a + 8, opacity: 0})
                        }});
                    TweenMax.to(b.find(".title"), 0.5, {css: {opacity: 0, scaleX: 0.9, scaleY: 0.9}, ease: Expo.easeOut})
                });
            var b = $("#showrunnerList .list").imagesLoaded();
            b.done(function () {
                $("#showrunnerList .list .loading").fadeOut(200, function () {
                    $(this).remove()
                })
            });
            b.progress(function (b) {
                var a = this.siblings(".loading");
                b ? a.removeClass("loading").addClass("broken") : a.fadeOut(200, function () {
                    $(this).remove()
                })
            })
        }
    };
    a.prototype.whenLoaded =
        function () {
            ($("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276")) && this.goToHash()
        };
    a.prototype.createScrollBar = function () {
        var b = this.getShowrunnerListHeight();
        $("#showrunnerList .list").slimScroll({height: b, width: $("#lexique").width() - 8, color: "#c9c9c9", railColor: "#333333", railOpacity: "1", railVisible: !0, alwaysVisible: !0, size: "8px", fixHide: !0, callBack: function () {
        }});
        $(".slimScrollBar").css({width: 6, right: 2});
        setInterval(function () {
            var b = "";
            $("#showrunnerList .list li").each(function (a) {
                var d =
                    $(this).text(), g = $(this).height() / 2, f = $("#showrunnerList .list li").length - 1, h = 0, h = a === f - 1 ? $(this).position().top : $(this).position().top + g;
                h > 0 && b === "" && (b = d)
            });
            b = b.charAt(0).toUpperCase();
            $("#sr-alphabet-links li a").removeClass("selected");
            $("#sr-alphabet-links li a:contains(" + b + ")").addClass("selected");
            $("#showrunnerList .slimScrollDiv ul").css("height", parseInt($("#showrunnerList .slimScrollDiv").height(), 10))
        }, 500)
    };
    a.prototype.alphabetPicker = function () {
        var b = this;
        $("#sr-alphabet-links li a").off(".srlist").on("click.srlist",
            function (a) {
                a.preventDefault();
                $(this);
                $("#sr-alphabet-links li a").removeClass("selected");
                $(this).addClass("selected");
                var e = $(this).text();
                $("#showrunnerList .list li").each(function (b) {
                    var a = $(this).text().charAt(0), c = $(this), h = c.width(), i = c.height(), j = c.find(".title .inner"), k = c.find(".mask"), l = j.height();
                    b *= 0.05;
                    e === a && (j.css({marginTop: "-" + l / 2 + "px", marginLeft: "-" + h * 0.5 / 2 + "px"}), c.find(".title").css({scale: 1}), k.css({left: -4, top: -4, height: c.height() + 8, width: c.width() + 8, opacity: 0}), TweenMax.killTweensOf(c.find(".mask"),
                        c.find(".title")), TweenMax.to(c.find(".mask"), 0.2, {css: {left: 0, top: 0, height: i, width: h, opacity: 1}, delay: b, ease: Expo.easeOut, onComplete: function () {
                        c.find(".mask").css({left: 0, top: 0, height: i, width: h, opacity: 1})
                    }}), TweenMax.to(c.find(".title"), 0.2, {css: {opacity: 1}, delay: b, ease: Linear.easeNone}), setTimeout(function () {
                        k.css({left: 0, top: 0, height: i, width: h, opacity: 1});
                        TweenMax.killTweensOf(c.find(".mask"), c.find(".title"));
                        TweenMax.to(c.find(".mask"), 0.2, {css: {left: -4, top: -4, height: i + 8, width: h + 8, opacity: 0},
                            ease: Expo.easeIn, onComplete: function () {
                                c.find(".mask").css({left: -4, top: -4, height: i + 8, width: h + 8, opacity: 0})
                            }});
                        TweenMax.to(c.find(".title"), 0.3, {css: {opacity: 0, scaleX: 0.8, scaleY: 0.8}, ease: Expo.easeOut})
                    }, 6E3))
                });
                b.goToLetter(e)
            })
    };
    a.prototype.goToLetter = function (b) {
        var a = {};
        $("#showrunnerList .list li").each(function () {
            var b = $(this).text().charAt(0);
            a[b] || (a[b] = $(this))
        });
        if (a[b] !== void 0) {
            var b = a[b].offset().top - $("#showrunnerList .list").offset().top, e = this.getShowrunnerListHeight(), d = $("#showrunnerList .list li:last").offset().top,
                g = $("#showrunnerList .list li:first").height();
            d + g >= e + b && $("#showrunnerList .list").slimScroll({scroll: b + "px", fixHide: !0})
        }
    };
    a.prototype.goToHash = function () {
        var b = window.location.hash.substring(1).toUpperCase();
        b !== "" && (this.goToLetter(b), $("#sr-alphabet-links li a").removeClass("selected").each(function () {
            $(this).text() === b && $(this).addClass("selected")
        }))
    };
    a.prototype.changeOrderList = function () {
        var b = History.getState().url, b = b.split("?s="), b = b["1"];
        $("#showrunnersSubnav a").removeClass("active");
        b === void 0 ? $("#showrunnersSubnav a:first").addClass("active") : ($("#showrunnersSubnav a." + b).addClass("active"), $("#sr-alphabet-links").css("display", "none"));
        $("#showrunnersSubnav a").off(".srlist").on("click.srlist", function (b) {
            if (b.which === 2 || b.metaKey)return!0;
            b.preventDefault();
            var b = $(this), a = b.attr("href");
            $("#showrunnersSubnav a").removeClass("active");
            b.addClass("active");
            b.find(".mask").css("opacity", 0);
            b.attr("data-sort") === "name" ? ($("#showrunnerList ul.columns").isotope({sortBy: b.attr("data-sort"),
                sortAscending: !0}), $("#sr-alphabet-links").fadeIn(400)) : ($("#showrunnerList ul.columns").isotope({sortBy: b.attr("data-sort"), sortAscending: !1}), $("#sr-alphabet-links").fadeOut(400));
            !$("body").hasClass("page-taxonomy-term-245") && !$("body").hasClass("page-taxonomy-term-276") && window.History.pushState(null, "Showrunner | UNIVERSERIES", a);
            return!1
        })
    };
    a.prototype.getShowrunnerListHeight = function () {
        return $("#showrunnerList .list").length > 0 ? window.innerHeight - $("#showrunnerList .list").offset().top - (window.innerHeight -
            $(".appFooter").offset().top) - 40 : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var TvShowsList = function () {
    function a() {
        this.searchDataReturnedSignal = new signals.Signal;
        this.waitForItResizeTvShow = !1;
        this.initEvents()
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        var b = this;
        if ($("body").hasClass("page-node-5561"))$("#tvShowsList .list").slimScroll({scroll: 0, fixHide: !0}), this.getTvShowsListHeight(), clearInterval(this.waitForItResizeTvShow), this.waitForItResizeTvShow = setInterval(function () {
            var a = b.getTvShowsListHeight();
            a > 0 && (clearInterval(b.waitForItResizeTvShow), parseInt($("#lexique").css("paddingLeft"),
                10), $("#lexique h1").height(), parseInt($("#lexique").css("paddingLeft"), 10), $("#tvShowsList .list").css({height: a}), $("#tvShowsList").css("height", window.innerHeight - $("#tvShowsList").offset().top))
        }, 500)
    };
    a.prototype.transitionIn = function () {
        var b = this;
        HKI.visualizer.pauseRender();
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 0.4, {css: {opacity: 1}, onComplete: function () {
            b.initEvents();
            $("#filters").removeClass("active")
        }})
    };
    a.prototype.transitionOut = function () {
        $("#tvShowFilterLink").removeClass("active");
        TweenMax.killTweensOf($("#appContent"));
        TweenMax.to($("#appContent"), 0.4, {css: {opacity: 0}});
        HKI.visualizer.resumeRender()
    };
    a.prototype.onUpdate = function () {
        this.initEvents()
    };
    a.prototype.initEvents = function () {
        var b = this;
        $("body").hasClass("page-node-5561") && (HKI.visualizer.pauseRender(), b.createScrollBar(), $("#tvShowsList .list li:not(.title)").off(".tvshowlist").on("click.tvshowlist", function (a) {
            a.preventDefault();
            a = $(this).text();
            $("#searchBox").val(String(a));
            $("#searchSubmit").addClass("loading");
            $("#resetSearch").css({opacity: 1});
            window.History.pushState(null, $home_page_title, $base_path_localized);
            $.ajax({url: $base_path_localized + "site-search?keys=" + a, method: "get", dataType: "json", success: function (a) {
                $("#arianeSubnav").hide(0);
                b.searchDataReturnedSignal.dispatch(a);
                $("#searchSubmit").removeClass("loading")
            }})
        }))
    };
    a.prototype.whenLoaded = function () {
        this.initEvents()
    };
    a.prototype.createScrollBar = function () {
        var b = this.getTvShowsListHeight();
        console.log("width: " + $("#tvShowsList").width());
        $("#tvShowsList .list").slimScroll({height: b,
            width: $("#tvShowsList").width() - 8, color: "#c9c9c9", railColor: "#333333", railOpacity: "1", railVisible: !0, alwaysVisible: !0, size: "8px", fixHide: !0, callBack: function () {
            }});
        $(".slimScrollBar").css({width: 6, right: 2})
    };
    a.prototype.getTvShowsListHeight = function () {
        return $("#tvShowsList .list").length > 0 ? window.innerHeight - $("#tvShowsList .list").offset().top - (window.innerHeight - $(".appFooter").offset().top) - 40 : 0
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Interface = function () {
    function a() {
        this.header = new Header;
        this.footer = new Footer;
        this.fiche = new Fiche;
        this.glossary = new Glossary;
        this.showrunnerList = new ShowrunnerList;
        this.tvshowslist = new TvShowsList;
        this.credits = new Credits;
        this.about = new About;
        this.home = new Home
    }

    a.prototype.constructor = a;
    a.prototype.resize = function () {
        HKI.visualizer.pauseRender();
        this.header.resize();
        this.footer.resize();
        $("body").hasClass("section-lexicon") ? (this.glossary.resize(), HKI.visualizer.resumeRender()) : $("body").hasClass("section-cr\u00e9dits") ||
            $("body").hasClass("section-credits") ? (this.credits.resize(), HKI.visualizer.resumeRender()) : $("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276") ? this.showrunnerList.resize() : $("body").hasClass("page-node-5561") ? this.tvshowslist.resize() : ($("body").hasClass("node-type-showrunner") ? this.fiche.resize() : $("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444") ? this.about.resize() : $("body").hasClass("front") && this.home.resize(), HKI.visualizer.resumeRender())
    };
    a.prototype.transitionIn = function () {
        $("body").attr("class");
        $("body").hasClass("section-lexicon") ? this.glossary.transitionIn() : $("body").hasClass("section-cr\u00e9dits") || $("body").hasClass("section-credits") ? this.credits.transitionIn() : $("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276") ? this.showrunnerList.transitionIn() : $("body").hasClass("page-node-5561") ? this.tvshowslist.transitionIn() : $("body").hasClass("node-type-showrunner") ? this.fiche.transitionIn() :
            $("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444") ? this.about.transitionIn() : $("body").hasClass("front") ? this.home.transitionIn() : (TweenMax.killTweensOf($("#appContent")), TweenMax.to($("#appContent"), 1, {css: {opacity: 1}}))
    };
    a.prototype.transitionOut = function () {
        $("body").hasClass("section-lexicon") ? this.glossary.transitionOut() : $("body").hasClass("section-cr\u00e9dits") || $("body").hasClass("section-credits") ? this.credits.transitionOut() : $("body").hasClass("page-taxonomy-term-245") ||
            $("body").hasClass("page-taxonomy-term-276") ? this.showrunnerList.transitionOut() : $("body").hasClass("page-node-5561") ? this.tvshowslist.transitionOut() : $("body").hasClass("node-type-showrunner") ? this.fiche.transitionOut() : $("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444") ? this.about.transitionOut() : $("body").hasClass("front") ? this.home.transitionOut() : $("#appContent").fadeOut("slow")
    };
    a.prototype.onUpdate = function () {
        this.header.hideNoResultSignal.dispatch();
        if ($("body").hasClass("section-lexicon"))this.glossary.onUpdate();
        else if ($("body").hasClass("section-cr\u00e9dits") || $("body").hasClass("section-credits"))this.credits.onUpdate(); else if ($("body").hasClass("page-taxonomy-term-245") || $("body").hasClass("page-taxonomy-term-276"))this.showrunnerList.onUpdate(); else if ($("body").hasClass("page-node-5561"))this.tvshowslist.onUpdate(), $(".goupsFilterLink").removeClass("active"), $("#tvShowFilterLink").addClass("active"); else if ($("body").hasClass("node-type-showrunner"))this.fiche.onUpdate(); else if ($("body").hasClass("page-node-3670") ||
            $("body").hasClass("page-node-5444"))this.about.onUpdate(); else $("body").hasClass("front") ? (this.home.onUpdate(), this.header.openMenu()) : $("#appContent").fadeOut("slow");
        this.resize()
    };
    a.prototype.start = function () {
        ($("body").hasClass("page-node-3670") || $("body").hasClass("page-node-5444")) && this.about.start();
        this.resize()
    };
    a.prototype.showNoResultPanel = function () {
        $("#noResult").fadeIn();
        $("#closeNoResult").fadeIn()
    };
    a.prototype.hideNoResultPanel = function () {
        $("#noResult").fadeOut();
        $("#closeNoResult").fadeOut()
    };
    a.prototype.activeNoResult = function () {
        this.showNoResultPanel()
    };
    a.prototype.unactiveNoResult = function () {
        this.hideNoResultPanel()
    };
    a.prototype.onLoad = function () {
        this.showrunnerList.whenLoaded();
        this.tvshowslist.whenLoaded()
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Router = function () {
    function a() {
        this.isHistoryDoingSomething = !1;
        this.onUpdateSignal = new signals.Signal;
        this.transitionEvents = {transitionIn: new signals.Signal, transitionOut: new signals.Signal};
        var b = window.History, a = window.jQuery, e = window.document;
        if (!b.enabled)return!1;
        this.rootUrl = b.getRootUrl();
        this.body = a(e.body);
        this.contentSelector = "#appContent";
        this.content = a(this.contentSelector).filter(":first");
        this.contentNode = this.content.get(0);
        this.menu = a(".appHeader, .appVisualisation, .appFooter").filter(":first");
        this.breadCrumb = a("#arianeSubnav").filter(":first");
        this.activeClass = "active selected current youarehere";
        this.activeSelector = ".active,.selected,.current,.youarehere";
        this.menuChildrenSelector = "> li,> ul > li";
        this.scrollOptions = {duration: 800, easing: "swing"};
        this.relativeUrl = "";
        var d = this.rootUrl;
        if (this.content.length === 0)this.content = this.body;
        a.expr[":"].internal = function (b) {
            b = a(b).attr("href") || "";
            return b.substring(0, d.length) === d || b.indexOf(":") === -1
        };
        a.fn.ajaxify = function () {
            var d = a(this);
            d.find("a.usAjax:internal").off(".router").on("click.router",
                function (d) {
                    var e = a(this), g = e.attr("href"), e = e.attr("title") || null;
                    if (d.which === 2 || d.metaKey === !0)return!0;
                    b.pushState(null, e, g);
                    d.preventDefault();
                    return!1
                });
            return d
        };
        this.body.ajaxify();
        a(window).bind("statechange", this.stageChange.bind(this))
    }

    a.prototype.constructor = a;
    a.prototype.documentHtml = function (b) {
        return String(b).replace(/<\!DOCTYPE[^>]*>/i, "").replace(/<(html|head|title|meta|script)([\s\>])/gi, '<div class="document-$1"$2').replace(/<(body)([\s\>])/gi, '<div id="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi,
            "</div>")
    };
    a.prototype.stageChange = function () {
        if (this.isHistoryDoingSomething === !0)return!1;
        this.stateURL = History.getState().url;
        this.stateURL.indexOf("/en/") === -1 ? ($("#searchForm label").text("Recherche"), $("#searchBox").css("width", 98)) : ($("#searchForm label").text("Search"), $("#searchBox").css("width", 126));
        $(".appFooter a").removeClass("active");
        HKI.spinner.startSpin();
        this.transitionEvents.transitionOut.dispatch();
        var b = this.stateURL, b = b.replace("http://cinema-series.orange.fr", ""), b = b.replace("http://universeries.dev",
            "");
        _gaq.push(["_trackPageview", b]);
        _gaq.push(["b._trackPageview", b]);
        this.stateURL === $base_url + "/" || this.stateURL === $base_url ? (this.isHistoryDoingSomething = !0, HKI.spinner.endSpin(), HKI.visualizer.goBackToUniverse(), $("#appContent").delay(400).html("&nbsp;"), this.stateURL.indexOf("/en/") === -1 ? $("body").attr("class", "html front not-logged-in no-sidebars page-node page-node- page-node-68 node-type-page i18n-fr") : $("body").attr("class", "html front not-logged-in no-sidebars page-node page-node- page-node-5445 node-type-page i18n-en"),
            this.onUpdateSignal.dispatch(), this.isHistoryDoingSomething = !1) : (this.isHistoryDoingSomething = !0, HKI.debugMode ? $.ajax({dataType: "html", url: this.stateURL, complete: function (b) {
            this.onAjaxSuccess(b.responseText)
        }.bind(this), error: function () {
        }}) : $.ajax({dataType: "html", url: this.stateURL, success: this.onAjaxSuccess.bind(this), error: this.onAjaxError.bind(this)}))
    };
    a.prototype.onAjaxSuccess = function (b) {
        $("#appContent").html("&nbsp;");
        var b = $(this.documentHtml(b)), a = b.find("#document-body:first"), e = a.find(this.contentSelector).filter(":first"),
            d;
        d = e.html() || b.html();
        if (!d)return!1;
        e.find(".document-script").each(function () {
            d += "<script>" + $(this).text() + "<\/script>";
            $(this).empty().text("&nbsp;").css("display", "none")
        }).empty();
        this.content.html(d).ajaxify();
        $("#arianeSubnav").html(String(a.find("#arianeSubnav").html()));
        $("body").attr("class", String(a.attr("class")));
        this.transitionEvents.transitionIn.dispatch();
        document.title = String(b.find(".document-title:first").text());
        try {
            document.getElementsByTagName("title")[0].innerHTML = document.title.replace("<",
                "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
        } catch (g) {
        }
        typeof window.pageTracker !== "undefined" && window.pageTracker._trackPageview(this.relativeUrl);
        $(".document-script").remove();
        this.onUpdateSignal.dispatch();
        HKI.spinner.endSpin();
        this.isHistoryDoingSomething = !1
    };
    a.prototype.onAjaxError = function () {
        this.isHistoryDoingSomething = !1
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Preloader = function () {
    function a() {
        var b = $base_url + "/" + $path_to_theme;
        this.manifest = [
            {id: "i_bg", src: b + "/images/background.jpg"},
            {id: "i_pictoloader", src: b + "/images/loader.png"},
            {id: "j_showrunners", src: b + "/data/showrunners.json"},
            {id: "j_families", src: b + "/data/families.json"},
            {id: "j_genres", src: b + "/data/genres.json"},
            {id: "j_formats", src: b + "/data/formats.json"}
        ];
        if (createjs.SoundJS.checkPlugin(!0))this.manifest = [
            {id: "s_intro", src: b + "/sounds/1_Intro.mp3|" + b + "/sounds/1_Intro.ogg"},
            {id: "s_ambientLoop",
                src: b + "/sounds/2_LOOP_fond_ambiance.mp3|" + b + "/sounds/2_LOOP_fond_ambiance.ogg"},
            {id: "s_rolloverPlanet", data: 4, src: b + "/sounds/4_Rollover_Titre_Ball.mp3|" + b + "/sounds/4_Rollover_Titre_Ball.ogg"},
            {id: "s_rolloverGalaxy", data: 4, src: b + "/sounds/12_RollOver_View1_Atome.mp3|" + b + "/sounds/12_RollOver_View1_Atome.ogg"},
            {id: "s_openGalaxy", data: 4, src: b + "/sounds/3_Explo_balls.mp3|" + b + "/sounds/3_Explo_balls.ogg"},
            {id: "s_openTabInFiche", data: 4, src: b + "/sounds/14_RollOver_View3_Cercle.mp3|" + b + "/sounds/14_RollOver_View3_Cercle.ogg"},
            {id: "s_rollOverInFiche", data: 4, src: b + "/sounds/11_Menu-Bas-ON.mp3|" + b + "/sounds/11_Menu-Bas-ON.ogg"}
        ].concat(this.manifest);
        this.onCompleteSignal = new signals.Signal;
        this.loader = new createjs.PreloadJS;
        this.loader.onComplete = this.onComplete.bind(this);
        this.loader.onProgress = this.onProgress.bind(this);
        this.loader.installPlugin(createjs.SoundJS);
        this.loadCompleted = this.minimumTimeCompleted = !1;
        $(window).off(".preloader").on("mousemove.preloader", this.onMouseMove.bind(this));
        this.mouseX = window.innerWidth *
            0.5;
        this.mouseY = window.innerHeight * 0.5;
        this.animate()
    }

    a.prototype.constructor = a;
    a.prototype.start = function () {
        $("#preloadTextBlock p.bold").css("border-bottom", "1px solid #fff");
        this.loader.loadManifest(this.manifest);
        this.delayMinimumTime = TweenMax.delayedCall(6, this.onMinimumTimeComplete.bind(this))
    };
    a.prototype.onComplete = function () {
        $("#preloadTextPercent").fadeOut();
        this.loadCompleted = !0;
        this.minimumTimeCompleted && this.onCompleteSignal.dispatch()
    };
    a.prototype.onProgress = function (b) {
        $("#preloadTextPercent").html(String(parseInt(b.loaded /
            b.total * 100, 10)))
    };
    a.prototype.onMinimumTimeComplete = function () {
        this.minimumTimeCompleted = !0;
        this.loadCompleted && this.onCompleteSignal.dispatch()
    };
    a.prototype.transitionIn = function () {
    };
    a.prototype.transitionOut = function (b) {
        $("#startLoader").delay(b).fadeOut(400);
        $("#preloadTextPercent").delay(b).fadeOut(400, this.destroy.bind(this))
    };
    a.prototype.destroy = function () {
        $(window).off(".preloader");
        $("#startLoader").remove();
        $("#preloadTextPercent").remove();
        this.stop = !0
    };
    a.prototype.onMouseMove = function (b) {
        this.mouseX =
            b.clientX;
        this.mouseY = b.clientY
    };
    a.prototype.animate = function () {
        if (!this.stop) {
            requestAnimationFrame(this.animate.bind(this));
            var b = parseInt($("#preloadTextPercent").css("left"), 10), a = parseInt($("#preloadTextPercent").css("top"), 10);
            b += (this.mouseX - b) * 0.1;
            a += (this.mouseY - a) * 0.1;
            $("#preloadTextPercent").css({top: a, left: b})
        }
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Spinner = function () {
    function a() {
        this.spinner = $("#loader");
        this.mouseX = window.innerWidth * 0.5;
        this.mouseY = window.innerHeight * 0.5
    }

    a.prototype.constructor = a;
    a.prototype.startSpin = function () {
        this.stop = !1;
        $(window).mousemove(this.onMouseMove.bind(this));
        this.transitionIn();
        this.animate()
    };
    a.prototype.endSpin = function () {
        this.transitionOut()
    };
    a.prototype.transitionIn = function () {
        this.spinner.stop(!0, !0).fadeIn(400)
    };
    a.prototype.transitionOut = function () {
        this.spinner.stop(!0, !0).fadeOut(400, this.onTransitionOutComplete.bind(this))
    };
    a.prototype.onTransitionOutComplete = function () {
        $(window).unbind("mousemove", this.onMouseMove.bind(this));
        this.stop = !0
    };
    a.prototype.onMouseMove = function (b) {
        this.mouseX = b.clientX;
        this.mouseY = b.clientY
    };
    a.prototype.animate = function () {
        if (!this.stop) {
            requestAnimationFrame(this.animate.bind(this));
            var b = parseInt(String(this.spinner.css("left")).replace("px", ""), 10), a = parseInt(String(this.spinner.css("top")).replace("px", ""), 10), b = Math.round(b + (this.mouseX - b) * 0.1);
            this.spinner.css({top: Math.round(a + (this.mouseY -
                a) * 0.1) - 2, left: b - 2})
        }
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var SoundPlayer = function () {
    function a() {
        createjs.FlashPlugin.BASE_PATH = "../../../swf/";
        this.enabled = !0;
        this.mute = !1;
        if (!createjs.SoundJS.checkPlugin(!0))this.enabled = !1;
        this.loopeds = []
    }

    a.prototype.constructor = a;
    a.prototype.play = function (b, a, e, d) {
        a = a === void 0 ? 0 : a;
        this.enabled && (b = createjs.SoundJS.play(b, createjs.SoundJS.INTERUPT_LATE, d === void 0 ? 0 : d, 0, a, e === void 0 ? 1 : e, 0), a === -1 && this.loopeds.push(b))
    };
    a.prototype.setMute = function () {
        this.fadeOut();
        this.mute = !0
    };
    a.prototype.setUnMute = function () {
        this.fadeIn();
        this.mute = !1
    };
    a.prototype.fadeOut = function () {
        var b = this, a = {v: createjs.SoundJS.getMasterVolume()};
        TweenMax.to(a, 1, {v: 0, onUpdate: function () {
            createjs.SoundJS.setMasterVolume(a.v);
            b._setLoopedsVolume(a.v)
        }, onComplete: function () {
            b._pauseLoopeds();
            createjs.SoundJS.setMute(!0);
            createjs.SoundJS.pause("s_ambientLoop")
        }})
    };
    a.prototype.fadeIn = function () {
        var b = this, a = {v: createjs.SoundJS.getMasterVolume()};
        createjs.SoundJS.setMute(!1);
        createjs.SoundJS.resume("s_ambientLoop");
        this._resumeLoopeds();
        TweenMax.to(a,
            1, {v: 1, onUpdate: function () {
                createjs.SoundJS.setMasterVolume(a.v);
                b._setLoopedsVolume(a.v)
            }})
    };
    a.prototype._pauseLoopeds = function () {
        var b, a;
        for (a in this.loopeds)this.loopeds.hasOwnProperty(a) && (b = this.loopeds[a], b.pause())
    };
    a.prototype._resumeLoopeds = function () {
        var b, a;
        for (a in this.loopeds)this.loopeds.hasOwnProperty(a) && (b = this.loopeds[a], b.resume())
    };
    a.prototype._setLoopedsVolume = function (a) {
        var c, e;
        for (e in this.loopeds)this.loopeds.hasOwnProperty(e) && (c = this.loopeds[e], c.setVolume(a))
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

var Intro = function () {
    function a() {
        this.video = _V_("introVideo");
        this.video.addEvent("ended", this.onVideoComplete.bind(this));
        this.resize();
        this.completeSignal = new signals.Signal;
        $("#introVideo").animate({opacity: 1}, 400);
        $("#skipIntroButton").animate({opacity: 1}, 400);
        $("#skipIntroButton").click(function () {
            this.video.pause();
            this.video.removeEvent("ended", this.onVideoComplete.bind(this));
            this.onVideoComplete()
        }.bind(this))
    }

    a.prototype.constructor = a;
    a.prototype.play = function () {
        this.video.play();
        this.resize()
    };
    a.prototype.resize = function () {
        var a, c, e, d;
        e = window.innerWidth;
        d = window.innerHeight;
        c = e / d > 960 / 540 ? e / 960 : d / 540;
        a = 960 * c;
        c *= 540;
        this.video.size(a, c);
        $("#introVideo").css({top: d * 0.5 - c * 0.5, left: e * 0.5 - a * 0.5})
    };
    a.prototype.onVideoComplete = function () {
        $("#introVideo").remove();
        $("#skipIntroButton").remove();
        this.completeSignal.dispatch()
    };
    return a
}();

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

function activateTab(a) {
    var b = a.closest("dl").find("dd.active"), c = a.children("a").attr("href") + "Tab", c = c.replace(/^.+#/, "#");
    b.removeClass("active");
    a.addClass("active");
    $(c).closest(".tabs-content").children("li").removeClass("active").hide();
    $(c).css("display", "block").addClass("active")
}

///////////////////////////////////////////////////////////////////////////////////
//
//
//
///////////////////////////////////////////////////////////////////////////////////

function initFoundation() {
    $("dl.tabs dd a").on("click.fndtn", function () {
        activateTab($(this).parent("dd"))
    });
    window.location.hash && activateTab($('a[href="' + window.location.hash + '"]').parent("dd"));
    $(this).tooltips();
    var a = !1;
    Modernizr.touch || navigator.userAgent.match(/Windows Phone/i) ? ($(".nav-bar a.flyout-toggle").on("click.fndtn touchstart.fndtn", function (b) {
        b.preventDefault();
        b = $(this).siblings(".flyout").first();
        a === !1 && ($(".nav-bar .flyout").not(b).slideUp(500), b.slideToggle(500, function () {
            a = !1
        }));
        a = !0
    }), $(".nav-bar>li.has-flyout").addClass("is-touch")) : $(".nav-bar>li.has-flyout").hover(function () {
        $(this).children(".flyout").show()
    }, function () {
        $(this).children(".flyout").hide()
    });
    $(".button.disabled").on("click.fndtn", function (a) {
        a.preventDefault()
    });
    $(".button.dropdown > ul").addClass("no-hover");
    $(".button.dropdown").on("click.fndtn touchstart.fndtn", function (a) {
        a.stopPropagation()
    });
    $(".button.dropdown.split span").on("click.fndtn touchstart.fndtn", function (a) {
        a.preventDefault();
        $(".button.dropdown").not($(this).parent()).children("ul").removeClass("show-dropdown");
        $(this).siblings("ul").toggleClass("show-dropdown")
    });
    $(".button.dropdown").not(".split").on("click.fndtn touchstart.fndtn", function () {
        $(".button.dropdown").not(this).children("ul").removeClass("show-dropdown");
        $(this).children("ul").toggleClass("show-dropdown")
    });
    $("body, html").on("click.fndtn touchstart.fndtn", function () {
        $(".button.dropdown ul").removeClass("show-dropdown")
    });
    var b = $(".button.dropdown:not(.large):not(.small):not(.tiny)").outerHeight() - 1, c = $(".button.large.dropdown").outerHeight() -
        1, e = $(".button.small.dropdown").outerHeight() - 1, d = $(".button.tiny.dropdown").outerHeight() - 1;
    $(".button.dropdown:not(.large):not(.small):not(.tiny) > ul").css("top", b);
    $(".button.dropdown.large > ul").css("top", c);
    $(".button.dropdown.small > ul").css("top", e);
    $(".button.dropdown.tiny > ul").css("top", d);
    $(".button.dropdown.up:not(.large):not(.small):not(.tiny) > ul").css("top", "auto").css("bottom", b - 2);
    $(".button.dropdown.up.large > ul").css("top", "auto").css("bottom", c - 2);
    $(".button.dropdown.up.small > ul").css("top",
        "auto").css("bottom", e - 2);
    $(".button.dropdown.up.tiny > ul").css("top", "auto").css("bottom", d - 2)
}; 