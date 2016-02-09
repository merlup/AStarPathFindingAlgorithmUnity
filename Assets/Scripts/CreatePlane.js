public var width : float;
public var height : float;
public var RectTransform: RectTransform ; 
public var enemy : GameObject;
public var target : GameObject;
public var enemyset = false;
public var targetset = false;
public var PlaneSize;
public var PlaneSet;
public var Obstacle: Rigidbody;
public var Obstacles = new Array();
public var ObstacleCount: float;



function Start () {
RectTransform = GetComponent("RectTransform");
enemy = GameObject.Find("Enemy");
target = GameObject.Find("Player");

}

function Update () {
RectTransform.localScale.x = width;
RectTransform.localScale.z = height;

PlaneSize = width * height ;	

	if(width >= 0 && height >= 0) {
		PlaneSet = true;
	} else {
		PlaneSet = false;
	}

	if( PlaneSet == true && PlaneSize >= 1) {
		SetRandomObstacle();
		SetEnemyPosition();
		SetTargetPosition();
	} else {
		HideEnemy();
		HideTarget();
	}
}

function LateUpdate() {

}


function SetEnemyPosition() {
	if(enemyset == false) {
	enemy.GetComponent(Renderer).enabled = true;
	enemy.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5 ), 0, Random.Range(- height * 4.5, height * 4.5));
	if(enemy.transform.position == Obstacle.transform.postion) {
	enemy.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5 ), 0, Random.Range(- height * 4.5, height * 4.5));
	}
	enemyset = true;
	}
}

function SetTargetPosition() {
	if(targetset == false) {
	target.GetComponent(Renderer).enabled = true;
	target.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
	targetset = true;
	if(target.transform.position == enemy.transform.postion) {
		target.transform.position = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
	}
	}
}

function SetRandomObstacle () {
	if( Obstacles.length < ObstacleCount ) {
		Instantiate(Obstacle, new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5)), Quaternion.identity );
		Obstacles.Push(this.Obstacle);
	}

}

function HideEnemy() {
	enemy.GetComponent(Renderer).enabled = false;
}

function HideTarget() {
	target.GetComponent(Renderer).enabled = false;
}