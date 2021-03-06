/**
 * @author mr.doob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {
	this.set(
		x || 0,
		y || 0
	);
};

THREE.Vector2.prototype = {
	set : function ( x, y ) {
		this.x = x;
		this.y = y;
		return this;
	},

	copy : function ( v ) {
		this.set(
			v.x,
			v.y
		);
		return this;
	},

	addSelf : function ( v ) {
		this.set(
			this.x + v.x,
			this.y + v.y
		);
		return this;
	},

	add : function ( v1, v2 ) {
		this.set(
			v1.x + v2.x,
			v1.y + v2.y
		);
		return this;
	},

	subSelf : function ( v ) {
		this.set(
			this.x - v.x,
			this.y - v.y
		);
		return this;
	},
	sub : function ( v1, v2 ) {
		this.set(
			v1.x - v2.x,
			v1.y - v2.y
		);
		return this;
	},
	multiplyScalar : function ( s ) {
		this.set(
			this.x * s,
			this.y * s
		);
		return this;
	},
	negate : function() {
		this.set(
			- this.x,
			- this.y
		);
		return this;
	},
	unit : function () {
		this.multiplyScalar( 1 / this.length() );
		return this;
	},
	length : function () {
		return Math.sqrt( this.lengthSq() );
	},

	lengthSq : function () {
		return this.x * this.x + this.y * this.y;
	},
	
	distanceTo : function ( v ) {
		return Math.sqrt( this.distanceToSquared( v ) );
	},
	distanceToSquared : function ( v ) {
		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},
	clone : function () {
		return new THREE.Vector2( this.x, this.y );
	},
	equals : function(v) {
		return ( (v.x == this.x) && (v.y == this.y) );
	}

};


/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * THREE.FontText.js
 * Techniques obtained from projects like 
 * typeface.js, canvastext,
 * 
 * Triangulation ** 
 * with holes http://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/
 *
 * In an experiment for creating 2d and 3d text in three.js
 * 
 */
 



THREE.Text = function (text, size, height, curveSegments, font) {
    if (!size) size = 100;
    if (!height) height = 50;
    if (!curveSegments) curveSegments = 4;
    if (!font) font = "";
    
    
    
	THREE.Geometry.call( this );
    
    ThreeFont.size = size;
    ThreeFont.divisions = curveSegments;
    
    // Get a Font data object
    var data = ThreeFont.drawText(text);
    //console.log("data", data);
    
    
    vertices = data.points;
    faces = data.faces;
    contour = data.contour;
    
    
    
    
    var scope = this;
    
    var vlen = 0;
    for (var i in vertices) {
        var vert = vertices[i];
        v(vert.x, vert.y, 0);
        vlen++;
    }
    
    for (var i in vertices) {
        var vert = vertices[i];
        v(vert.x, vert.y, height);
    }

    // Bottom faces
    for (var i in faces) {
        var face = faces[i];
        f3(face[2], face[1], face[0]);
        //f3(face[0], face[1], face[2]);
    }

    // Top Faces
    for (var i in faces) {
        var face = faces[i];
        f3(face[0]+vlen, face[1]+vlen, face[2]+vlen);
        // f3(face[2]+vlen, face[1]+vlen, face[0]+vlen);
        //  f3(face.a, face.b, face.c);

    }
    
   
    
    var i = contour.length;
    
    var lastV;
    var j;
    while (--i > 0) {
        if (!lastV) {
            lastV = contour[i];
        } else if (lastV.equals(contour[i])) {
            lastV  = null;
            continue;
        }
        
        var j,k;
        
        for (j=0; j<vertices.length; j++) {
            if (vertices[j].equals(contour[i])) {
                break;
            }
        }
        
        for (k=0; k<vertices.length; k++) {
            if (vertices[k].equals(contour[i-1])) break;
        }
        
        //f4(j+vlen, k+vlen,k,j);
        f4(j, k, k+vlen,j+vlen);
        
        
    }


	
    
    // UVs to be added

	this.computeCentroids();
	this.computeFaceNormals();
	// this.computeVertexNormals();

	function v( x, y, z ) {
		scope.vertices.push( new THREE.Vector3 ( new THREE.Vector3( x, y, z ) ) );
	}

	function f3( a, b, c) {
		scope.faces.push( new THREE.Face3( a, b, c) );
	}
    
    function f4( a, b, c, d) {
		scope.faces.push( new THREE.Face4( a, b, c, d) );
	}

    //console.log(this);


};

