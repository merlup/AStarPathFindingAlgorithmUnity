

function OnCollisionEnter (collider : Collision) {
if(collider.gameObject.tag == "Player" || collider.gameObject.tag == "Enemy" ) {
	Debug.Log("Hit");
	Destroy(gameObject);
	}
}