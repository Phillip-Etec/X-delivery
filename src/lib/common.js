
export default {
    dateStringRearrange: (str) => {
        reversed = []
        inorder = str.split('-')
        for (i = 0, j = inorder.length - 1; i < inorder.length; i++, j--) {
            reversed[j] = inorder[i]
        }
        return reversed.join().replaceAll(',', '/')
    },

    genderToAcronym: (str) => {
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

};