THREE.Text.prototype = new THREE.Geometry();
THREE.Text.prototype.constructor = THREE.Text;



var ThreeFont = {};

ThreeFont.faces = {};

// Just for now. face[weight][style]
ThreeFont.face = "helvetiker";
ThreeFont.weight = "normal";
ThreeFont.style = "normal";
ThreeFont.size = 150;
ThreeFont.divisions = 10;

ThreeFont.getFace = function() {
    return this.faces[this.face][this.weight][this.style];
}

ThreeFont.loadFace = function(data) {
    var family = data.familyName.toLowerCase();

    this.faces[family] = this.faces[family] || {};
    
    if (data.strokeFont) {
      this.faces[family].normal = this.faces[family].normal || {};
      this.faces[family].normal.normal = data;
      this.faces[family].normal.italic = data;
      
      this.faces[family].bold = this.faces[family].normal || {};
      this.faces[family].bold.normal = data;
      this.faces[family].bold.italic = data;
    }
    else {
      this.faces[family][data.cssFontWeight] = this.faces[family][data.cssFontWeight] || {};
      this.faces[family][data.cssFontWeight][data.cssFontStyle] = data;
    }
    
    return data;
};


ThreeFont.extractPoints = function(points) {
    // Quick Exit
    if (points.length <3) {
		console.log("not valid polygon");
		return;
	}
    
	// Try to split shapes and holes.
	var all = [], point, shape;
    
    var isolatedShapes = [];
	
    // Use a quick hashmap for locating duplicates
	for (var p in points) {
		point = points[p];
		all.push(point.x +","+ point.y);
	}
	
	
	
	var firstPt = all[0];
	var endPt = all.slice(1).indexOf(firstPt);
	
	if (endPt < all.length) {
		endPt ++;
		shape = points.slice(0, endPt);
	}
	
	holes = [];
    
	while (endPt < all.length) {
		firstIndex = endPt+1;
		firstPt = all[firstIndex];
		endPt = all.slice(firstIndex+1).indexOf(firstPt) + firstIndex;
		if (endPt <= firstIndex ) break; 
		
		var contours = points.slice(firstIndex, endPt+1);
		
		if (THREE.Triangulate.area(contours)<0) {
            isolatedShapes.push({shape: shape, holes: holes});
			// Save the old shapes, then work on new additional seperated shape
            
            shape = contours;
            holes = [];
            
		} else {
            holes.push(contours);
		}
        
		endPt++;
		//console.log("holes--> ", contours.length);
		//console.log("CCW", THREE.Triangulate.area(contours));
		
		
	}
    
    isolatedShapes.push({shape: shape, holes: holes});
	
	//console.log("isolatedShapes", isolatedShapes);
	
    
    
    /* For each isolated shape, find the closest points and break to the hole to allow triangulation*/
    
	// Find closest points between holes    
	
    // we could optimize here
    // http://en.wikipedia.org/wiki/Proximity_problems
	// http://en.wikipedia.org/wiki/Closest_pair_of_points
	// http://stackoverflow.com/questions/1602164/shortest-distance-between-points-algorithm
	
	var verts = [];
    
    
    
    for (var shapeId in isolatedShapes) {
        var shapeGroup = isolatedShapes[shapeId];
        shape = shapeGroup.shape;
        holes = shapeGroup.holes;
        
        for (var h in holes) {
            // we slice to each hole when neccessary
            var hole = holes[h];
            var shortest = Number.POSITIVE_INFINITY;
            var holeIndex, shapeIndex;
            for (var h2 in hole) {
                var pts1 = hole[h2];
                
                for (var p in shape) {
                    var pts2 = shape[p];
                    d = pts1.distanceTo(pts2);
                    
                    if (d<shortest) {
                        shortest = d;
                        holeIndex = h2;
                        shapeIndex = p;
                    }
                }
                
            }
                    
            //console.log("point ind, hole ind", shapeIndex, holeIndex);
            //console.log("shape.length, tmpShape",shape.length, hole.length);
            
            prevShapeVert = (shapeIndex-1)>=0 ? shapeIndex-1:shape.length-1 ;
            nextShapeVert = (shapeIndex+1)<shape.length ? shapeIndex + 1 : 0;
            
            prevHoleVert = (holeIndex-1)>=0 ? holeIndex-1:hole.length-1;
            nextHoleVert = (holeIndex+1)<hole.length ? holeIndex + 1 : 0 ;
            
            var tmpShape1 = shape.slice(0, shapeIndex);
            var tmpShape2 = shape.slice(shapeIndex);
            var tmpHole1 = hole.slice(holeIndex);
            var tmpHole2 = hole.slice(0,holeIndex);
        
            verts.push(hole[holeIndex]);
            verts.push(shape[shapeIndex]);
            verts.push(shape[prevShapeVert]);
            
            verts.push(hole[holeIndex]);
            verts.push(hole[prevHoleVert]);
            verts.push(shape[shapeIndex]);
                            
            shapeGroup.shape = tmpShape1.concat(tmpHole1).concat(tmpHole2).concat(tmpShape2);

        }
    }
	
    points = [];
    var triangulatedVertices = [];
    var lastTriangles = 0;
    for (var shapeId in isolatedShapes) {
        var shapeGroup = isolatedShapes[shapeId];
        shape = shapeGroup.shape;
        points = points.concat(shape);
        var triangles = THREE.Triangulate(shape,true);
        // We need to offset vertics indexs for faces
        for (var v in triangles) {
            var face = triangles[v];
            face[0] += lastTriangles;
            face[1] += lastTriangles;
            face[2] += lastTriangles;
        }
        triangulatedVertices = triangulatedVertices.concat(triangles);
        lastTriangles += shape.length;
    }
   
   
   // Now we push the "cutted" vertics back to the triangulated indics.
   //console.log("we have verts.length",verts.length);
   var j;
   for (var v=0; v<verts.length/3; v++) {        
        
        var face = [];
        
        for (var k=0;k<3;k++) {            
            for (j=0; j<points.length; j++) {
                
                var l =v*3+k;
                if (points[j].equals(verts[l])) {
                    face.push(j);
                    break;
                }
                
            }
        }
        
        triangulatedVertices.push(face);
   }
   
   
    //console.log("triangles", triangulatedVertices.length, "points", points);

    return {
        points: points,
        faces: triangulatedVertices
    };

}

