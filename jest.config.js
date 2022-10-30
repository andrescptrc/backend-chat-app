module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/mocks/**'
  ],
  coveragePathIgnorePatterns: [],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./config/jest/setup-files.js'],
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': '@swc/jest',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransformer.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  resetMocks: true,
  moduleNameMapper: {
    '^@models/(.*)': ['<rootDir>/src/models/$1'],
    '^@controllers/(.*)': ['<rootDir>/src/controllers/$1'],
    '^@middlewares/(.*)': ['<rootDir>/src/middlewares/$1'],
    '^@constants/(.*)': ['<rootDir>/src/constants/$1'],
    '^@routes/(.*)': ['<rootDir>/src/routes/$1'],
    '^@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '^@helpers/(.*)': ['<rootDir>/src/helpers/$1'],
    '^@db/(.*)': ['<rootDir>/src/db/$1'],
    '^@lib/(.*)': ['<rootDir>/src/lib/$1']
  }
};
