using UnityEngine;
using UnityEditor;

using System;
using System.IO;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class CtoJS : EditorWindow
{

    [MenuItem("Tools/Convert selected C# file(s) to JS")]
    static void ConvertCtoJS()
    {
        UnityEngine.Object[] objects = Selection.GetFiltered(typeof(MonoScript), SelectionMode.Editable);
        int converted = 0;
        foreach (UnityEngine.Object obj in objects)
        {
            if (obj.GetType().ToString() == "UnityEditor.MonoScript")
            {

                string csFile = AssetDatabase.GetAssetPath(obj);
                int csEnd = csFile.LastIndexOf(".cs");
                if (csEnd <= 0)
                {
                    Debug.LogError("CToJS error: You did not select a .cs file!");
                    return;
                }
                converted++;
                string jsFilename = csFile.Substring(0, csEnd);
                jsFilename += ".js";              
                if (AssetDatabase.LoadAssetAtPath(jsFilename, typeof(MonoScript)) != null)
                {
                    Debug.LogError("JsToCs error: " + jsFilename + " already exists!");
                    return;
                }

                string sourceCode = obj.ToString();
                string jsCode = ConvertToJS(sourceCode, obj.name);
               
                //Debug.Log(jsCode);
                ////////////####
                // return;

                if (jsCode == "")
                {
                    Debug.LogError("Failed converting " + csFile);
                    continue;
                }
                           
                try
                {
                    TextWriter tw = new StreamWriter(jsFilename);
                    tw.Write(jsCode);
                    tw.Close();
                }
                catch (System.IO.IOException IOEx)
                {
                    Debug.LogError("Incorrect file permissions? "+IOEx);
                }
                //Optional: Delete old CS file
                //AssetDatabase.DeleteAsset(csFile);

                AssetDatabase.ImportAsset(jsFilename, ImportAssetOptions.ForceUpdate | ImportAssetOptions.ImportRecursive);
               

                Debug.Log("Converted " + Selection.activeObject.name + " to " + jsFilename);

            }
        }
        if (converted < 1)
        {
            Debug.LogError("You did not select a CS file to convert! " + objects.Length + " files selected.");
        }
    }

    static string ConvertToJS(string output, string className)
    {
        string VAR = @"[A-Za-z0-9_\[\]\.]";
        string VAR_NONARRAY = @"[A-Za-z0-9_]";

        string[] patterns = new string[12];
        string[] replacements = new string[12];
        int patrs = 0;
        int reps = 0;

        

        //"using UnityEngine" etc.
        output = " " + output;
        patterns[patrs++] = @"([\s^]+)using (" + VAR + @"+);";
        replacements[reps++] = "$1//import $2;";

        patterns[patrs++] = @"(public)\s+(" + VAR + @"+)\s+(" + VAR + @"+)";
        replacements[reps++] = "$2 $3";



        //class TestCode extends MonoBehaviour {
        //patterns[patrs++] = @"([\^\n\s\r]+)(\w*)(\s+)class(\s*)(\w+)(s*):(\s*)MonoBehaviour(\s*)\{";
        patterns[patrs++] = @"([\^\n\s\r]+)(\w*)(\s+)class(\s+)([" + VAR_NONARRAY + @"+)(\s*):(\s*)MonoBehaviour(\s*)\{";
        replacements[reps++] = "$1$3class $5 extends MonoBehaviour {";
       
        //boolean
        patterns[patrs++] = @"([\n\t\s \(\)\{\}\r:;]*)\bbool\b([\n\t\s \,\[=\(\)\{\}\r]+)";
        replacements[reps++] = "${1}boolean${2} ";
        //String
        patterns[patrs++] = @"([\n\t\s \(\)\{\}\r:;]*)\bstring\b([\n\t\s \,\[=\(\)\{\}\r]+)";
        replacements[reps++] = "${1}String${2}";

       // [System.Serializable]
        patterns[patrs++] = @"\[System.Serializable\]";
        replacements[reps++] = "//[System.Serializable]\n";

        //ANYTHING myVarName =  --> var myVarName[] : ANYTHING=;
        //patterns[patrs++] = @"(\s\t\r\n\(+)(" + VAR_NONARRAY + @"+)(\s+)(" + VAR + @"+)(\s*)(;=+)";
        patterns[patrs++] = @"([\^\n\r\(]+\s*(static)?\s*(protected)?\s*(public|private)?\s*)([" + VAR + @"+)(\s+)(" + VAR_NONARRAY + @"+)(\s*)([;=]+)";
        replacements[reps++] = "$1 var $7 : $5$9";
   
        //Style
        patterns[patrs++] = "\n\n\n";
        replacements[reps++] = "\n";

        //RPC
        patterns[patrs++] = @"([\^\n\s\r]+)\[RPC\]";
        replacements[reps++] = "$1@RPC";

      


        //parseInt parseFloat
       /* patterns[patrs++] = "parseInt";
        replacements[reps++] = "int.Parse";
        patterns[patrs++] = "parseFloat";
        replacements[reps++] = "float.Parse";
        */

           //Yield
       /* patterns[patrs++] = @"yield(\s+)(\w+);";
        replacements[reps++] = "yield return ${2};";
        patterns[patrs++] = @"yield;";
        replacements[reps++] = "yield return 0;";
        patterns[patrs++] = @"yield(\s+)(\w+)\(";
        replacements[reps++] = "yield return new ${2}(";
        patterns[patrs++] = @"yield new";
        replacements[reps++] = "yield return new";*/

        //For -> foreach
        patterns[patrs++] = @"foreach[\s]*\(([A-Za-z0-9_ :\,\.\[\]\s\n\r\t]*) in ([A-Za-z0-9_ :\,\.\s\n\r\t]*)\)";
        replacements[reps++] = "for($1 in $2)";

        //function rewrite
        patterns[patrs++] = @"(" + VAR + @"+)(\s+)(" + VAR_NONARRAY + @"+)(\s*)\(([\n\r\tA-Za-z0-9_\[\]\*\/ \.:\,]*)\)(\s*)\{";
        replacements[reps++] = "function $3 ($5) : $1 {";

        //Getcomponent<BLAA>() etc.
        patterns[patrs++] = @"(\w+)<([\n\r\tA-Za-z0-9_ ]*)>\(\s*\)";
        replacements[reps++] = "$1($2)";

        output = PregReplace(output, patterns, replacements);
        
        string before = "";
        while (before != output)
        {
            //( XX : YY) rewrite
            before = output;
            string patt = @"\(([\t\n\rA-Za-z0-9_*\/ \.\,\]\[]*)\b(" + VAR + @"+)\b(\s+)(" + VAR + @"+)([\s\,]*)([\[\]\n\r\t\sA-Za-z0-9_\*\/ :\,\.]*)\)";
            string repp = "(${1} ${4} : ${2} ${5} ${6})";//'(${1} 5--${5}-- 2--${2}-- 5--${6}-- 7=--${7})'
            output = Regex.Replace(output, patt, repp);
        }

        //Remove class 
        return output;
    }


    static string PregReplace(string input, string[] pattern, string[] replacements)
    {
        if (replacements.Length != pattern.Length)
            throw new ArgumentException("Replacement and Pattern Arrays must be balanced");

        for (var i = 0; i < pattern.Length; i++)
        {
            input = Regex.Replace(input, pattern[i], replacements[i]);
        }

        return input;
    }


}