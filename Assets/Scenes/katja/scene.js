{

"metadata" :
{
	"formatVersion" : 3.2,
	"type"          : "scene",
	"sourceFile"    : "scene.blend",
	"generatedBy"   : "Blender 2.66 Exporter",
	"objects"       : 2,
	"geometries"    : 0,
	"materials"     : 1,
	"textures"      : 0
},

"urlBaseType" : "relativeToScene",


"objects" :
{
	"default_light" : {
		"type"       : "DirectionalLight",
		"direction"  : [ 0, 1, 1 ],
		"color"      : 16777215,
		"intensity"  : 0.80
	},

	"Camera.001" : {
		"type"  : "PerspectiveCamera",
		"fov"   : 49.159264,
		"aspect": 1.333000,
		"near"  : 0.100000,
		"far"   : 100.000000,
		"position": [ 0, 2.59306, 0 ],
		"target"  : [ 0, 0, 0 ]
	}
},


"materials" :
{
	"Material" : {
		"type": "MeshLambertMaterial",
		"parameters": { "color": 10724259, "opacity": 1, "blending": "NormalBlending" }
	}
},


"transform" :
{
	"position"  : [ 0, 0, 0 ],
	"rotation"  : [ -1.5708, 0, 0 ],
	"scale"     : [ 1, 1, 1 ]
},

"defaults" :
{
	"bgcolor" : [ 0, 0, 0 ],
	"bgalpha" : 1.000000,
	"camera"  : "Camera.001"
}

}
