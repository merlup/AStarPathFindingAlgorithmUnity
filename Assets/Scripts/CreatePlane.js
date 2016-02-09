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
public var WidthField; 
public var HeightField;
public var WidthText: UI.Text;
public var HeightText: UI.Text;
public var Plot = false;



function Start () {
RectTransform = GetComponent("RectTransform");
enemy = GameObject.Find("Enemy");
target = GameObject.Find("Player");
WidthField = GameObject.Find("WidthField");
HeightField = GameObject.Find("HeightField");
WidthText = WidthField.GetComponent("Text");
HeightText = HeightField.GetComponent("Text");

}

function Update () {
RectTransform.localScale.x = width;
RectTransform.localScale.z = height;
width = float.Parse(WidthText.text);
height = float.Parse(HeightText.text);

PlaneSize = width * height ;	

if(Plot == true) {
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
		this.Obstacle.transform.localScale = new Vector3(Random.Range(10, 25), 0.1, Random.Range(10, 25));
		Obstacles.Push(this.Obstacle);
	}

}


function HideEnemy() {
	enemy.GetComponent(Renderer).enabled = false;
}

function HideTarget() {
	target.GetComponent(Renderer).enabled = false;
}

	function OnTriggerEnter (other : Collider) {
			if(other.gameObject.tag.name == "Obstacle") {
				this.Obstacle.transform.postion = new Vector3(Random.Range(- width * 4.5, width * 4.5), 0, Random.Range(- height * 4.5, height * 4.5));
			}
		}