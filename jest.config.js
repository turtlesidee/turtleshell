module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['/node_modules'],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
};
