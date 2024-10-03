
/*
 * Takes a string in the format 'YYYY-mm-DD' and rearranges it into 'dd/mm/YYYY'
 * @param {string} str: string in the mask 'YYYY-mm-DD'
 * @returns {string} date string the mask 'dd/mm/YYYY'
 */
export function dateStringRearrange(str) {
    const cond = str.match(/^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/);
    if (!cond) {
        throw new error('string not in the format \'yyyy-mm-dd\'');
    }
    const parts = str.split('-');
    const rearranged = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return rearranged;
};

/* Returns the acronym of the selected gender in a form
 * @param {string} str: full gender as rendered in a form
 * @returns {string} acronym to be stored in the database.
 */
export function genderToAcronym(str) {
    let genderAcronym = '';
    switch (str) {
        case 'prefiro não informar':
            genderAcronym = 'NA';
            break;
        case 'não-binário':
            genderAcronym = 'NB';
            break;
        case 'feminino':
            genderAcronym = 'FM';
            break;
        case 'masculino':
            genderAcronym = 'ML';
            break;
        default:
            genderAcronym = 'NA';
    }
    return genderAcronym;
}


/*
 * Parses a string in the format "dd/mm/YYYY" into a Date object.
 * Will default to current date if str's format is invalid
 * @param {string} str: string to be validated and converted into a date object
 * @returns {Date|boolean} Date parsed from string; false when string is in the
 * wrong format
 */
export function parseDate(str) {
    const m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) {
        throw new error('string not in the format \'dd/mm/YYYY\'');
    }
    return (m) ? new Date(m[3], m[2] - 1, m[1]) : false;
}

/*
 * Removes keys whose values are of null and undefined. 
 * pure function
 * @param {Object} the Object from which to remove keys with undefined or null 
 * values
 * @returns {Object} an Object without any keys which evaluate to undefined or 
 * null
 */
export function removeNullUndefinedKeys(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) =>
            value !== null && value !== undefined
        )
    );
}

/*
 * Removes keys whose values are of null, undefined or an empty string. "empty"
 * meaning a string with only whitespace characters.pure function
 * @param {Object} the Object from which to remove keys with undefined or null 
 * values
 * @returns {Object} an Object without any keys which evaluate to undefined or 
 * null
 */
export function removeNullUndefinedEmptyKeys(obj) {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
            return (typeof value === 'string') ?
                value.trim() !== '' :
                value !== null && value !== undefined
        })
    );
}
/* Courtesy of https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch05
 * This is the level-9000-super-Saiyan-form of compose
 */
export function compose(...fns) {
    (...args) =>
        fns.reduceRight((res, fn) =>
            [fn.call(null, ...res)], args)[0]
}

/*
 * 
 */
export function hasCreditCard(cards, number) {
+   return cards.some((card) => decrypt(card.number) === number);
+}
+
+/*
+ * 
+ */
+export function areAllKeysNullOrUndefined(obj) {
    return Object.keys(obj).every(key =>
        obj[key] === null || obj[key] === undefined
    );
}

/*
 * @param {string[]} keys
 * @param {Object} objects
 * @returns {boolean}
 */
export function hasAllKeys(keys, obj) {
    return keys.every(key => obj.hasOwnProperty(key) && obj[key] != null);
}

/*
 * @param {string[]} keys
 * @param {Object} objects
 * @returns {boolean}
 */
export function hasAtLeastOneKey(keys, obj) {
    return (keys.length === 0) ? true :
        keys.some(key => obj.hasOwnProperty(key) && obj[key] != null);
}

/*
 * Meant to extend the Array prototype
 * Array.prototype.except = except
 */
export function except(to_exclude) {
    Array.prototype.except = function(to_exclude) {
        return this.filter(element => !to_exclude.includes(element));
    };
}
