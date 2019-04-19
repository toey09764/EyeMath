   ////////////////// Initial value //////////////////////
   var patt_Variable =  /[a-zA-Z][a-zA-Z0-9_]*/;
   var patt_Constant = /^#([a-zA-Z0-9]*)/;
   var patt_Literal = /^\d*\.?\d+(?:[Ee][+-]?\d+)?/;

   var patt_NumberAndVariable = /([\d|)]+|#pi)\s*([A-Za-z]|[#]+)/;
   
   var patt_WhiteSpace = /[\s]+/gi;
   var patt_DeleteLooknum =/[\d][,][\d]/gi;
   ////////////////// Operator //////////////////////
   
   //var patt_Plus = /(\w+)\s*[+]\s*(\w+)/;  
   // var patt_Minus = /(\w+)\s*[-]\s*(\w+)/;
   //    var patt_MultipleT = /(\w+)\s*\\times\s*(\w+)/;
   //    var patt_MultipleC = /(\w+)\s*\\cdot\s*(\w+)/;
  
   var patt_Plus  = /([+])/gi;
   var patt_Minus = /([-])/gi;
   var patt_MultipleT = /\s*\\times\s*/gi;
   var patt_MultipleC = /\s*\\cdot\s*/gi;
   var patt_Divide = /\s*\\div\s*/gi;
   var patt_Fraction = /\\frac{({.*?}|.*?)}\s*{([.*{.*?}]|.*?)}/; 
  // var patt_Fraction = /\\frac{({.*?}|.*?)}\s*{([\w|\d|\\|+|-|*|\/|^]*{.*?}|[\w|\d|\\|+|-|*|\/|^|(|)|\[|\]|{|}]+)}/;
   var patt_NotEqual = /\s*\\neq\s*/gi;
   var patt_Parentheses = /\\left\(\s*(.*?)\s*\\right\)/;
   var patt_Set = /\\left\\{\s*(.*?)\s*\\right\\}/;
   var patt_List = /\\left\[\s*(.*?)\s*\\right\]/;
   //var patt_Expo = /([\w]*)\s*[\^]\s*{([\w|\d|\\|+|-|*|\/|^]*{.*?}|[\w|\d|\\|+|-|*|\/|^|(|)|\[|\]|{|}]+)}/;
   var patt_Expo = /([\w]*)\s*[\^]\s*{({.*?}|.*?)}/;
   var patt_GreatherThan = /(\\geq|\\ge)/gi;
  // var patt_LeatherThan = /(\\leq|\\le)/gi;
   var patt_LeatherThan = /(\\leq)/gi;
   var patt_SquareRoot = /\\sqrt\s*{([.*{.*?}]|.*?)}/;
   var patt_SquareRootN = /\\sqrt\[(.*?)\]{(.*{.*?}|.*?)}/;
  // var patt_SquareRootN = / \\sqrt\[([\w|\d|\\|+|-|*|\/|^]*{.*?}|[\w|\d|\\|+|-|*|\/|^|(|)|\[|\]|{|}]+)\]{([\w|\d|\\|+|-|*|\/|^]*{.*?}|[\w|\d|\\|+|-|*|\/|^|(|)|\[|\]|{|}]+)}/;
   var patt_PI = /\\pi/gi;
   var patt_PlusMinus = /\\pm/gi;
   var patt_MinusPlus = /\\mp/gi;
   var patt_Sin = /\\sin\s*([\w|.|+|-|*|\/|(|)|\\|{|}|\[|\]]+)/;
   var patt_Cos = /\\cos\s*([\w|.|+|-|*|\/|(|)|\\|{|}|\[|\]]+)/;
   var patt_Tan = /\\tan\s*([\w|.|+|-|*|\/|(|)|\\|{|}|\[|\]]+)/;

function isInt(n){
    var cast = Number(n)
    return cast % 1 === 0;
}

function isFloat(n){  
    var cast = Number(n)
    return cast % 1 !== 0;
}

