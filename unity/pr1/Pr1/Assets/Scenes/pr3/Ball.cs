﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ball : MonoBehaviour
{
    void OnCollisionEnter(Collision myCollision)
    {
		Destroy(myCollision.gameObject);
	}
}
