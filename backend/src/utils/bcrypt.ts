import bcrypt from 'bcrypt'

export const hashValue = async (value: string, saltedValue?: number) => bcrypt.hash(value, saltedValue || 10)

export const compareValue = async (value: string, hashValue: string) => bcrypt.compare(value, hashValue).catch(() => false)
