<!DOCTYPE html>
<!-- saved from url=(0050)http://maran-emil.de/experiments/demo13/index.html -->
<html class="no-js compliant lang_de" lang="de"><!--<![endif]-->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 

                   . .                  
                 .$7778...+=..      .   
   .          .,III77777777777..   .    
     ..    ..7II++I777777777777$..      
       ,   .IIII7II777777877777I7:.     
           .IIIIIII777777777777777.     
       .DIIIIIIIIII77777777777777D.     
    ...I?IIII?IIIII77777777777777$$D..  
 ...IIIIIIIIIIII7ID77777777777777$$$Z.  
 .IIIIII?IIIIIIIIII7777I777777777$$$$D  
 ?IIZDDI8$$IIIIIIII777?7777777777$$$$$. 
 .IIIII$$I7$$8I$8II$$O7IIZ7777777$$D$8  
 ZI?III?$+DOD8O8ZO7ZZZZ7Z?7I777$787$8.  
 .?IIIIII?OZZD88$$$$$$7I77777??$8$7:    
 ...IIIIIIIII .$D$$$DO77777777777$?.    
    ~II???II.   .$$$Z$$Z7O77DD77.       
      .:Z+.    .$$$$ZD......877Z        
           .   .D8$$ZD      .           
                .8O$$D                  
       .       .D$$$ZD         .        
               .$$$$$$.                 
              D$$$$$$$O$.               
   .        .$$?...$$8$..$Z~          

                                                                  __ /\_ \     
  ___ ___      __     _ __    __      ___          __    ___ ___ /\_\\//\ \    
/' __` __`\  /'__`\  /\`'__\/'__`\  /' _ `\      /'__`\/' __` __`\/\ \ \ \ \   
/\ \/\ \/\ \/\ \L\.\_\ \ \//\ \L\.\_/\ \/\ \    /\  __//\ \/\ \/\ \ \ \ \_\ \_ 
\ \_\ \_\ \_\ \__/.\_\\ \_\\ \__/.\_\ \_\ \_\   \ \____\ \_\ \_\ \_\ \_\/\____\
 \/_/\/_/\/_/\/__/\/_/ \/_/ \/__/\/_/\/_/\/_/    \/____/\/_/\/_/\/_/\/_/\/____/
                                                                               

 _     _             _ ____                              _                      _       
| |__ | |_ _ __ ___ | | ___|    _____  ___ __   ___ _ __(_)_ __ ___   ___ _ __ | |_ ___ 
| '_ \| __| '_ ` _ \| |___ \   / _ \ \/ / '_ \ / _ \ '__| | '_ ` _ \ / _ \ '_ \| __/ __|
| | | | |_| | | | | | |___) | |  __/>  <| |_) |  __/ |  | | | | | | |  __/ | | | |_\__ \
|_| |_|\__|_| |_| |_|_|____/   \___/_/\_\ .__/ \___|_|  |_|_| |_| |_|\___|_| |_|\__|___/
                                        |_|                                             
                                                                               
...........................................................

Ascii Generator - http://www.network-science.de/ascii/

Font: larry3d  
Font: ogre
Font: rectangles 
Font: rounded 
Font: shadow 
Font: slant
Font: small  
Font: smslant
Font: standard 
Font: stop

...........................................................

GlassGiant.com 
http://www.glassgiant.com/ascii/

...........................................................

