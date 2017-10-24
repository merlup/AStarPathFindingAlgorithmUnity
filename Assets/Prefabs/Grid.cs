using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;

public class Grid : MonoBehaviour {
	
	public Transform player;
	public Transform enemy;
	Node[,] grid;
	public Vector2 gridWorldSize;
	public float nodeRadius;
	public LayerMask unwalkableMask ;
	public Text width;
	public Text height;
	public float nodeDiameter;
	public int gridSizeX;
	public int gridSizeY;



	void  Start (){
		width = GameObject.Find("WidthField").GetComponent<Text>();
		height = GameObject.Find("HeightField").GetComponent<Text>();
		nodeDiameter = nodeRadius * 2;
		CreateGrid();
	}

	void  Update (){
		if(Input.GetButtonDown("Jump")) {
			OnDrawGizmos();
		}
	}

	void  CreateGrid (){
		
		gridWorldSize.x = float.Parse(width.text) * 10;
		gridWorldSize.y = float.Parse(height.text) * 10;
		gridSizeX = Mathf.RoundToInt(gridWorldSize.x / nodeDiameter);
		gridSizeY = Mathf.RoundToInt(gridWorldSize.y / nodeDiameter);
		Transform player = GameObject.FindWithTag("Player").transform;
		Transform enemy = GameObject.FindWithTag("Enemy").transform;	
		grid = new Node[gridSizeX, gridSizeY];

		Vector3 worldBottomLeft = transform.position - Vector3.right * gridWorldSize.x / 2 - Vector3.forward * gridWorldSize.y / 2;
		for (int x= 0; x < gridSizeX; x++) {
			for (int y= 0; y < gridSizeY; y++) {
				Vector3 worldPoint= worldBottomLeft + Vector3.right * (x * nodeDiameter + nodeRadius) + Vector3.forward * (y * nodeDiameter + nodeRadius);
				bool walkable= !(Physics.CheckSphere( worldPoint, nodeRadius, unwalkableMask));
				grid[x,y] = new Node(walkable, worldPoint, x, y);
			}
		}
	}

	public List<Node> GetNeighbours(Node node){
		List<Node> neighbours= new List<Node>();

		for (int x= -1; x <= 1; x++) {
			for (int y= - 1; y <= 1; y++) {
				if(x == 0 && y == 0 ) {
					continue;
				}

				int checkX= node.gridX + x;
				int checkY= node.gridY + y;

				if(checkX >= 0 && checkX < gridSizeX && checkY >= 0 && checkY < gridSizeY) {
					neighbours.Add(grid[checkX,checkY]);
				}
			}
		}

		return neighbours;

	}


	public Node NodeFromWorldPoint(Vector3 worldPosition) {
		float percentX = (worldPosition.x + gridWorldSize.x/2) / gridWorldSize.x;
		float percentY = (worldPosition.z + gridWorldSize.y/2) / gridWorldSize.y;
		percentX = Mathf.Clamp01(percentX);
		percentY = Mathf.Clamp01(percentY);
		int x = Mathf.RoundToInt((gridSizeX-1) * percentX);
		int y = Mathf.RoundToInt((gridSizeY-1) * percentY);
		return grid[x,y];
	}

	public List<Node> path;

	void  OnDrawGizmos (){
		Node playerNode = NodeFromWorldPoint(player.position);
		Node enemyNode = NodeFromWorldPoint(enemy.position);

		if(grid != null) {
			foreach(var n in  grid) {
				Gizmos.DrawCube(n.worldPosition, Vector3.one * (nodeDiameter - .1f));
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



			}

		}

	}
		
}