var parseTree =  function (exp){
    console.log(exp);
    var res=exp;
   
    ///////////////Constant////////////////////////
    if(patt_PI.test(res)){
       // console.log("PI");
        res = res.replace(patt_PI, "#pi");
    } 
    if(patt_WhiteSpace.test(res)){
        //console.log("White Space");
        res = res.replace(patt_WhiteSpace, "");
    }
    if(patt_DeleteLooknum.test(res)){
      console.log("LookNum");
     // res = res.replace(patt_DeleteLooknum, "");
      res = res.replace(",", "");
      
  }
     ///////////////zero - Value////////////////////////
    if(patt_MultipleT.test(res)){
     //console.log("MultipleT");
     res = res.replace(patt_MultipleT, "*");
    }
    if(patt_MultipleC.test(res)){
    //console.log("MultipleC");
    res = res.replace(patt_MultipleC, "*");
    }

    if(patt_Divide.test(res)){
    //console.log("Divide");
    res = res.replace(patt_Divide, "/");
    }
    if(patt_NotEqual.test(res)){
      //  console.log("NotEqual");
        res = res.replace(patt_NotEqual, "/=");
   
    }
    if(patt_PlusMinus.test(res)){
       // console.log("PlusMinus");
        res = res.replace(patt_PlusMinus, "+/-");
    }
    if(patt_MinusPlus.test(res)){
       // console.log("MinusPlus");
        res = res.replace(patt_MinusPlus, "-/+");
    }
    if(patt_GreatherThan.test(res)){
     //   console.log("GreatherThan");
        res = res.replace(patt_GreatherThan,">=");
       
    }
    if(patt_LeatherThan.test(res)){
      //  console.log("LeatherThan");
        res = res.replace(patt_LeatherThan, "<=");
    
    }
    
    ///////////////1 st  Value////////////////////////
    if(patt_Parentheses.test(res)){
        
        res.replace(patt_Parentheses,'$1');
        var s1 = RegExp.$1;

        console.log(s1);
        console.log("----------------------------------");
        res = res.replace(patt_Parentheses, "("+s1+")");
        return parseTree(res);
    }
    if(patt_Set.test(res)){
      //  console.log("Set");
        res.replace(patt_Set,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_Set, "{"+s1+"}");
        return parseTree(res);
    }
    if(patt_List.test(res)){
      //  console.log("List");
        res.replace(patt_List,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_List, "["+s1+"]");
        return parseTree(res);
    }
    if(patt_SquareRoot.test(res)){
     //   console.log("SquareRoot");
        res.replace(patt_SquareRoot,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_SquareRoot, "sqrt("+s1+")");
        return parseTree(res);
    }
    if(patt_Sin.test(res)){
      //  console.log("Sin");
        res.replace(patt_Sin,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_Sin, "sin("+s1+")");
        return parseTree(res);
    }
    if(patt_Cos.test(res)){
      //  console.log("Cos");
        res.replace(patt_Cos,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_Cos, "cos("+s1+")");
        return parseTree(res);
    }
    if(patt_Tan.test(res)){
    //    console.log("Sin");
        res.replace(patt_Tan,'$1');
        var s1 = RegExp.$1;
        res = res.replace(patt_Tan, "tan("+s1+")");
        return parseTree(res);
    }
   
   ///////////////2 nd  Value////////////////////////
   if(patt_SquareRootN.test(res)){
    //console.log("SquareRootN");
    res.replace(patt_SquareRootN,'$2, $1');
    var s1 = RegExp.$1;
    var s2 = RegExp.$2;
    res = res.replace(patt_SquareRootN, "root("+s2+","+s1+")");
    return parseTree(res);
}


    if(patt_Fraction.test(res)){
    //console.log("Fraction");
    res.replace(patt_Fraction,'$2, $1');
    var s1 = RegExp.$1;
    var s2 = RegExp.$2;
    console.log("-----------------------------");
    console.log(s1 +":"+s2);
    res = res.replace(patt_Fraction, "("+"("+s1+")"+"/"+"("+s2+")"+")");
    return parseTree(res);
    }
     if(patt_Expo.test(res)){
      //  console.log("Expo");
        res.replace(patt_Expo,'$2, $1');
        var s1 = RegExp.$1;
        var s2 = RegExp.$2;
        console.log("-----------------------------");
        console.log(s1+":"+s2);
        res = res.replace(patt_Expo, s1+"^"+"("+s2+")");
        return parseTree(res);
    }
   
    
    
    if(patt_NumberAndVariable.test(res)){
        //console.log("NumberAndVariable");
        res.replace(patt_NumberAndVariable,'$2, $1');
        var s1 = RegExp.$1;
        var s2 = RegExp.$2;
        res = res.replace(patt_NumberAndVariable, s1+"*"+s2);
        return parseTree(res);
    }
  
  
  return res;
}
function myFunction() {
    var str = document.getElementById("textbox1").value;
    var str_Variable = str.match(patt_Variable);
    var str_Literal = str.match(patt_Literal);
    var str_Constant = str.match(patt_Constant);

    var arr_Literal= [];

     
    var tree = parseTree(str);
    console.log(tree);

}

