import System.Collections.Generic;

public var player : Transform;
public var enemy : Transform;
public var grid : Node[,];
public var gridWorldSize: Vector2;
public var nodeRadius : float;
public var unwalkableMask: LayerMask ;
public var width: UI.Text;
public var height: UI.Text;
public var nodeDiameter : float;
public var gridSizeX : int;
public var gridSizeY : int;



function Start() {
	
	width = GameObject.Find("WidthField").GetComponent("Text");
	height = GameObject.Find("HeightField").GetComponent("Text");
	nodeDiameter = nodeRadius * 2;
	CreateGrid();


}

function Update() {


	
}

function CreateGrid() {
gridWorldSize.x = float.Parse(width.text) * 10;
	gridWorldSize.y = float.Parse(height.text) * 10;
	gridSizeX = Mathf.RoundToInt(gridWorldSize.x / nodeDiameter);
	gridSizeY = Mathf.RoundToInt(gridWorldSize.y / nodeDiameter);
	player = GameObject.FindWithTag("Player").transform;
	enemy = GameObject.FindWithTag("Enemy").transform;	
grid = new Node[gridSizeX, gridSizeY];

var worldBottomLeft = transform.position - Vector3.right * gridWorldSize.x / 2 - Vector3.forward * gridWorldSize.y / 2;
	for (var x = 0; x < gridSizeX; x++) {
		for (var y = 0; y < gridSizeY; y++) {
			var worldPoint = worldBottomLeft + Vector3.right * (x * nodeDiameter + nodeRadius) + Vector3.forward * (y * nodeDiameter + nodeRadius);
			var walkable = !(Physics.CheckSphere( worldPoint, nodeRadius, unwalkableMask));
			 grid[x,y] = new Node(walkable, worldPoint, x, y);

		}

	}
}

public function GetNeighbours(node : Node ) {
 	var neighbours = new List.<Node>();

 	for (var x = -1; x <= 1; x++) {
 		for (var y = -1; y <= 1; y++) {
 			if(x == 0 && y == 0 ) {
 				continue;
 			}

 			var checkX = node.gridX + x;
 			var checkY = node.gridY + y;

 			if(checkX >= 0 && checkX < gridSizeX && checkY >= 0 && checkY < gridSizeY) {
 				neighbours.Add(grid[checkX,checkY]);
 			}
 		}
 	}

 	return neighbours;

}


function NodeFromWorldPoint (worldPosition : Vector3) {
	var percentX = (worldPosition.x + gridWorldSize.x / 2) / gridWorldSize.x;
	var percentY = (worldPosition.z + gridWorldSize.y / 2) / gridWorldSize.y;
	percentX = Mathf.Clamp01(percentX);
	percentY = Mathf.Clamp01(percentY);
	var x = Mathf.RoundToInt((gridSizeX - 1) * percentX);
	var y = Mathf.RoundToInt((gridSizeY - 1) * percentY);
	return grid[x,y];
}

public var path = new List.<Node>();

function OnDrawGizmos() {
var playerNode = NodeFromWorldPoint(player.position);
var enemyNode = NodeFromWorldPoint(enemy.position);

	if(grid != null) {


		for(var n in  grid) {
			Gizmos.color = (n.walkable)? Color.white: Color.red;
			if(path != null) {
				if(path.Contains(n)) {
					
					 Gizmos.color = Color.yellow;
				}
		
			}
				if(playerNode == n) {
					Gizmos.color = Color.blue;

				}
				if(enemyNode == n) {
					Gizmos.color = Color.black;
				}
			
				Gizmos.DrawCube(n.worldPosition, Vector3.one * (nodeDiameter - .1f));
			 
		}

	}

}



