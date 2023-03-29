/**
 * Get host platform
 * @param {NodeJS.Process.platform} platform 
 * @returns 
 */
export async function getPlatform(platform) {
    switch (platform) {
        case 'darwin':
            return 'osx';
        case 'win32':
            return 'win';
        case 'linux':
            return 'linux';
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}