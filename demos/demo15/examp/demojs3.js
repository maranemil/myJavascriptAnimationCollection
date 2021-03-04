// Set the scene
var domEl = document.getElementById('canvas');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, domEl.offsetWidth / domEl.offsetHeight, 0.1, 100);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(domEl.offsetWidth, domEl.offsetHeight);
domEl.appendChild(renderer.domElement);

// Create the board
var board = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 9.5), new THREE.MeshBasicMaterial({
    color: 0xff0000
}));
board.position.set(0, 0, -0.01);
scene.add(board);

// Create objects
var objs = [];

function createObject(row, col) {
    var geom = new THREE.PlaneGeometry(1, 1.25);
    var obj = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }));

    // Calculate x position
    var width = geom.width; // Object width
    var spaceWidth = .5; // Space between objects
    var totalWidth = (width * 6) + (spaceWidth * 7); // Total width of objects plus spaces
    obj.position.x = -(totalWidth / 2) + // Offset from center 0
    (col * width) + // Add obj widths
    ((col + 1) * spaceWidth) + // Add object spaces
    (width / 2); // Offset half object width

    // Calculate y position
    var height = geom.height; // Object height
    var spaceHeight = .5;
    var totalHeight = (height * 3) + (spaceHeight * 4); // Total height of objects plus spaces
    obj.position.y = -(totalHeight / 2) + // Offset from center 0
    (row * height) + // Add object height
    ((row + 1) * spaceHeight) + // Add object spaces
    (height / 2); // Offset half object height
    return obj;
}

// Create objects
objs.push(createObject(0, 0));
objs.push(createObject(0, 1));
objs.push(createObject(0, 2));
objs.push(createObject(0, 3));
objs.push(createObject(0, 4));
objs.push(createObject(0, 5));
objs.push(createObject(1, 0));
objs.push(createObject(1, 1));
objs.push(createObject(1, 2));
objs.push(createObject(1, 3));
objs.push(createObject(1, 4));
objs.push(createObject(1, 5));
objs.push(createObject(2, 0));
objs.push(createObject(2, 1));
objs.push(createObject(2, 2));
objs.push(createObject(2, 3));
objs.push(createObject(2, 4));
objs.push(createObject(2, 5));

// Add objects to scene
for (var i = 0, s = objs.length; i < s; i++) {
    scene.add(objs[i]);
}

// Position the camera to fit
camera.position.set(0, -1, 4);
camera.lookAt(scene.position);

// Create projector
var projector = new THREE.Projector();

// Listen for mouse clicks
var mouse;
domEl.addEventListener('mousedown', function (e) {
    e.preventDefault();

    var coords = relMouseCoords(domEl, e);
    mouse = {
        x: (coords.x / domEl.offsetWidth) * 2 - 1,
        y: -(coords.y / domEl.offsetHeight) * 2 + 1
    };
}, false);

// Get the relative mouse coordinates
function relMouseCoords(relativeTo, event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = relativeTo;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
        x: canvasX,
        y: canvasY
    };
}

function render() {
    requestAnimationFrame(render);

    logic();
    TWEEN.update();
    renderer.render(scene, camera);
}

var selectedObject;

function logic() {

    // If mouse clicked
    if (mouse) {
        var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
        projector.unprojectVector(vector, camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(objs);

        if (intersects.length > 0) {
            if (selectedObject) {
                selectedObject.material.color.setHex(0x00ff00);
            }

            selectedObject = intersects[0].object;
            selectedObject.material.color.setHex(0x0000ff);

            // Position the camera to fit
            var tween = new TWEEN.Tween(camera.position).to({
                x: selectedObject.position.x,
                y: selectedObject.position.y,
                z: 1
            }).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                camera.lookAt(selectedObject.position);
            }).onComplete(function () {
                camera.lookAt(selectedObject.position);
            }).start();
        } else {
            if (selectedObject) {
                selectedObject.material.color.setHex(0x00ff00);
            }

            // Position the camera to fit
            var tween = new TWEEN.Tween(camera.position).to({
                x: 0,
                y: -1,
                z: 4
            }, 1000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                camera.lookAt(scene.position);
            }).onComplete(function () {
                camera.lookAt(scene.position);
            }).start();
        }

        mouse = null;
    }

}

render();