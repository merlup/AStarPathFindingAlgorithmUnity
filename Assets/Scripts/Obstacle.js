#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter (collider : Collision) {
if(collider.gameObject.tag == "Player" || collider.gameObject.tag == "Enemy" ) {
	Destroy(gameObject);
	}
}