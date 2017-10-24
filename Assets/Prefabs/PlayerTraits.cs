using UnityEngine;
using System.Collections;

public class PlayerTraits : MonoBehaviour {

	public CreatePlane CreatePlane;
	public GameObject node;
	public bool collision= false;


	void  Start (){
		CreatePlane = GetComponent<CreatePlane>();
		GameObject node = this.gameObject;
	}

}