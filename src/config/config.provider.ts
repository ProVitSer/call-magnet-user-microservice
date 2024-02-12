const PROD_CONFIG_FILE = '.env.prod';
const DEV_CONFIG_FILE = '.env.dev';

export default () => {
    const environment = process.env.NODE_ENV || 'develop';
    return environment === 'production' ? PROD_CONFIG_FILE : DEV_CONFIG_FILE;
};
