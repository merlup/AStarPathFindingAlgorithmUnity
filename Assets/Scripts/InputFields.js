
static var CreatePlane : CreatePlane;
static var grid : Grid;


function Start () {
	CreatePlane = GetComponent("CreatePlane");

}

function Reset() {
	Destroy(GameObject.FindWithTag("Plane"));
	Destroy(GameObject.FindWithTag("Player"));
	Destroy(GameObject.FindWithTag("Enemy"));
	var Obstacles = GameObject.FindGameObjectsWithTag("Obstacle"); 
	for(var i = 0; i < Obstacles.length ; i ++) {
		Destroy(Obstacles[i]);
	}
	CreatePlane.enemyset = false;
	CreatePlane.targetset = false;
	CreatePlane.Obstacles.length = CreatePlane.Obstacles.length - CreatePlane.Obstacles.length;
	CreatePlane.obstacleset = false;
	print(CreatePlane.obstacleset);
	print(CreatePlane.enemyset);
}


