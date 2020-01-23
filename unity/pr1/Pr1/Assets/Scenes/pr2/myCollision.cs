using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class myCollision : MonoBehaviour
{
    void OnCollisionEnter(Collision myCollision)
    {
    	var cubeRenderer = myCollision.gameObject.GetComponent<Renderer>();
		cubeRenderer.material.SetColor("_Color", Color.red); 
    }
}
