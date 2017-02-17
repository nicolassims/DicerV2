/*  AUTHOR: Nicolas Sims
 *  VERSION: 2.4.7
 *  CREATED: 1/9/2017
 *  PURPOSE: Create a dice roller
 */

'use strict';

class main {
    constructor() {
        serviceWorkers.loadServiceWorker();
        setValues.readyApp();
        performFunction.rollDice();
    }
}



class setValues {
    static readyApp() {
        document.getElementById("defaultTypeDice").checked = true;
        document.getElementById("defaultTypeResults").checked = true;
        document.getElementById("numberDice").value = 1;
    }
}

class performFunction {
    static rollDice() {
        const SECONDANSWERS = document.forms['theSecondForm'].elements['typeResults'];
        const ANSWERS = document.forms['theForm'].elements['typeDice'];
        let results = [];
        let result = 0;
        document.getElementById("button").addEventListener("click", () => {
            document.getElementById("diceResults").value = '';
            for (let i = 0; i < ANSWERS.length; i++) {
                if (ANSWERS[i].checked == true) {
                    for (let j = 0; j < Number(document.getElementById("numberDice").value); j++) {
                        results[j] = Math.floor((Math.random() * ANSWERS[i].value) + 1);
                    }
                    if (SECONDANSWERS[0].checked == true) {
                        for (let i = 0; i < results.length; i++) {
                            result += results[i];
                        }
                        document.getElementById("diceResults").value = String(result);
                        result = 0;
                    } else {
                        for (let i = 0; i < results.length; i++) {
                            if (i < results.length - 1) {
                                document.getElementById("diceResults").value += results[i] + ', '
                            } else {
                                document.getElementById("diceResults").value += results[i]
                            }
                        }
                    }
                }
            }
        }, false);
    }
}

window.onload = function() {
    new main();
};