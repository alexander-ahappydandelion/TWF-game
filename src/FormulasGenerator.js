class FormulasGenerator {
    constructor(initialExpr) {
        this.count = 0;
        this.limit = 100;

        // this.expr = "(A|B)&(C->D)";
        this.expr = initialExpr;
        this.isCorrect = true;


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

    hasNext() {
        return this.count < this.limit;
    }

    getNext() {
        this.count += 1;

        this.prevExpr = this.expr;
        this.prevIsCorrect = this.isCorrect;

        this.isCorrect = this.isNextFormulaCorrect();
        this.expr = this.getNextExpression(this.isCorrect);

        // return {
        //     "expr": this.expr,
        //     "isCorrect": isCorrect
        // }
        // return encodeURI(this.expr.replace("&", encodeURIComponent("&")));
        return {
            'label': 'fm' + this.prevExpr,
            "tex": '' + this.prevExpr,
            "isCorrect": this.prevIsCorrect,
            "hitScore": this.prevIsCorrect ? -239 : 239,
            "passScore": this.prevIsCorrect ? 6 : -239
        };
    }


    isNextFormulaCorrect() {
        return Math.random() < 0.5;
        // return true;
    }

    getNextExpression(isCorrect) {
        return isCorrect ? this.getNextExpressionOf(this.correctSubs)
                         : this.getNextExpressionOf(this.wrongSubs);
    }

    getNextExpressionOf(subs) {
        // let nextExpr = this.expr;

        // check if we've got the same formula
        // while (nextExpr === this.expr) {
        //     let sub = this.getNextApplicableSubstitutionFrom(this.correctSubs);
        //     nextExpr = this.applySubInRandomPlace(this.expr, sub);
        // }

        this.shuffle(subs);

        let applicableSub = undefined;
        for (let sub of subs) {
            if (this.isApplicableSubstitution(this.expr, sub)) {
                applicableSub = sub;
                break;
            }
        }

        return this.applySubInRandomPlace(this.expr, applicableSub);
    }

    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
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