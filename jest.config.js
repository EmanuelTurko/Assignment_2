module.exports = {
    preset: 'ts-jest',              // Use ts-jest preset for TypeScript support
    testEnvironment: 'node',        // Set the test environment to Node.js
    roots: ['<rootDir>/src'],      // Root folder where the tests will be located
    testMatch: ['**/*.test.ts'],   // Only run tests with .test.ts extension
    transform: {
        '^.+\\.tsx?$': 'ts-jest',    // Transform TypeScript files with ts-jest
    },
    collectCoverage: true,         // Collect code coverage reports
};