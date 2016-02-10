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
public var WidthField; 
public var HeightField;
public var WidthText: UI.Text;
public var HeightText: UI.Text;




function Start () {
RectTransform = GetComponent("RectTransform");
enemy = GameObject.Find("Enemy");
target = GameObject.Find("Player");
WidthField = GameObject.Find("WidthField");
HeightField = GameObject.Find("HeightField");
WidthText = WidthField.GetComponent("Text");
HeightText = HeightField.GetComponent("Text");
ObstacleCounter = 0;

}

function Update () {

RectTransform.localScale.x = width;
RectTransform.localScale.z = height;
width = float.Parse(WidthText.text);
height = float.Parse(HeightText.text);

}

function LateUpdate() {

}

function CreatePlane () {

SetRandomObstacle();
SetEnemyPosition();
SetTargetPosition();

}


function SetEnemyPosition() {
	if(enemyset == false) {
		Instantiate(Enemy, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0.1, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		if(Enemy.transform.position == Obstacle.transform.postion) {
			Enemy.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5 ), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		enemyset = true;
	}
}

function SetTargetPosition() {
	if(targetset == false) {
		Instantiate(Player, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0.1, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		if(Player.transform.position == Enemy.transform.postion) {
			Player.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
		}
		targetset = true;
	}
}

function SetRandomObstacle () {
while(ObstacleCount > Obstacles.length  ){
		Instantiate(Obstacle, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0.1, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		this.Obstacle.transform.localScale = new Vector3(Random.Range(10, 25), 0.1, Random.Range(10, 25));
		Obstacles.Push(this.Obstacle);
		if(Obstacles.length == ObstacleCount) {
			obstacleset = true;
		}
	}

}


