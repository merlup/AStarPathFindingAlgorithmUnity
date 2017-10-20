#pragma strict
import System;
import System.Type;
import System.Collections.Generic;



private var grid : Grid;
public var gridObject : GameObject ;
 public var seeker : Transform ;
 public var target : Transform ;
 public var plane : GameObject;

function Start () {

grid = GetComponent.<Grid>();
seeker = GameObject.FindWithTag("Enemy").transform;
target = GameObject.FindWithTag("Player").transform;
}


function Update () {
FindPath(seeker.position, target.position);

}

function FindPath(startPos : Vector3 , targetPos : Vector3 ) {
	var startNode = grid.NodeFromWorldPoint(startPos);
	var targetNode = grid.NodeFromWorldPoint(targetPos);
	var openSet = new List.<Node>();
	var closedSet = new HashSet.<Node>();
	    openSet.Add(startNode);

	    while(openSet.Count > 0 ) {
	    	var currentNode = openSet[0];
	    	for (var i = 1; i < openSet.Count; i++ ) {
	    		if(openSet[i].fCost < currentNode.fCost || openSet[i].fCost == currentNode.fCost) {
	    			if(openSet[i].hCost < currentNode.hCost) {
	    				currentNode = openSet[i];
	    			}
	    		}
	    	}

	    	openSet.Remove(currentNode);
	    	closedSet.Add(currentNode);


	    	if(currentNode == targetNode) {
	    		RetracePath(startNode, targetNode);
	    		return;
	    	}

	    	for( var neighbour : Node in grid.GetNeighbours(currentNode)) {
	    	 if (!neighbour.walkable || closedSet.Contains(neighbour)) {
	    	 	continue;
	    	 }
	    	 	var newMovementCostToNeighbour = currentNode.gCost + GetDistance(currentNode, neighbour);
	    	 	if (newMovementCostToNeighbour < neighbour.gCost || !openSet.Contains(neighbour)) {
	    	 		neighbour.gCost = newMovementCostToNeighbour;
	    	 		neighbour.hCost = GetDistance(neighbour, targetNode);
	    	 		neighbour.parent = currentNode;

	    	 		if(!openSet.Contains(neighbour)) {
	    	 			openSet.Add(neighbour);
	    	 		}
	    	 	}
	    	}

	    }



}

function RetracePath( startNode : Node, endNode : Node) {
	    	var path = new List.<Node>();
	    	var currentNode = endNode;

	    	while(currentNode != startNode) {
	    	path.Add(currentNode);
	    	currentNode = currentNode.parent;
	    	}
	    	path.Reverse();

	    	grid.path = path;
}

function GetDistance(nodeA : Node, nodeB : Node) {
	var dstX = Mathf.Abs(nodeA.gridX - nodeB.gridX);
	var dstY = Mathf.Abs(nodeA.gridY - nodeB.gridY);

	if(dstX > dstY) {

	return 14 * dstY + 10 * (dstX - dstY);

	} else {

	return 14 * dstY + 10 * (dstX - dstY);

	}
}

	