-->

		<title>webGL GeoData using Three.js - example by Emil Maran</title>
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">

		<style>
			body { background: #071E30; margin: 0px; overflow: hidden; }
			#info { position: absolute; top: 0px; width: 100%; color: #ffffff; padding: 5px; font-family: Monospace; font-size: 13px; text-align: center; }
			a { color: #ff0080; text-decoration: none; }
			/*a:hover { color: #0080ff; }*/
		</style>

		<script src="./webGL GeoData_files/jquery-1.9.1.min.js"></script>
		<script src="./webGL GeoData_files/three51.js"></script>
		<script src="./webGL GeoData_files/Detector.js"></script>
		<script src="./webGL GeoData_files/Stats.js"></script>
		<script src="./webGL GeoData_files/THREEx_003.js"></script>
		<script src="./webGL GeoData_files/THREEx.js"></script>
		<script src="./webGL GeoData_files/THREEx_002.js"></script>

		<!-- <script type="text/javascript" src="http://canvas-text.googlecode.com/svn-history/r41/trunk/faces/helvetiker-normal-normal.js"></script> -->
		<script type="text/javascript" src="./webGL GeoData_files/helvetiker-normal-normal.js"></script>

	</head>
	<body>

	<div id="message"></div>

	<style>
		*{ margin: 0px; padding: 0px }
		body { font-family: Monospace; background-color: #333; margin: 0px; overflow: hidden; }
		#list_earthquakes { cursor: auto; width: 300px; position: absolute; right: 0px; top: 0px; height: auto; background: #ffffff; color: #000000; font: normal 11px Arial }
		#myCanvas { border: 1px solid #ff0000; }
	</style>

	<?php

	/*

	Getting Started with SODA 2.0 REST API - earthquakes json
	http://dev.socrata.com/consumers/getting-started
	https://soda.demo.socrata.com/developers/docs/earthquakes
	
	Example
	http://soda.demo.socrata.com/resource/earthquakes.json?source=uw
	http://soda.demo.socrata.com/resource/earthquakes.json?%24limit=5&%24order=datetime%20DESC
	http://soda.demo.socrata.com/resource/earthquakes.json?%24where=magnitude%3E4&%24limit=25&%24order=datetime%20DESC
	https://soda.demo.socrata.com/resource/earthquakes.json?region=Yunnan, China
	https://soda.demo.socrata.com/resource/earthquakes.json?$where=location = to_location(41.1085, -117.6135)
	https://soda.demo.socrata.com/resource/earthquakes.json?$where=depth > 0.00
	https://soda.demo.socrata.com/resource/earthquakes.json?depth=387.00
	https://soda.demo.socrata.com/resource/earthquakes.json?magnitude=6.1
	https://soda.demo.socrata.com/resource/earthquakes.json?$where=magnitude > 1.0
	https://soda.demo.socrata.com/resource/earthquakes.json?datetime=2013-05-02T22:38:01
	https://soda.demo.socrata.com/resource/earthquakes.json?$where=datetime > '2012-08-10'
	
	*/
	
	/*

	Seismi REST API
	http://www.seismi.org/api/

	Example
	http://www.seismi.org/api/eqs/2011/03?min_magnitude=6
	http://www.seismi.org/api/eqs/2011/03?min_magnitude=6&limit=4
	
	*/

	//$fqlnk = "http://soda.demo.socrata.com/resource/earthquakes.json?%24where=magnitude%3E4&%24limit=5&%24order=datetime%20DESC";
	$fqlnk = "http://soda.demo.socrata.com/resource/earthquakes.json?%24where=magnitude%24>%245.2";
	//$jsonRes = file_get_contents($fqlnk);
	$jsonRes = 0;
	if($jsonRes){
		echo '
		<script>
			var jsoneq = '.$jsonRes.';
			var todayis = "'.date("d.m.Y").'";
			//console.log("live")
		</script>';
	}
	else{

		echo '

		<script> 
	// EM 06.06.2013
	var todayis = "'.date("d.m.Y").'";

	//console.log("local")

			var jsoneq = [ {
  "region" : "south of Java, Indonesia",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "113.7383",
    "latitude" : "-10.8088"
  },
  "magnitude" : "5.4",
  "number_of_stations" : "94",
  "datetime" : "2012-09-13T23:40:02",
  "earthquake_id" : "c000cng3",
  "depth" : "9.80",
  "version" : "9"
}
, {
  "region" : "Philippine Islands region",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "126.9893",
    "latitude" : "10.268"
  },
  "magnitude" : "5.4",
  "number_of_stations" : "179",
  "datetime" : "2012-09-13T05:54:47",
  "earthquake_id" : "c000cmq8",
  "depth" : "10.00",
  "version" : "9"
}
, {
  "region" : "South Indian Ocean",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "82.9505",
    "latitude" : "-23.9148"
  },
  "magnitude" : "5.4",
  "number_of_stations" : "92",
  "datetime" : "2012-09-12T21:52:17",
  "earthquake_id" : "c000cmit",
  "depth" : "10.00",
  "version" : "6"
}
, {
  "region" : "New Britain region, Papua New Guinea",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "152.1305",
    "latitude" : "-5.0672"
  },
  "magnitude" : "5.6",
  "number_of_stations" : "214",
  "datetime" : "2012-09-12T04:28:14",
  "earthquake_id" : "c000clu1",
  "depth" : "65.70",
  "version" : "6"
}
, {
  "region" : "Crete, Greece",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "24.0642",
    "latitude" : "34.8112"
  },
  "magnitude" : "5.5",
  "number_of_stations" : "83",
  "datetime" : "2012-09-12T03:27:45",
  "earthquake_id" : "c000cltl",
  "depth" : "27.40",
  "version" : "6"
}
, {
  "region" : "south of the Mariana Islands",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "143.1973",
    "latitude" : "11.84"
  },
  "magnitude" : "5.8",
  "number_of_stations" : "355",
  "datetime" : "2012-09-11T16:36:49",
  "earthquake_id" : "c000clae",
  "depth" : "3.40",
  "version" : "D"
}
, {
  "region" : "south of Java, Indonesia",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "113.8187",
    "latitude" : "-10.7618"
  },
  "magnitude" : "5.3",
  "number_of_stations" : "179",
  "datetime" : "2012-09-11T14:21:35",
  "earthquake_id" : "c000cl6d",
  "depth" : "8.90",
  "version" : "7"
}
, {
  "region" : "Kuril Islands",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "151.1889",
    "latitude" : "45.2939"
  },
  "magnitude" : "5.5",
  "number_of_stations" : "442",
  "datetime" : "2012-09-11T01:28:19",
  "earthquake_id" : "c000ckz7",
  "depth" : "14.70",
  "version" : "A"
}
, {
  "region" : "Near Islands, Aleutian Islands, Alaska",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "174.9362",
    "latitude" : "52.8187"
  },
  "magnitude" : "5.3",
  "number_of_stations" : "431",
  "datetime" : "2012-09-09T19:23:51",
  "earthquake_id" : "c000cjlh",
  "depth" : "120.60",
  "version" : "8"
}
, {
  "region" : "Kuril Islands",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "155.7304",
    "latitude" : "49.2675"
  },
  "magnitude" : "6.0",
  "number_of_stations" : "210",
  "datetime" : "2012-09-09T05:39:36",
  "earthquake_id" : "c000cmre",
  "depth" : "25.90",
  "version" : "9"
}
, {
  "region" : "Costa Rica",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "-85.3416",
    "latitude" : "10.0735"
  },
  "magnitude" : "5.6",
  "number_of_stations" : "647",
  "datetime" : "2012-09-08T20:29:31",
  "earthquake_id" : "c000cj5l",
  "depth" : "35.10",
  "version" : "9"
}
, {
  "region" : "Papua, Indonesia",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "135.0841",
    "latitude" : "-3.1895"
  },
  "magnitude" : "6.1",
  "number_of_stations" : "477",
  "datetime" : "2012-09-08T10:51:43",
  "earthquake_id" : "c000cium",
  "depth" : "14.10",
  "version" : "A"
}
, {
  "region" : "Mariana Islands region",
  "source" : "us",
  "location" : {
    "needs_recoding" : false,
    "longitude" : "145.9213",
    "latitude" : "21.5174"
  },
  "magnitude" : "5.7",
  "number_of_stations" : "446",
  "datetime" : "2012-09-08T06:54:19",
  "earthquake_id" : "c000cirx",
  "depth" : "9.20",
  "version" : "C"
}
 ];
		</script>
		
		';
	}
	 ?>


