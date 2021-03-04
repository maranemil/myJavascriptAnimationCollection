var camera, scene, renderer, geometry, meshHolder, meshes;
var radius = 250;
var numMeshes = 100;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);
       
    meshes = [];
    meshHolder = new THREE.Object3D;
    scene.add(meshHolder); 
    geometry = new THREE.PlaneGeometry(80, 80, 1, 1);
   
    var mesh, opac, material;
    for(var i = 0; i<numMeshes; i++){
       
        opac = Math.random();
        material = new THREE.MeshBasicMaterial( { 
            color:0x00c5ff, 
            opacity:opac, 
            transparent:true
        });
        mesh = new THREE.Mesh( geometry, material );
        meshes.push(mesh);
        meshHolder.add(mesh);
    }
       
    positionOnSphere();
    
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function positionOnSphere(){
     
    var r, theta, phi, p;
    for (var t=0 ;t<numMeshes; t++) {	
        
        p=meshes[t]
        r = radius*Math.pow(1,1);
        theta = Math.random()*Math.PI*2;
        phi = Math.acos(2*Math.random()-1);
        p.position = new THREE.Vector3(
            r*Math.sin(phi)*Math.cos(theta), 
            r*Math.sin(phi)*Math.sin(theta), 
            r*Math.cos(phi)
        );
    }       
}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    meshHolder.rotation.x += 0.008;
    meshHolder.rotation.y += 0.008;
    
    for(var k = 0; k<numMeshes; k++){
         meshes[k].lookAt( camera.position );   
    }
    renderer.render(scene, camera);

}