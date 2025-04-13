
export const getEnv = (key: string, defaultValue?: string): string => {

    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error(`Enviroment variable ${key} is Missing`)
    }

    return value;
}


export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT", "4004");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const APP_ORIGIN = getEnv("APP_ORIGIN",)
export const JWT_SECRET = getEnv("JWT_SECRET")
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET")