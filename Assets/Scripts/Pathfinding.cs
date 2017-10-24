﻿// Converted from UnityScript to C# at http://www.M2H.nl/files/js_to_c.php - by Mike Hergaarden
// Do test the code! You usually need to change a few small bits.

using UnityEngine;
using System;
using System.Collections;
using System.Diagnostics;
using System.Collections.Generic;

public class Pathfinding : MonoBehaviour {

	private Grid grid;
	public GameObject gridObject ;
	public Transform seeker ;
	public Transform target ;
	public GameObject plane;

	void  Start (){
		grid = GetComponent<Grid>();
		seeker = GameObject.FindWithTag("Enemy").transform;
		target = GameObject.FindWithTag("Player").transform;
	}


	void  Update (){
		if(Input.GetButtonDown("Jump")) {
		FindPath(seeker.position, target.position);
		}
	}

	void  FindPath ( Vector3 startPos,   Vector3 targetPos   ){
		Stopwatch sw = new Stopwatch();
		sw.Start();
		Node startNode= grid.NodeFromWorldPoint(startPos);
		Node targetNode= grid.NodeFromWorldPoint(targetPos);
		List<Node> openSet = new List<Node>();
		HashSet<Node> closedSet = new HashSet<Node>();
		openSet.Add(startNode);

		while(openSet.Count > 0 ) {
			Node currentNode= openSet[0];
			for (int i= 1; i < openSet.Count; i++ ) {
				if(openSet[i].fCost < currentNode.fCost || openSet[i].fCost == currentNode.fCost) {
					if(openSet[i].hCost < currentNode.hCost) {
						currentNode = openSet[i];
					}
				}
			}

			openSet.Remove(currentNode);
			closedSet.Add(currentNode);


			if(currentNode == targetNode) {
				sw.Stop ();
				print ("Path found: " + sw.ElapsedMilliseconds + " ms");
				RetracePath(startNode, targetNode);
				return;
			}

			foreach ( Node neighbour in grid.GetNeighbours(currentNode)) {
				if (!neighbour.walkable || closedSet.Contains(neighbour)) {
					continue;
				}

				int newMovementCostToNeighbour = currentNode.gCost + GetDistance(currentNode, neighbour);
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

	void  RetracePath (  Node startNode ,   Node endNode  ){
		List<Node> path= new List<Node>();
		Node currentNode= endNode;

		while(currentNode != startNode) {
			path.Add(currentNode);
			currentNode = currentNode.parent;
		}
		path.Reverse();

		grid.path = path;
	}

	int GetDistance(Node nodeA, Node nodeB) {
		int dstX = Mathf.Abs(nodeA.gridX - nodeB.gridX);
		int dstY = Mathf.Abs(nodeA.gridY - nodeB.gridY);

		if (dstX > dstY)
			return 14*dstY + 10* (dstX-dstY);
		return 14*dstX + 10 * (dstY-dstX);
	}




}