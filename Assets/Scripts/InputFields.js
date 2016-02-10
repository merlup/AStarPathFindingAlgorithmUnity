
public var CreatePlane : CreatePlane;

function Start () {
	var CreatePlane = GetComponent("CreatePlane");
}

function Create() {
	CreatePlane.CreatePlane();
}

function Reset() {
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
}


