(function () {
    // console.log($);

    var currentPlayer = "player1";
    $(".checker-blue").addClass("indicator");

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.children();
        // var slotsInRow = $(".row" + i);
        var piece = $(".piece");
        // var i;

        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                // lowest empty slot found!

                piece.addClass(currentPlayer);
                piece.addClass("checker");
                piece.css({
                    visibility: "visible",
                    top: 0,
                    left: col.position().left + "px",
                });
                piece.animate(
                    { top: slotsInColumn.eq(i).position().top + "px" },
                    500,
                    function () {
                        slotsInColumn.eq(i).addClass(currentPlayer);
                        piece.css({ visibility: "hidden" });
                        piece.removeClass(currentPlayer);
                        piece.removeClass("checker");

                        var slotsInRow = $(".row" + i);

                        if (i < 0) {
                            return;
                        } // to stop changing players if the column is full

                        // check for victory

                        if (checkForVictory(slotsInColumn)) {
                            // if i get here it means there has been a column victory
                            // do the victory dance
                            // console.log(currentPlayer + " wins!");

                            $("#winner").html(currentPlayer + " wins!");
                            $("#win-modal").css({
                                visibility: "visible",
                            });
                            $("#play-again").on("click", function () {
                                window.location.reload();
                            });
                        } else if (checkForVictory(slotsInRow)) {
                            // do the victory dance
                            // console.log(currentPlayer + " wins!");

                            $("#winner").html(currentPlayer + " wins!");
                            $("#win-modal").css({
                                visibility: "visible",
                            });
                            $("#play-again").on("click", function () {
                                window.location.reload();
                            });
                        } else if (checkDiagonalVictory()) {
                            // if there is a victory, show the victory extravaganza
                            // if there is no victory, switch players
                            // console.log(currentPlayer + " wins!");

                            $("#winner").html(currentPlayer + " wins!");
                            $("#win-modal").css({
                                visibility: "visible",
                            });
                            $("#play-again").on("click", function () {
                                window.location.reload();
                            });
                        }

                        switchPlayer();
                    }
                );

                break; // to stop the loop, it ends the loop and doesn't produce a value
            }
        }
    });

    function checkForVictory(slotsToCheck) {
        var count = 0;
        for (var i = 0; i < slotsToCheck.length; i++) {
            if (slotsToCheck.eq(i).hasClass(currentPlayer)) {
                // this means we found a slot with current player
                count++;
                if (count == 4) {
                    return true; // current player won
                }
            } else {
                count = 0;
            }
        }
    }

    var slots = $(".slot");

    var slotsDiagonal = [
        [slots.eq(0), slots.eq(7), slots.eq(14), slots.eq(21)],
        [slots.eq(7), slots.eq(14), slots.eq(21), slots.eq(28)],
        [slots.eq(14), slots.eq(21), slots.eq(28), slots.eq(35)],
        [slots.eq(1), slots.eq(8), slots.eq(15), slots.eq(22)],
        [slots.eq(8), slots.eq(15), slots.eq(22), slots.eq(29)],
        [slots.eq(2), slots.eq(9), slots.eq(16), slots.eq(23)],
        [slots.eq(3), slots.eq(8), slots.eq(13), slots.eq(18)],
        [slots.eq(4), slots.eq(9), slots.eq(14), slots.eq(19)],
        [slots.eq(9), slots.eq(14), slots.eq(19), slots.eq(24)],
        [slots.eq(5), slots.eq(10), slots.eq(15), slots.eq(20)],
        [slots.eq(10), slots.eq(15), slots.eq(20), slots.eq(25)],
        [slots.eq(15), slots.eq(20), slots.eq(25), slots.eq(30)],
        [slots.eq(6), slots.eq(13), slots.eq(20), slots.eq(27)],
        [slots.eq(13), slots.eq(20), slots.eq(27), slots.eq(34)],
        [slots.eq(20), slots.eq(27), slots.eq(34), slots.eq(41)],
        [slots.eq(12), slots.eq(19), slots.eq(26), slots.eq(33)],
        [slots.eq(19), slots.eq(26), slots.eq(33), slots.eq(40)],
        [slots.eq(18), slots.eq(25), slots.eq(32), slots.eq(39)],
        [slots.eq(11), slots.eq(16), slots.eq(21), slots.eq(26)],
        [slots.eq(16), slots.eq(21), slots.eq(26), slots.eq(31)],
        [slots.eq(21), slots.eq(26), slots.eq(31), slots.eq(36)],
        [slots.eq(17), slots.eq(22), slots.eq(27), slots.eq(32)],
        [slots.eq(22), slots.eq(27), slots.eq(32), slots.eq(37)],
        [slots.eq(23), slots.eq(28), slots.eq(33), slots.eq(38)],
    ];

    function checkDiagonalVictory() {
        var count = 0;
        for (var i = 0; i < slotsDiagonal.length; i++) {
            count = 0;
            for (var j = 0; j < 4; j++) {
                if (slotsDiagonal[i][j].hasClass(currentPlayer)) {
                    count++;
                    if (count >= 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }

            // console.log("count: ", count);
        }
    }

    function switchPlayer() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
            $(".checker-blue").removeClass("indicator");
            $(".checker-red").addClass("indicator");
            // console.log("currentPlayer: ", currentPlayer);
        } else {
            currentPlayer = "player1";
            $(".checker-blue").addClass("indicator");
            $(".checker-red").removeClass("indicator");
            // console.log("currentPlayer: ", currentPlayer);
        }
    }

    ///////////////////// CLICK EVENTS /////////////////////

    // var restart = $("#restart");

    // restart.on("click", function () {
    //     // console.log("restart score was clicked");
    //     location.reload(true);
    // });

    $("#rules").on("click", function () {
        // console.log("rules tab was clicked");

        $("#rules-modal").removeClass("animate__animated animate__bounceOutUp");
        $("#rules-modal").addClass("animate__animated animate__bounceInDown");
        $("#rules-modal").css({
            visibility: "visible",
        });
    });

    $("#go-back").on("click", function (e) {
        // $("#rules-modal").css({
        //     visibility: "hidden",
        // });
        $("#rules-modal").removeClass(
            "animate__animated animate__bounceInDown"
        );
        $("#rules-modal").addClass("animate__animated animate__bounceOutUp");
    });
})();

// location.replace(); location.reload(); - esse! pesquisar sobre location object
// checar com loop o tabuleiro inteiro e pra cada slot ocupado por uma pecinha checar tres colunas (uma de cada vez) acima e tres fileiras acima