ThreeFont.drawText = function(text) {
    pts = [];
    // RenderText // (text);
    var face = this.getFace(),
        scale = (this.size / face.resolution),
        offset = 0, i, 
        chars = String(text).split(''), 
        length = chars.length;
    for (i = 0; i < length; i++) {
      offset += this.extractGlyphPoints(chars[i], face, scale, offset); 
    }
    
    // get the width 
    width = offset/2;
    for (var p in pts) {
        pts[p].x -= width;
    }
    
    //console.log("Length pts", pts.length);
    
    var extract = this.extractPoints(pts);
    
    extract.contour = pts;
    return extract;
    
};


// Bezier Curves formuals obtained from
// http://en.wikipedia.org/wiki/B%C3%A9zier_curve

// Quad Bezier Functions
function b2p0(t, p) {
    return (1-t)*(1-t) * p;
}

function b2p1(t, p) {
    return 2*(1-t) * t * p;
}

function b2p2(t, p) {
    return t * t * p;
}

function b2(t, p0, p1, p2) {
    return b2p0(t, p0) + b2p1(t, p1) + b2p2(t, p2);
}

// Cubic Bezier Funcitions
function b3p0(t, p) {
    var k = (1-t);
    return k*k*k * p;
}

function b3p1(t, p) {
    var k = (1-t);
    return 3* k*k * t * p;
}

