import { failedRequestLimit, requestLimit } from "../config/limits.js";

let amountOfRequests = 0;
let amountOfFailedRequests = 0;

function shouldAddToLimit(req, allowMethods) {
    if (
        (req.path.startsWith("/client") ||
            req.path.startsWith("/styles") ||
            req.path.startsWith("/assets") ||
            req.path.startsWith("/change-theme")) &&
        allowMethods.includes(req.method)
    ) {
        return false;
    }

    return true;
}

export function rateLimit({ interval }) {
    const oneMinute = 60 * 1000;

    if (interval < oneMinute) {
        interval = oneMinute;
    }

    setInterval(() => {
        amountOfRequests = 0;
        amountOfFailedRequests = 0;
    }, interval);

    return function (req, res, next) {
        if (shouldAddToLimit(req, ["GET", "POST", "DELETE", "PUT"])) {
            if (amountOfRequests >= requestLimit) {
                res.status(429).render("error", {
                    status: 429,
                    message:
                        "The amount of requests received have exceeded the maximum. Since this is a side project, the limit is small. Please try again later.",
                });

                return;
            }

            amountOfRequests += 1;
        }

        if (amountOfFailedRequests >= failedRequestLimit) {
            if (req.method == "POST" || req.method == "DELETE") {
                res.status(429).send(
                    "The amount of failed requests exceeded the maximum. Since this is a side project. the limit is small. Please try again later."
                );
            } else if (
                !req.path.startsWith("/client") ||
                !req.path.startsWith("/styles") ||
                !req.path.startsWith("/assets") ||
                !req.path.startsWith("/change-theme")
            ) {
                res.status(429).render("error", {
                    status: 429,
                    message:
                        "The amount of failed requests received have exceeded the maximum. Since this is a side project, the limit is small. Please try again later.",
                });
            }

            return;
        }

        next();
    };
}

export function incrementAmountOfFailedRequests() {
    amountOfFailedRequests += 1;
}

export function resetAmountOfFailedRequests() {
    amountOfFailedRequests = 0;
}
