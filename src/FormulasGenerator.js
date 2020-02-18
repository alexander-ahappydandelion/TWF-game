class FormulasGenerator {
    constructor(gameModel) {
        this.expr = "(A|B)&(C|D)";
        this.correctSubs = [
            {
                origin: "A|B",
                target: "B|A"
            },
            {
                origin: "B|A",
                target: "A|B"
            },
            {
                origin: "A\\/C",
                target: "C\\/A"
            },
            {
                origin: "B\\/C",
                target: "C\\/B"
            },
            {
                origin: "A/\\B",
                target: "B/\\A"
            },
            {
                origin: "A/\\C",
                target: "C/\\A"
            },
            {
                origin: "B/\\C",
                target: "C/\\B"
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
        this.expr = this.getNextExpression(isCorrect);

        // return {
        //     "expr": this.expr,
        //     "isCorrect": isCorrect
        // }
        // return encodeURI(this.expr.replace("&", encodeURIComponent("&")));
        return {
            "text": this.expr + encodeURI(" " + isCorrect),
            "isCorrect": isCorrect
        };
    }


    isNextFormulaCorrect() {
        return Math.random() < 0.5;
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

        console.log("expr: " + this.expr + " $getNextCorrectExpression");
        console.log("nextExpr: " + nextExpr + " $getNextCorrectExpression");
        console.log("expr === nextExpr? : " + (this.expr === nextExpr) + " $getNextCorrectExpression");

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
            place.startPosition, place.endPosition)
    }

    // assumption: @sub is an applicable sub for @epxr
    applySubInRandomPlace(expr, sub) {
        let places = this.getSubsPlacesFor(expr, sub);
        console.log("places: " + places + " $applySubInRandomPlace");
        return this.applySub(expr, sub, this.getRandomElemOf(places));
    }

    isApplicableSubstitution(expr, sub) {
        let subs = this.getSubsPlacesFor(expr, sub);
        return subs.length > 0
    }

    getSubsPlacesFor(expr, sub) {
        let placesJSON = TWF.api.findSubstitutionPlacesCoordinatesInExpressionJSON(expr, sub.origin, sub.target);
        let substitutionPlaces = (JSON.parse(placesJSON)).substitutionPlaces;
        substitutionPlaces.forEach((subPlaces) => {
            for (let place in subPlaces) {
                subPlaces[place] = parseInt(subPlaces[place]);
            }
        });
        substitutionPlaces = substitutionPlaces.filter((subPlaces) => {
            return subPlaces.endPosition - subPlaces.startPosition <= sub.origin.length + 2
        });
        return substitutionPlaces
    }

    getNextSubstitution() {
        return this.getRandomElemOf(this.subs);
    }

    getRandomElemOf(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

}