export const dater = {
    dater(data){
        const list = {
            January: 'yanvar',
            February: 'fevral',
            March: 'mart',
            April: 'aprel',
            May: 'may',
            June: 'iyun',
            July: 'iyul',
            August: 'avgust',
            September: 'sentyabr',
            October: 'oktyabr',
            November: 'noyabr',
            December: 'dekabr',
        }
        const parts = data.split(' ');

        return parts[0] + " " + list[parts[1]];
    }
}