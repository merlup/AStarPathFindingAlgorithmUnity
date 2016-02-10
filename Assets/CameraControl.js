#pragma strict
public var CameraZoom ;

function Update () {
CameraZoom = GameObject.Find("Slider").GetComponent("Value");

}