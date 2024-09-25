
 /*
  * Takes a string in the format 'YYYY-mm-DD' and rearranges it into 'dd/mm/YYYY'
  * */
export function dateStringRearrange(str) {
    let reversed = []
    const inorder = str.split('-')
    for (let i = 0, j = inorder.length - 1; i < inorder.length; i++, j--) {
        reversed[j] = inorder[i]
    }
    return reversed.join().replaceAll(',', '/')
};

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
 * @returns {Date} Date parsed from string
 */
export function parseDate(str) {
    var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return (m) ? new Date(m[3], m[2] - 1, m[1]) : Date.now();
}
