// forked from takuyas's "Magic Sphere" http://jsdo.it/takuyas/4Hhe
(function(){
	"use strict";
	var game;	// for enchant.js
	var SE0 = "http://taq7.com/spec5/sound/pi.wav";
	var SE1 = "http://taq7.com/spec5/sound/menu_1.wav";
	var SE2 = "http://taq7.com/spec5/sound/menu_2.wav";
	var SE3 = "http://taq7.com/spec5/sound/menu_3.wav";
	var BEAM = "http://taq7.com/spec5/sound/beam.wav";
	var POWERUP = "http://taq7.com/spec5/sound/powerup.wav";
	var WARP = "http://taq7.com/spec5/sound/warp.wav";
    var WARP2 = "http://taq7.com/spec5/sound/warp2.wav";
	
	var mouse = {x:0, y:0};
	var isDrag = false;
	var prevMouse = {x:0, y:0};
	
	var mouse_stalker = {x:0, y:0};
	var btn_composition = {x:0, y:-100};
	
	var isReady = false;
	
	var isComposition = false;
	
	var stats;
	var scene_bg, renderer_bg, camera_bg;
	var scene, renderer, camera, projector;
	
	var texture, tunnel, earth;
	
	var card_imgs = [
		"http://jsrun.it/assets/2/g/O/m/2gOm9.jpg",
		"http://jsrun.it/assets/z/g/Y/S/zgYSw.jpg",
		"http://jsrun.it/assets/a/G/1/7/aG17C.jpg",
		"http://jsrun.it/assets/5/f/I/g/5fIgN.jpg",
		"http://jsrun.it/assets/o/u/P/N/ouPNV.jpg",
		"http://jsrun.it/assets/b/R/e/W/bReWH.jpg",
		"http://jsrun.it/assets/m/Q/o/b/mQobz.jpg",
		"http://jsrun.it/assets/h/2/c/m/h2cmG.jpg",
		"http://jsrun.it/assets/6/q/M/F/6qMF6.jpg",
		"http://jsrun.it/assets/r/H/i/h/rHihc.jpg",
		"http://jsrun.it/assets/o/p/2/U/op2UJ.jpg"
	];
    
    var txt_imgs = [
		"http://jsrun.it/assets/j/5/g/5/j5g53.png",	//S
        "http://jsrun.it/assets/5/s/r/3/5sr3p.png", //E
        "http://jsrun.it/assets/5/x/Z/5/5xZ53.png", //L
        "http://jsrun.it/assets/5/s/r/3/5sr3p.png", //E
        "http://jsrun.it/assets/z/n/W/Q/znWQ4.png", //C
        "http://jsrun.it/assets/f/z/H/l/fzHlW.png", //T
        "http://jsrun.it/assets/r/R/r/U/rRrU4.png", //
        "http://jsrun.it/assets/r/4/L/D/r4LDx.png", //Y
        "http://jsrun.it/assets/m/j/I/K/mjIKa.png", //O
        "http://jsrun.it/assets/f/b/P/U/fbPUu.png", //U
        "http://jsrun.it/assets/s/K/1/Y/sK1YS.png", //R
        "http://jsrun.it/assets/r/R/r/U/rRrU4.png", //
        "http://jsrun.it/assets/z/n/W/Q/znWQ4.png", //C
        "http://jsrun.it/assets/g/b/I/s/gbIsU.png", //A
        "http://jsrun.it/assets/s/K/1/Y/sK1YS.png", //R
        "http://jsrun.it/assets/p/R/P/G/pRPGN.png", //D
        "http://jsrun.it/assets/r/R/r/U/rRrU4.png" //
	];
	
	var cards_wrap;
	var cards;
	var card_list = [];
	var selected_list = [];
	
	var magic, levelup, core;
	
	var card_info, card_clone;
	
	var lines;
	
	var particleCount = 100;
	var particles;
	var particleSystem;
	
	var text_ring;
	
	var ring_list = [];
	
	var pyramid;
	
	var lastRollOverObject;	//マウスオーバーしたオブジェクトを一時的に格納
	
	init();
	
	//----------------------------------------------------------------------------------------------------
	//
	//	init the scene
	//
	//----------------------------------------------------------------------------------------------------
	
	function init(){
		if( Detector.webgl ){
			init_bg();
			init_ui();
		}else{
			//Detector.addGetWebGLMessage();
            
            var captureImage = document.createElement( 'div' );
            captureImage.style.background = 'url("http://taq7.com/spec5/images/capture.jpg")';
            captureImage.style.width = '465px';
			captureImage.style.height = '465px';
            captureImage.style.position = 'absolute';
            captureImage.style.zIndex = '999';
            document.body.appendChild( captureImage );
            
			return false;
		}
		
		// add Stats.js
		//stats = new Stats();
		//stats.domElement.style.position = 'absolute';
		//stats.domElement.style.bottom = '0px';
		//document.body.appendChild( stats.domElement );
		
		//enchant.js
		enchant();
		game = new Game(1, 1);
		game.preload(SE0, SE1, SE2, SE3, BEAM, POWERUP, WARP, WARP2);
        game.onload = function () {
			intro();
            addEvent();
			animate();
			
		};
		game.start();
		
		game.assets[SE0].volume = 0.5;
		
		onResize();
        
        embedSwf();
	}
    
    function addEvent(){
        window.addEventListener('resize', onResize, false);
		
		document.addEventListener( 'mousemove', onMouseMove, false );
		
		document.getElementById('btn').addEventListener( 'mouseover', onMouseOverBtn, false );
		document.getElementById('btn').addEventListener( 'mousedown', onMouseDownBtn, false );
        
        renderer.domElement.addEventListener('mousemove', onMouseMoveRenderer, false);
		renderer.domElement.addEventListener('mousedown', onMouseDownRenderer, false);
		renderer.domElement.addEventListener('mouseup', onMouseUpRenderer, false);
    }
    
    function embedSwf(){
		var swfObject = document.createElement('object');
		swfObject.setAttribute('type', 'application/x-shockwave-flash');
		swfObject.setAttribute('title', 'sound_swf');
        swfObject.setAttribute('data', 'http://taq7.com/spec5/swf/sp.swf');
		swfObject.setAttribute('width', 78);
		swfObject.setAttribute('height', 14);
        
		var paramName = document.createElement('param');
		paramName.setAttribute('name', 'movie');
		paramName.setAttribute('value', 'http://taq7.com/spec5/swf/sp.swf');
        
        var paramQuality = document.createElement('param');
		paramQuality.setAttribute('name', 'quality');
		paramQuality.setAttribute('value', 'high');
        
        var paramWmode = document.createElement('param');
		paramWmode.setAttribute('name', 'wmode');
		paramWmode.setAttribute('value', 'transparent');
        
        swfObject.appendChild(paramName);
        swfObject.appendChild(paramQuality);
        swfObject.appendChild(paramWmode);
        
        document.getElementById('sp').appendChild(swfObject);
    }
	
	//----------------------------------------------------------------------------------------------------
	//
	//	init_bg
	//
	//----------------------------------------------------------------------------------------------------
	
	function init_bg(){
		
		renderer_bg = new THREE.WebGLRenderer( {antialias : true} );
		renderer_bg.setClearColorHex( 0x000000, 1 );
		renderer_bg.setSize( window.innerWidth, window.innerHeight );
		document.getElementById('bg').appendChild(renderer_bg.domElement);
	
		// create a scene
		scene_bg = new THREE.Scene();
		
		// put a camera in the scene
		camera_bg = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera_bg.position.set(0, 0, 7);
		camera_bg.lookAt(scene_bg.position);
		scene_bg.add(camera_bg);
		
		var light1 = new THREE.DirectionalLight( 0xffffff, 0.7 );
		light1.position.set( 1, 0, 0 ).normalize();
		scene_bg.add( light1 );
		
		var light2 = new THREE.DirectionalLight( 0xffffff, 0.7 );
		light2.position.set( -1, 0, 0 ).normalize();
		scene_bg.add( light2 );
		
		var light3 = new THREE.PointLight( 0xff6699, 20, 30 );
		light3.position.set( 0, -20, 0 );
		scene_bg.add( light3 );
		
		var light4 = new THREE.PointLight( 0xffffff, 25, 30 );
		light4.position.set( 0, 10, 0 );
		scene_bg.add( light4 );
		
		scene_bg.fog	= new THREE.FogExp2( 0x000000, 0.15 );
		
		// here you add your objects
		// - you will most likely replace this part by your own
		var geometry	= new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
		texture		= THREE.ImageUtils.loadTexture( "http://jsrun.it/assets/e/m/Q/f/emQfV.jpg" );
		texture.wrapT	= THREE.RepeatWrapping;
		
		var material	= new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : texture});
		tunnel	= new THREE.Mesh( geometry, material );
		tunnel.rotation.x	= Math.PI/2;
		tunnel.flipSided	= true;
		scene_bg.add( tunnel );
		
		//
		//	kira
		//
		
		// create the particle variables
		particles = new THREE.Geometry();
		var pMaterial =
				new THREE.ParticleBasicMaterial({
					color: 0xFFFFFF,
					size: 0.2,
					opacity:0.8,
					map: THREE.ImageUtils.loadTexture("http://jsrun.it/assets/r/e/q/c/reqc8.png"),
					blending: THREE.AdditiveBlending,
					transparent: true
				});
		
		// now create the individual particles
		for(var p = 0; p < particleCount; p++) {
			var pX = Math.random() * 1.6 - 0.8,
			pY = Math.random() * 1.6 - 0.8,
			pZ = Math.random() * 20 - 10,
			particle = new THREE.Vertex(
				new THREE.Vector3(pX, pY, pZ)
			);
		
			// add it to the geometry
			particles.vertices.push(particle);
		}
		
		// create the particle system
		particleSystem = new THREE.ParticleSystem(particles, pMaterial);
		particleSystem.sortParticles = true;
		
		// add it to the scene
		scene_bg.add(particleSystem);
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	init_ui
	//
	//----------------------------------------------------------------------------------------------------
	
	function init_ui(){
		
		var i, j;
		
		renderer = new THREE.WebGLRenderer( {antialias : true} );
		//renderer.setClearColorHex( 0x000000, 1 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.getElementById('ui').appendChild(renderer.domElement);
		
		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.position.set(0, 0, 1700);
		camera.lookAt(scene.position);
		scene.add(camera);
		
		projector = new THREE.Projector();
		
		var light1 = new THREE.DirectionalLight( 0xffffff, 1.0 );
		light1.position.set( 1, 1, 5 ).normalize();
		scene.add( light1 );
		
		var light2 = new THREE.DirectionalLight( 0xffffff, 0.7 );
		light2.position.set( 0, 0, -10 ).normalize();
		scene.add( light2 );
		
		//
		//	earth
		//
		
		var earth_texture = THREE.ImageUtils.loadTexture('http://jsrun.it/assets/m/1/V/L/m1VLt.png');
		earth_texture.needsUpdate = true;
		var earth_material = new THREE.MeshBasicMaterial({map: earth_texture, overdraw: true, opacity:0.2, transparent:true});
		earth = new THREE.Mesh(new THREE.SphereGeometry(350, 20, 20), earth_material);
		//earth.doubleSided = true;
		scene.add(earth);
		
		//
		//	cards_wrap
		//
		
		cards_wrap = new THREE.Object3D();
		scene.add(cards_wrap);
		
		//
		//	cards
		//
		
		var radius = 400;
		var planeW = 120;
		var planeH = 160;
        
		var H = (2 * radius * Math.PI) / 2 / planeH;
		var sheeta1 = 0;
		var sheeta2 = 90;
		
		cards = new THREE.Object3D();
		cards_wrap.add(cards);
		
		for(i = 0; i < H; i++)
		{
			
			sheeta1 = 0;
			var pn = Math.floor((2 * radius * Math.cos(sheeta2 * Math.PI / 180) * Math.PI) / planeW);
			for(j = 0; j < pn; j++)
			{
				var n = Math.floor(Math.random() * card_imgs.length);
				
				var card = new THREE.Object3D();
				
				//背面
				var card_0_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/k/I/j/U/kIjUJ.jpg");
				//var card_0_material = new THREE.MeshBasicMaterial({map: card_0_texture, overdraw: true});
				var card_0_material = new THREE.MeshLambertMaterial({map: card_0_texture, overdraw: true});
				var card_0 = new THREE.Mesh(new THREE.PlaneGeometry(planeW*0.85, planeH*0.85, 8, 8), card_0_material);
				card_0.position.z = -2;
				card_0.doubleSided = true;
				card_0.cardID = card_list.length;
				card_0.cardNum = n;
				card.add(card_0);
				
				//正面
				var card_texture = THREE.ImageUtils.loadTexture(card_imgs[n]);
				//var card_material = new THREE.MeshBasicMaterial({map: card_texture, overdraw: true});
				var card_material = new THREE.MeshLambertMaterial({map: card_texture, overdraw: true});
				var card_1 = new THREE.Mesh(new THREE.PlaneGeometry(planeW*0.85, planeH*0.85, 8, 8), card_material);
				card_1.position.z = 2;
				card_1.cardID = card_list.length;
				card_1.cardNum = n;
				card.add(card_1);
				
				//光彩
				var card_2_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/2/7/s/a/27sap.png");
				var card_2_material = new THREE.MeshBasicMaterial({
					map: card_2_texture, 
					overdraw: true, 
					blending: THREE.AdditiveBlending, 
					opacity:0.8,
					transparent:true});
				var card_2 = new THREE.Mesh(new THREE.PlaneGeometry(158*0.85, 198*0.85, 8, 8), card_2_material);
				card_2.position.z = 4;
				card_2.cardID = card_list.length;
				card_2.cardNum = n;
				card_2.visible = false;
				card.add(card_2);
				
				// cardの作成と座標計算
				var rx = -sheeta2;
				var ry = sheeta1;
				var xx = radius * Math.cos(sheeta2 * Math.PI / 180) * Math.sin(sheeta1 * Math.PI / 180);
				var yy = radius * Math.sin(sheeta2 * Math.PI / 180);
				var zz = radius * Math.cos(sheeta2 * Math.PI / 180) * Math.cos(sheeta1 * Math.PI / 180);
				
				card.position.x = xx;
				card.position.y = yy;
				card.position.z = zz;
				
				//card.rotation.x = 3.2 / H * i - 1.6;
				//card.rotation.y = 6.4 / pn * j;
				card.rotation.x = (Math.PI) / H * i - (Math.PI / 2);
				card.rotation.y = (Math.PI * 2) / pn * j;
				
				card.updateMatrix();
				card.eulerOrder = 'YZX';
				
				/*card.useQuaternion = true;
				var vec = new THREE.Vector3(rx, ry, 0);
				var quat = new THREE.Quaternion().setFromEuler(vec);
				card.quaternion.multiplySelf(quat);*/
				
				card.isSelected = false;
				card.def = {
					x:card.position.x,
					y:card.position.y,
					z:card.position.z,
					rx:card.rotation.x,
					ry:card.rotation.y,
					rz:card.rotation.z,
					sx:card.scale.x,
					sy:card.scale.y,
					sz:card.scale.z
				};
				
				sheeta1 += 360 / pn;
				
				//シーンに追加
				cards.add(card);
				card_list.push(card_1);
				
			}
			sheeta2 -= 180 / H;
			
		}
		
		//
		//	card_info
		//
		
		var card_info_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/z/7/N/c/z7Nce.jpg");
		var card_info_material = new THREE.MeshBasicMaterial({map: card_info_texture, overdraw: true, transparent:true, opacity:1.0});
		card_info = new THREE.Mesh(new THREE.PlaneGeometry(120, 144, 8, 8), card_info_material);
		card_info.scale = {x:0, y:0, z:0};
		scene.add(card_info);
		
		//
		//	card_clone
		//
		
		var card_clone_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/k/I/j/U/kIjUJ.jpg");
		var card_clone_material = new THREE.MeshBasicMaterial({map: card_clone_texture, overdraw: true, transparent:true, opacity:1.0});
		card_clone = new THREE.Mesh(new THREE.PlaneGeometry(120, 160, 8, 8), card_clone_material);
		card_clone.scale = {x:0, y:0, z:0};
		scene.add(card_clone);
		
		//
		//	lines
		//
		
		lines = new THREE.Object3D();
		cards.add(lines);
		
		//
		//	text_ring
		//
		
		text_ring = new THREE.Object3D();
		scene.add(text_ring);
		
		text_ring.scale = {x:2.5, y:2.5, z:2.5};
		
		var txt_num = txt_imgs.length;
		var txt_repeat = 2;
		var txt_total = txt_num * txt_repeat;
		var angle = 0;
		var vec, quat;
		
		for(i = 0; i < txt_repeat; i++){
			for(j = 0; j < txt_num; j++){
				var txt_texture = THREE.ImageUtils.loadTexture(txt_imgs[j]);
				var txt_material = new THREE.MeshLambertMaterial({
					map: txt_texture, 
					overdraw: true,
					opacity:0.1,
					blending: THREE.AdditiveBlending, 
					transparent:true
				});
				var txt = new THREE.Mesh(new THREE.PlaneGeometry(54*6, 84*6, 2, 2), txt_material);
				txt.doubleSided = true;
				txt.position.x = 1700 * Math.sin(Math.PI/180 * angle);
				txt.position.z = 1700 * Math.cos(Math.PI/180 * angle);
				//txt.rotation.y = 6.4/360*(i-1);
				txt.doubleSided = true;
				text_ring.add(txt);
				
				txt.useQuaternion = true;
				vec = new THREE.Vector3(0, angle-180, 0);
				quat = new THREE.Quaternion().setFromEuler(vec);
				txt.quaternion.multiplySelf(quat);
				
				angle -= 360 / txt_total;
			}
		}
		
		//
		//	rings
		//
		
		var ring_num = 20;
		angle = 0;
		
		for(i = 0; i < 3; i++){
		
			angle = 0;
			var ring = new THREE.Object3D();
			
			for(j = 0; j < ring_num; j++){
				var ring_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/n/C/f/1/nCf1O.png");
				var ring_material = new THREE.MeshBasicMaterial({
					map: ring_texture,
					overdraw: true,
					opacity:0.4,
					blending: THREE.AdditiveBlending,
					transparent:true
				});
				var ring_parts = new THREE.Mesh(new THREE.PlaneGeometry(44*3.2, 69*1.2, 2, 2), ring_material);
				
				ring_parts.position.x = 430 * Math.sin(Math.PI/180 * angle);
				ring_parts.position.z = 430 * Math.cos(Math.PI/180 * angle);
				ring_parts.doubleSided = true;
				
				ring_parts.useQuaternion = true;
				vec = new THREE.Vector3(0, angle, 0);
				quat = new THREE.Quaternion().setFromEuler(vec);
				ring_parts.quaternion.multiplySelf(quat);
				
				ring.add(ring_parts);
				
				angle += 360 / ring_num;
			}
			
			ring_list.push(ring);
			scene.add(ring);
		}
		
		ring_list[0].rotation = {x:0, y:0, z:0};
		ring_list[1].rotation = {x:90, y:0, z:0};
		ring_list[2].rotation = {x:0, y:0, z:90};
		
		//
		//	magic
		//
		
		var magic_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/f/N/d/i/fNdiv.png");
		var magic_material = new THREE.MeshBasicMaterial({
			map: magic_texture, 
			overdraw: true, 
			opacity:0.6,
			//blending: THREE.AdditiveBlending, 
			transparent:true});
		magic = new THREE.Mesh(new THREE.PlaneGeometry(206, 206, 8, 8), magic_material);
		magic.doubleSided = true;
		magic.scale = {x:1.2, y:1.2, z:1.2};
		
		//
		//	levelup
		//
		
		var levelup_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/i/Z/3/C/iZ3Cg.png");
		var levelup_material = new THREE.MeshBasicMaterial({
			map: levelup_texture, 
			overdraw: true,
            //blending: THREE.AdditiveBlending, 
			transparent:true});
		levelup = new THREE.Mesh(new THREE.PlaneGeometry(238, 178, 8, 8), levelup_material);
		levelup.position.z = 10;
		levelup.scale = {x:0.4, y:0.4, z:0.4};
		
		//
		//	core
		//
		
		core = new THREE.Object3D();
		core.position.z = -4;
		core.scale = {x:0, y:0, z:0};
		
		var core_texture = THREE.ImageUtils.loadTexture("http://jsrun.it/assets/p/E/I/1/pEI1v.png");
		var core_material = new THREE.MeshBasicMaterial({
			map: core_texture, 
			overdraw: true,
			blending: THREE.AdditiveBlending,
			opacity:0.8,
			transparent:true});
		
		for(i = 0; i < 2; i++){
			var core_light = new THREE.Mesh(new THREE.PlaneGeometry(284, 284, 8, 8), core_material);
			core.add(core_light);
		}
		
		//
		//	pyramid
		//
		
		//var pyramid_texture = THREE.ImageUtils.loadTexture("images/gold.jpg");
		var pyramid_geometry = new THREE.CylinderGeometry( 0, 130, 170, 3 );
		var pyramid_material = new THREE.MeshLambertMaterial({
			color: 0xd9c700, 
			//map: pyramid_texture, 
			overdraw: true});
		pyramid = new THREE.Mesh(pyramid_geometry, pyramid_material);
		scene.add(pyramid);
		
		//
		//	event
		//
		
		
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	animation loop
	//
	//----------------------------------------------------------------------------------------------------
	
	function animate() {
	
		requestAnimationFrame( animate );
	
		render();
		
		TWEEN.update();
		//stats.update();
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	render the scene
	//
	//----------------------------------------------------------------------------------------------------
	
	function render() {
	
		var perMouseX = mouse.x / (window.innerWidth / 2);
		var perMouseY = mouse.y / (window.innerHeight / 2);
	
		// move the texture to give the illusion of moving thru the tunnel
		texture.offset.y	+= 0.005;
		texture.offset.y	%= 1;
		texture.needsUpdate	= true;
	
		// move the camera back and forth
		var seconds		= Date.now() / 1000;
		var radius		= 0.70;
		var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
		angle	= (seconds*Math.PI)/4;
		camera_bg.position.x	= Math.cos(angle - Math.PI/2) * radius;
		camera_bg.position.y	= Math.sin(angle - Math.PI/2) * radius;
		//camera_bg.rotation.z	+= 0.01;
		
		tunnel.rotation.y	+= 0.02;
		
		earth.rotation.x	+= 0.01;
		earth.rotation.y	-= 0.01;
		
		//cards
		if(!isComposition){
			cards.rotation.y += 0.001;
		}
		
		//camera
		if(isComposition){
			camera.position.x += ( 0 - camera.position.x ) * 0.05;
			camera.position.y += ( 0 - camera.position.y ) * 0.05;
		}
		else{
			camera.position.x += ( mouse.x - camera.position.x ) * 0.05;
			camera.position.y += ( - mouse.y - camera.position.y ) * 0.05;
		}
		
		//var angle = mouse.x * 180 * Math.PI / 180;
		//camera.position.x = Math.sin(angle) * window.innerWidth/2;
		//camera.position.z = Math.cos(angle) * window.innerHeight/2 + 1700;
		//camera.position.y = Math.tan(mouseY * 60 * Math.PI / 180) * window.innerHeight/2;
		
		//particle
		particleSystem.rotation.z -= 0.01;
		var pCount = particleCount;
		while(pCount-=1) {
			var particle = particles.vertices[pCount];
			particle.position.z += 0.1;
			if(particle.position.z > 10) {
				particle.position.z = -10;
			}
		}
		
		//text_ring
		text_ring.rotation.y += 0.01;
		
		//ring
		ring_list[0].rotation.x += 0.01;
		ring_list[0].rotation.y += 0.01;
		ring_list[0].rotation.z += 0.02;
		ring_list[1].rotation.x -= 0.01;
		ring_list[1].rotation.y -= 0.02;
		ring_list[1].rotation.z -= 0.02;
		ring_list[2].rotation.x -= 0.02;
		ring_list[2].rotation.y -= 0.01;
		ring_list[2].rotation.z -= 0.01;
		
		//card_info
		card_info.rotation.y += ((mouse.x-80) / window.innerWidth * 5 - card_info.rotation.y) * 0.1;
		card_info.rotation.x += (mouse.y / window.innerHeight * 1 - card_info.rotation.x) * 0.1;
		
		//card_clone
		card_clone.rotation.y += ((mouse.x+80) / window.innerWidth * 5 - card_clone.rotation.y) * 0.1;
		card_clone.rotation.x += (mouse.y / window.innerHeight * 1 - card_clone.rotation.x) * 0.1;
		
		//pyramid
		pyramid.rotation.x -= 0.06;
		pyramid.rotation.y += 0.09;
		//pyramid.rotation.z += 0.001;
		
		//magic
		magic.rotation.z += 0.01;
		
		//core
		core.children[0].rotation.z += 0.01;
		core.children[1].rotation.z -= 0.005;
		
		// actually render the scene
		
		renderer.render( scene, camera );
		renderer_bg.render( scene_bg, camera_bg );
		
		//mouse stalker
		mouse_stalker.x += ( (mouse.x + window.innerWidth / 2 - 10) - mouse_stalker.x ) * 0.2;
		mouse_stalker.y += ( (mouse.y + window.innerHeight / 2 - 90) - mouse_stalker.y ) * 0.5;
		mouse_stalker.x = Math.floor(mouse_stalker.x);
		mouse_stalker.y = Math.floor(mouse_stalker.y);
		document.getElementById("stat").style.left = mouse_stalker.x + "px";
		document.getElementById("stat").style.top = mouse_stalker.y + "px";
		
		//btn
		if(isReady){
			btn_composition.y += ( 0 - btn_composition.y ) * 0.2;
		}
		else{
			btn_composition.y += ( -100 - btn_composition.y ) * 0.2;
		}
		document.getElementById("btn").style.bottom = ( btn_composition.y + 10 ) + "px";
		
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	onMouseMove
	//
	//----------------------------------------------------------------------------------------------------
	
	function onMouseMoveRenderer(e){
		
		var n;
		var card;
		
		var mouse_x =   ((e.pageX-e.target.offsetParent.offsetLeft) / renderer.domElement.width) * 2 - 1;
		var mouse_y = - ((e.pageY-e.target.offsetParent.offsetTop) / renderer.domElement.height) * 2 + 1;
		var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
		projector.unprojectVector(vector, camera);
		
		var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());
		var obj = ray.intersectObjects(card_list);
		
		for(n = 0; n < card_list.length; n++){
			card = card_list[n].parent;
			if(!card.isSelected){
				card.children[2].visible = false;
			}
		}
		
		if(obj.length > 0 && !isDrag && !isComposition){
			
			document.body.style.cursor = "pointer";
			
			n = obj[0].object.cardID;
			card = card_list[n].parent;
			card.children[2].visible = true;	//[2]:light layer
			
			//card_info
			new TWEEN.Tween(card_info.position)
				.to({x:1300, z:-2300}, 300)
				.easing( TWEEN.Easing.Cubic.Out )
				.start();	
			new TWEEN.Tween(card_info.scale)
				.to({x:15, y:15, z:15}, 300)
				.easing( TWEEN.Easing.Elastic.Out )
				.start();
				
			//card_clone
			card_clone.material.map.image.src = card.children[1].material.map.image.src;
			
			new TWEEN.Tween(card_clone.position)
				.to({x:-1300, z:-2300}, 300)
				.easing( TWEEN.Easing.Cubic.Out )
				.start();	
			new TWEEN.Tween(card_clone.scale)
				.to({x:14, y:14, z:14}, 300)
				.easing( TWEEN.Easing.Elastic.Out )
				.start();
			
			//stat
			document.getElementById("stat").style.display = "block";
			
			
			//SE
			if(card !== lastRollOverObject){
				game.assets[SE0].stop();
				game.assets[SE0].play();
				lastRollOverObject = card;
				
				var stat_list = document.getElementById("stat").getElementsByTagName('span');
				stat_list.item(0).innerText = "card " + ( obj[0].object.cardNum + 1 );
				stat_list.item(1).innerText = zeroFill( Math.floor(Math.random() * 70 + 20), 2 );
				stat_list.item(2).innerText = zeroFill( Math.floor(Math.random() * 70 + 20) * 10, 3 );
				stat_list.item(3).innerText = zeroFill( Math.floor(Math.random() * 70 + 20) * 10, 3 );
				stat_list.item(4).innerText = zeroFill( Math.floor(Math.random() * 70 + 20) * 10, 3 );
			}
			
		}
		else{
			document.body.style.cursor = "default";
			
			//card_info
			new TWEEN.Tween(card_info.position)
				.to({x:0, z:0}, 300)
				.easing( TWEEN.Easing.Cubic.Out )
				.start();
			new TWEEN.Tween(card_info.scale)
					.to({x:0, y:0, z:0}, 300)
					.easing( TWEEN.Easing.Cubic.Out )
					.start();
			
			//card_clone
			new TWEEN.Tween(card_clone.position)
				.to({x:0, z:0}, 300)
				.easing( TWEEN.Easing.Cubic.Out )
				.start();
			new TWEEN.Tween(card_clone.scale)
				.to({x:0, y:0, z:0}, 300)
				.easing( TWEEN.Easing.Cubic.Out )
				.start();
			
			//stat
			document.getElementById("stat").style.display = "none";
		}
		
		//
		//	rotate cards
		//
		
		if(isDrag){
			var moveDistance = {x: prevMouse.x - mouse.x, y: prevMouse.y - mouse.y};
			
			cards_wrap.rotation.x -= moveDistance.y * 0.01;
			cards.rotation.y -= moveDistance.x * 0.01;
			
			prevMouse = {x: mouse.x, y: mouse.y};
			
			document.getElementById("btn").getElementsByTagName('img').item(0).style.opacity = 0.3;
		}
		else{
			document.getElementById("btn").getElementsByTagName('img').item(0).style.opacity = 1.0;
		}
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	onMouseDown
	//
	//----------------------------------------------------------------------------------------------------
	
	function onMouseDownRenderer(e){
		
		var i;
		
		var mouse_x =   ((e.pageX-e.target.offsetParent.offsetLeft) / renderer.domElement.width) * 2 - 1;
		var mouse_y = - ((e.pageY-e.target.offsetParent.offsetTop) / renderer.domElement.height) * 2 + 1;
		var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
		projector.unprojectVector(vector, camera);
		
		var ray = new THREE.Ray(camera.position, vector.subSelf(camera.position).normalize());
		var obj = ray.intersectObjects(card_list);
		
		isDrag = true;
		prevMouse = {x:mouse.x, y: mouse.y};
		
		if(obj.length > 0 && !isComposition){
			
			var n = obj[0].object.cardID;
			var card = card_list[n].parent;
			
			card.isSelected = !card.isSelected;
			
			//all cancel
			if(!card.isSelected && card === selected_list[0]){
				
				for(i = 0; i < selected_list.length; i++){
					selected_list[i].isSelected = false;
					
					new TWEEN.Tween(selected_list[i].position)
						.to({x:selected_list[i].def.x, y:selected_list[i].def.y, z:selected_list[i].def.z}, 1000)
						.easing( TWEEN.Easing.Elastic.Out )
						.start();
					
					new TWEEN.Tween(selected_list[i].scale)
						.to({x:selected_list[i].def.sx, y:selected_list[i].def.sy, z:selected_list[i].def.sz}, 1000)
						.easing( TWEEN.Easing.Elastic.Out )
						.start();
				}
				
				selected_list = [];
				
				game.assets[SE3].play();
			}
			
			var xx, yy, zz, sx, sy, sz;
			
			if(card.isSelected){
				var rand = Math.random()/2 + 1.2;
				xx = card.def.x * rand;
				yy = card.def.y * rand;
				zz = card.def.z * rand;
				sx = 1.5;
				sy = 1.5;
				sz = 1.5;
				
				if(selected_list.length === 0){
					xx *= 1.2;
					yy *= 1.2;
					zz *= 1.2;
					sx *= 1.2;
					sy *= 1.2;
					sz *= 1.2;
				}
				
				addArray(card, selected_list);
				
				game.assets[SE1].play();
			}
			else{
				
				xx = card.def.x;
				yy = card.def.y;
				zz = card.def.z;
				sx = card.def.sx;
				sy = card.def.sy;
				sz = card.def.sz;
				
				removeArray(card, selected_list);
				
				game.assets[SE2].play();
			}
			
			new TWEEN.Tween(card.position)
				.to({x:xx, y:yy, z:zz}, 1000)
				.easing( TWEEN.Easing.Elastic.Out )
				.start();
			
			new TWEEN.Tween(card.scale)
				.to({x:sx, y:sy, z:sz}, 1000)
				.easing( TWEEN.Easing.Elastic.Out )
				.start();
			
			
			//
			//	draw line
			//
			
			while(lines.children.length > 0){
				lines.remove(lines.children[0]);
			}
			
			var x1, y1, z1, x2, y2, z2;
			
			if(selected_list.length > 1){
				
				x1 = selected_list[0].position.x;
				y1 = selected_list[0].position.y;
				z1 = selected_list[0].position.z;
				
				for(i = 1; i < selected_list.length; i++){
					
					if(selected_list[i] === card){
						x2 = xx;
						y2 = yy;
						z2 = zz;
					}
					else{
						x2 = selected_list[i].position.x;
						y2 = selected_list[i].position.y;
						z2 = selected_list[i].position.z;
					}
					
					var geometry = new THREE.Geometry();
					geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x1, y1, z1)));
					geometry.vertices.push(new THREE.Vertex(new THREE.Vector3(x2, y2, z2)));
					var line = new THREE.Line(
						geometry, 
						new THREE.LineBasicMaterial({color:0xffff99, opacity:0.4, linewidth:1.2}));
					lines.add(line);
				}
			}
			
			//
			//	magic
			//
			
			if(selected_list.length > 0){
				magic.visible = true;
				selected_list[0].add(magic);
			}
			else{
				magic.visible = false;
			}
			
			//
			//	btn
			//
			
			if(selected_list.length > 1){
				isReady = true;
			}
			else{
				isReady = false;
			}
		}
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	onMouseUp
	//
	//----------------------------------------------------------------------------------------------------
	
	function onMouseUpRenderer(e){
		isDrag = false;
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	onResize
	//
	//----------------------------------------------------------------------------------------------------
	
	function onResize() {
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	
		renderer_bg.setSize( window.innerWidth, window.innerHeight );
		camera_bg.aspect	= window.innerWidth / window.innerHeight;
		camera_bg.updateProjectionMatrix();
		
		var img = document.getElementById("btn").getElementsByTagName('img').item(0);
		img.width = window.innerHeight * 210 / 465;
		img.height = window.innerHeight * 45 / 465;
		img.style.marginLeft = -img.width / 2 + 'px';
		
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	onMouseMove (document)
	//
	//----------------------------------------------------------------------------------------------------
	
	function onMouseMove(e) {
		mouse.x = ( e.clientX - window.innerWidth / 2 );
		mouse.y = ( e.clientY - window.innerHeight / 2 );
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	btn
	//
	//----------------------------------------------------------------------------------------------------
	
	function onMouseDownBtn(e){
		game.assets[SE1].play();
		doComposition();
	}
	
	function onMouseOverBtn(e){
		game.assets[SE0].play();
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	composition
	//
	//----------------------------------------------------------------------------------------------------
	
	function doComposition(){
		
		var i;
		
		isComposition = true;
		isReady = false;
		
		while(lines.children.length > 0){
			lines.remove(lines.children[0]);
		}
		
		var vrx, vry, vrz;
		
		vrx = -selected_list[0].def.rx;
		vry = -selected_list[0].def.ry;
		vrz = selected_list[0].def.rz;
		
		new TWEEN.Tween(cards.rotation)
			.to({x:0, y:0, z:0}, 2500)
			.easing( TWEEN.Easing.Cubic.InOut )
			.start();
		
		new TWEEN.Tween(cards_wrap.rotation)
			.to({x:0, y:0, z:0}, 2500)
			.easing( TWEEN.Easing.Cubic.InOut )
			.onComplete( doCompositionScene2 )
			.start();
		
		var card;
		
		for(i = 0; i < card_list.length; i++){
			card = card_list[i].parent;
			card.children[2].visible = false;
			
			if( !inArray(card, selected_list) ){
				new TWEEN.Tween(card.position)
					.to({x:0, y:0, z:0}, 1500)
					.easing( TWEEN.Easing.Back.InOut )
					.delay(i * 20)
					.start();
				
				new TWEEN.Tween(card.scale)
					.to({x:0, y:0, z:0}, 1500)
					.easing( TWEEN.Easing.Back.InOut )
					.delay(i * 20)
					.start();
			}
		}
		
		var degree = 360 / (selected_list.length - 1);
		var radius = 350;
		var xx, yy, rz;
		
		for(i = 0; i < selected_list.length; i++){
			
			card = selected_list[i];
			
			if(i === 0){
				new TWEEN.Tween(card.position)
					.to({x:0, y:0, z:500}, 2000)
					.easing( TWEEN.Easing.Cubic.InOut )
					.start();
				new TWEEN.Tween(card.rotation)
					.to({x:0, y:0, z:0}, 2000)
					.easing( TWEEN.Easing.Cubic.InOut )
					.start();
				new TWEEN.Tween(card.scale)
					.to({x:3, y:3, z:3}, 2000)
					.easing( TWEEN.Easing.Cubic.InOut )
					.start();
			}
			else{
				xx = radius * Math.cos(Math.PI/180 * degree * i);
				yy = radius * Math.sin(Math.PI/180 * degree * i);
				rz = (Math.PI * 2) / (selected_list.length - 1) * i - Math.PI / 2;
				//rz = 0;
				
				new TWEEN.Tween(card.position)
					.to({x:xx, y:yy, z:550}, 2000)
					.easing( TWEEN.Easing.Cubic.InOut )
					.start();
				new TWEEN.Tween(card.rotation)
					.to({x:0, y:0, z:rz}, 2000)
					.easing( TWEEN.Easing.Cubic.InOut )
					.start();
			}
			
		}
        
        //	pyramid
        new TWEEN.Tween(pyramid.position)
			.to({x:0, y:0, z:-10000}, 1000)
			.easing( TWEEN.Easing.Cubic.Out )
			.start();
        
        //earth
		new TWEEN.Tween(earth.scale)
			.to({x:0, y:0, z:0}, 2000)
			.easing( TWEEN.Easing.Cubic.Out )
			.start();
        
        //	rings
        for(i = 0; i < 3; i++){
			new TWEEN.Tween(ring_list[i].scale)
				.to({x:0, y:0, z:0}, 2000)
				.easing( TWEEN.Easing.Back.Out )
				.delay(i * 100)
				.start();
		}
        
        //text_ring
		new TWEEN.Tween(text_ring.scale)
			.to({x:0, y:0, z:0}, 2000)
			.easing( TWEEN.Easing.Cubic.Out )
			.start();
        
        
	}
	
	function doCompositionScene2(){
		
		//SE
		new TWEEN.Tween({t:1})
			.to({t:0}, 2000)
			.onComplete(function(){
				game.assets[WARP].volume = 0.7;
				game.assets[WARP].play();
			})
			.start();
		
		
		new TWEEN.Tween({t:1})
			.to({t:0}, 5500)
			.onComplete(function(){
				game.assets[POWERUP].play();
			})
			.start();
		
		//rotate cards
		var vr = Math.PI * 5;
		var base_card = selected_list[0];
		
		new TWEEN.Tween(base_card.rotation)
			.to({x:0, y:0, z:-vr}, 5000)
			.easing( TWEEN.Easing.Cubic.In )
			.start();
		
		new TWEEN.Tween(cards_wrap.rotation)
			.to({x:0, y:0, z:vr}, 5000)
			.easing( TWEEN.Easing.Cubic.In )
			.start();
		
		//composite cards
		var delayTime = 2500 / (selected_list.length - 1);
		
		for(var i = 1; i < selected_list.length; i++){
			
			//回転しながら縮小して消える
			new TWEEN.Tween(selected_list[i].rotation)
				.to({y:Math.PI * 4}, 2000)
				.easing( TWEEN.Easing.Cubic.In )
				.delay(delayTime * i)
				.start();
			new TWEEN.Tween(selected_list[i].position)
				.to({x:0, y:0, z:500}, 2000)
				.easing( TWEEN.Easing.Back.In )
				.delay(delayTime * i)
				.start();
			new TWEEN.Tween(selected_list[i].scale)
				.to({x:0, y:0, z:0}, 2000)
				.easing( TWEEN.Easing.Back.In )
				.onComplete(function(){
					game.assets[SE0].stop();
					game.assets[SE0].play();
					game.assets[SE1].stop();
					game.assets[SE1].play();
				})
				.delay(delayTime * i)
				.start();
				
			//合成カード複製
			var card_image = "http://jsrun.it/assets/2/7/s/a/27sap.png";
			var card_texture = THREE.ImageUtils.loadTexture(card_image);
			var card_material = new THREE.MeshLambertMaterial({
				map: card_texture, 
				blending: THREE.AdditiveBlending, 
				transparent:true,
				opacity:1.0,
				overdraw: true});
			var card = new THREE.Mesh(new THREE.PlaneGeometry(158*0.85, 198*0.85, 8, 8), card_material);
			
			card.visible = false;
			card.position.z = 3 + i;
			base_card.add(card);
			
			new TWEEN.Tween(card.position)
				.to({z:100}, 500)
				.easing( TWEEN.Easing.Cubic.Out )
				.delay(delayTime * i + 2000)
				.start();
				
			new TWEEN.Tween( { opacity:1.0 } )
				.to({opacity:0}, 500)
				.easing( TWEEN.Easing.Cubic.Out )
				.delay(delayTime * i + 2000)
				.onUpdate(function(){
					card.visible = true;
					card.material.opacity = this.opacity;
				})
				.onComplete(function(){
					card.visible = false;
				})
				.start();
		}
		
		//finish
		new TWEEN.Tween(base_card.scale)
			.to({x:4, y:4, z:4}, 1000)
			.easing( TWEEN.Easing.Back.InOut )
			.delay(5000)
			.start();
		
		new TWEEN.Tween(magic.scale)
			.to({x:0, y:0, z:0}, 1000)
			.easing( TWEEN.Easing.Back.InOut )
			.delay(5000)
			.start();
		
		base_card.add(core);
		
		new TWEEN.Tween(core.scale)
			.to({x:1.3, y:1.3, z:1.3}, 1000)
			.easing( TWEEN.Easing.Back.InOut )
			.delay(5000)
			.start();
		
		levelup.visible = false;
		base_card.add(levelup);
		
		new TWEEN.Tween( { opacity:1 } )
			.to({opacity:0}, 2000)
			.easing( TWEEN.Easing.Cubic.Out )
			.delay(5500)
			.onUpdate(function(){
				levelup.visible = true;
				
				base_card.children[2].visible = true;
				base_card.children[2].material.opacity = this.opacity;
			})
			.onComplete(function(){
				base_card.children[2].visible = false;
			})
			.start();
			
		new TWEEN.Tween( levelup.scale )
			.to({x:0.7, y:0.7, z:0.7}, 3500)
			.easing( TWEEN.Easing.Cubic.Out )
			.delay(5500)
			.start();
		
		new TWEEN.Tween( { opacity:1 } )
			.to({opacity:0}, 1000)
			.easing( TWEEN.Easing.Cubic.Out )
			.delay(7000)
			.onUpdate(function(){
				levelup.material.opacity = this.opacity;
			})
			.onComplete(function(){
				levelup.visible = false;
                levelup.material.opacity = 1;
                levelup.scale = {x:0.4, y:0.4, z:0.4};
                
                setTimeout(endToStart,2000);
			})
			.start();
	}
    
    //----------------------------------------------------------------------------------------------------
	//
	//	endToStart
	//
	//----------------------------------------------------------------------------------------------------
    
    function endToStart(){
        
        var base_card = selected_list[0];
        
        base_card.remove(magic);
        
        game.assets[WARP2].volume = 0.5;
        game.assets[WARP2].play();
        
        //core
		new TWEEN.Tween(core.scale)
				.to({x:0, y:0, z:0}, 500)
				.easing( TWEEN.Easing.Back.In )
				.start();
        
        //base_card
        new TWEEN.Tween(base_card.rotation)
				.to({y:Math.PI * 3}, 2000)
				.easing( TWEEN.Easing.Cubic.In )
				.start();
        
        new TWEEN.Tween(base_card.position)
				.to({z:2000}, 2000)
				.easing( TWEEN.Easing.Back.In)
            	.onComplete(function(){
                    resetAll();
                })
				.start();
    }
    
    function resetAll(){
        
        isComposition = false;
		isReady = false;
        
        selected_list = [];
        
        magic.scale = {x:1.2, y:1.2, z:1.2};
        
        cards_wrap.rotation = {x:0, y:0, z:0};
		cards.rotation = {x:0, y:0, z:0};
        
        for(var i = 0; i < card_list.length; i++){
            var card = card_list[i].parent;
            
            card.rotation.x = card.def.rx;
            card.rotation.y = card.def.ry;
            card.rotation.z = card.def.rz;
            
            card.isSelected = false;
        }
        
        intro();
    }
	
	//----------------------------------------------------------------------------------------------------
	//
	//	intro
	//
	//----------------------------------------------------------------------------------------------------
	
	function intro(){
		initIntro();
		
		new TWEEN.Tween({t:0})
			.to({t:1}, 1000)
			.onComplete(playIntro)
			.start();
			
		//playIntro();
	}
	
	function initIntro(){
		
		var i;
		
		//earth
		earth.scale = {x:0, y:0, z:0};
		
		//rings
		for(i = 0; i < 3; i++){
			ring_list[i].scale = {x:0, y:0, z:0};
		}
		
		//text_ring
		text_ring.scale = {x:0, y:0, z:0};
		
		//cards
		for(i = 0; i < card_list.length; i++){
			card_list[i].parent.scale = {x:0, y:0, z:0};
			card_list[i].parent.position = {x:0, y:0, z:0};
		}
		
		//pyramid
		pyramid.position.z = -10000;
	}
	
	function playIntro(){
		
		var i;
		
		//pyramid
		new TWEEN.Tween(pyramid.position)
			.to({x:0, y:0, z:0}, 1000)
			.easing( TWEEN.Easing.Cubic.Out )
			.onComplete(function(){
				game.assets[BEAM].volume = 0.5;
				game.assets[BEAM].play();
			})
			.start();
		
		//earth
		new TWEEN.Tween(earth.scale)
			.to({x:1, y:1, z:1}, 2000)
			.easing( TWEEN.Easing.Cubic.Out )
			.delay(1000)
			.start();
		
		//rings
		for(i = 0; i < 3; i++){
			new TWEEN.Tween(ring_list[i].scale)
				.to({x:1, y:1, z:1}, 2000)
				.easing( TWEEN.Easing.Back.Out )
				.delay(1000 + i * 100)
				.start();
		}
		
		//text_ring
		new TWEEN.Tween(text_ring.scale)
			.to({x:2.5, y:2.5, z:2.5}, 2000)
			.easing( TWEEN.Easing.Cubic.Out )
			.delay(1000)
			.start();
			
		//cards
		for(i = 0; i < card_list.length; i++){
			var card = card_list[i].parent;
			new TWEEN.Tween(card.scale)
				.to({x:card.def.sx, y:card.def.sy, z:card.def.sz}, 2000)
				.easing( TWEEN.Easing.Cubic.Out )
				.delay(1000)
				.start();
			new TWEEN.Tween(card.position)
				.to({x:card.def.x, y:card.def.y, z:card.def.z}, 1000)
				.easing( TWEEN.Easing.Back.Out )
				.delay(1000 + i * 8)
				.start();
		}
		
		//core
		scene.add(core);
		
		var core_tween = new TWEEN.Tween(core.scale)
							.to({x:10, y:10, z:10}, 500)
							.easing( TWEEN.Easing.Cubic.Out )
							.delay(1000);
							
		var core_tweenBack = new TWEEN.Tween(core.scale)
							.to({x:0, y:0, z:0}, 750)
							.easing( TWEEN.Easing.Cubic.In );
		
		core_tween.chain(core_tweenBack);
		core_tween.start();
		
	}
	
	//----------------------------------------------------------------------------------------------------
	//
	//	Utils
	//
	//----------------------------------------------------------------------------------------------------
	
	function zeroFill(num, len){
		var zeros = (new Array(len)).join("0");
		return (zeros + num).slice(-len);
	}
	
	function addArray(obj, arr){
		arr.push(obj);
		return arr;
	}
	
	function removeArray(obj, arr){
		for(var i = 0; i < arr.length; i++){
			if(arr[i] === obj){
				arr.splice(i,1);
			}
		}
		
		return arr;
	}
	
	function inArray(obj, arr){
		for(var i = 0; i < arr.length; i++){
			if(arr[i] === obj){
				return true;
			}
		}
		return false;
	}
})();