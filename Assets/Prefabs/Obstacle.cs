using UnityEngine;
using System.Collections;

public class Obstacle : MonoBehaviour {

	void  OnCollisionEnter ( Collision collider  ){
		if(collider.gameObject.tag == "Player" || collider.gameObject.tag == "Enemy" ) {
			Debug.Log("Hit");
			Destroy(gameObject);
		}
	}
}