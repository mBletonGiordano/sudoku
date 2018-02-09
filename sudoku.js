function start()
{
  showGrid();


}

function showGrid()
{
    var gridContent = [];
    var val =1;
    var grid = document.getElementById('grid');

    for (var i = 0; i < 9; i++)
    {
      gridContent[i] =  [];
      var rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      rowDiv.id = "row_".concat(i);

      for (var j = 0; j < 9; j++)
      {
        var number = document.createElement("div");
        number.classList.add("number");
        number.id = "number_".concat(i).concat(j);

        number.innerHTML += val;

        gridContent[i][j] = val;
        val++;

        rowDiv.appendChild(number);
      }

      grid.appendChild(rowDiv);




    }
    console.log(gridContent);
}
