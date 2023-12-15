const content = document.querySelector("#scoreboard");

const overallButton = document.querySelector("#overall");
const forestSideButton = document.querySelector("#forestSide");
const underTheSeaButton = document.querySelector("#under-the-sea");

// Change the content of the scoreboard to the overall scoreboard
window.onload = function () {
  changeContent();
};

/**
 * Formats the given time in milliseconds to a string representation in the format "mm:ss".
 * @param {number} ms - The time in milliseconds.
 * @returns {string} The formatted time string.
 */
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}:${String(ms % 1000).padStart(3, "0")}`;
}

/**
 * Calculates the overall score and rank for each player based on their scores.
 * @param {Array} scores - An array of player scores.
 * @returns {Array} - An array of player scores with added rank.
 */
function calculateOverallScore(scores) {
  scores.sort((a, b) => {
    if (b.overallScore !== a.overallScore) {
      return b.overallScore - a.overallScore;
    }

    return a.overallTime - b.overallTime;
  });

  let rank = 1;
  let overallScores = scores.map((score, index) => {
    if (index > 0 && score.overallScore !== scores[index - 1].overallScore) {
      rank += 1;
    }

    return {
      ...score,
      rank,
    };
  });

  return overallScores;
}

/**
 * Sorts an array of scores by score1 in descending order and assigns a rank to each score.
 * @param {Array} scores - The array of scores to be sorted.
 * @returns {Array} - The sorted array of scores with rankScore1 assigned to each score.
 */
function sortByScore2(scores) {
  scores.sort((a, b) => b.score2 - a.score2);

  let rank = 1;
  let scoresByScore2 = scores.map((score, index) => {
    if (index > 0 && score.score1 !== scores[index - 1].score1) {
      rank += 1;
    }

    return {
      ...score,
      rankScore2: rank,
    };
  });

  return scoresByScore2;
}

/**
 * Sorts an array of scores by score1 in descending order and assigns a rank to each score based on score1.
 * @param {Array} scores - The array of scores to be sorted.
 * @returns {Array} - The sorted array of scores with rankScore1 assigned to each score.
 */
function sortByScore1(scores) {
  scores.sort((a, b) => b.score1 - a.score1);

  let rank = 1;
  let scoresByScore1 = scores.map((score, index) => {
    if (index > 0 && score.score1 !== scores[index - 1].score1) {
      rank += 1;
    }

    return {
      ...score,
      rankScore1: rank,
    };
  });

  return scoresByScore1;
}

/**
 * Changes the content of the scoreboard based on the button clicked.
 * @param {string} clicked_id - The id of the button that was clicked.
 */
function changeContent(clicked_id = "overall") {
  const data = localStorage.getItem("scores");
  // ensure that the score does not have anything
  content.innerHTML = "";

  let parseData = JSON.parse(data);

  const scoresWithOverall = parseData.map((score) => {
    const overallScore = 0.5 * score.score1 + 0.3 * score.score2;
    const overallTime = score.time1 + score.time2;

    return {
      ...score,
      overallScore,
      overallTime,
    };
  });

  const scoresWithRankScore1 = sortByScore1(scoresWithOverall);

  const scoresWithRankScore2 = sortByScore2(scoresWithRankScore1);

  const rankedScores = calculateOverallScore(scoresWithOverall);

  console.log(rankedScores);

  // Remove basis-1/3 class from all buttons except the clicked one
  if (clicked_id === "overall") {
    overallButton.classList.add("basis-1/2", "text-white", "bg-black/50");
    forestSideButton.classList.remove("basis-1/2", "text-white", "bg-black/50");
    underTheSeaButton.classList.remove(
      "basis-1/2",
      "text-white",
      "bg-black/50"
    );
  } else if (clicked_id === "forestSide") {
    overallButton.classList.remove("basis-1/2", "text-white", "bg-black/50");
    forestSideButton.classList.add("basis-1/2", "text-white", "bg-black/50");
    underTheSeaButton.classList.remove(
      "basis-1/2",
      "text-white",
      "bg-black/50"
    );
  } else if (clicked_id === "under-the-sea") {
    overallButton.classList.remove("basis-1/2", "text-white", "bg-black/50");
    underTheSeaButton.classList.add("basis-1/2", "text-white", "bg-black/50");
    forestSideButton.classList.remove("basis-1/2", "text-white", "bg-black/50");
  }

  if (clicked_id == "overall") {
    rankedScores.forEach((element) => {
      let row = ` <tr class="h-16">
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                           ${element.rank}
                        </th>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.user}
                        </th>
                        <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                            ${element.overallScore}
                        </td>
                        <td class="px-6 py-4 text-white text-center">
                            ${formatTime(element.overallTime)}
                        </td>
                    </tr>
        `;
      content.innerHTML += row;
    });
  } else if (clicked_id == "forestSide") {
    scoresWithRankScore1.forEach((element) => {
      let row = ` <tr class="h-16">
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.rankScore1}
                        </th>
                        <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                            ${element.user}
                        </th>
                        <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                            ${element.score1}
                        </td>
                        <td class="px-6 py-4 text-white text-center">
                            ${formatTime(element.time1)}
                        </td>
                    </tr>
        `;
      content.innerHTML += row;
    });
  } else {
    scoresWithRankScore2.forEach((element) => {
      let row = ` <tr class="h-16"> 
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.rankScore2}
            </th>
            <th scope="row" class="border-r-2 border-white px-6 py-4 font-medium whitespace-nowrap text-white text-center">
                ${element.user}
            </th>
            <td class="border-r-2 border-white px-6 py-4 text-white text-center">
                ${element.score2}
            </td>
            <td class="px-6 py-4 text-white text-center">
                ${formatTime(element.time2)}
            </td>
        </tr>
        `;
      content.innerHTML += row;
    });
  }
}

overallButton.onclick = function () {
  changeContent("overall");
};
forestSideButton.onclick = function () {
  changeContent("forestSide");
};
underTheSeaButton.onclick = function () {
  changeContent("under-the-sea");
};
