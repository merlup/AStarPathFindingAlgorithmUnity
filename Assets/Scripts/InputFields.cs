using UnityEngine;
using System.Collections;

public class InputFields : MonoBehaviour {

	static CreatePlane CreatePlane;
	static Grid grid;


	void  Start (){
		CreatePlane = GetComponent<CreatePlane>();
	}

	void  Reset (){
		Destroy(GameObject.FindWithTag("Plane"));
		Destroy(GameObject.FindWithTag("Player"));
		Destroy(GameObject.FindWithTag("Enemy"));
		GameObject[] Obstacles= GameObject.FindGameObjectsWithTag("Obstacle"); 
		for(int i= 0; i < Obstacles.Length ; i ++) {
			Destroy(Obstacles[i]);
		}
		CreatePlane.enemyset = false;
		CreatePlane.targetset = false;
		//reset obstacle count
		CreatePlane.obstacleset = false;
		print(CreatePlane.obstacleset);
		print(CreatePlane.enemyset);
	}



}