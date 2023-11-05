import data from "../dummy.json" assert { type: "json" };

const content = document.querySelector("#scoreboard");
const dummy = data["data"];

const overallButton = document.querySelector("#overall");
const cityStreetButton = document.querySelector("#city-street");
const forestSideButton = document.querySelector("#forest-side");
const underTheSeaButton = document.querySelector("#under-the-sea");

/*
* Sorts the data by overall score and adds a rank property to each player object.
* Sorts the data by score1 and adds a rank1 property to each player object.
* Sorts the data by score2 and adds a rank2 property to each player object.
* Sorts the data by score3 and adds a rank3 property to each player object.
*/

// Overall Score 
dummy.sort((a, b) => b.overallScore - a.overallScore);
dummy.forEach((player, index) => {
    player.rank = index + 1;
});

// Score 1
dummy.sort((a, b) => b.score1 - a.score1);
dummy.forEach((player, index) => {
    player.rank1 = index + 1;
});

// Score 2
dummy.sort((a, b) => b.score2 - a.score2);
dummy.forEach((player, index) => {
    player.rank2 = index + 1;
});

// Score 3
dummy.sort((a, b) => b.score3 - a.score3);
dummy.forEach((player, index) => {
    player.rank3 = index + 1;
});

// Change the content of the scoreboard to the overall scoreboard
window.onload = function() {
    changeContent(); 
}

/**
 * Changes the content of the scoreboard based on the button clicked.
 * @param {string} clicked_id - The id of the button that was clicked.
 */
function changeContent(clicked_id = "overall") {
    // ensure that the score does not have anything
    console.log(clicked_id);
    content.innerHTML = "";

    // Remove basis-1/3 class from all buttons except the clicked one
    if (clicked_id === "overall") {
        overallButton.classList.add("basis-1/3", "text-white","bg-black/50");
        cityStreetButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        forestSideButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        underTheSeaButton.classList.remove("basis-1/3", "text-white","bg-black/50");
    } else if (clicked_id === "city-street") {
        overallButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        cityStreetButton.classList.add("basis-1/3", "text-white","bg-black/50");
        forestSideButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        underTheSeaButton.classList.remove("basis-1/3", "text-white","bg-black/50");
    } else if (clicked_id === "forest-side") {
        overallButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        cityStreetButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        forestSideButton.classList.add("basis-1/3", "text-white","bg-black/50");
        underTheSeaButton.classList.remove("basis-1/3", "text-white","bg-black/50");
    } else if (clicked_id === "under-the-sea") {
        overallButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        cityStreetButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        forestSideButton.classList.remove("basis-1/3", "text-white","bg-black/50");
        underTheSeaButton.classList.add("basis-1/3", "text-white","bg-black/50");
    }

    if (clicked_id == "overall") {
        dummy.forEach((element) => {
            let row = ` <tr>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.rank}
                        </th>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.username}
                        </th>
                        <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                            ${element.overallScore}
                        </td>
                        <td class="px-6 py-4 text-white text-center">
                            ${element.overallTime}
                        </td>
                    </tr>
        `
            content.innerHTML += row;

        })
    }
    else if(clicked_id == "city-street") {
        dummy.forEach((element) => {
            let row = ` <tr>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.rank1}
                        </th>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.username}
                        </th>
                        <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                            ${element.score1}
                        </td>
                        <td class="px-6 py-4 text-white text-center">
                            ${element.time1}
                        </td>
                    </tr>
        `
            content.innerHTML += row;

        })
        
    }
    else if(clicked_id == "forest-side") {
        dummy.forEach((element) => {
            let row = ` <tr>
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.rank2}
            </th>
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.username}
            </th>
            <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                ${element.score2}
            </td>
            <td class="px-6 py-4 text-white text-center">
                ${element.time2}
            </td>
        </tr>
        `
            content.innerHTML += row;
        })
    }

    else {
        dummy.forEach((element) => {
            let row = ` <tr>
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.rank3}
            </th>
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.username}
            </th>
            <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                ${element.score3}
            </td>
            <td class="px-6 py-4 text-white text-center">
                ${element.time3}
            </td>
        </tr>
        `
            content.innerHTML += row;
        })
    }
}

overallButton.onclick = function (){changeContent("overall")};
cityStreetButton.onclick = function (){changeContent("city-street")};
forestSideButton.onclick = function (){changeContent("forest-side")};
underTheSeaButton.onclick = function (){changeContent("under-the-sea")};