function b3p2(t, p) {
    var k = 1-t;
    return 3 * k * t * t * p;
}

function b3p3(t, p) {
    return t * t * t * p;
}

function b3(t, p0, p1, p2, p3) {
    return b3p0(t, p0) + b3p1(t, p1) + b3p2(t, p2) +  b3p3(t, p3);
}


ThreeFont.extractGlyphPoints = function(c, face, scale, offset){
      var i, cpx, cpy, outline, action, length,
          glyph = face.glyphs[c] || face.glyphs[ctxt.options.fallbackCharacter];
    
      if (!glyph) return;
  
      if (glyph.o) {
      
        outline = glyph._cachedOutline || (glyph._cachedOutline = glyph.o.split(' '));
        length = outline.length;
        
        var scaleX = scale;
        var scaleY = scale;
		 
        for (i = 0; i < length; ) {
          action = outline[i++];
  
          switch(action) {
            case 'm':
                // Move To
                x = outline[i++]*scaleX+offset, y = outline[i++]*scaleY;
                pts.push(new THREE.Vector2(x,y));
              break;
            case 'l':
                // Line To
                x = outline[i++]*scaleX+offset, y = outline[i++]*scaleY;
                pts.push(new THREE.Vector2(x,y));
              break;
            case 'q':
                //quadraticCurveTo
              cpx = outline[i++]*scaleX+offset;
              cpy = outline[i++]*scaleY;
              cpx1 = outline[i++]*scaleX+offset;
              cpy1 = outline[i++]*scaleY;
              
              var laste = pts[pts.length-1];
              
              if (laste) {
                cpx0 = laste.x;
                cpy0 = laste.y;
                
                for (var i2 = 1, divisions = this.divisions;i2<=divisions;i2++) {
                    var t = i2/divisions;
                    var tx = b2(t, cpx0, cpx1, cpx);
                    var ty = b2(t, cpy0, cpy1, cpy);
                    pts.push(new THREE.Vector2(tx, ty));
                  }
              }
              
              
              break;
            case 'b':
                // Cubic Bezier Curve
              cpx = outline[i++]*scaleX+offset;
              cpy = outline[i++]*scaleY;
              
              cpx1 = outline[i++]*scale+offset;
              cpy1 = outline[i++]*-scale;
              cpx2 = outline[i++]*scale+offset;
              cpy2 = outline[i++]*-scale;
              
              var laste = pts[pts.length-1];
              
              if (laste) {
                cpx0 = laste.x;
                cpy0 = laste.y;
                
                for (var i2 = 1, divisions = this.divisions;i2<=divisions;i2++) {
                    var t = i2/divisions;
                    var tx = b3(t, cpx0, cpx1, cpx2, cpx);
                    var ty = b3(t, cpy0, cpy1, cpy2, cpy);
                    pts.push(new THREE.Vector2(tx, ty));
                  }
              }

              
              //this.ctx.bezierCurveTo(outline[i++]*scale+offset, outline[i++]*-scale, outline[i++]*scale+offset, outline[i++]*-scale, cpx, cpy);
              break;
          }
        }
      }
      return glyph.ha*scale;
    };






/**
This code is a quick port of code written in C++ which was submitted to 
flipcode.com by John W. Ratcliff  // July 22, 2000 
See original code and more information here:
http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml

ported to actionscript by Zevan Rosser
www.actionsnippet.com

ported to javascript by Joshua Koo
http://www.lab4games.net/zz85/blog

*/


