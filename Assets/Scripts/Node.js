#pragma strict

class Node {
	public var walkable : boolean ;
	public var worldPosition : Vector3;
	public var gCost: int;
	public var hCost: int;
	public var parent: Node;
	public var gridX: int;
	public var gridY: int;

	 public function get fCost() : int
    {
        return gCost + hCost;
    }

	function Node( _walkable : boolean, _worldPos : Vector3, _gridX : int, _gridY : int) {
		walkable = _walkable;
		worldPosition = _worldPos;
		gridX = _gridX;
		gridY = _gridY;
	}

}

