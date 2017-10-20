public var width : float;
public var height : float;
public var RectTransform: RectTransform ; 
static var enemy : GameObject;
static var target : GameObject;

public var enemyset = false;
public var targetset = false;
public var obstacleset = false;
public var Enemy : Rigidbody;
public var WorldPlane : Rigidbody;
public var Player : Rigidbody;
public var Obstacle: Rigidbody;
public var Obstacles = new Array();
public var ObstacleCount: float;
public var NumberOfObjects;
public var ObjectsText: UI.Text;
public var planeWidth: UI.Text;
public var planeHeight: UI.Text;
public var walls;
static var grid : Grid;

function Start () {

RectTransform = GetComponent("RectTransform");

enemy = GameObject.Find("Enemy");
target = GameObject.Find("Player");
planeWidth = GameObject.Find("WidthField").GetComponent("Text");
planeHeight = GameObject.Find("HeightField").GetComponent("Text");
NumberOfObjects = GameObject.Find("ObjectField");
ObjectsText = NumberOfObjects.GetComponent("Text");
walls = GameObject.Find("Walls");


}

function Update () {


	

}

function CreatePlane () {
	SetWorld();
	SetPlane();
	SetRandomObstacle();
	SetEnemyPosition();
	SetTargetPosition();
}

function SetWorld() {

	width = float.Parse(planeWidth.text);
	height = float.Parse(planeHeight.text);
	ObstacleCount = float.Parse(ObjectsText.text);
//	RectTransform.localScale.x = width;
//	RectTransform.localScale.z = height;

}

function SetPlane () {

	var newPlane = Instantiate(WorldPlane, Vector3.zero, Quaternion.identity);
	newPlane.name = "Plane";
	newPlane.transform.localScale.x = width;
	newPlane.transform.localScale.z = height;


}



function SetEnemyPosition() {
print("Enemy");
	if(enemyset == false) {
		var newEnemy = Instantiate(Enemy, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		newEnemy.transform.position.y = 0 + newEnemy.transform.localScale.y / 2;
		if(Enemy.transform.position == Obstacle.transform.postion) {
			Enemy.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5 ), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		enemyset = true;
	}

}

function SetTargetPosition() {
print("Player");
	if(targetset == false) {
		var newPlayer = Instantiate(Player, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		newPlayer.transform.position.y = 0 + newPlayer.transform.localScale.y / 2;
		if(Player.transform.position == Enemy.transform.postion) {
			Player.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		targetset = true;
	}
}

function SetRandomObstacle () {
print("Obstacle");
while(ObstacleCount > Obstacles.length  ){
		var NewObstacle = Instantiate(Obstacle, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		NewObstacle.transform.localScale = new Vector3(Random.Range(10, 25), Random.Range(10,40), Random.Range(10, 25));
		NewObstacle.transform.position.y = 0 + NewObstacle.transform.localScale.y /2;
		NewObstacle.transform.SetParent(walls.transform);
		Obstacles.Push(NewObstacle);
	}
	if( Obstacles.length == ObstacleCount) {
	obstacleset = true;
	}

}

