
var gridContent = [];


function start()
{
  showGrid();
  var inputs = document.querySelectorAll("input");

  for (var i = 0; i <inputs.length; i++)
  {
    inputs[i].onchange = updateGrid;
  }


  loadJSON(loadGrid);
}
function showGrid()
{
    var grid = document.getElementById("grid");
    var cpt = 0;
    for (var i = 0; i < 9; i++)
    {
      gridContent[i] =  [];
      for (var j = 0; j < 9; j++)
      {
        var number = document.createElement("div");
        number.classList.add("number_cellule");


        var input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("value", j+1);
        input.setAttribute("pos",cpt);
        number.appendChild(input);

        gridContent[i][j] = (j+1).toString();
        grid.appendChild(number);
        cpt++;
      }
      grid.appendChild( document.createElement("br"));
    }
}
function updateGrid(event)
{
  var i = Math.trunc(event.target.getAttribute("pos") / 9);
  var j = event.target.getAttribute("pos") % 9;
  var val = event.target.value;

  gridContent[i][j] = val;
  var res = checkLine(i);
  console.log( " line : "  + res);
  res = checkColumn(j);
  console.log( " column : "  + res);
  res = checkBlock(4);
  console.log( " block : "  + res);

}
function checkLine(i)
{
  var line = gridContent[i];
  var isPresent = ['','','','','','','','',''];
  var lineOk = true;
  var j = 0;
  while(j < line.length && lineOk == true)
  {
    var value = parseInt(line[j])-1;
    if(isPresent[value] == '')
    {
      isPresent[value] = '-'
    }else
    {
      lineOk = false;
    }
    j++;
  }
  return lineOk;
}
function checkColumn(j)
{
  var isPresent = ['','','','','','','','',''];
  var columnOk = true;
  var i = 0;
  while(i < 9 && columnOk == true)
  {
    var value = parseInt(gridContent[i][j])-1;
    if(isPresent[value] == '')
    {
      isPresent[value] = '-'
    }else
    {
      columnOk = false;
    }
    i++;
  }
  return columnOk;
}

/*
_______
|0|1|2|
_______
|3|4|5|
_______
|6|7|8|
_____
*/
function checkBlock(i)
{
  var iMin;
  var iMax;
  var jMin;
  var jMax;

  if(i== 0 || i == 1 || i == 2 )// 1ere ligne
  {
    iMin = 0; iMax = 2;
    if(i == 0)
    {
      jMin = 0; jMax = 2;
    }else if( i == 1)
    {
      jMin = 3; jMax = 5;
    }else
    {
      jMin = 6; jMax = 8;
    }
  }
  else if(i== 3 || i == 4 || i == 5 )//2eme ligne
  {
    iMin = 3; iMax = 5;
    if(i == 3)
    {
      jMin = 0; jMax = 2;
    }else if( i == 4)
    {
      jMin = 3; jMax = 5;
    }else
    {
      jMin = 6; jMax = 8;
    }
  }
  else // 3 eme ligne
  {
    iMin = 6; iMax = 8;
    if(i == 6)
    {
      jMin = 0; jMax = 2;
    }else if( i == 7)
    {
      jMin = 3; jMax = 5;
    }else
    {
      jMin = 6; jMax = 8;
    }
  }


  var isPresent = ['','','','','','','','',''];
  var blockOk = true;
  var i =  iMin;


  while(i <= iMax && blockOk == true)
  {
    var j = jMin;
    while( j <= jMax && blockOk == true)
    {
      var val = parseInt(gridContent[i][j]);
      if(isPresent[val-1] == '')
      {
        isPresent[val-1] = '-';
      }else
      {
          blockOk = false;
      }
      j++;
    }
    i++;
  }

  return blockOk;

}

function loadGrid(data)
{
  var obj = JSON.parse(data);
}

function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
   xobj.open('GET', 'grid.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}
