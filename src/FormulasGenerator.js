class FormulasGenerator {
    constructor(initialExpr) {
        this.count = 0;
        this.limit = 30;

        // this.expr = "(A|B)&(C->D)";
        this.expr = "A|B";
        // this.expr = initialExpr;
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
        this.correctSubs = [
            {
                origin: "A&(!A|B)",
                target: "A&B",
                hit: -239,
                pass: 6,
                len_diff: -5
            },
            {
                origin: "A|(B|C)",
                target: "A|B|C",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A|B|C",
                target: "A|(B|C)",
                hit: -239,
                pass: 6,
                len_diff: 2
            },
            {
                origin: "A&(B&C)",
                target: "A&B&C",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A&B&C",
                target: "A&(B&C)",
                hit: -239,
                pass: 6,
                len_diff: 2
            },
            {
                origin: "A&(B&C)",
                target: "(A&B)&C",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "(A|B)|C",
                target: "A|B|C",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A|B|C",
                target: "(A|B)|C",
                hit: -239,
                pass: 6,
                len_diff: 2
            },
            {
                origin: "(A&B)&C",
                target: "A&B&C",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A&B&C",
                target: "(A&B)&C",
                hit: -239,
                pass: 6,
                len_diff: 2
            },
            {
                origin: "A|(B&C)",
                target: "(A|B)&(A|C)",
                hit: -239,
                pass: 6,
                len_diff: 4
            },
            {
                origin: "(A|B)&(A|C)",
                target: "A|(B&C)",
                hit: -239,
                pass: 6,
                len_diff: -4
            },
            {
                origin: "A&(B|C)",
                target: "(A&B)|(A&C)",
                hit: -239,
                pass: 6,
                len_diff: 4
            },
            {
                origin: "(A&B)|(A&C)",
                target: "A&(B|C)",
                hit: -239,
                pass: 6,
                len_diff: -4
            },
            {
                origin: "!(A&B)",
                target: "!A|!B",
                hit: -239,
                pass: 6,
                len_diff: -1
            },
            {
                origin: "!(A&B)",
                target: "!(B&A)",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "!A|!B",
                target: "!(A&B)",
                hit: -239,
                pass: 6,
                len_diff: 1
            },
            {
                origin: "A|B",
                target: "!(!A&!B)",
                hit: -239,
                pass: 6,
                len_diff: 5
            },
            {
                origin: "A&B",
                target: "!(!A|!B)",
                hit: -239,
                pass: 6,
                len_diff: 5
            },
            {
                origin: "!(A|B)",
                target: "!A&!B",
                hit: -239,
                pass: 6,
                len_diff: -1
            },
            {
                origin: "!(A|B)",
                target: "!B&!A",
                hit: -239,
                pass: 6,
                len_diff: -1
            },
            {
                origin: "!(A|B)",
                target: "!(B|A)",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "!A&!B",
                target: "!(A|B)",
                hit: -239,
                pass: 6,
                len_diff: 1
            },
            {
                origin: "!A|B",
                target: "A->B",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "A->B",
                target: "!A|B",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "A&!B",
                target: "A\\B",
                hit: -239,
                pass: 6,
                len_diff: -1
            },
            {
                origin: "A\\B",
                target: "A&!B",
                hit: -239,
                pass: 6,
                len_diff: 1
            },
            {
                origin: "!(!A)",
                target: "A",
                hit: -239,
                pass: 6,
                len_diff: -4
            },
            {
                origin: "A&(A|B)",
                target: "A",
                hit: -239,
                pass: 6,
                len_diff: -6
            },
            {
                origin: "A|A",
                target: "A",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A&A",
                target: "A",
                hit: -239,
                pass: 6,
                len_diff: -2
            },
            {
                origin: "A&B",
                target: "B&A",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "A|B",
                target: "B|A",
                hit: -239,
                pass: 6,
                len_diff: 0
            },
            {
                origin: "A\\B",
                target: "!(B->A)",
                hit: -239,
                pass: 6,
                len_diff: 4
            },
            {
                origin: "!(B->A)",
                target: "A\\B",
                hit: -239,
                pass: 6,
                len_diff: -4
            },
            {
                origin: "B->A",
                target: "!(A\\B)",
                hit: -239,
                pass: 6,
                len_diff: 2
            },
            {
                origin: "!(A\\B)",
                target: "B->A",
                hit: -239,
                pass: 6,
                len_diff: -2
            }
        ];
        this.wrongSubs = [
            {
                origin: "!(A\\B)",
                target: "!B->A",
                hit: 239,
                pass: -239,
                len_diff: -1
            },
            {
                origin: "!(A\\B)",
                target: "B->!A",
                hit: 239,
                pass: -239,
                len_diff: -1
            },
            {
                origin: "B->A",
                target: "A\\!B",
                hit: 239,
                pass: -239,
                len_diff: 0
            },
            {
                origin: "B->A",
                target: "!A\\B",
                hit: 239,
                pass: -239,
                len_diff: 0
            },
            {
                origin: "!A&B",
                target: "A\\B",
                hit: 239,
                pass: -239,
                len_diff: 0
            },
            {
                origin: "A\\B",
                target: "!A&B",
                hit: 239,
                pass: -239,
                len_diff: 0
            },
            {
                origin: "!A&!B",
                target: "!(!A|!B)",
                hit: 239,
                pass: -239,
                len_diff: 3
            },
            {
                origin: "!(!A|!B)",
                target: "!A&!B",
                hit: 239,
                pass: -239,
                len_diff: -3
            },
            {
                origin: "!A|!B",
                target: "!(!A&!B)",
                hit: 239,
                pass: -239,
                len_diff: 3
            },
            {
                origin: "!(!A&!B)",
                target: "!A|!B",
                hit: 239,
                pass: -239,
                len_diff: -3
            },
            {
                origin: "A|!B",
                target: "A\\B",
                hit: 239,
                pass: -239,
                len_diff: -1
            },
            {
                origin: "A\\B",
                target: "A|!B",
                hit: 239,
                pass: -239,
                len_diff: 1
            },
            {
                origin: "A|B",
                target: "A->!B",
                hit: 239,
                pass: -239,
                len_diff: 2
            },
            {
                origin: "A->!B",
                target: "A|B",
                hit: 239,
                pass: -239,
                len_diff: -2
            },
            {
                origin: "!(!A)",
                target: "!A",
                hit: 239,
                pass: -239,
                len_diff: -4
            },
            {
                origin: "!A",
                target: "!(!A)",
                hit: 239,
                pass: -239,
                len_diff: 4
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
        return Math.random() < 0.85;
        // return true;
    }

    getNextExpression(isCorrect) {
        return isCorrect ? this.getNextExpressionOf(this.correctSubs)
                         : this.getNextExpressionOf(this.wrongSubs);
    }

    /**
     * if length of expr is small (< 8) it forces to lengthen expr
     * if length of expr is large (> 12) it forces to shorten expr
     * @param subs
     */
    getNextExpressionOf(subs) {
        let group1 = subs;
        let group2 = [];

        if (this.expr.length < 8)  {
            group1 = subs.filter( sub => 0 < sub.len_diff  );
            group2 = subs.filter( sub => sub.len_diff <= 0 );
        }

        if (12 < this.expr.length) {
            group1 = subs.filter( sub => sub.len_diff < 0 );
            group2 = subs.filter( sub => 0 <= sub.len_diff );
        }

        this.shuffle(group1);
        this.shuffle(group2);

        console.log("group1 len: " + group1.length);
        console.log("group2 len: " + group2.length);

        for (let sub of group1) {
            if (this.isApplicableSubstitution(this.expr, sub)) {
                return this.applySubInRandomPlace(this.expr, sub);
            }
        }

        for (let sub of group2) {
            if (this.isApplicableSubstitution(this.expr, sub)) {
                return this.applySubInRandomPlace(this.expr, sub);
            }
        }

        console.log("Error in getNexExprOf(subs): no applicable substitution was found");
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
            parseInt(place.parentStartPosition), parseInt(place.parentEndPosition),
            parseInt(place.startPosition), parseInt(place.endPosition),
            "setTheory")
    }

    // assumption: @sub is an applicable sub for @epxr
    applySubInRandomPlace(expr, sub) {
        let places = this.getSubsPlacesFor(expr, sub);
        return this.applySub(expr, sub, this.getRandomElemOf(places));
    }

    isApplicableSubstitution(expr, sub) {
        console.log("origin: " + sub.origin);
        console.log("target: " + sub.target);
        let subs = this.getSubsPlacesFor(expr, sub);
        console.log("isApplicable: " + (subs.length > 0));
        return subs.length > 0
    }

    getSubsPlacesFor(expr, sub) {
        let placesJSON = TWF.api.findSubstitutionPlacesCoordinatesInExpressionJSON(expr, sub.origin, sub.target, "setTheory");
        let substitutionPlaces = (JSON.parse(placesJSON)).substitutionPlaces;
        // substitutionPlaces.forEach((subPlaces) => {
        //     for (let place in subPlaces) {
        //         subPlaces[place] = parseInt(subPlaces[place]);
        //     }
        // });
        // substitutionPlaces = substitutionPlaces.filter((subPlaces) => {
        //     return subPlaces.endPosition - subPlaces.startPosition <= sub.origin.length + 2
        // });
        console.log("sub places: " + substitutionPlaces.length);
        return substitutionPlaces
    }

    getNextSubstitution() {
        return this.getRandomElemOf(this.subs);
    }

    getRandomElemOf(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

}