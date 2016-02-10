
public var player : Transform;
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
}

function Update() {
	gridWorldSize.x = float.Parse(width.text) * 10;
	gridWorldSize.y = float.Parse(height.text) * 10;
	gridSizeX = Mathf.RoundToInt(gridWorldSize.x / nodeDiameter);
	gridSizeY = Mathf.RoundToInt(gridWorldSize.y / nodeDiameter);
	player = GameObject.FindWithTag("Player").transform;
	CreateGrid();
}

function CreateGrid() {
grid = new Node[gridSizeX, gridSizeY];
var worldBottomLeft = transform.position - Vector3.right * gridWorldSize.x / 2 - Vector3.forward * gridWorldSize.y / 2;
	for (var x = 0; x < gridSizeX; x++) {
		for (var y = 0; y < gridSizeY; y++) {
			var worldPoint = worldBottomLeft + Vector3.right * (x * nodeDiameter + nodeRadius) + Vector3.forward * (y * nodeDiameter + nodeRadius);
			var walkable = !(Physics.CheckSphere( worldPoint, nodeRadius, unwalkableMask));
			 grid[x,y] = new Node(walkable, worldPoint);
		}

	}
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



function OnDrawGizmos() {
	Gizmos.DrawWireCube(transform.position, new Vector3(gridWorldSize.x, 1, gridWorldSize.y));

	if(grid != null) {
		var playerNode = NodeFromWorldPoint(player.position);
		for(var n in  grid) {
			Gizmos.color = (n.walkable)? Color.green: Color.red;
				if(playerNode == n) {
					Gizmos.color = Color.blue;
				}
			Gizmos.DrawCube(n.worldPosition, Vector3.one * (nodeDiameter - .1f));


		}
	}
}



