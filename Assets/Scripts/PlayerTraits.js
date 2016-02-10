#pragma strict
public var CreatePlane : CreatePlane;
public var node : GameObject;
public var collision = false;




function Start () {
	var CreatePlane = GetComponent("CreatePlane");
	var node = GameObject.FindWithTag("Player");
}



function Update () {

}