import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.resolve();

export function genWhere(values, strFields) {
  const ret = Object.keys(values).reduce((a, c) => {
    const quotes = strFields.includes(c) ? '"' : ''
    const str = values[c] !== undefined ? "AND " + c + "=" + quotes + values[c] + quotes : ''
    a.push(str)
    return a
  }, [])
  if (ret.length === 0) return ''
  return "WHERE 1 = 1 " + ret.join(' ')
}

export function genSet(values, strFields) {
  const ret = Object.keys(values).reduce((a, c) => {
    const quotes = strFields.includes(c) ? '"' : ''
    const str = c + '=' + quotes + values[c] + quotes
    a.push(str)
    return a
  }, [])
  return ret.join(',')
}

export function genUpdateSql(tableName, setValues, where, stringFields) {
  return `UPDATE ${tableName} SET ${genSet(setValues, stringFields)} ${genWhere(where, stringFields)}`
}

export function genLimit({ page, pageSize }) {
  if (!page || !pageSize) return ''
  return ` LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`
}