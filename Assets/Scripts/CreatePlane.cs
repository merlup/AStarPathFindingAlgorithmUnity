using UnityEngine.UI;
using UnityEngine;
using System.Collections.Generic;
using System.Collections;


public class CreatePlane : MonoBehaviour {
	public float width;
	public float height;

	static GameObject enemy;
	static GameObject target;
	public bool enemyset= false;
	public bool targetset= false;
	public bool obstacleset= false;
	public RectTransform RectTransform;
	public Rigidbody Enemy;
	public Rigidbody WorldPlane;
	public Rigidbody Player;
	public Rigidbody Obstacle;
	public List<Rigidbody> Obstacles;
	public float ObstacleCount;
	public GameObject NumberOfObjects;
	public Text ObjectsText;
	public Text planeWidth;
	public Text planeHeight;
	static Grid grid;
	public GameObject walls;

	void  Start () {

		RectTransform = GetComponent ("RectTransform") as RectTransform;
		enemy = GameObject.Find("Enemy");
		target = GameObject.Find("Player");
		planeWidth = GameObject.Find("WidthField").GetComponent<Text>();
		planeHeight = GameObject.Find("HeightField").GetComponent<Text>();
		NumberOfObjects = GameObject.Find("ObjectField");
		ObjectsText = NumberOfObjects.GetComponent<Text>();
		walls = GameObject.Find("Walls");
	}

	void  Update (){




	}

	public void BuildPlane (){


		SetWorld();
		SetPlane();
		SetRandomObstacle();
		SetEnemyPosition();
		SetTargetPosition();


	}

	void  SetWorld (){

		width = float.Parse(planeWidth.text);
		height = float.Parse(planeHeight.text);
		ObstacleCount = float.Parse(ObjectsText.text);


	}

	void  SetPlane (){
		Rigidbody newPlane = Instantiate(WorldPlane, Vector3.zero, Quaternion.identity) as Rigidbody;
		newPlane.name = "Plane";
		Vector3 scale = newPlane.transform.localScale;
		scale.Set (width, 1, height);
		newPlane.transform.localScale = scale;
	}



	void  SetEnemyPosition (){
		print("Enemy");
		if(enemyset == false) {
			Rigidbody newEnemy= Instantiate(Enemy, new Vector3(Random.Range(- width * 4.5f, width * 4.5f), 3, Random.Range(- height * 4.5f, height * 4.5f)), Quaternion.identity ) as Rigidbody;

			if(Enemy.transform.position == Obstacle.transform.position) {
				Enemy.transform.position = new Vector3(Random.Range(- width * 4.5f, width * 4.5f ), 3, Random.Range(- height * 4.5f, height * 4.5f));
			}
			enemyset = true;
		}

	}

	void  SetTargetPosition (){
		print("Player");
		if(targetset == false) {
			Rigidbody newPlayer= Instantiate(Player, new Vector3(Random.Range(- width * 4.5f, width * 4.5f), 3, Random.Range(- height * 4.5f, height * 4.5f)), Quaternion.identity ) as Rigidbody;

			if(Player.transform.position == Enemy.transform.position) {
				Player.transform.position = new Vector3(Random.Range(- width * 4.5f, width * 4.5f), 3, Random.Range(- height * 4.5f, height * 4.5f));
			}
			targetset = true;
		}
	}

	void  SetRandomObstacle (){
		print("Obstacle");
		while(ObstacleCount > Obstacles.Count  ){
			Rigidbody NewObstacle = Instantiate (Obstacle, new Vector3 (Random.Range (-width * 4.5f, width * 4.5f), 0, Random.Range (-height * 4.5f, height * 4.5f)), Quaternion.identity) as Rigidbody;


			Vector3 temp = NewObstacle.transform.position;
			temp.y = 0 + NewObstacle.transform.localScale.y /2;
			NewObstacle.transform.SetParent(walls.transform);
			Obstacles.Add(NewObstacle);
		}
		if( Obstacles.Count == ObstacleCount) {
			obstacleset = true;
		}

	}


}