<?php 
//die();
?>

	<script>


		//////////////////////////////////////////////////////////////////////////////////

		Object.size = function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};

		// Get the size of an object
		//var size = Object.size(myArray);
		//console.log(Object.size(arGeo))


		/*
		https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_draggablecubes.html
		http://jsfiddle.net/bmd0031/MhB2u/3/
		*/

		//http://stemkoski.github.com/Three.js/Mouse-Tooltip.html
		// http://stemkoski.github.com/Three.js/

		var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;
		
		var container, scene, camera, renderer, controls, stats;
		var keyboard = new THREEx.KeyboardState();
		var clock = new THREE.Clock();

		var text, plane;
		
		var sphereSize;
		var projector, mouse = { x: 0, y: 0 }, INTERSECTED,SELECTED;

		var mouse = new THREE.Vector2(),
            offset = new THREE.Vector3(),
            INTERSECTED, SELECTED;

		var sprite1;
		// standard global variables
		var container, scene, camera, renderer, controls, stats;
		var keyboard = new THREEx.KeyboardState();
		var clock = new THREE.Clock();

		// custom global variables
		var cube;
		var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
		var sprite1;
		var canvas1, context1, texture1;

		var cube,cubex,particleMaterial,projector,gpspoint;

		var targetRotation = 0;
		var targetRotationOnMouseDown = 0;

		var mouseX = 0;
		var mouseY = 0;
		var mouseXOnMouseDown = 0;

		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;

		/*var arGeo = 
		{
		  "0": {"lat": "51.5",  "lon": "-0.117", "wikipedia":"London","city":"London"},
		  "1": {"lat": "-37.8", "lon": "144.95", "wikipedia":"Melbourne","city":"Melbourne"},
		  "2": {"lat": "37.767","lon": "-122.417", "wikipedia":"San_Francisco","city":"San Francisco"},
		  "3": {"lat": "35.683","lon": "139.767", "wikipedia":"Tokyo","city":"Tokyo"}
		};*/

		/*var arGeo = {
		"0": {"lat": "-10.8385",  "lon": "166.4512",  "size":"6.0","city":"London"},
		"1": {"lat": "59.2824",  "lon": "-151.0559",  "size":"1.8","city":"London"},
		"2": {"lat": "60.2213",  "lon": "-151.8331",  "size":"1.8","city":"London"},
		"3": {"lat": "-11.2620", "lon": "165.7756",   "size":"4.9","city":"London"},
		"4": {"lat": "19.3622",  "lon": "-155.2337",  "size":"2.4","city":"London"},
		"5": {"lat": "-11.5825",  "lon": "165.4990",  "size":"5.5","city":"London"},
		"6": {"lat": "47.9517",  "lon": "-124.3047",  "size":"2.4","city":"London"},
		"7": {"lat": "62.4866",  "lon": "-149.7793",  "size":"1.7","city":"London"},
		"8": {"lat": "19.2088",  "lon": "-155.5423",  "size":"2.0","city":"London"},
		"9": {"lat": "63.3792",  "lon": "-151.4637",  "size":"1.5","city":"London"},
		"10": {"lat": "40.1665",  "lon": "-121.1247", "size":"2.7","city":"London"},
		"11": {"lat": "36.6418",  "lon": "-121.2608", "size":"1.5","city":"London"},
		"12": {"lat": "-11.2545",  "lon": "165.7341", "size":"5.9","city":"London"},
		"13": {"lat": "19.5540",  "lon": "-64.6368",  "size":"3.3","city":"London"},
		"14": {"lat": "-10.7979",  "lon": "164.5798", "size":"5.1","city":"London"},
		"15": {"lat": "37.2673",  "lon": "-121.6532", "size":"2.0","city":"London"},
		"16": {"lat": "-10.7296",  "lon": "165.1375", "size":"5.6","city":"London"},
		"17": {"lat": "-10.6358",  "lon": "164.8081", "size":"5.7","city":"London"},
		"18": {"lat": "61.7148",  "lon": "-149.9203", "size":"2.2","city":"London"},
		"19": {"lat": "-12.0657",  "lon": "165.7949", "size":"4.9","city":"London"},
		"20": {"lat": "51.5",      "lon": "-0.117",   "size":"4.9","city":"London"},
		"21": {"lat": "-37.8",     "lon": "144.95",   "size":"4.9","city":"Melbourne"},
		"22": {"lat": "37.767",    "lon": "-122.417", "size":"4.9","city":"San Francisco"},
		"23": {"lat": "35.683",    "lon": "139.767",  "size":"4.9","city":"Tokyo"}
		}*/




		var objects = [];

		init();
		animate();
		
		setInterval(loop, 3000/60);

		function init() {
			
				scene = new THREE.Scene();

				// CAMERA
				var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
				var VIEW_ANGLE = 65, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.8, FAR = 5000;
				camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

				//camera = new THREE.PerspectiveCamera( 65, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				scene.add(camera);
				//camera.position.y = 150;
				camera.position.z = 600;
				//camera.position.x = 150;
				camera.lookAt(scene.position);
				

				// PROJECTOR
				projector = new THREE.Projector();
				group = new THREE.Object3D();//create an empty container

				// RENDERER
				
				
				if( (navigator.userAgent.match(/Chrome/i)) ) {
					renderer = new THREE.WebGLRenderer( {antialias:true} );
				}
				else{
					renderer = new THREE.CanvasRenderer( {antialias:true} );
				}


				renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
				container = document.createElement( 'div' );
				document.body.appendChild( container );
				container.appendChild( renderer.domElement );

				// EVENTS
				THREEx.WindowResize(renderer, camera);
				THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
				
				// CONTROLS
				controls = new THREE.TrackballControls( camera );

				//------------------------------------------------
				//
				// EARTH
				//
				//------------------------------------------------

				var earthTexture = new THREE.Texture();
				var loader = new THREE.ImageLoader();

				loader.addEventListener( 'load', function ( event ) {
					earthTexture.image = event.content;
					earthTexture.needsUpdate = true;
				});

				//loader.load( 'http://jsrun.it/assets/a/x/G/T/axGTG.jpg' );
				loader.load( 'worldMask.jpg' ); // get texture axGTG2a.jpg

				sphereSize = 250;
				//var geometry = new THREE.SphereGeometry( sphereSize, 60, 60 );
				var material = new THREE.MeshBasicMaterial( { map: earthTexture, overdraw: true, opacity: 1.0 } );
				var geometry = new THREE.SphereGeometry( sphereSize, 60, 60 );
				// var material = new THREE.MeshBasicMaterial( { /*map: earthTexture,*/ overdraw: true, wireframe: false, color: 0xff0000, opacity: 0.4 } );

				cube =  new THREE.Mesh( geometry, material );
				cube.name = "sphere";

				//group.add( mesh );
				//scene.add( cube );
				//objects.push( cube );

				group.add(cube );//add a mesh with geometry to it
				scene.add(cube);
				//scene.add( group );//when done, add the group to the scene

				//console.log( "Object.size.jsoneq " + Object.size(jsoneq) )





				var radius = 600;
				var planeW = 470;
				var planeH = 470;

				var H = (2 * radius * Math.PI) / 2 / planeH;

				//for( var k=0; k < Object.size(arGeo); k++ ){ 
				for( var k=0; k < Object.size(jsoneq); k++ ){ 
				//for( var k=0; k < jsoneq.length; k++ ){ 
					//jsoneq[0]["region"]

					//console.log(arGeo[k]['lat'] +'....'+ arGeo[k]['lon'] +'....'+ arGeo[k]['city'])
					var geometry = new THREE.Geometry();
					// https://github.com/mrdoob/three.js/wiki/Drawing-lines

					/*
					{
						  "region" : "Solomon Islands",
						  "source" : "us",
						  "location" : {
							"needs_recoding" : false,
							"longitude" : "161.0712",
							"latitude" : "-10.1105"
						  },
						  "magnitude" : "5.2",
						  "number_of_stations" : "193",
						  "datetime" : "2012-09-12T11:27:51",
						  "earthquake_id" : "c000clxn",
						  "depth" : "87.40",
						  "version" : "9"
						}
					*/


					// VERTEX-1
					//var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
					//posGeo = latLongToVector3( arGeo[k]['lat'], arGeo[k]['lon'], sphereSize+9, 1); // 51.52322;  -0.15778 // london 
					var posGeo = latLongToVector3( jsoneq[k]["location"]['latitude'], jsoneq[k]["location"]['longitude'], parseInt(sphereSize + 9), 1); // 51.52322;  -0.15778 // london 
					var vertex = new THREE.Vector3( parseInt(posGeo.x), parseInt(posGeo.y), parseInt(posGeo.z) );
					vertex.normalize();
					vertex.multiplyScalar( 250 );
					geometry.vertices.push( vertex );



					// VERTEX-2
					var vertex2 = vertex.clone();
					vertex2.multiplyScalar( jsoneq[k]['magnitude'] * Math.random() * 0.08 + 1 );
					geometry.vertices.push( vertex2 );

					// var material = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 1 } );
					var gpspointline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xf7ffff,   linewidth: 1 , fog:true } ) ); //opacity: Math.random()
					
					//var gpspoint = new THREE.Mesh(new THREE.CubeGeometry(310, 20, 20), new THREE.MeshNormalMaterial({ color: 0xf7ffff  }));
					 // API: THREE.CylinderGeometry(bottomRadius, topRadius, height, segmentsRadius, segmentsHeight)
					//var gpspoint = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 300, 15, 15), new THREE.MeshNormalMaterial({overdraw: true, opacity: 1.0}));
					var gpspoint = new THREE.Mesh(
							new THREE.SphereGeometry(4, 4, 4),
							new THREE.MeshBasicMaterial({ 
								overdraw: true,
								opacity: 1.0, 
								color: 0xff0000, 
								shininess: 65,
								shading: THREE.FlatShading

							})
						);
					
					gpspoint.position.x = posGeo.x
					gpspoint.position.y = posGeo.y
					gpspoint.position.z = posGeo.z
					
					//gpspoint.rotation.x = (Math.PI) / H * k - (Math.PI / 2);
					//gpspoint.rotation.y = (Math.PI * 2) / k * k;

					//gpspoint.rotation.x = (Math.PI) / H * k - (Math.PI / 2 );
					//gpspoint.rotation.x = (Math.PI) / H *  (Math.PI / 2 );
					//gpspoint.rotation.z = (Math.PI * 2) / k ;

					//group.add( gpspoint );//add a mesh with geometry to it
					scene.add( gpspoint );//when done, add the group to the scene
					scene.add( gpspointline );//when done, add the group to the scene
					scene.add( group );//when done, add the group to the scene

				}


				//////////////////////////////////////////

				var PI2 = Math.PI * 2;
				particleMaterial = new THREE.ParticleCanvasMaterial({

					color: 0x000000,
					program: function ( context ) {

						context.beginPath();
						context.arc( 0, 0, 1, 0, PI2, true );
						context.closePath();
						context.fill();

					}

				});

				//------------------------------------------------
				//
				// STATS
				//
				//------------------------------------------------

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
			}


			//------------------------------------------------
			//
			// latLongToVector3
			//
			//------------------------------------------------

			function latLongToVector3(lat, lon, radius, heigth) {

				var phi = (lat)*Math.PI/180;
				var theta = (lon-180)*Math.PI/180;

				var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
				var y = (radius+heigth) * Math.sin(phi);
				var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

				return new THREE.Vector3(x,y,z);
			}


			//------------------------------------------------
			//
			// update
			//
			//------------------------------------------------

			function update()
			{
				
				// create a Ray with origin at the mouse position
				// and direction into the scene (camera direction)
				var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
				projector.unprojectVector( vector, camera );
				
				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
				// create an array containing all objects in the scene with which the ray intersects
				var intersects = ray.intersectObjects( scene.children );
				// INTERSECTED = the object in the scene currently closest to the camera
				// and intersected by the Ray projected from the mouse position
				// if there is one (or more) intersections
				
				if ( intersects.length > 0 )
				{
					// if the closest object intersected is not the currently stored intersection object
					if ( intersects[ 0 ].object != INTERSECTED )
					{
						// restore previous intersection object (if it exists) to its original color
						if ( INTERSECTED ){
							//INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
						}
						// store reference to closest object as current intersection object
						//INTERSECTED = intersects[ 0 ].object;
						// store color of closest object (for later restoration)
						//INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
						// set a new color for closest object
						//INTERSECTED.material.color.setHex( 0xffff00 );

							/*var renderer2D = new THREE.CanvasRenderer();
							renderer2D.domElement.getContext('2d').fillText("Hello", 150, 150);
							renderer2D.domElement.textAlign = "center";
							renderer2D.domElement.textBaseline = "middle";

								var texture = new THREE.Texture(canvas1);
								texture.needsUpdate = true;*/
				
						// update text, if it has a "name" field.
						if ( intersects[ 0 ].object.name )
						{
							//console.log("INTERSECTED")

						}
						else
						{
							/*context1.clearRect(0,0,300,300);
							texture1.needsUpdate = true;*/
						}
					}
				}
				else // there are no intersections
				{
					// restore previous intersection object (if it exists) to its original color
					if ( INTERSECTED )
						//INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
						// remove previous intersection object reference
						// by setting current intersection object to "nothing"
					INTERSECTED = null;
					/*context1.clearRect(0,0,300,300);
					texture1.needsUpdate = true;*/
				}

				controls.update();
				stats.update();
			}

			//------------------------------------------------
			//
			// animate
			//
			//------------------------------------------------

			function animate() 
			{
				//requestAnimationFrame( animate );
				render();
				update();
			}

			function render() 
			{
				renderer.render( scene, camera );
			}


			//------------------------------------------------
			//
			// onDocumentMouseUp
			//
			//------------------------------------------------

			function onDocumentMouseUp( event ) {

				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

			//------------------------------------------------
			//
			// onDocumentMouseOut
			//
			//------------------------------------------------

			function onDocumentMouseOut( event ) {
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
			}

			//------------------------------------------------
			//
			// onDocumentTouchStart
			//
			//------------------------------------------------

			function onDocumentTouchStart( event ) {

				/*if ( event.touches.length == 1 ) {
					event.preventDefault();
					mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;

				}*/
			}

			//------------------------------------------------
			//
			// onDocumentTouchMove
			//
			//------------------------------------------------

			function onDocumentTouchMove( event ) {

				/*if ( event.touches.length == 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
				}*/

			}

			//------------------------------------------------
			//
			// loop
			//
			//------------------------------------------------

			function loop() {

				group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
				group.rotation.x = (mouseY/windowHalfY) * Math.PI;

				//animate();
				renderer.render(scene, camera);
				update();
				stats.update();

				requestAnimationFrame( animate );
				

			}

			//------------------------------------------------
			//
			// onDocumentMouseMove
			//
			//------------------------------------------------

			function onDocumentMouseMove( event ) {

				event.preventDefault();
		
				//sprite1.position.set( event.clientX+100, event.clientY+100, 0 );
					// update the mouse variable
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

				//
				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vector, camera );
				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

				if ( SELECTED ) {
					/*var intersects = ray.intersectObject( plane );
					SELECTED.position.copy( intersects[ 0 ].point.subSelf( offset ) );
					return;*/
				}

				var intersects = ray.intersectObjects( objects );

				if ( intersects.length > 0 ) {

					if ( INTERSECTED != intersects[ 0 ].object ) {

						if ( INTERSECTED ) {
							//INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
						}

						//INTERSECTED = intersects[ 0 ].object;
						//INTERSECTED.currentHex = INTERSECTED.material.color.getHex();

						/*plane.position.copy( INTERSECTED.position );
						plane.lookAt( camera.position );*/

						//container.style.cursor = 'pointer';
						//console.log("I was clicked"+INTERSECTED.name)

						/*context1.clearRect(0,0,340,280);
						var message = intersects[0].object.name 
						var metrics = context1.measureText(message);
						var width = metrics.width;

						//context1.fillStyle = "rgba(120,120,120,0.95)"; // black border
						//context1.fillRect( 0,0, width+12,20+4);
						context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
						context1.fillRect( 2,2, width+8,16+2 );
						context1.fillStyle = "rgba(0,0,0,1)"; // text color
						context1.fillText( message, 5,16 );
						texture1.needsUpdate = true;*/

					}

				} 
				else {

					if ( INTERSECTED ) {
						//INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
					}
						/*INTERSECTED = null;
						container.style.cursor = 'auto';
						context1.clearRect(0,0,300,300);
						texture1.needsUpdate = true;*/

				}

			}

			//------------------------------------------------
			//
			// onDocumentMouseDown
			//
			//------------------------------------------------

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
				projector.unprojectVector( vector, camera );
				var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

				var intersects = ray.intersectObjects( objects );
				
				if ( intersects.length > 0 ) {
					/*controls.enabled = false;
					SELECTED = intersects[ 0 ].object;
					var intersects = ray.intersectObject( plane );
					offset.copy( intersects[ 0 ].point ).subSelf( plane.position );
					container.style.cursor = 'move';*/
				}

			}

			//------------------------------------------------
			//
			// onDocumentMouseUp
			//
			//------------------------------------------------

			function onDocumentMouseUp( event ) {

				event.preventDefault();
				controls.enabled = true;
				if ( INTERSECTED ) {
					plane.position.copy( INTERSECTED.position );
					SELECTED = null;
				}
				container.style.cursor = 'auto';
			}

		

			</script>


			<script>

			$(document).ready(function() {
					
				/*
				{
					  "region" : "Solomon Islands",
					  "source" : "us",
					  "location" : {
						"needs_recoding" : false,
						"longitude" : "161.0712",
						"latitude" : "-10.1105"
					  },
					  "magnitude" : "5.2",
					  "number_of_stations" : "193",
					  "datetime" : "2012-09-12T11:27:51",
					  "earthquake_id" : "c000clxn",
					  "depth" : "87.40",
					  "version" : "9"
					}
				*/

				var strLstQ = '<div style="padding: 5px; font-size: 16px"><b>Earthquakes Today '+todayis+'</b> <br /></div><hr />';
				//for( var k=0; k < Object.size(jsoneq); k++ ){ 
				$.each(jsoneq,function(key, value){
					strLstQ+= '<div style="padding: 5px"><b>* ' + jsoneq[key]["region"] + '</b> <br /> magnitude ='  + jsoneq[key]["magnitude"] + '</div><hr />';
				});

				$('#list_earthquakes').html(strLstQ);

			});
			</script>

			
			<div style="cursor: auto;">
			<canvas width="1920" height="774"></canvas>
			</div>
			<div style="" id="list_earthquakes">
			
			</div>
			<!-- <canvas width="1166" height="836"></canvas> -->
					
			</body></html>