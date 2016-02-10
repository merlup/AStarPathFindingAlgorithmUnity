#pragma strict

class Node {
	public var walkable : boolean ;
	public var worldPosition : Vector3;

	 function Node( _walkable : boolean, _worldPos : Vector3) {
		walkable = _walkable;
		worldPosition = _worldPos;
	}
}

