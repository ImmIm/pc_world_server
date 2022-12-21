export const stringCheckSql = (string: string) => {
  const pattern = /^[A-Za-z*-_!]+$/;

  const result = string.match(pattern);

    if (!result) {
        return false 
    }
    return true

};
