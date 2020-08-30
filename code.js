function generatelevel_initial() {
    level = [];
    for (i = 0; i < 100; i++) {
        level.push([]);
        for (j = 0; j < 100; j++) {
            // fill every cell with either water or land, based on a random number
            if (Math.floor(Math.random() * 100) > 35) {
                level[i].push("water");
            }
            else {
                level[i].push("land");
            }
        }
    }
    return level;
}

function smoothing(inputlevel) {
    level = inputlevel;
    for (i = 0; i < 100; i++) {
        for (j = 0; j < 100; j++) {
            if (i == 0 || i == 99 || j == 0 || j == 99) {
                level[i][j] = "water"; // make the edges water
            }
            else {
                // count the bordering cells
                bordering_waters = 0;
                bordering_lands = 0;
                for (r = i - 1; r <= i + 1; r++) {
                    for (c = j - 1; c <= j + 1; c++) {
                        if (r != i || c != j) {
                            if (level[r][c] == "water") {
                                bordering_waters++;
                            }
                            else {
                                bordering_lands++;
                            }
                        }
                    }
                }
                // use data to fill in center cell
                if (bordering_waters > 4) {
                    level[i][j] = "water";
                }
                else {
                    level[i][j] = "land";
                }
            }
        }
    }
    return level;
}

function createEmptyTable() {
    tilegrid = document.createElement("table");
    tilegrid_tbody = document.createElement("tbody");
    tilegrid.style.borderSpacing = "0";
    tilegrid.style.tableLayout = "fixed";
    for (r = 0; r < 100; r++) {
        row = document.createElement("tr");
        for (c = 0; c < 100; c++) {
            cell = document.createElement("td");
            cell.style.backgroundColor = "white";
            cell.style.width = "5px";
            cell.style.height = "5px";
            cell.style.padding = "0";
            row.appendChild(cell);
        }
        tilegrid_tbody.appendChild(row);
    }
    tilegrid.appendChild(tilegrid_tbody);
    document.body.appendChild(tilegrid);
    return tilegrid;
}

function fillTable(table_element, grid_data) {
    for (i = 0; i < 100; i++) {
        for (j = 0; j < 100; j++) {
            if (grid_data[i][j] == "water") {
                table_element.rows[i].cells[j].style.backgroundColor = "#224488";
            }
            else {
                table_element.rows[i].cells[j].style.backgroundColor = "#229922";
            }
        }
    }
}

level = generatelevel_initial();
table = createEmptyTable();
fillTable(table, level);
cycles = 0;

function main() {
    level = smoothing(level);
    fillTable(table, level);
    if (cycles < 7) {
        setTimeout(main, 500);
    }
    cycles++;
}

setTimeout(main, 500);