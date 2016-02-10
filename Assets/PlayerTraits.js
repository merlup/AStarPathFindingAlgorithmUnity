#pragma strict
public var CreatePlane : CreatePlane;


function Start () {
var CreatePlane = GetComponent("CreatePlane");

}

function OnCollisionEnter ( collider : Collision) {
	if( collider.gameObject.tag == "Obstacle") {
		transform.position = new Vector3(Random.Range(- CreatePlane.width, CreatePlane.width), 0.1, Random.Range(- CreatePlane.height, CreatePlane.height));
	Debug.Log("Hitting");
	}
}

function Update () {

}