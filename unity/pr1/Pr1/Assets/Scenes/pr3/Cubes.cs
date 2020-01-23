using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cubes : MonoBehaviour
{
	public GameObject cube;

	// Start is called before the first frame update
	void Start()
	{
		Debug.Log("Start");
		for (var y = 0; y < 3; y++)
		{
			for (var x = -10; x < 10; x++)
			{
				for (var z = -10; z < 10; z++)
				{
					cube.transform.position = new Vector3(x,y, z);
					Instantiate(cube, cube.transform.position, Quaternion.identity);
				}
			}
		}
	}
}