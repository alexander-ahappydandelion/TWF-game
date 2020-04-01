class FormulasGenerator {
    constructor() {
        this.counts = 1;
        this.expr = "(A|B)&(C->D)";
        this.correctSubs = [
            {
                origin: "A|B",
                target: "B|A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&B",
                target: "B&A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A|(B|C)",
                target: "A|B|C",
                hit: -139,
                pass: 6
            },
            {
                origin: "A|B|C",
                target: "A|(B|C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&(B&C)",
                target: "A&B&C",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&B&C",
                target: "A&(B&C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "(A|B)|C",
                target: "A|B|C",
                hit: -139,
                pass: 6
            },
            {
                origin: "A|B|C",
                target: "(A|B)|C",
                hit: -139,
                pass: 6
            },
            {
                origin: "(A&B)&C",
                target: "A&B&C",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&B&C",
                target: "(A&B)&C",
                hit: -139,
                pass: 6
            },
            {
                origin: "A|(B&C)",
                target: "(A|B)&(A|C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "(A|B)&(A|C)",
                target: "A|(B&C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&(B|C)",
                target: "(A&B)|(A&C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "(A&B)|(A&C)",
                target: "A&(B|C)",
                hit: -139,
                pass: 6
            },
            {
                origin: "!(A&B)",
                target: "!A|!B",
                hit: -139,
                pass: 6
            },
            {
                origin: "!A|!B",
                target: "!(A&B)",
                hit: -139,
                pass: 6
            },
            {
                origin: "!(A|B)",
                target: "!A&!B",
                hit: -139,
                pass: 6
            },
            {
                origin: "!A&!B",
                target: "!(A|B)",
                hit: -139,
                pass: 6
            },
            {
                origin: "!A|B",
                target: "A->B",
                hit: -139,
                pass: 6
            },
            {
                origin: "A->B",
                target: "!A|B",
                hit: -139,
                pass: 6
            },
            {
                origin: "!(!(A))",
                target: "A",
                hit: -139,
                pass: 6
            },
            // {
            //     origin: "A",
            //     target: "!(!(A))"
            // },
            // {
            //     origin: "A",
            //     target: "!!A"
            // },
            // {
            //     origin: "!!A",
            //     target: "A"
            // },
            {
                origin: "A|(A&B)",
                target: "A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A",
                target: "A|(A&B)",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&(A|B)",
                target: "A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A",
                target: "A&(A|B)",
                hit: -139,
                pass: 6
            },
            {
                origin: "A|A",
                target: "A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A",
                target: "A|A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A&A",
                target: "A",
                hit: -139,
                pass: 6
            },
            {
                origin: "A",
                target: "A&A",
                hit: -139,
                pass: 6
            }
        ];
        this.wrongSubs = [
            {
                origin: "C|D",
                target: "D|C"
            },
            {
                origin: "D|C",
                target: "C|D"
            }
        ];
    }

    getNext() {
        let isCorrect = this.isNextFormulaCorrect();
        // this.expr = this.getNextExpression(isCorrect);
        this.counts += 1;

        // return {
        //     "expr": this.expr,
        //     "isCorrect": isCorrect
        // }
        // return encodeURI(this.expr.replace("&", encodeURIComponent("&")));
        return {
            'label': 'sf' + this.counts,
            "text": '' + this.counts++,
            "isCorrect": isCorrect,
            "hitScore": isCorrect ? -239 : 239,
            "passScore": isCorrect ? 6 : -239
        };
    }


    isNextFormulaCorrect() {
        return Math.random() < 0.5;
        // return true;
    }

    getNextExpression(isCorrect) {
        return isCorrect ? this.getNextCorrectExpression()
            : this.getNextWrongExpression();
    }

    getNextCorrectExpression() {
        let nextExpr = this.expr;

        // check if we've got the same formula
        while (nextExpr === this.expr) {
            let sub = this.getNextApplicableSubstitutionFrom(this.correctSubs);
            nextExpr = this.applySubInRandomPlace(this.expr, sub);
        }

        return nextExpr;
    }

    getNextWrongExpression() {
        let nextExpr = this.expr;

        // todo: replace the dummy condition with api method
        while (nextExpr === this.expr) {
            let sub = this.getNextApplicableSubstitutionFrom(this.wrongSubs);
            nextExpr = this.applySubInRandomPlace(this.expr, sub);
        }

        return nextExpr;
    }

    // assumption: subs is an array of substitutions, and has at least one applicable sub
    getNextApplicableSubstitutionFrom(subs) {
        let sub = this.getRandomElemOf(subs);
        while (!this.isApplicableSubstitution(this.expr, sub)) {
            sub = this.getRandomElemOf(subs);
        }
        return sub;
    }

    applySub(expr, sub, place) {
        return TWF.api.applyExpressionBySubstitutionPlaceCoordinates(expr, sub.origin, sub.target,
            place.parentStartPosition, place.parentEndPosition,
            place.startPosition, place.endPosition,
            "setTheory")
    }

    // assumption: @sub is an applicable sub for @epxr
    applySubInRandomPlace(expr, sub) {
        let places = this.getSubsPlacesFor(expr, sub);
        return this.applySub(expr, sub, this.getRandomElemOf(places));
    }

    isApplicableSubstitution(expr, sub) {
        let subs = this.getSubsPlacesFor(expr, sub);
        return subs.length > 0
    }

    getSubsPlacesFor(expr, sub) {
        let placesJSON = TWF.api.findSubstitutionPlacesCoordinatesInExpressionJSON(expr, sub.origin, sub.target, "setTheory");
        let substitutionPlaces = (JSON.parse(placesJSON)).substitutionPlaces;
        substitutionPlaces.forEach((subPlaces) => {
            for (let place in subPlaces) {
                subPlaces[place] = parseInt(subPlaces[place]);
            }
        });
        // substitutionPlaces = substitutionPlaces.filter((subPlaces) => {
        //     return subPlaces.endPosition - subPlaces.startPosition <= sub.origin.length + 2
        // });
        // console.log("I was here 11")
        return substitutionPlaces
    }

    getNextSubstitution() {
        return this.getRandomElemOf(this.subs);
    }

    getRandomElemOf(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

}

var generator = new FormulasGenerator();

onmessage = function(event) {
    console.log('data received from main thread');

    var generatedFormulas = []
    for (let i = 0; i < 10; ++i) {
        generatedFormulas.push(generator.getNext());
    }

    postMessage(generatedFormulas)
};