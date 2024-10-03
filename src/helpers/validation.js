import {    removeNullUndefinedEmptyKeys, 
            except, 
            hasAllKeys,
            hasAtLeastOneKey
} from './common.js'

Array.prototype.except = function(to_exclude) {
    return this.filter(element => !to_exclude.includes(element));
}

export function
    validateForm(
        req, res, _,
        allKeys, requiredKeys, errorStrategy,
        message, title
    ) {
    const received = removeNullUndefinedEmptyKeys(req.body);
    const optional = allKeys.except(requiredKeys);
    if (!hasAllKeys(requiredKeys, received) {
        return processError(errorStrategy, res, message, title);
    }
    if (!hasAtLeastOneKey(optional, received) ) {
        return processError(errorStrategy, res, 
            'No mínimo um dos campos opicionais tem que ser preenchidos',
            'Preencha no mínimo um campo a mais'
        );
    }
    res.locals.received = received;
    res.locals.required = Array.from(requiredKeys);
    res.locals.optional = optional;
    // next();
}

const errorCode = 422;
const successCode = 200;

/*
 * @param {express.Response} response
 * @param {function()} strategy
 */
function processError(strategy, res, message, title) {
    return strategy(res, message, title);
}

export function strategySendHtmxAlert(res, message, title) {
    res.status(errorCode).render('components/alert', {
        message: message,
        title: title
    });
}

function sendJson(res, code, ...resObj) {
    res.status(code).json(resObj);
}

export function strategySendJsonError(res, message, title) {
    sendJson(res, errorCode, {
        sucess: false,
        error: message,
        title: title
    });
}

export function strategySendJsonSuccess(res, message, title) {
    sendJson(res, successCode, {
        sucess: true,
        error: message,
        title: title
    });
}

export function strategyTemporaryProfile(res, view, params) {
    res.render(view, ...params);
}

export function serverError(res) {
    res.status(500).render('errors/error',
        {
            message: "Ocorreu um erro no servidor"
        }
    );
}
