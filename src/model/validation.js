
const aliasPattern = /^[a-zA-Z0-9.-]{6,20}$/;
const cbuPattern = /^(\d{3})(\d{1})(\d{3})(\d{1})(\d{13})(\d{1})$/;

export const validateCuit = (cuit) => {
  const digits = cuit.trim().split('').map(c => parseInt(c));
  if(digits.length == 11) {
    const vDigit = digits.pop();
    const verif = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const result = verif.reduce((acc, v, i) => acc + (v * digits[i]), 0);
    const verifDigit = 11 - (result % 11);
    if (verifDigit === vDigit) {
      return true;
    }
  }
  return false;
};

const validateAlias = (alias) => aliasPattern.test(alias);

const validateCbu = (cbu) => {
  let _cbu = cbu.replace(/[^0-9]/g, ''),
      valid = cbuPattern.test(_cbu);
  if(valid) {
    let matches = cbuPattern.exec(_cbu),
        bank = matches[1], verBank = matches[2],
        branch = matches[3], verBranch = matches[4],
        accum = bank[0] * 7 + bank[1] * 1 + bank[2] * 3 + verBank * 9
          + branch[0] * 7 + branch[1] * 1 + branch[2] * 3,
        diff = ((10 - (accum % 10)) % 10);
    valid = (diff.toString() === verBranch);
    if(valid) {
      let account = matches[5], verAccount = matches[6],
          accum = account[0] * 3 + account[1] * 9 + account[2] * 7 + account[3] * 1
            + account[4] * 3 + account[5] * 9 + account[6] * 7 + account[7] * 1
            + account[8] * 3 + account[9] * 9 + account[10] * 7 + account[11] * 1
            + account[12] * 3,
          diff = ((10 - (accum % 10)) % 10);
      valid = (diff.toString() === verAccount);
    }
  }
  return valid;
}

  export const validateAliasOrCbu = (field) =>
    validateAlias(field) || validateCbu(field);