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
    '^@models/(.*)': ['<rootDir>/models/$1'],
    '^@controllers/(.*)': ['<rootDir>/controllers/$1'],
    '^@middlewares/(.*)': ['<rootDir>/middlewares/$1'],
    '^@constants/(.*)': ['<rootDir>/constants/$1'],
    '^@routes/(.*)': ['<rootDir>/routes/$1'],
    '^@interfaces/(.*)': ['<rootDir>/interfaces/$1'],
    '^@helpers/(.*)': ['<rootDir>/helpers/$1'],
    '^@db/(.*)': ['<rootDir>/db/$1'],
    '^@lib/(.*)': ['<rootDir>/lib/$1']
  }
};