(function(namespace) {
		
    var EPSILON =0.0000000001;
    
    // takes in an contour array and returns 
    var process = function(contour, indics) {
       
        var result = [];
        var n = contour.length;
        if ( n < 3 ) return null
        
        var verts = [], vertIndics = [];
        
          /* we want a counter-clockwise polygon in verts */
        var v;
        
        
        if ( 0.0 < area(contour)) {
            for (v=0; v<n; v++) verts[v] = v;
        } else {
            for (v=0; v<n; v++) verts[v] = (n-1)-v;
        }
        
        var nv = n;
        
        /*  remove nv-2 vertsertices, creating 1 triangle every time */
        var count = 2*nv;   /* error detection */
            var m;
            for(m=0, v=nv-1; nv>2; )
            {
            
            
                /* if we loop, it is probably a non-simple polygon */
                if (0 >= (count--)){
                    //** Triangulate: ERROR - probable bad polygon!
                    console.log("Warning, unable to triangulate polygon!");
                    return null;
                }
            
                /* three consecutive vertices in current polygon, <u,v,w> */
                var u = v; if (nv <= u) u = 0;     /* previous */
                v = u+1; if (nv <= v) v = 0;     /* new v    */
                var w = v+1; if (nv <= w) w = 0;     /* next     */
            
                if ( snip(contour,u,v,w,nv,verts)){
                  var a,b,c,s,t;
            
                  /* true names of the vertices */
                  a = verts[u]; b = verts[v]; c = verts[w];
            
                  /* output Triangle */
                  result.push( contour[a] );
                  result.push( contour[b] );
                  result.push( contour[c] );
                  vertIndics.push([verts[u], verts[v],verts[w]]);
                  //vertIndics.push(THREE.Face3(verts[u], verts[v],verts[w]));
            
            
                  m++;
            
                  /* remove v from remaining polygon */
                  for(s=v,t=v+1;t<nv;s++,t++) {
                   verts[s] = verts[t]; 
                   
                   }
                   nv--;
                  
            
                  /* resest error detection counter */
                  count = 2 * nv;
            }
          }
        
        if (indics) return vertIndics;
          return result;
    };
    
    // calculate area of the contour polygon
    var area = function (contour){
        var n = contour.length;
        var a  = 0.0;
        
        for(var p=n-1, q=0; q<n; p=q++){
            a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
        }
        return a * 0.5;
    };
    
    // see if p is inside triangle abc
    var insideTriangle = function(ax, ay,
                      bx, by,
                      cx, cy,
                      px, py){
          var aX, aY, bX, bY;
          var cX, cY, apx, apy;
          var bpx, bpy, cpx, cpy;
          var cCROSSap, bCROSScp, aCROSSbp;
        
          aX = cx - bx;  aY = cy - by;
          bX = ax - cx;  bY = ay - cy;
          cX = bx - ax;  cY = by - ay;
          apx= px  -ax;  apy= py - ay;
          bpx= px - bx;  bpy= py - by;
          cpx= px - cx;  cpy= py - cy;
        
          aCROSSbp = aX*bpy - aY*bpx;
          cCROSSap = cX*apy - cY*apx;
          bCROSScp = bX*cpy - bY*cpx;
        
          return ((aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0));
    };
    
    
   var snip =  function (contour, u, v, w, n, verts) {
          var p;
          var ax, ay, bx, by;
          var cx, cy, px, py;
        
              ax = contour[verts[u]].x;
              ay = contour[verts[u]].y;
            
              bx = contour[verts[v]].x;
              by = contour[verts[v]].y;
            
              cx = contour[verts[w]].x;
              cy = contour[verts[w]].y;
        
          if ( EPSILON > (((bx-ax)*(cy-ay)) - ((by-ay)*(cx-ax))) ) return false;
        
          for (p=0;p<n;p++){
                if( (p == u) || (p == v) || (p == w) ) continue;
                px = contour[verts[p]].x
                py = contour[verts[p]].y
                if (insideTriangle(ax,ay,bx,by,cx,cy,px,py)) return false;
          }
          return true;
    };
    
    
    namespace.Triangulate = process;
	namespace.Triangulate.area = area;
    
    return namespace;
})(THREE);

// To use the typeface.js face files, hook their API
window._typeface_js = {faces: ThreeFont.faces, loadFace: ThreeFont.loadFace};

