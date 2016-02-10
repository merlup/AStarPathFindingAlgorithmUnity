public var width : float;
public var height : float;
public var RectTransform: RectTransform ; 
public var enemy : GameObject;
public var target : GameObject;
public var enemyset = false;
public var targetset = false;
public var obstacleset = false;
public var Enemy : Rigidbody;
public var Player : Rigidbody;
public var Obstacle: Rigidbody;
public var Obstacles = new Array();
public var ObstacleCount: float;
public var NumberOfObjects;
public var ObjectsText: UI.Text;
public var planeWidth: UI.Text;
public var planeHeight: UI.Text;
public var walls;
public var Grid : Grid;




function Start () {
RectTransform = GetComponent("RectTransform");
Grid = GetComponent("Grid");
enemy = GameObject.Find("Enemy");
target = GameObject.Find("Player");
planeWidth = GameObject.Find("WidthField").GetComponent("Text");
planeHeight = GameObject.Find("HeightField").GetComponent("Text");
NumberOfObjects = GameObject.Find("ObjectField");
ObjectsText = NumberOfObjects.GetComponent("Text");
walls = GameObject.Find("Walls");
ObstacleCounter = 0;

}

function Update () {
	RectTransform.localScale.x = width;
	RectTransform.localScale.z = height;
	width = float.Parse(planeWidth.text);
	height = float.Parse(planeHeight.text);
	ObstacleCount = float.Parse(ObjectsText.text);
}

function LateUpdate() {

}

function CreatePlane () {
//    SetGrid();
	SetRandomObstacle();
	SetEnemyPosition();
	SetTargetPosition();

}


function SetEnemyPosition() {
	if(enemyset == false) {
		Instantiate(Enemy, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		if(Enemy.transform.position == Obstacle.transform.postion) {
			Enemy.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5 ), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		enemyset = true;
	}
}

function SetTargetPosition() {
	if(targetset == false) {
		Instantiate(Player, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		if(Player.transform.position == Enemy.transform.postion) {
			Player.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		targetset = true;
	}
}

function SetRandomObstacle () {
while(ObstacleCount > Obstacles.length  ){
		var NewObstacle = Instantiate(Obstacle, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		NewObstacle.transform.localScale = new Vector3(Random.Range(10, 25), Random.Range(1,20), Random.Range(10, 25));
		NewObstacle.transform.SetParent(walls.transform);
		Obstacles.Push(NewObstacle);

		if(Obstacles.length == ObstacleCount) {
			obstacleset = true;
		}

	}

}

function SetGrid() {
Grid.CreateGrid();
}


