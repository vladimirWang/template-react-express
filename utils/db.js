export function genInsertSql(tbName, body, numberFields = []) {
  const fields = Object.keys(body).reduce((a, c) => {
    if (body[c] !== undefined) {
      a.push(c)
    }
    return a
  }, []).concat(['createdAt', 'updatedAt'])

  const today = new Date();
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const values = Object.keys(body).reduce((a, c) => {
    if (body[c] !== undefined) {
      a.push(numberFields.includes(c) ? body[c] : `"${body[c]}"`)
    }
    return a
  }, []).concat([`"${year}-${month}-${date}"`, `"${year}-${month}-${date}"`])
  return `INSERT INTO ${tbName} (${fields.join(',')}) VALUES (${values.join(',')})`
}

export function genSetStr(body, numberFields = []) {
  let setStr = Object.keys(body).reduce((a, c) => {
    if (body[c] !== undefined) {
      const str = numberFields.includes(c) ? `${c} = ${body[c]}` : `${c} = "${body[c]}"`
      a.push(str)
    }
    return a
  }, [])
  return setStr.join(',')
}