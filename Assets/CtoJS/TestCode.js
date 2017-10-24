 //import UnityEngine;
//import System.Collections;

class TestCode extends MonoBehaviour {

     var bla : String= "myValue";
     var bla2 : String;
     var harra : int;
     var harArray : int[]= new int[20];

    @RPC
	function StartX ( blaY : String ,   bla2X : int  ) : void {
        bla = "newValue...";

        if (bla == "")
        {
            bla = "nonsense";
        }

        gameObject.AddComponent(TestCode);

	}
	

}
